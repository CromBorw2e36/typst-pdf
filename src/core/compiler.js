/**
 * Typst Compiler Layer
 *
 * Khởi tạo trực tiếp Typst WASM compiler + renderer từ node_modules
 * bằng cách inject custom WASM loader qua setImportWasmModule().
 * Không dùng $typst wrapper vì nó dùng dynamic import không tương thích Vite.
 */

let initialized = false;
let compilerInstance = null;
let typstSnippet = null;

// Cấu hình URL mặc định (hỗ trợ CDN jsDelivr khi không có node_modules)
const CDN_BASE = 'https://cdn.jsdelivr.net/npm';
const TYPST_VERSION = '0.7.0-rc2';

// Hàm helper để xác định base URL (local dev vs production/CDN)
function getBaseUrl(pkgName, localPath) {
    // Nếu đang chạy trong môi trường có import map (như CDN demo) hoặc URL production
    if (window.location.protocol !== 'file:' && !window.location.href.includes('localhost') && !window.location.href.includes('127.0.0.1')) {
        return `${CDN_BASE}/${pkgName}@${TYPST_VERSION}/${localPath}`;
    }
    // Fallback cho local (phụ thuộc Vite/dev server)
    return `/node_modules/${pkgName}/${localPath}`;
}

async function loadWasmBinary(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch WASM: ${url}`);
    return await response.arrayBuffer();
}

async function setupRendererWasm() {
    // Import module JS (không WASM)
    // Tận dụng dynamic import map nếu có, hoặc fallback
    const moduleUrl = getBaseUrl('@myriaddreamin/typst-ts-renderer', 'pkg/typst_ts_renderer.mjs');
    const wasmUrl = getBaseUrl('@myriaddreamin/typst-ts-renderer', 'pkg/typst_ts_renderer_bg.wasm');
    
    // NOTE: Khi có importmap, fetch url moduleUrl có thể fail nếu trình duyệt tự ưu tiên map
    // Vì vậy ta dùng import('@myriaddreamin/typst.ts/renderer') nhưng thư viện này không expose default dễ dàng
    // Do đó import trực tiếp URL qua CDN
    const rendererModule = await import(/* @vite-ignore */ moduleUrl);
    
    if (rendererModule.setImportWasmModule) {
        rendererModule.setImportWasmModule(async (wasmName, _url) => {
            return await loadWasmBinary(wasmUrl);
        });
    }
    // Trigger init
    if (rendererModule.default) {
        await rendererModule.default();
    }
    return rendererModule;
}

async function setupCompilerWasm() {
    const moduleUrl = getBaseUrl('@myriaddreamin/typst-ts-web-compiler', 'pkg/typst_ts_web_compiler.mjs');
    const wasmUrl = getBaseUrl('@myriaddreamin/typst-ts-web-compiler', 'pkg/typst_ts_web_compiler_bg.wasm');
    
    const compilerModule = await import(/* @vite-ignore */ moduleUrl);
    if (compilerModule.setImportWasmModule) {
        compilerModule.setImportWasmModule(async (wasmName, _url) => {
            return await loadWasmBinary(wasmUrl);
        });
    }
    if (compilerModule.default) {
        await compilerModule.default();
    }
    return compilerModule;
}

export async function initCompiler() {
    if (initialized) return;

    try {
        // Load cả 2 WASM song song để tiết kiệm thời gian
        const [rendererMod, compilerMod] = await Promise.all([
            setupRendererWasm(),
            setupCompilerWasm()
        ]);

        // Import TypstSnippet từ typst.ts 
        const snippetUrl = getBaseUrl('@myriaddreamin/typst.ts', 'dist/esm/contrib/snippet.mjs');
        const snippetMod = await import(/* @vite-ignore */ snippetUrl);
        
        typstSnippet = snippetMod.$typst;
        initialized = true;
        console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (err) {
        console.error("MasaxTypst: Failed to init compiler:", err);
        throw err;
    }
}

function getTypst() {
    if (!typstSnippet) throw new Error('Typst not initialized. Call initCompiler() first.');
    return typstSnippet;
}

/**
 * Automatically fetch and map remote images in the Typst VFS
 */
async function resolveRemoteImages(content) {
    const $typst = getTypst();
    // Match any string inside #image("...")
    const urlRegex = /#image\(\s*"([^"]+)"/g;
    let match;
    let modifiedContent = content;
    
    while ((match = urlRegex.exec(content)) !== null) {
        const originalPath = match[1];
        
        let fetchUrl = originalPath;
        // If it's a relative/local path (not http/https), resolve it against browser's current origin
        if (!fetchUrl.startsWith('http')) {
            try {
                fetchUrl = new URL(originalPath, window.location.href).href;
            } catch (e) {
                fetchUrl = originalPath;
            }
        }

        const filename = originalPath.split('/').pop().replace(/[^a-zA-Z0-9.-]/g, '_') || `image_${Date.now()}.png`;
        const virtualPath = `/assets/${filename}`;
        
        try {
            console.log("MasaxTypst: Fetching asset ->", fetchUrl);
            
            let response;
            if (fetchUrl.startsWith(window.location.origin) || !fetchUrl.startsWith('http')) {
                // Local asset, fetch directly
                response = await fetch(fetchUrl);
            } else {
                // External asset, use CORS proxy
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fetchUrl)}`;
                response = await fetch(proxyUrl);
            }
            
            if (response.ok) {
                const buffer = await response.arrayBuffer();
                const uint8Array = new Uint8Array(buffer);
                
                // map into Typst
                await $typst.mapShadow(virtualPath, uint8Array);
                
                // patch the content
                modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `"${virtualPath}"`);
            } else {
                console.warn(`MasaxTypst: Missing image at: ${fetchUrl}`);
                modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `""`); 
            }
        } catch (err) {
            console.error(`MasaxTypst: Failed to fetch image ${fetchUrl}`, err);
            modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `""`); 
        }
    }
    
    return modifiedContent;
}

/**
 * Compile Typst → PDF Blob
 * @param {string} content - Typst markup string
 * @returns {Promise<Blob>}
 */
export async function compileTypstToPdf(content) {
    await initCompiler();
    const $typst = getTypst();
    const resolvedContent = await resolveRemoteImages(content);
    const pdfBytes = await $typst.pdf({ mainContent: resolvedContent });
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Compile Typst → SVG string (cho preview nhanh)
 * @param {string} content - Typst markup string
 * @returns {Promise<string>}
 */
export async function compileTypstToSvg(content) {
    await initCompiler();
    const $typst = getTypst();
    const resolvedContent = await resolveRemoteImages(content);
    const result = await $typst.svg({ mainContent: resolvedContent });
    return Array.isArray(result) ? result.join('') : (result || '');
}

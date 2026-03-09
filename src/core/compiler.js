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

// URL tương đối với gốc dev server
const COMPILER_WASM_URL = '/node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm';
const RENDERER_WASM_URL = '/node_modules/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm';

async function loadWasmBinary(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch WASM: ${url}`);
    return await response.arrayBuffer();
}

async function setupRendererWasm() {
    // Import module JS (không WASM)
    const rendererModule = await import('/node_modules/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer.mjs');
    if (rendererModule.setImportWasmModule) {
        rendererModule.setImportWasmModule(async (wasmName, _url) => {
            return await loadWasmBinary(RENDERER_WASM_URL);
        });
    }
    // Trigger init
    if (rendererModule.default) {
        await rendererModule.default();
    }
    return rendererModule;
}

async function setupCompilerWasm() {
    const compilerModule = await import('/node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler.mjs');
    if (compilerModule.setImportWasmModule) {
        compilerModule.setImportWasmModule(async (wasmName, _url) => {
            return await loadWasmBinary(COMPILER_WASM_URL);
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

        // Import TypstSnippet từ typst.ts (JS only, không có dynamic WASM import)
        const snippetMod = await import('/node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs');
        
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

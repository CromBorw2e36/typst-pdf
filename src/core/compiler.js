/**
 * Typst Compiler Layer
 *
 * Khởi tạo trực tiếp Typst WASM compiler + renderer từ node_modules
 * bằng cách inject custom WASM loader qua setImportWasmModule().
 * Không dùng $typst wrapper vì nó dùng dynamic import không tương thích Vite.
 */

let initialized = false;
let typstSnippet = null;

// Cấu hình URL mặc định (hỗ trợ CDN jsDelivr khi không có node_modules)
const CDN_BASE = 'https://cdn.jsdelivr.net/npm';
const TYPST_VERSION = '0.7.0-rc2';

// Hàm helper để xác định base URL
// - Vite dev server (npm run dev): dùng node_modules qua Vite's module resolution
// - Production build / CDN / IIS / .NET: luôn dùng CDN
function getBaseUrl(pkgName, localPath) {
    try {
        if (import.meta.env?.DEV) {
            return `/node_modules/${pkgName}/${localPath}`;
        }
    } catch (_) { /* not in Vite env */ }
    return `${CDN_BASE}/${pkgName}@${TYPST_VERSION}/${localPath}`;
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
 * Pre-loaded assets: path -> Uint8Array
 * Populated by preloadAsset() trước khi compile (dùng cho VSCode extension, môi trường không có fetch local)
 */
const preloadedAssets = new Map();

/**
 * Pre-load một asset vào VFS trước khi compile.
 * Dùng khi môi trường không thể fetch file local (ví dụ: VSCode webview).
 * @param {string} originalPath - Path gốc trong template, ví dụ: "./logo.png"
 * @param {Uint8Array} data - Dữ liệu nhị phân của file
 */
export function preloadAsset(originalPath, data) {
    preloadedAssets.set(originalPath, data);
}

/**
 * Xóa toàn bộ pre-loaded assets (gọi trước mỗi lần render mới nếu cần)
 */
export function clearPreloadedAssets() {
    preloadedAssets.clear();
}

/**
 * Automatically fetch and map remote images in the Typst VFS
 */
async function resolveRemoteImages(content) {
    const $typst = getTypst();
    const urlRegex = /#image\(\s*"([^"]+)"/g;
    let match;
    let modifiedContent = content;

    console.info("MasaxTypst: Resolving images...");

    while ((match = urlRegex.exec(content)) !== null) {
        const originalPath = match[1];

        const filename = originalPath.split('/').pop().replace(/[^a-zA-Z0-9.-]/g, '_') || `image_${Date.now()}.png`;
        const virtualPath = `/assets/${filename}`;

        // Ưu tiên dùng pre-loaded asset nếu có (tránh fetch trong môi trường bị hạn chế)
        if (preloadedAssets.has(originalPath)) {
            console.log("MasaxTypst: Using preloaded asset ->", originalPath);
            await $typst.mapShadow(virtualPath, preloadedAssets.get(originalPath));
            modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `"${virtualPath}"`);
            continue;
        }

        let fetchUrl = originalPath;
        if (!fetchUrl.startsWith('http')) {
            try {
                fetchUrl = new URL(originalPath, window.location.href).href;
            } catch (e) {
                fetchUrl = originalPath;
            }
        }

        try {
            let response;
            if (fetchUrl.startsWith(window.location.origin) || !fetchUrl.startsWith('http')) {
                console.log("MasaxTypst: Fetching local asset ->", fetchUrl);
                response = await fetch(fetchUrl);
            } else {
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fetchUrl)}`;
                console.log("MasaxTypst: Fetching external asset via CORS proxy ->", fetchUrl);
                response = await fetch(proxyUrl);
            }

            if (response.ok) {
                const buffer = await response.arrayBuffer();
                const uint8Array = new Uint8Array(buffer);
                await $typst.mapShadow(virtualPath, uint8Array);
                modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `"${virtualPath}"`);
                console.log("MasaxTypst: Image loaded ->", originalPath, `(${uint8Array.byteLength} bytes)`);
            } else {
                console.warn(`MasaxTypst: Image fetch failed [HTTP ${response.status}] ${fetchUrl}`);
                modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `""`);
            }
        } catch (err) {
            console.error(`MasaxTypst: Image fetch error -> ${fetchUrl}:`, err.message || err);
            modifiedContent = modifiedContent.replaceAll(`"${originalPath}"`, `""`);
        }
    }

    console.info("MasaxTypst: Image resolution complete.");
    return modifiedContent;
}

/**
 * Register extra fonts into the Typst VFS before compilation.
 * @param {Array<{path: string, data: Uint8Array}>} fonts
 */
async function registerExtraFonts(fonts) {
    if (!fonts || fonts.length === 0) return;
    const $typst = getTypst();
    for (const font of fonts) {
        if (font.path && font.data) {
            await $typst.mapShadow(font.path, font.data);
        }
    }
}

/**
 * Compile Typst → PDF Blob
 * @param {string} content - Typst markup string
 * @param {Array<{path: string, data: Uint8Array}>} [extraFonts]
 * @returns {Promise<Blob>}
 */
export async function compileTypstToPdf(content, extraFonts = []) {
    await initCompiler();
    const $typst = getTypst();
    await registerExtraFonts(extraFonts);

    let resolvedContent;
    try {
        resolvedContent = await resolveRemoteImages(content);
    } catch (err) {
        console.warn("MasaxTypst: Image resolution failed, compiling without images.", err.message || err);
        resolvedContent = content;
    }

    console.info("MasaxTypst: Compiling Typst → PDF...");
    const pdfBytes = await $typst.pdf({ mainContent: resolvedContent });
    console.info("MasaxTypst: PDF compilation complete.");
    return new Blob([pdfBytes], { type: 'application/pdf' });
}

/**
 * Compile Typst → SVG string (cho preview nhanh)
 * @param {string} content - Typst markup string
 * @param {Array<{path: string, data: Uint8Array}>} [extraFonts]
 * @returns {Promise<string>}
 */
export async function compileTypstToSvg(content, extraFonts = []) {
    await initCompiler();
    const $typst = getTypst();
    await registerExtraFonts(extraFonts);

    let resolvedContent;
    try {
        resolvedContent = await resolveRemoteImages(content);
    } catch (err) {
        console.warn("MasaxTypst: Image resolution failed, compiling without images.", err.message || err);
        resolvedContent = content;
    }

    console.info("MasaxTypst: Compiling Typst → SVG...");
    const result = await $typst.svg({ mainContent: resolvedContent });
    const pages = Array.isArray(result) ? result : [result || ''];
    console.info(`MasaxTypst: SVG compilation complete. ${pages.length} page(s).`);
    // Trả về mảng các page SVG — caller tự quyết định cách render (join hay separator)
    return pages;
}

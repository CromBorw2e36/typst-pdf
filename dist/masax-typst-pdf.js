import { EditorState as _ } from "@codemirror/state";
import { EditorView as w } from "@codemirror/view";
import { basicSetup as b } from "codemirror";
function P(s, t) {
  const o = (typeof t == "string" ? t : JSON.stringify(t)).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return s.replace("{{DATA}}", o);
}
class A {
  resolve(t, e) {
    return P(t, e);
  }
}
const C = new A();
let x = !1, h = null;
const u = "https://cdn.jsdelivr.net/npm", g = "0.7.0-rc2", $ = "masax-typst-wasm-v1", k = "masax-typst-fonts-v1";
function y(s, t) {
  try {
  } catch {
  }
  return `${u}/${s}@${g}/${t}`;
}
async function T(s) {
  try {
    const t = await caches.open($), e = await t.match(s);
    if (e)
      return console.info(`MasaxTypst: WASM cache hit → ${s.split("/").pop()}`), await e.arrayBuffer();
    const o = await fetch(s);
    if (!o.ok) throw new Error(`Failed to fetch WASM: ${s}`);
    return t.put(s, o.clone()), console.info(`MasaxTypst: WASM cached → ${s.split("/").pop()}`), await o.arrayBuffer();
  } catch (t) {
    console.warn("MasaxTypst: Cache API unavailable, fetching directly.", t.message);
    const e = await fetch(s);
    if (!e.ok) throw new Error(`Failed to fetch WASM: ${s}`);
    return await e.arrayBuffer();
  }
}
try {
  if (typeof document < "u") {
    const s = [
      `${u}/@myriaddreamin/typst-ts-web-compiler@${g}/pkg/typst_ts_web_compiler_bg.wasm`,
      `${u}/@myriaddreamin/typst-ts-renderer@${g}/pkg/typst_ts_renderer_bg.wasm`
    ];
    for (const t of s)
      if (!document.querySelector(`link[href="${t}"]`)) {
        const e = document.createElement("link");
        e.rel = "preload", e.href = t, e.as = "fetch", e.crossOrigin = "anonymous", document.head.appendChild(e);
      }
  }
} catch {
}
async function F() {
  const s = y("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer.mjs"), t = y("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer_bg.wasm"), e = await import(
    /* @vite-ignore */
    s
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (o, n) => await T(t)), e.default && await e.default(), e;
}
async function W() {
  const s = y("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler.mjs"), t = y("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler_bg.wasm"), e = await import(
    /* @vite-ignore */
    s
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (o, n) => await T(t)), e.default && await e.default(), e;
}
async function E() {
  if (!x)
    try {
      const [s, t] = await Promise.all([
        F(),
        W()
      ]), o = await import(y("@myriaddreamin/typst.ts", "dist/esm/contrib/snippet.mjs"));
      h = o.$typst;
      const n = o.TypstSnippet || h.constructor;
      if (n?.preloadFontAssets && typeof caches < "u") {
        const r = async (i, p) => {
          const a = typeof i == "string" ? i : i.url;
          try {
            const l = await caches.open(k), c = await l.match(a);
            if (c) return c;
            const d = await fetch(i, p);
            return d.ok && l.put(a, d.clone()), d;
          } catch {
            return fetch(i, p);
          }
        };
        h.use(n.preloadFontAssets({
          assets: ["text"],
          fetcher: r
        })), console.info("MasaxTypst: Font caching enabled.");
      }
      x = !0, console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (s) {
      throw console.error("MasaxTypst: Failed to init compiler:", s), s;
    }
}
function f() {
  if (!h) throw new Error("Typst not initialized. Call initCompiler() first.");
  return h;
}
const m = /* @__PURE__ */ new Map();
function U(s, t) {
  m.set(s, t);
}
function z() {
  m.clear();
}
async function S(s) {
  const t = f(), e = /#image\(\s*"([^"]+)"/g;
  let o, n = s;
  for (console.info("MasaxTypst: Resolving images..."); (o = e.exec(s)) !== null; ) {
    const r = o[1], p = `/assets/${r.split("/").pop().replace(/[^a-zA-Z0-9.-]/g, "_") || `image_${Date.now()}.png`}`;
    if (m.has(r)) {
      console.log("MasaxTypst: Using preloaded asset ->", r), await t.mapShadow(p, m.get(r)), n = n.replaceAll(`"${r}"`, `"${p}"`);
      continue;
    }
    let a = r;
    if (!a.startsWith("http"))
      try {
        a = new URL(r, window.location.href).href;
      } catch {
        a = r;
      }
    try {
      let l;
      if (a.startsWith(window.location.origin) || !a.startsWith("http"))
        console.log("MasaxTypst: Fetching local asset ->", a), l = await fetch(a);
      else {
        const c = `https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`;
        console.log("MasaxTypst: Fetching external asset via CORS proxy ->", a), l = await fetch(c);
      }
      if (l.ok) {
        const c = await l.arrayBuffer(), d = new Uint8Array(c);
        await t.mapShadow(p, d), n = n.replaceAll(`"${r}"`, `"${p}"`), console.log("MasaxTypst: Image loaded ->", r, `(${d.byteLength} bytes)`);
      } else
        console.warn(`MasaxTypst: Image fetch failed [HTTP ${l.status}] ${a}`), n = n.replaceAll(`"${r}"`, '""');
    } catch (l) {
      console.error(`MasaxTypst: Image fetch error -> ${a}:`, l.message || l), n = n.replaceAll(`"${r}"`, '""');
    }
  }
  return console.info("MasaxTypst: Image resolution complete."), n;
}
async function M(s) {
  if (!s || s.length === 0) return;
  const t = f();
  for (const e of s)
    e.path && e.data && await t.mapShadow(e.path, e.data);
}
async function D(s, t = []) {
  await E();
  const e = f();
  await M(t);
  let o;
  try {
    o = await S(s);
  } catch (r) {
    console.warn("MasaxTypst: Image resolution failed, compiling without images.", r.message || r), o = s;
  }
  console.info("MasaxTypst: Compiling Typst → PDF...");
  const n = await e.pdf({ mainContent: o });
  return console.info("MasaxTypst: PDF compilation complete."), new Blob([n], { type: "application/pdf" });
}
async function B(s, t = []) {
  await E();
  const e = f();
  await M(t);
  let o;
  try {
    o = await S(s);
  } catch (i) {
    console.warn("MasaxTypst: Image resolution failed, compiling without images.", i.message || i), o = s;
  }
  console.info("MasaxTypst: Compiling Typst → SVG...");
  const n = await e.svg({ mainContent: o }), r = Array.isArray(n) ? n : [n || ""];
  return console.info(`MasaxTypst: SVG compilation complete. ${r.length} page(s).`), r;
}
class I {
  /**
   * @param {Object|string} blueprint - The blueprint containing the Typst template and configuration
   */
  constructor(t = null) {
    this.blueprint = null, this.extraFonts = [], t && this.loadBlueprint(t);
  }
  /**
   * Loads a new blueprint.
   * @param {Object|string} blueprintObj 
   */
  loadBlueprint(t) {
    try {
      typeof t == "string" ? this.blueprint = JSON.parse(t) : this.blueprint = t;
    } catch (e) {
      throw console.error("MasaxTypst: Invalid blueprint format."), e;
    }
  }
  /**
   * Alias for loadBlueprint
   * @param {Object|string} blueprintObj 
   */
  setBlueprint(t) {
    this.loadBlueprint(t);
  }
  /**
   * Creates a standard blueprint structure from a Typst template string
   * @param {string} typstTemplateString 
   * @returns {Object}
   */
  genBlueprint(t) {
    return {
      typstTemplate: t
    };
  }
  /**
   * Alias for generatePDF
   */
  async genPDF(t = {}) {
    return await this.generatePDF(t);
  }
  /**
   * Register additional fonts before generation
   * @param {Array<{path: string, data: Uint8Array}>} fonts 
   */
  setFonts(t) {
    this.extraFonts = t;
  }
  /**
   * Helper to get the template string from the blueprint.
   */
  _getTemplate() {
    if (!this.blueprint)
      throw new Error("Blueprint not loaded.");
    return this.blueprint.typstTemplate || this.blueprint.content || this.blueprint;
  }
  /**
   * Generates a PDF File Blob
   * @param {Object} data - Context data to resolve the template
   * @returns {Promise<Blob>}
   */
  async generatePDF(t = {}) {
    const e = this._getTemplate();
    console.info("MasaxTypst: Injecting data into template...");
    const o = C.resolve(e, t);
    return console.info("MasaxTypst: Data injected. Starting PDF compilation..."), await D(o, this.extraFonts);
  }
  /**
   * Generates an array of SVG strings for live preview
   * @param {Object} data - Context data to resolve the template
   * @returns {Promise<Array<string>>}
   */
  async generateSVG(t = {}) {
    const e = this._getTemplate();
    console.info("MasaxTypst: Injecting data into template...");
    const o = C.resolve(e, t);
    return console.info("MasaxTypst: Data injected. Starting SVG compilation..."), await B(o, this.extraFonts);
  }
}
class v {
  /**
   * @param {HTMLElement} parentElement 
   * @param {string} initialContent 
   * @param {Function} onChangeCallback 
   */
  constructor(t, e = "", o = null) {
    this.onChange = o;
    const n = _.create({
      doc: e,
      extensions: [
        b,
        // Lắng nghe sự thay đổi của document
        w.updateListener.of((r) => {
          r.docChanged && this.onChange && this.onChange(r.state.doc.toString());
        })
      ]
    });
    this.view = new w({
      state: n,
      parent: t
    });
  }
  /**
   * Lấy nội dung hiện tại của Editor
   * @returns {string}
   */
  getContent() {
    return this.view.state.doc.toString();
  }
  /**
   * Ghi đè toàn bộ nội dung của Editor
   * @param {string} content 
   */
  setContent(t) {
    const e = this.view.state.update({
      changes: { from: 0, to: this.view.state.doc.length, insert: t }
    });
    this.view.dispatch(e);
  }
  /**
   * Focus vào editor
   */
  focus() {
    this.view.focus();
  }
  /**
   * Dọn dẹp EditorView và giải phóng bộ nhớ
   */
  destroy() {
    this.view.destroy();
  }
}
class j {
  /**
   * @param {HTMLElement} parentElement 
   */
  constructor(t) {
    this.parentElement = t, this.generator = new I();
  }
  /**
   * Renders SVG preview from Typst template and JSON Data.
   * @param {string} template 
   * @param {Object} data 
   */
  async renderPreview(t, e = {}) {
    try {
      this.generator.loadBlueprint({ typstTemplate: t });
      const o = await this.generator.generateSVG(e);
      this.parentElement.innerHTML = "";
      const n = Array.isArray(o) ? o : [o];
      n.forEach((r, i) => {
        const p = this._sanitizeSvg(r), a = document.createElement("div");
        a.style.cssText = "position:relative; margin-bottom:24px;", a.innerHTML = p;
        const l = a.querySelector("svg");
        l && (l.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", l.style.backgroundColor = "#fff", l.style.display = "block");
        const c = document.createElement("div");
        c.textContent = `Page ${i + 1} / ${n.length}`, c.style.cssText = "text-align:center; font-size:0.75rem; color:#888; margin-top:4px; margin-bottom:8px;", a.appendChild(c), this.parentElement.appendChild(a);
      });
    } catch (o) {
      console.error("MasaxTypst: Preview Render Error:", o);
      const n = document.createElement("div");
      n.style.cssText = "color:#721c24;background-color:#f8d7da;padding:1rem;border:1px solid #f5c6cb;border-radius:4px;font-family:sans-serif;";
      const r = document.createElement("strong");
      r.textContent = "Error rendering preview:";
      const i = document.createElement("pre");
      i.style.cssText = "white-space:pre-wrap;margin-top:10px;", i.textContent = o.message, n.appendChild(r), n.appendChild(document.createElement("br")), n.appendChild(i), this.parentElement.innerHTML = "", this.parentElement.appendChild(n);
    }
  }
  /**
   * Loại bỏ <script> và on* attributes trong SVG content để tránh XSS
   * @param {string} svgString
   * @returns {string}
   */
  _sanitizeSvg(t) {
    const e = new DOMParser().parseFromString(`<div>${t}</div>`, "text/html");
    return e.querySelectorAll("script").forEach((o) => o.remove()), e.querySelectorAll("*").forEach((o) => {
      Array.from(o.attributes).forEach((n) => {
        n.name.startsWith("on") && o.removeAttribute(n.name);
      });
    }), e.body.querySelector("div").innerHTML;
  }
  destroy() {
    this.parentElement.innerHTML = "";
  }
}
class L {
  /**
   * @param {HTMLElement} containerElement 
   * @param {Object} options Options: { initialTemplate, initialData, onStatusChange }
   */
  constructor(t, e = {}) {
    this.container = t, this.data = e.initialData || {}, this.template = e.initialTemplate || `#set page(width: "a4", height: "a4")

= Hello World
`, this.onStatusChange = e.onStatusChange || null, this._setupDOM(), this._setupConsole(), this.preview = new j(this.previewContainer);
    let o;
    const n = JSON.stringify(this.data, null, 2);
    this.jsonEditor = new v(this.jsonEditorContainer, n, (i) => {
      clearTimeout(o), o = setTimeout(() => {
        try {
          this.data = JSON.parse(i), this.preview.renderPreview(this.template, this.data);
        } catch (p) {
          console.error("MasaxTypst: Invalid JSON format", p.message);
        }
      }, 500);
    });
    let r;
    this.typstEditor = new v(this.typstEditorContainer, this.template, (i) => {
      this.template = i, clearTimeout(r), r = setTimeout(() => {
        this.preview.renderPreview(i, this.data);
      }, 500);
    }), this.preview.renderPreview(this.template, this.data).then(() => {
      this._emitStatus("Sẵn sàng");
    }).catch(() => {
      this._emitStatus("Lỗi khởi tạo");
    });
  }
  /**
   * Gửi thông báo trạng thái qua callback nếu có
   * @param {string} msg
   */
  _emitStatus(t) {
    this.onStatusChange && this.onStatusChange(t);
  }
  _setupConsole() {
    this._originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info
    };
    const t = this._originalConsole.log, e = this._originalConsole.warn, o = this._originalConsole.error, n = this._originalConsole.info, r = (i, p) => {
      const a = document.createElement("div");
      a.style.padding = "4px 8px", a.style.borderBottom = "1px solid #ddd", a.style.fontFamily = "monospace", a.style.fontSize = "12px", a.style.wordBreak = "break-all", i === "error" ? (a.style.color = "#721c24", a.style.backgroundColor = "#f8d7da") : i === "warn" ? (a.style.color = "#856404", a.style.backgroundColor = "#fff3cd") : i === "info" ? (a.style.color = "#004085", a.style.backgroundColor = "#cce5ff") : a.style.color = "#333";
      const l = (c) => {
        if (typeof c == "object")
          try {
            return JSON.stringify(c);
          } catch {
            return Object.prototype.toString.call(c);
          }
        return String(c);
      };
      a.textContent = `[${i.toUpperCase()}] ` + Array.from(p).map(l).join(" "), this.consoleContainer.appendChild(a), this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
    };
    console.log = (...i) => {
      t.apply(console, i), r("log", i);
    }, console.warn = (...i) => {
      e.apply(console, i), r("warn", i);
    }, console.error = (...i) => {
      o.apply(console, i), r("error", i);
    }, console.info = (...i) => {
      n.apply(console, i), r("info", i);
    };
  }
  _setupDOM() {
    this.container.style.display = "flex", this.container.style.width = "100%", this.container.style.height = "100vh", this.container.style.fontFamily = "system-ui, -apple-system, sans-serif", this.container.style.overflow = "hidden", this.leftPane = document.createElement("div"), this.leftPane.style.flex = "1", this.leftPane.style.display = "flex", this.leftPane.style.flexDirection = "column", this.leftPane.style.borderRight = "1px solid #ddd", this.typstEditorContainer = document.createElement("div"), this.typstEditorContainer.style.flex = "1", this.typstEditorContainer.style.overflow = "auto", this.typstEditorContainer.style.borderBottom = "1px solid #ddd", this.typstEditorContainer.style.position = "relative";
    const t = document.createElement("div");
    t.textContent = "Typst Code", t.style.padding = "4px 8px", t.style.background = "#f8f9fa", t.style.fontSize = "12px", t.style.fontWeight = "bold", t.style.borderBottom = "1px solid #ddd", t.style.position = "sticky", t.style.top = "0", t.style.zIndex = "10", this.typstEditorContainer.appendChild(t), this.jsonEditorContainer = document.createElement("div"), this.jsonEditorContainer.style.flex = "1", this.jsonEditorContainer.style.overflow = "auto", this.jsonEditorContainer.style.position = "relative";
    const e = document.createElement("div");
    e.textContent = "JSON Data", e.style.padding = "4px 8px", e.style.background = "#f8f9fa", e.style.fontSize = "12px", e.style.fontWeight = "bold", e.style.borderBottom = "1px solid #ddd", e.style.position = "sticky", e.style.top = "0", e.style.zIndex = "10", this.jsonEditorContainer.appendChild(e), this.leftPane.appendChild(this.typstEditorContainer), this.leftPane.appendChild(this.jsonEditorContainer), this.rightPane = document.createElement("div"), this.rightPane.style.flex = "1", this.rightPane.style.display = "flex", this.rightPane.style.flexDirection = "column", this.previewContainerWrapper = document.createElement("div"), this.previewContainerWrapper.style.flex = "2", this.previewContainerWrapper.style.overflow = "auto", this.previewContainerWrapper.style.backgroundColor = "#f5f5f5", this.previewContainerWrapper.style.borderBottom = "1px solid #ddd", this.previewContainer = document.createElement("div"), this.previewContainer.style.padding = "40px 20px", this.previewContainer.style.display = "flex", this.previewContainer.style.flexDirection = "column", this.previewContainer.style.alignItems = "center", this.previewContainerWrapper.appendChild(this.previewContainer), this.consoleContainer = document.createElement("div"), this.consoleContainer.style.flex = "1", this.consoleContainer.style.overflow = "auto", this.consoleContainer.style.backgroundColor = "#fafafa", this.consoleContainer.style.position = "relative";
    const o = document.createElement("div");
    o.textContent = "Console Realtime", o.style.padding = "4px 8px", o.style.background = "#e9ecef", o.style.fontSize = "12px", o.style.fontWeight = "bold", o.style.borderBottom = "1px solid #ddd", o.style.position = "sticky", o.style.top = "0", this.consoleContainer.appendChild(o), this.rightPane.appendChild(this.previewContainerWrapper), this.rightPane.appendChild(this.consoleContainer), this.container.appendChild(this.leftPane), this.container.appendChild(this.rightPane);
  }
  /**
   * Dọn dẹp toàn bộ workspace: restore console, destroy editors, clear DOM
   */
  destroy() {
    this._originalConsole && (console.log = this._originalConsole.log, console.warn = this._originalConsole.warn, console.error = this._originalConsole.error, console.info = this._originalConsole.info), this.typstEditor.destroy(), this.jsonEditor.destroy(), this.preview.destroy(), this.container.innerHTML = "";
  }
  /**
   * Update data JSON and re-render
   * @param {Object} newData
   */
  updateData(t) {
    this.data = t, this.jsonEditor.setContent(JSON.stringify(this.data, null, 2)), this.preview.renderPreview(this.typstEditor.getContent(), this.data);
  }
  /**
   * Generate actual PDF Blob from current code and data
   * @returns {Promise<Blob>}
   */
  async exportPDF() {
    return await this.preview.generator.generatePDF(this.data);
  }
  /**
   * Lấy blueprint hiện tại (chỉ gồm template)
   * @returns {Object}
   */
  getBlueprint() {
    return {
      typstTemplate: this.typstEditor.getContent(),
      data: this.data
    };
  }
  /**
   * Tải blueprint lên workspace (ghi đè template và data)
   * @param {Object} blueprintObj 
   */
  loadBlueprint(t) {
    t.typstTemplate && (this.template = t.typstTemplate, this.typstEditor.setContent(this.template)), t.data ? this.updateData(t.data) : this.preview.renderPreview(this.template, this.data);
  }
}
export {
  I as MasaxTypstPDF,
  L as MasaxWorkspace,
  A as TemplateResolver,
  v as TypstEditor,
  j as TypstPreview,
  z as clearPreloadedAssets,
  D as compileTypstToPdf,
  B as compileTypstToSvg,
  C as defaultResolver,
  E as initCompiler,
  P as injectData,
  U as preloadAsset
};

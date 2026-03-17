import M from "handlebars";
import { EditorState as _ } from "@codemirror/state";
import { EditorView as g } from "@codemirror/view";
import { basicSetup as P } from "codemirror";
class D {
  constructor() {
    this.handlebars = M.create(), this.registerDefaultHelpers();
  }
  /**
   * Register common formatting helpers.
   */
  registerDefaultHelpers() {
    this.handlebars.registerHelper("formatCurrency", (t) => t ? Number(t).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 ₫"), this.handlebars.registerHelper("formatDate", (t) => t ? new Date(t).toLocaleDateString("vi-VN") : ""), this.handlebars.registerHelper("eq", function(t, e) {
      return t === e;
    }), this.handlebars.registerHelper("neq", function(t, e) {
      return t !== e;
    });
  }
  /**
   * Register a custom helper from outside.
   * @param {string} name 
   * @param {Function} fn 
   */
  registerHelper(t, e) {
    this.handlebars.registerHelper(t, e);
  }
  /**
   * Compiles and resolves the template with provided data.
   * @param {string} templateString 
   * @param {Object} data 
   * @returns {string} resolved string
   */
  resolve(t, e) {
    try {
      console.info("MasaxTypst: Compiling Handlebars template...");
      const s = this.handlebars.compile(t, { noEscape: !0 })(e);
      return console.info("MasaxTypst: Handlebars template resolved successfully."), s;
    } catch (o) {
      throw console.error("MasaxTypst: Handlebars Compilation Error:", o), o;
    }
  }
}
let f = null;
function w() {
  return f || (f = new D()), f;
}
const C = { get resolve() {
  return w().resolve.bind(w());
} };
let v = !1, u = null;
const $ = "https://cdn.jsdelivr.net/npm", W = "0.7.0-rc2";
function d(n, t) {
  return window.location.protocol !== "file:" && !window.location.href.includes("localhost") && !window.location.href.includes("127.0.0.1") ? `${$}/${n}@${W}/${t}` : `/node_modules/${n}/${t}`;
}
async function T(n) {
  const t = await fetch(n);
  if (!t.ok) throw new Error(`Failed to fetch WASM: ${n}`);
  return await t.arrayBuffer();
}
async function k() {
  const n = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer.mjs"), t = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer_bg.wasm"), e = await import(
    /* @vite-ignore */
    n
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (o, s) => await T(t)), e.default && await e.default(), e;
}
async function B() {
  const n = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler.mjs"), t = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler_bg.wasm"), e = await import(
    /* @vite-ignore */
    n
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (o, s) => await T(t)), e.default && await e.default(), e;
}
async function E() {
  if (!v)
    try {
      const [n, t] = await Promise.all([
        k(),
        B()
      ]);
      u = (await import(d("@myriaddreamin/typst.ts", "dist/esm/contrib/snippet.mjs"))).$typst, v = !0, console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (n) {
      throw console.error("MasaxTypst: Failed to init compiler:", n), n;
    }
}
function y() {
  if (!u) throw new Error("Typst not initialized. Call initCompiler() first.");
  return u;
}
const h = /* @__PURE__ */ new Map();
function L(n, t) {
  h.set(n, t);
}
function z() {
  h.clear();
}
async function b(n) {
  const t = y(), e = /#image\(\s*"([^"]+)"/g;
  let o, s = n;
  for (console.info("MasaxTypst: Resolving images..."); (o = e.exec(n)) !== null; ) {
    const r = o[1], p = `/assets/${r.split("/").pop().replace(/[^a-zA-Z0-9.-]/g, "_") || `image_${Date.now()}.png`}`;
    if (h.has(r)) {
      console.log("MasaxTypst: Using preloaded asset ->", r), await t.mapShadow(p, h.get(r)), s = s.replaceAll(`"${r}"`, `"${p}"`);
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
        const c = await l.arrayBuffer(), m = new Uint8Array(c);
        await t.mapShadow(p, m), s = s.replaceAll(`"${r}"`, `"${p}"`), console.log("MasaxTypst: Image loaded ->", r, `(${m.byteLength} bytes)`);
      } else
        console.warn(`MasaxTypst: Image fetch failed [HTTP ${l.status}] ${a}`), s = s.replaceAll(`"${r}"`, '""');
    } catch (l) {
      console.error(`MasaxTypst: Image fetch error -> ${a}:`, l.message || l), s = s.replaceAll(`"${r}"`, '""');
    }
  }
  return console.info("MasaxTypst: Image resolution complete."), s;
}
async function S(n) {
  if (!n || n.length === 0) return;
  const t = y();
  for (const e of n)
    e.path && e.data && await t.mapShadow(e.path, e.data);
}
async function H(n, t = []) {
  await E();
  const e = y();
  await S(t);
  let o;
  try {
    o = await b(n);
  } catch (r) {
    console.warn("MasaxTypst: Image resolution failed, compiling without images.", r.message || r), o = n;
  }
  console.info("MasaxTypst: Compiling Typst → PDF...");
  const s = await e.pdf({ mainContent: o });
  return console.info("MasaxTypst: PDF compilation complete."), new Blob([s], { type: "application/pdf" });
}
async function A(n, t = []) {
  await E();
  const e = y();
  await S(t);
  let o;
  try {
    o = await b(n);
  } catch (r) {
    console.warn("MasaxTypst: Image resolution failed, compiling without images.", r.message || r), o = n;
  }
  console.info("MasaxTypst: Compiling Typst → SVG...");
  const s = await e.svg({ mainContent: o });
  return console.info("MasaxTypst: SVG compilation complete."), Array.isArray(s) ? s.join("") : s || "";
}
class F {
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
    console.info("MasaxTypst: Resolving template with data...");
    const o = C.resolve(e, t);
    return console.info("MasaxTypst: Template resolved. Starting PDF compilation..."), await H(o, this.extraFonts);
  }
  /**
   * Generates an array of SVG strings for live preview
   * @param {Object} data - Context data to resolve the template
   * @returns {Promise<Array<string>>}
   */
  async generateSVG(t = {}) {
    const e = this._getTemplate();
    console.info("MasaxTypst: Resolving template with data...");
    const o = C.resolve(e, t);
    return console.info("MasaxTypst: Template resolved. Starting SVG compilation..."), await A(o, this.extraFonts);
  }
}
class x {
  /**
   * @param {HTMLElement} parentElement 
   * @param {string} initialContent 
   * @param {Function} onChangeCallback 
   */
  constructor(t, e = "", o = null) {
    this.onChange = o;
    const s = _.create({
      doc: e,
      extensions: [
        P,
        // Lắng nghe sự thay đổi của document
        g.updateListener.of((r) => {
          r.docChanged && this.onChange && this.onChange(r.state.doc.toString());
        })
      ]
    });
    this.view = new g({
      state: s,
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
class I {
  /**
   * @param {HTMLElement} parentElement 
   */
  constructor(t) {
    this.parentElement = t, this.generator = new F();
  }
  /**
   * Renders SVG preview from Typst template and JSON Data.
   * @param {string} template 
   * @param {Object} data 
   */
  async renderPreview(t, e = {}) {
    try {
      this.generator.loadBlueprint({ typstTemplate: t });
      const o = await this.generator.generateSVG(e), s = this._sanitizeSvg(o);
      this.parentElement.innerHTML = s, this.parentElement.querySelectorAll("svg").forEach((i) => {
        i.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", i.style.marginBottom = "20px", i.style.backgroundColor = "#fff";
      });
    } catch (o) {
      console.error("MasaxTypst: Preview Render Error:", o);
      const s = document.createElement("div");
      s.style.cssText = "color:#721c24;background-color:#f8d7da;padding:1rem;border:1px solid #f5c6cb;border-radius:4px;font-family:sans-serif;";
      const r = document.createElement("strong");
      r.textContent = "Error rendering preview:";
      const i = document.createElement("pre");
      i.style.cssText = "white-space:pre-wrap;margin-top:10px;", i.textContent = o.message, s.appendChild(r), s.appendChild(document.createElement("br")), s.appendChild(i), this.parentElement.innerHTML = "", this.parentElement.appendChild(s);
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
      Array.from(o.attributes).forEach((s) => {
        s.name.startsWith("on") && o.removeAttribute(s.name);
      });
    }), e.body.querySelector("div").innerHTML;
  }
  destroy() {
    this.parentElement.innerHTML = "";
  }
}
class V {
  /**
   * @param {HTMLElement} containerElement 
   * @param {Object} options Options: { initialTemplate, initialData, onStatusChange }
   */
  constructor(t, e = {}) {
    this.container = t, this.data = e.initialData || {}, this.template = e.initialTemplate || `#set page(width: "a4", height: "a4")

= Hello World
`, this.onStatusChange = e.onStatusChange || null, this._setupDOM(), this._setupConsole(), this.preview = new I(this.previewContainer);
    let o;
    const s = JSON.stringify(this.data, null, 2);
    this.jsonEditor = new x(this.jsonEditorContainer, s, (i) => {
      clearTimeout(o), o = setTimeout(() => {
        try {
          this.data = JSON.parse(i), this.preview.renderPreview(this.template, this.data);
        } catch (p) {
          console.error("MasaxTypst: Invalid JSON format", p.message);
        }
      }, 500);
    });
    let r;
    this.typstEditor = new x(this.typstEditorContainer, this.template, (i) => {
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
    const t = this._originalConsole.log, e = this._originalConsole.warn, o = this._originalConsole.error, s = this._originalConsole.info, r = (i, p) => {
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
      s.apply(console, i), r("info", i);
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
  F as MasaxTypstPDF,
  V as MasaxWorkspace,
  D as TemplateResolver,
  x as TypstEditor,
  I as TypstPreview,
  z as clearPreloadedAssets,
  H as compileTypstToPdf,
  A as compileTypstToSvg,
  C as defaultResolver,
  w as getDefaultResolver,
  E as initCompiler,
  L as preloadAsset
};

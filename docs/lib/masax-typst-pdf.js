import S from "handlebars";
import { EditorState as T } from "@codemirror/state";
import { EditorView as u } from "@codemirror/view";
import { basicSetup as _ } from "codemirror";
class M {
  constructor() {
    this.handlebars = S.create(), this.registerDefaultHelpers();
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
      return this.handlebars.compile(t, { noEscape: !0 })(e);
    } catch (r) {
      throw console.error("MasaxTypst: Handlebars Compilation Error:", r), r;
    }
  }
}
const w = new M();
let g = !1, m = null;
const P = "https://cdn.jsdelivr.net/npm", W = "0.7.0-rc2";
function d(o, t) {
  return window.location.protocol !== "file:" && !window.location.href.includes("localhost") && !window.location.href.includes("127.0.0.1") ? `${P}/${o}@${W}/${t}` : `/node_modules/${o}/${t}`;
}
async function v(o) {
  const t = await fetch(o);
  if (!t.ok) throw new Error(`Failed to fetch WASM: ${o}`);
  return await t.arrayBuffer();
}
async function D() {
  const o = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer.mjs"), t = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer_bg.wasm"), e = await import(
    /* @vite-ignore */
    o
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (r, n) => await v(t)), e.default && await e.default(), e;
}
async function $() {
  const o = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler.mjs"), t = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler_bg.wasm"), e = await import(
    /* @vite-ignore */
    o
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (r, n) => await v(t)), e.default && await e.default(), e;
}
async function x() {
  if (!g)
    try {
      const [o, t] = await Promise.all([
        D(),
        $()
      ]);
      m = (await import(d("@myriaddreamin/typst.ts", "dist/esm/contrib/snippet.mjs"))).$typst, g = !0, console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (o) {
      throw console.error("MasaxTypst: Failed to init compiler:", o), o;
    }
}
function y() {
  if (!m) throw new Error("Typst not initialized. Call initCompiler() first.");
  return m;
}
const h = /* @__PURE__ */ new Map();
function I(o, t) {
  h.set(o, t);
}
function z() {
  h.clear();
}
async function E(o) {
  const t = y(), e = /#image\(\s*"([^"]+)"/g;
  let r, n = o;
  for (; (r = e.exec(o)) !== null; ) {
    const s = r[1], p = `/assets/${s.split("/").pop().replace(/[^a-zA-Z0-9.-]/g, "_") || `image_${Date.now()}.png`}`;
    if (h.has(s)) {
      console.log("MasaxTypst: Using preloaded asset ->", s), await t.mapShadow(p, h.get(s)), n = n.replaceAll(`"${s}"`, `"${p}"`);
      continue;
    }
    let a = s;
    if (!a.startsWith("http"))
      try {
        a = new URL(s, window.location.href).href;
      } catch {
        a = s;
      }
    try {
      console.log("MasaxTypst: Fetching asset ->", a);
      let l;
      if (a.startsWith(window.location.origin) || !a.startsWith("http"))
        l = await fetch(a);
      else {
        const c = `https://api.allorigins.win/raw?url=${encodeURIComponent(a)}`;
        l = await fetch(c);
      }
      if (l.ok) {
        const c = await l.arrayBuffer(), f = new Uint8Array(c);
        await t.mapShadow(p, f), n = n.replaceAll(`"${s}"`, `"${p}"`);
      } else
        console.warn(`MasaxTypst: Missing image at: ${a}`), n = n.replaceAll(`"${s}"`, '""');
    } catch (l) {
      console.error(`MasaxTypst: Failed to fetch image ${a}`, l), n = n.replaceAll(`"${s}"`, '""');
    }
  }
  return n;
}
async function b(o) {
  if (!o || o.length === 0) return;
  const t = y();
  for (const e of o)
    e.path && e.data && await t.mapShadow(e.path, e.data);
}
async function k(o, t = []) {
  await x();
  const e = y();
  await b(t);
  const r = await E(o), n = await e.pdf({ mainContent: r });
  return new Blob([n], { type: "application/pdf" });
}
async function B(o, t = []) {
  await x();
  const e = y();
  await b(t);
  const r = await E(o), n = await e.svg({ mainContent: r });
  return Array.isArray(n) ? n.join("") : n || "";
}
class A {
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
    const e = this._getTemplate(), r = w.resolve(e, t);
    return await k(r, this.extraFonts);
  }
  /**
   * Generates an array of SVG strings for live preview
   * @param {Object} data - Context data to resolve the template
   * @returns {Promise<Array<string>>}
   */
  async generateSVG(t = {}) {
    const e = this._getTemplate(), r = w.resolve(e, t);
    return await B(r, this.extraFonts);
  }
}
class C {
  /**
   * @param {HTMLElement} parentElement 
   * @param {string} initialContent 
   * @param {Function} onChangeCallback 
   */
  constructor(t, e = "", r = null) {
    this.onChange = r;
    const n = T.create({
      doc: e,
      extensions: [
        _,
        // Lắng nghe sự thay đổi của document
        u.updateListener.of((s) => {
          s.docChanged && this.onChange && this.onChange(s.state.doc.toString());
        })
      ]
    });
    this.view = new u({
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
class H {
  /**
   * @param {HTMLElement} parentElement 
   */
  constructor(t) {
    this.parentElement = t, this.generator = new A();
  }
  /**
   * Renders SVG preview from Typst template and JSON Data.
   * @param {string} template 
   * @param {Object} data 
   */
  async renderPreview(t, e = {}) {
    try {
      this.generator.loadBlueprint({ typstTemplate: t });
      const r = await this.generator.generateSVG(e), n = this._sanitizeSvg(r);
      this.parentElement.innerHTML = n, this.parentElement.querySelectorAll("svg").forEach((i) => {
        i.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", i.style.marginBottom = "20px", i.style.backgroundColor = "#fff";
      });
    } catch (r) {
      console.error("MasaxTypst: Preview Render Error:", r);
      const n = document.createElement("div");
      n.style.cssText = "color:#721c24;background-color:#f8d7da;padding:1rem;border:1px solid #f5c6cb;border-radius:4px;font-family:sans-serif;";
      const s = document.createElement("strong");
      s.textContent = "Error rendering preview:";
      const i = document.createElement("pre");
      i.style.cssText = "white-space:pre-wrap;margin-top:10px;", i.textContent = r.message, n.appendChild(s), n.appendChild(document.createElement("br")), n.appendChild(i), this.parentElement.innerHTML = "", this.parentElement.appendChild(n);
    }
  }
  /**
   * Loại bỏ <script> và on* attributes trong SVG content để tránh XSS
   * @param {string} svgString
   * @returns {string}
   */
  _sanitizeSvg(t) {
    const e = new DOMParser().parseFromString(`<div>${t}</div>`, "text/html");
    return e.querySelectorAll("script").forEach((r) => r.remove()), e.querySelectorAll("*").forEach((r) => {
      Array.from(r.attributes).forEach((n) => {
        n.name.startsWith("on") && r.removeAttribute(n.name);
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
`, this.onStatusChange = e.onStatusChange || null, this._setupDOM(), this._setupConsole(), this.preview = new H(this.previewContainer);
    let r;
    const n = JSON.stringify(this.data, null, 2);
    this.jsonEditor = new C(this.jsonEditorContainer, n, (i) => {
      clearTimeout(r), r = setTimeout(() => {
        try {
          this.data = JSON.parse(i), this.preview.renderPreview(this.template, this.data);
        } catch (p) {
          console.error("MasaxTypst: Invalid JSON format", p.message);
        }
      }, 500);
    });
    let s;
    this.typstEditor = new C(this.typstEditorContainer, this.template, (i) => {
      this.template = i, clearTimeout(s), s = setTimeout(() => {
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
    const t = this._originalConsole.log, e = this._originalConsole.warn, r = this._originalConsole.error, n = this._originalConsole.info, s = (i, p) => {
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
      t.apply(console, i), s("log", i);
    }, console.warn = (...i) => {
      e.apply(console, i), s("warn", i);
    }, console.error = (...i) => {
      r.apply(console, i), s("error", i);
    }, console.info = (...i) => {
      n.apply(console, i), s("info", i);
    };
  }
  _setupDOM() {
    this.container.style.display = "flex", this.container.style.width = "100%", this.container.style.height = "100vh", this.container.style.fontFamily = "system-ui, -apple-system, sans-serif", this.container.style.overflow = "hidden", this.leftPane = document.createElement("div"), this.leftPane.style.flex = "1", this.leftPane.style.display = "flex", this.leftPane.style.flexDirection = "column", this.leftPane.style.borderRight = "1px solid #ddd", this.typstEditorContainer = document.createElement("div"), this.typstEditorContainer.style.flex = "1", this.typstEditorContainer.style.overflow = "auto", this.typstEditorContainer.style.borderBottom = "1px solid #ddd", this.typstEditorContainer.style.position = "relative";
    const t = document.createElement("div");
    t.textContent = "Typst Code", t.style.padding = "4px 8px", t.style.background = "#f8f9fa", t.style.fontSize = "12px", t.style.fontWeight = "bold", t.style.borderBottom = "1px solid #ddd", t.style.position = "sticky", t.style.top = "0", t.style.zIndex = "10", this.typstEditorContainer.appendChild(t), this.jsonEditorContainer = document.createElement("div"), this.jsonEditorContainer.style.flex = "1", this.jsonEditorContainer.style.overflow = "auto", this.jsonEditorContainer.style.position = "relative";
    const e = document.createElement("div");
    e.textContent = "JSON Data", e.style.padding = "4px 8px", e.style.background = "#f8f9fa", e.style.fontSize = "12px", e.style.fontWeight = "bold", e.style.borderBottom = "1px solid #ddd", e.style.position = "sticky", e.style.top = "0", e.style.zIndex = "10", this.jsonEditorContainer.appendChild(e), this.leftPane.appendChild(this.typstEditorContainer), this.leftPane.appendChild(this.jsonEditorContainer), this.rightPane = document.createElement("div"), this.rightPane.style.flex = "1", this.rightPane.style.display = "flex", this.rightPane.style.flexDirection = "column", this.previewContainerWrapper = document.createElement("div"), this.previewContainerWrapper.style.flex = "2", this.previewContainerWrapper.style.overflow = "auto", this.previewContainerWrapper.style.backgroundColor = "#f5f5f5", this.previewContainerWrapper.style.borderBottom = "1px solid #ddd", this.previewContainer = document.createElement("div"), this.previewContainer.style.padding = "40px 20px", this.previewContainer.style.display = "flex", this.previewContainer.style.flexDirection = "column", this.previewContainer.style.alignItems = "center", this.previewContainerWrapper.appendChild(this.previewContainer), this.consoleContainer = document.createElement("div"), this.consoleContainer.style.flex = "1", this.consoleContainer.style.overflow = "auto", this.consoleContainer.style.backgroundColor = "#fafafa", this.consoleContainer.style.position = "relative";
    const r = document.createElement("div");
    r.textContent = "Console Realtime", r.style.padding = "4px 8px", r.style.background = "#e9ecef", r.style.fontSize = "12px", r.style.fontWeight = "bold", r.style.borderBottom = "1px solid #ddd", r.style.position = "sticky", r.style.top = "0", this.consoleContainer.appendChild(r), this.rightPane.appendChild(this.previewContainerWrapper), this.rightPane.appendChild(this.consoleContainer), this.container.appendChild(this.leftPane), this.container.appendChild(this.rightPane);
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
  A as MasaxTypstPDF,
  L as MasaxWorkspace,
  M as TemplateResolver,
  C as TypstEditor,
  H as TypstPreview,
  z as clearPreloadedAssets,
  w as defaultResolver,
  x as initCompiler,
  I as preloadAsset
};

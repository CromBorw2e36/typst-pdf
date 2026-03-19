import { EditorState as S } from "@codemirror/state";
import { EditorView as g } from "@codemirror/view";
import { basicSetup as M } from "codemirror";
function b(s, t) {
  const o = (typeof t == "string" ? t : JSON.stringify(t)).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return s.replace("{{DATA}}", o);
}
class P {
  resolve(t, e) {
    return b(t, e);
  }
}
const u = new P();
let w = !1, f = null;
const _ = "https://cdn.jsdelivr.net/npm", $ = "0.7.0-rc2";
function d(s, t) {
  try {
  } catch {
  }
  return `${_}/${s}@${$}/${t}`;
}
async function x(s) {
  const t = await fetch(s);
  if (!t.ok) throw new Error(`Failed to fetch WASM: ${s}`);
  return await t.arrayBuffer();
}
async function k() {
  const s = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer.mjs"), t = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer_bg.wasm"), e = await import(
    /* @vite-ignore */
    s
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (o, n) => await x(t)), e.default && await e.default(), e;
}
async function A() {
  const s = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler.mjs"), t = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler_bg.wasm"), e = await import(
    /* @vite-ignore */
    s
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (o, n) => await x(t)), e.default && await e.default(), e;
}
async function v() {
  if (!w)
    try {
      const [s, t] = await Promise.all([
        k(),
        A()
      ]);
      f = (await import(d("@myriaddreamin/typst.ts", "dist/esm/contrib/snippet.mjs"))).$typst, w = !0, console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (s) {
      throw console.error("MasaxTypst: Failed to init compiler:", s), s;
    }
}
function y() {
  if (!f) throw new Error("Typst not initialized. Call initCompiler() first.");
  return f;
}
const h = /* @__PURE__ */ new Map();
function U(s, t) {
  h.set(s, t);
}
function z() {
  h.clear();
}
async function T(s) {
  const t = y(), e = /#image\(\s*"([^"]+)"/g;
  let o, n = s;
  for (console.info("MasaxTypst: Resolving images..."); (o = e.exec(s)) !== null; ) {
    const i = o[1], c = `/assets/${i.split("/").pop().replace(/[^a-zA-Z0-9.-]/g, "_") || `image_${Date.now()}.png`}`;
    if (h.has(i)) {
      console.log("MasaxTypst: Using preloaded asset ->", i), await t.mapShadow(c, h.get(i)), n = n.replaceAll(`"${i}"`, `"${c}"`);
      continue;
    }
    let r = i;
    if (!r.startsWith("http"))
      try {
        r = new URL(i, window.location.href).href;
      } catch {
        r = i;
      }
    try {
      let l;
      if (r.startsWith(window.location.origin) || !r.startsWith("http"))
        console.log("MasaxTypst: Fetching local asset ->", r), l = await fetch(r);
      else {
        const p = `https://api.allorigins.win/raw?url=${encodeURIComponent(r)}`;
        console.log("MasaxTypst: Fetching external asset via CORS proxy ->", r), l = await fetch(p);
      }
      if (l.ok) {
        const p = await l.arrayBuffer(), m = new Uint8Array(p);
        await t.mapShadow(c, m), n = n.replaceAll(`"${i}"`, `"${c}"`), console.log("MasaxTypst: Image loaded ->", i, `(${m.byteLength} bytes)`);
      } else
        console.warn(`MasaxTypst: Image fetch failed [HTTP ${l.status}] ${r}`), n = n.replaceAll(`"${i}"`, '""');
    } catch (l) {
      console.error(`MasaxTypst: Image fetch error -> ${r}:`, l.message || l), n = n.replaceAll(`"${i}"`, '""');
    }
  }
  return console.info("MasaxTypst: Image resolution complete."), n;
}
async function E(s) {
  if (!s || s.length === 0) return;
  const t = y();
  for (const e of s)
    e.path && e.data && await t.mapShadow(e.path, e.data);
}
async function D(s, t = []) {
  await v();
  const e = y();
  await E(t);
  let o;
  try {
    o = await T(s);
  } catch (i) {
    console.warn("MasaxTypst: Image resolution failed, compiling without images.", i.message || i), o = s;
  }
  console.info("MasaxTypst: Compiling Typst → PDF...");
  const n = await e.pdf({ mainContent: o });
  return console.info("MasaxTypst: PDF compilation complete."), new Blob([n], { type: "application/pdf" });
}
async function W(s, t = []) {
  await v();
  const e = y();
  await E(t);
  let o;
  try {
    o = await T(s);
  } catch (a) {
    console.warn("MasaxTypst: Image resolution failed, compiling without images.", a.message || a), o = s;
  }
  console.info("MasaxTypst: Compiling Typst → SVG...");
  const n = await e.svg({ mainContent: o }), i = Array.isArray(n) ? n : [n || ""];
  return console.info(`MasaxTypst: SVG compilation complete. ${i.length} page(s).`), i;
}
class B {
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
    const o = u.resolve(e, t);
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
    const o = u.resolve(e, t);
    return console.info("MasaxTypst: Data injected. Starting SVG compilation..."), await W(o, this.extraFonts);
  }
}
class C {
  /**
   * @param {HTMLElement} parentElement 
   * @param {string} initialContent 
   * @param {Function} onChangeCallback 
   */
  constructor(t, e = "", o = null) {
    this.onChange = o;
    const n = S.create({
      doc: e,
      extensions: [
        M,
        // Lắng nghe sự thay đổi của document
        g.updateListener.of((i) => {
          i.docChanged && this.onChange && this.onChange(i.state.doc.toString());
        })
      ]
    });
    this.view = new g({
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
class F {
  /**
   * @param {HTMLElement} parentElement 
   */
  constructor(t) {
    this.parentElement = t, this.generator = new B();
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
      n.forEach((i, a) => {
        const c = this._sanitizeSvg(i), r = document.createElement("div");
        r.style.cssText = "position:relative; margin-bottom:24px;", r.innerHTML = c;
        const l = r.querySelector("svg");
        l && (l.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", l.style.backgroundColor = "#fff", l.style.display = "block");
        const p = document.createElement("div");
        p.textContent = `Page ${a + 1} / ${n.length}`, p.style.cssText = "text-align:center; font-size:0.75rem; color:#888; margin-top:4px; margin-bottom:8px;", r.appendChild(p), this.parentElement.appendChild(r);
      });
    } catch (o) {
      console.error("MasaxTypst: Preview Render Error:", o);
      const n = document.createElement("div");
      n.style.cssText = "color:#721c24;background-color:#f8d7da;padding:1rem;border:1px solid #f5c6cb;border-radius:4px;font-family:sans-serif;";
      const i = document.createElement("strong");
      i.textContent = "Error rendering preview:";
      const a = document.createElement("pre");
      a.style.cssText = "white-space:pre-wrap;margin-top:10px;", a.textContent = o.message, n.appendChild(i), n.appendChild(document.createElement("br")), n.appendChild(a), this.parentElement.innerHTML = "", this.parentElement.appendChild(n);
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
class H {
  /**
   * @param {HTMLElement} containerElement 
   * @param {Object} options Options: { initialTemplate, initialData, onStatusChange }
   */
  constructor(t, e = {}) {
    this.container = t, this.data = e.initialData || {}, this.template = e.initialTemplate || `#set page(width: "a4", height: "a4")

= Hello World
`, this.onStatusChange = e.onStatusChange || null, this._setupDOM(), this._setupConsole(), this.preview = new F(this.previewContainer);
    let o;
    const n = JSON.stringify(this.data, null, 2);
    this.jsonEditor = new C(this.jsonEditorContainer, n, (a) => {
      clearTimeout(o), o = setTimeout(() => {
        try {
          this.data = JSON.parse(a), this.preview.renderPreview(this.template, this.data);
        } catch (c) {
          console.error("MasaxTypst: Invalid JSON format", c.message);
        }
      }, 500);
    });
    let i;
    this.typstEditor = new C(this.typstEditorContainer, this.template, (a) => {
      this.template = a, clearTimeout(i), i = setTimeout(() => {
        this.preview.renderPreview(a, this.data);
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
    const t = this._originalConsole.log, e = this._originalConsole.warn, o = this._originalConsole.error, n = this._originalConsole.info, i = (a, c) => {
      const r = document.createElement("div");
      r.style.padding = "4px 8px", r.style.borderBottom = "1px solid #ddd", r.style.fontFamily = "monospace", r.style.fontSize = "12px", r.style.wordBreak = "break-all", a === "error" ? (r.style.color = "#721c24", r.style.backgroundColor = "#f8d7da") : a === "warn" ? (r.style.color = "#856404", r.style.backgroundColor = "#fff3cd") : a === "info" ? (r.style.color = "#004085", r.style.backgroundColor = "#cce5ff") : r.style.color = "#333";
      const l = (p) => {
        if (typeof p == "object")
          try {
            return JSON.stringify(p);
          } catch {
            return Object.prototype.toString.call(p);
          }
        return String(p);
      };
      r.textContent = `[${a.toUpperCase()}] ` + Array.from(c).map(l).join(" "), this.consoleContainer.appendChild(r), this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
    };
    console.log = (...a) => {
      t.apply(console, a), i("log", a);
    }, console.warn = (...a) => {
      e.apply(console, a), i("warn", a);
    }, console.error = (...a) => {
      o.apply(console, a), i("error", a);
    }, console.info = (...a) => {
      n.apply(console, a), i("info", a);
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
  B as MasaxTypstPDF,
  H as MasaxWorkspace,
  P as TemplateResolver,
  C as TypstEditor,
  F as TypstPreview,
  z as clearPreloadedAssets,
  D as compileTypstToPdf,
  W as compileTypstToSvg,
  u as defaultResolver,
  v as initCompiler,
  b as injectData,
  U as preloadAsset
};

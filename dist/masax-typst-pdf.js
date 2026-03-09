import E from "handlebars";
import { EditorState as b } from "@codemirror/state";
import { EditorView as f } from "@codemirror/view";
import { basicSetup as T } from "codemirror";
class P {
  constructor() {
    this.handlebars = E.create(), this.registerDefaultHelpers();
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
const u = new P();
let w = !1, h = null;
const S = "https://cdn.jsdelivr.net/npm", M = "0.7.0-rc2";
function d(n, t) {
  return window.location.protocol !== "file:" && !window.location.href.includes("localhost") && !window.location.href.includes("127.0.0.1") ? `${S}/${n}@${M}/${t}` : `/node_modules/${n}/${t}`;
}
async function C(n) {
  const t = await fetch(n);
  if (!t.ok) throw new Error(`Failed to fetch WASM: ${n}`);
  return await t.arrayBuffer();
}
async function _() {
  const n = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer.js"), t = d("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer_bg.wasm"), e = await import(
    /* @vite-ignore */
    n
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (r, a) => await C(t)), e.default && await e.default(), e;
}
async function W() {
  const n = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler.js"), t = d("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler_bg.wasm"), e = await import(
    /* @vite-ignore */
    n
  );
  return e.setImportWasmModule && e.setImportWasmModule(async (r, a) => await C(t)), e.default && await e.default(), e;
}
async function v() {
  if (!w)
    try {
      const [n, t] = await Promise.all([
        _(),
        W()
      ]);
      h = (await import(d("@myriaddreamin/typst.ts", "dist/esm/contrib/snippet.js"))).$typst, w = !0, console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (n) {
      throw console.error("MasaxTypst: Failed to init compiler:", n), n;
    }
}
function y() {
  if (!h) throw new Error("Typst not initialized. Call initCompiler() first.");
  return h;
}
async function x(n) {
  const t = y(), e = /#image\(\s*"([^"]+)"/g;
  let r, a = n;
  for (; (r = e.exec(n)) !== null; ) {
    const i = r[1];
    let s = i;
    if (!s.startsWith("http"))
      try {
        s = new URL(i, window.location.href).href;
      } catch {
        s = i;
      }
    const o = `/assets/${i.split("/").pop().replace(/[^a-zA-Z0-9.-]/g, "_") || `image_${Date.now()}.png`}`;
    try {
      console.log("MasaxTypst: Fetching asset ->", s);
      let l;
      if (s.startsWith(window.location.origin) || !s.startsWith("http"))
        l = await fetch(s);
      else {
        const p = `https://api.allorigins.win/raw?url=${encodeURIComponent(s)}`;
        l = await fetch(p);
      }
      if (l.ok) {
        const p = await l.arrayBuffer(), m = new Uint8Array(p);
        await t.mapShadow(o, m), a = a.replaceAll(`"${i}"`, `"${o}"`);
      } else
        console.warn(`MasaxTypst: Missing image at: ${s}`), a = a.replaceAll(`"${i}"`, '""');
    } catch (l) {
      console.error(`MasaxTypst: Failed to fetch image ${s}`, l), a = a.replaceAll(`"${i}"`, '""');
    }
  }
  return a;
}
async function B(n) {
  await v();
  const t = y(), e = await x(n), r = await t.pdf({ mainContent: e });
  return new Blob([r], { type: "application/pdf" });
}
async function D(n) {
  await v();
  const t = y(), e = await x(n), r = await t.svg({ mainContent: e });
  return Array.isArray(r) ? r.join("") : r || "";
}
class k {
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
    const e = this._getTemplate(), r = u.resolve(e, t);
    return await B(r, this.extraFonts);
  }
  /**
   * Generates an array of SVG strings for live preview
   * @param {Object} data - Context data to resolve the template
   * @returns {Promise<Array<string>>}
   */
  async generateSVG(t = {}) {
    const e = this._getTemplate(), r = u.resolve(e, t);
    return await D(r, this.extraFonts);
  }
}
class g {
  /**
   * @param {HTMLElement} parentElement 
   * @param {string} initialContent 
   * @param {Function} onChangeCallback 
   */
  constructor(t, e = "", r = null) {
    this.onChange = r;
    const a = b.create({
      doc: e,
      extensions: [
        T,
        // Lắng nghe sự thay đổi của document
        f.updateListener.of((i) => {
          i.docChanged && this.onChange && this.onChange(i.state.doc.toString());
        })
      ]
    });
    this.view = new f({
      state: a,
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
}
class $ {
  /**
   * @param {HTMLElement} parentElement 
   */
  constructor(t) {
    this.parentElement = t, this.generator = new k();
  }
  /**
   * Renders SVG preview from Typst template and JSON Data.
   * @param {string} template 
   * @param {Object} data 
   */
  async renderPreview(t, e = {}) {
    try {
      this.generator.loadBlueprint({ typstTemplate: t });
      const r = await this.generator.generateSVG(e);
      this.parentElement.innerHTML = r, this.parentElement.querySelectorAll("svg").forEach((i) => {
        i.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", i.style.marginBottom = "20px", i.style.backgroundColor = "#fff";
      });
    } catch (r) {
      console.error("MasaxTypst: Preview Render Error:", r), this.parentElement.innerHTML = `
                <div style="color: #721c24; background-color: #f8d7da; padding: 1rem; border: 1px solid #f5c6cb; border-radius: 4px; font-family: sans-serif;">
                    <strong>Error rendering preview:</strong><br/>
                    <pre style="white-space: pre-wrap; margin-top: 10px;">${r.message}</pre>
                </div>
            `;
    }
  }
}
class N {
  /**
   * @param {HTMLElement} containerElement 
   * @param {Object} options Options: { initialTemplate, initialData }
   */
  constructor(t, e = {}) {
    this.container = t, this.data = e.initialData || {}, this.template = e.initialTemplate || `#set page(width: "a4", height: "a4")

= Hello World
`, this._setupDOM(), this._setupConsole(), this.preview = new $(this.previewContainer);
    let r;
    const a = JSON.stringify(this.data, null, 2);
    this.jsonEditor = new g(this.jsonEditorContainer, a, (s) => {
      clearTimeout(r), r = setTimeout(() => {
        try {
          this.data = JSON.parse(s), this.preview.renderPreview(this.template, this.data);
        } catch (c) {
          console.error("MasaxTypst: Invalid JSON format", c.message);
        }
      }, 500);
    });
    let i;
    this.typstEditor = new g(this.typstEditorContainer, this.template, (s) => {
      this.template = s, clearTimeout(i), i = setTimeout(() => {
        this.preview.renderPreview(s, this.data);
      }, 500);
    }), this.preview.renderPreview(this.template, this.data);
  }
  _setupConsole() {
    const t = console.log, e = console.warn, r = console.error, a = console.info, i = (s, c) => {
      const o = document.createElement("div");
      o.style.padding = "4px 8px", o.style.borderBottom = "1px solid #ddd", o.style.fontFamily = "monospace", o.style.fontSize = "12px", o.style.wordBreak = "break-all", s === "error" ? (o.style.color = "#721c24", o.style.backgroundColor = "#f8d7da") : s === "warn" ? (o.style.color = "#856404", o.style.backgroundColor = "#fff3cd") : s === "info" ? (o.style.color = "#004085", o.style.backgroundColor = "#cce5ff") : o.style.color = "#333";
      const l = (p) => {
        if (typeof p == "object")
          try {
            return JSON.stringify(p);
          } catch {
            return Object.prototype.toString.call(p);
          }
        return String(p);
      };
      o.textContent = `[${s.toUpperCase()}] ` + Array.from(c).map(l).join(" "), this.consoleContainer.appendChild(o), this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
    };
    console.log = (...s) => {
      t.apply(console, s), i("log", s);
    }, console.warn = (...s) => {
      e.apply(console, s), i("warn", s);
    }, console.error = (...s) => {
      r.apply(console, s), i("error", s);
    }, console.info = (...s) => {
      a.apply(console, s), i("info", s);
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
  k as MasaxTypstPDF,
  N as MasaxWorkspace,
  P as TemplateResolver,
  g as TypstEditor,
  $ as TypstPreview,
  u as defaultResolver,
  v as initCompiler
};

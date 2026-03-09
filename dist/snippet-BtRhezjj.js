const b = [
  "DejaVuSansMono-Bold.ttf",
  "DejaVuSansMono-BoldOblique.ttf",
  "DejaVuSansMono-Oblique.ttf",
  "DejaVuSansMono.ttf",
  "LibertinusSerif-Bold.otf",
  "LibertinusSerif-BoldItalic.otf",
  "LibertinusSerif-Italic.otf",
  "LibertinusSerif-Regular.otf",
  "LibertinusSerif-Semibold.otf",
  "LibertinusSerif-SemiboldItalic.otf",
  "NewCM10-Bold.otf",
  "NewCM10-BoldItalic.otf",
  "NewCM10-Italic.otf",
  "NewCM10-Regular.otf",
  "NewCMMath-Bold.otf",
  "NewCMMath-Book.otf",
  "NewCMMath-Regular.otf"
], F = [
  "InriaSerif-Bold.ttf",
  "InriaSerif-BoldItalic.ttf",
  "InriaSerif-Italic.ttf",
  "InriaSerif-Regular.ttf",
  "Roboto-Regular.ttf",
  "NotoSerifCJKsc-Regular.otf"
], C = ["TwitterColorEmoji.ttf", "NotoColorEmoji-Regular-COLR.subset.ttf"];
function k() {
  return m([], { assets: !1 });
}
function S(i) {
  return m([], i);
}
function M(i) {
  const e = [];
  if (i && i?.assets !== !1 && i?.assets?.length && i?.assets?.length > 0) {
    let t = {
      text: "https://cdn.jsdelivr.net/gh/typst/typst-assets@v0.13.1/files/fonts/",
      _: "https://cdn.jsdelivr.net/gh/typst/typst-dev-assets@v0.13.1/files/fonts/"
    }, r = i.assetUrlPrefix ?? t;
    typeof r == "string" ? r = { _: r } : r = { ...t, ...r };
    for (const n of Object.keys(r)) {
      const o = r[n];
      o[o.length - 1] !== "/" && (r[n] = o + "/");
    }
    const s = (n, o) => o.map((a) => (r[n] || r._) + a);
    for (const n of i.assets)
      switch (n) {
        case "text":
          e.push(...s(n, b));
          break;
        case "cjk":
          e.push(...s(n, F));
          break;
        case "emoji":
          e.push(...s(n, C));
          break;
      }
  }
  return e;
}
function m(i, e) {
  const t = M(e), r = async (s, { ref: n, builder: o }) => {
    e?.fetcher && n.setFetcher(e.fetcher), await n.loadFonts(o, [...i, ...t]);
  };
  return r._preloadRemoteFontOptions = e, r._kind = "fontLoader", r;
}
function p(i) {
  return async (e, { builder: t }) => new Promise((r) => {
    t.set_package_registry(i, function(s) {
      return i.resolve(s, this);
    }), r();
  });
}
function w(i) {
  return async (e, t) => {
    if (t.alreadySetAccessModel)
      throw new Error(`already set some assess model before: ${t.alreadySetAccessModel.constructor?.name}(${t.alreadySetAccessModel})`);
    return t.alreadySetAccessModel = i, new Promise((r) => {
      t.builder.set_access_model(i, (s) => {
        const n = i.getMTime(s);
        return n ? n.getTime() : 0;
      }, (s) => i.isFile(s) || !1, (s) => i.getRealPath(s) || s, (s) => i.readAll(s)), r();
    });
  };
}
function O(i) {
  return () => {
    const e = new XMLHttpRequest();
    return e.overrideMimeType("text/plain; charset=x-user-defined"), e.open("GET", i.url, !1), e.send(null), e.status === 200 && (e.response instanceof String || typeof e.response == "string") ? Uint8Array.from(e.response, (t) => t.charCodeAt(0)) : new Uint8Array();
  };
}
class g {
  mTimes = /* @__PURE__ */ new Map();
  mData = /* @__PURE__ */ new Map();
  constructor() {
  }
  reset() {
    this.mTimes.clear(), this.mData.clear();
  }
  insertFile(e, t, r) {
    this.mTimes.set(e, r), this.mData.set(e, t);
  }
  removeFile(e) {
    this.mTimes.delete(e), this.mData.delete(e);
  }
  getMTime(e) {
    if (e.startsWith("/@memory/") && this.mTimes.has(e))
      return this.mTimes.get(e);
  }
  isFile() {
    return !0;
  }
  getRealPath(e) {
    return e;
  }
  readAll(e) {
    if (e.startsWith("/@memory/") && this.mData.has(e))
      return this.mData.get(e);
  }
}
class v {
  am;
  cache = /* @__PURE__ */ new Map();
  constructor(e) {
    this.am = e;
  }
  resolvePath(e) {
    return `https://packages.typst.org/preview/${e.name}-${e.version}.tar.gz`;
  }
  pullPackageData(e) {
    const t = new XMLHttpRequest();
    if (t.overrideMimeType("text/plain; charset=x-user-defined"), t.open("GET", this.resolvePath(e), !1), t.send(null), t.status === 200 && (t.response instanceof String || typeof t.response == "string"))
      return Uint8Array.from(t.response, (r) => r.charCodeAt(0));
  }
  resolve(e, t) {
    if (e.namespace !== "preview")
      return;
    const r = this.resolvePath(e);
    if (this.cache.has(r))
      return this.cache.get(r)();
    const s = this.pullPackageData(e);
    if (!s)
      return;
    const n = `/@memory/fetch/packages/${e.namespace}/${e.name}/${e.version}`, o = [];
    t.untar(s, (l, u, d) => {
      o.push([n + "/" + l, u, new Date(d)]);
    });
    const a = () => {
      for (const [l, u, d] of o)
        this.am.insertFile(l, u, d);
      return n;
    };
    return this.cache.set(r, a), a();
  }
}
function x(i) {
  return Math.random().toString(36).replace("0.", "");
}
var R;
(function(i) {
  i[i.PIXEL_PER_PT = 3] = "PIXEL_PER_PT";
})(R || (R = {}));
var f;
(function(i) {
  i[i.vector = 0] = "vector", i[i.pdf = 1] = "pdf", i[i._dummy = 2] = "_dummy";
})(f || (f = {}));
const T = (
  // @ts-ignore
  typeof process < "u" && process.versions != null && process.versions.node != null
);
class c {
  /** @internal */
  mainFilePath;
  /** @internal */
  cc;
  /** @internal */
  fr;
  /** @internal */
  ex;
  /**
   * Create a new instance of {@link TypstSnippet}.
   * @param cc the compiler instance, see {@link PromiseJust} and {@link TypstCompiler}.
   * @param ex the renderer instance, see {@link PromiseJust} and {@link TypstRenderer}.
   *
   * @example
   *
   * Passes a global shared compiler instance that get initialized lazily:
   * ```typescript
   * const $typst = new TypstSnippet(() => {
   *  return createGlobalCompiler(createTypstCompiler, initOptions);
   * });
   *
   */
  constructor(e) {
    this.cc = e?.compiler || c.buildLocalCompiler, this.fr = e?.fontResolver || c.buildLocalFontResolver, this.ex = e?.renderer || c.buildLocalRenderer, this.mainFilePath = "/main.typ", this.providers = [];
  }
  /**
   * Set lazy initialized compiler instance for the utility instance.
   * @param cc the compiler instance, see {@link PromiseJust} and {@link TypstCompiler}.
   */
  setCompiler(e) {
    this.cc = e;
  }
  async getFontResolver() {
    return typeof this.fr == "function" ? this.fr = await this.fr() : this.fr;
  }
  /**
   * Get an initialized compiler instance from the utility instance.
   */
  async getCompiler() {
    return typeof this.cc == "function" ? this.cc = await this.cc() : this.cc;
  }
  async getCompilerReset() {
    const e = await this.getCompiler();
    return await e.reset(), e;
  }
  /**
   * Set lazy initialized renderer instance for the utility instance.
   * @param ex the renderer instance, see {@link PromiseJust} and {@link TypstRenderer}.
   */
  setRenderer(e) {
    this.ex = e;
  }
  /**
   * Get an initialized renderer instance from the utility instance.
   */
  async getRenderer() {
    return typeof this.ex == "function" ? this.ex = await this.ex() : this.ex;
  }
  providers;
  /**
   * add providers for bullding the compiler or renderer component.
   */
  use(...e) {
    if (!this.providers)
      throw new Error("already prepare uses for instances");
    this.providers.push(...e);
  }
  /**
   * todo: add docs
   */
  static preloadFontFromUrl(e) {
    return c.preloadFonts([e]);
  }
  /**
   * todo: add docs
   */
  static preloadFontData(e) {
    return c.preloadFonts([e]);
  }
  /**
   * todo: add docs
   */
  static preloadFonts(e) {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [m(e)]
    };
  }
  /**
   * don't load any default font assets.
   * todo: add docs
   */
  static disableDefaultFontAssets() {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [k()]
    };
  }
  /**
   * todo: add docs
   */
  static preloadFontAssets(e) {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [S(e)]
    };
  }
  /**
   * Set accessl model for the compiler instance
   * @example
   *
   * use memory access model
   *
   * ```typescript
   * const m = new MemoryAccessModel();
   * $typst.use(TypstSnippet.withAccessModel(m));
   * ```
   */
  static withAccessModel(e) {
    return {
      key: "access-model",
      forRoles: ["compiler"],
      provides: [w(e)]
    };
  }
  /**
   * Set package registry for the compiler instance
   * @example
   *
   * use a customized package registry
   *
   * ```typescript
   * const n = new NodeFetchPackageRegistry();
   * $typst.use(TypstSnippet.withPackageRegistry(n));
   * ```
   */
  static withPackageRegistry(e) {
    return {
      key: "package-registry",
      forRoles: ["compiler"],
      provides: [p(e)]
    };
  }
  /**
   * Retrieve an access model to store the data of fetched files.
   * Provide a PackageRegistry instance for the compiler instance.
   *
   * @example
   *
   * use default (memory) access model
   *
   * ```typescript
   * $typst.use(await TypstSnippet.fetchPackageRegistry());
   * ```
   *
   * @example
   *
   * use external access model
   *
   * ```typescript
   * const m = new MemoryAccessModel();
   * $typst.use(TypstSnippet.withAccessModel(m), await TypstSnippet.fetchPackageRegistry(m));
   * ```
   */
  static fetchPackageRegistry(e) {
    const t = e || new g(), r = [
      ...e ? [] : [w(t)],
      p(new v(t))
    ];
    return {
      key: "package-registry$fetch",
      forRoles: ["compiler"],
      provides: r
    };
  }
  /**
   * Retrieve a fetcher for fetching package data.
   * Provide a PackageRegistry instance for the compiler instance.
   * @example
   *
   * use a customized fetcher
   *
   * ```typescript
   * import request from 'sync-request-curl';
   * const m = new MemoryAccessModel();
   * $typst.use(TypstSnippet.withAccessModel(m), await TypstSnippet.fetchPackageBy(m, (_, httpUrl) => {
   *   const response = request('GET', this.resolvePath(path), {
   *     insecure: true,
   *   });
   *
   *   if (response.statusCode === 200) {
   *     return response.getBody(undefined);
   *   }
   *   return undefined;
   * }));
   * ```
   */
  static fetchPackageBy(e, t) {
    class r extends v {
      pullPackageData(n) {
        return t(n, this.resolvePath(n));
      }
    }
    return {
      key: "package-registry$lambda",
      forRoles: ["compiler"],
      provides: [p(new r(e))]
    };
  }
  /** @internal */
  ccOptions;
  /**
   * Set compiler init options for initializing global instance {@link $typst}.
   * See {@link InitOptions}.
   */
  setCompilerInitOptions(e) {
    this.requireIsUninitialized("compiler", this.cc), this.ccOptions = e;
  }
  /** @internal */
  exOptions;
  /**
   * Set renderer init options for initializing global instance {@link $typst}.
   * See {@link InitOptions}.
   */
  setRendererInitOptions(e) {
    this.requireIsUninitialized("renderer", this.ex), this.exOptions = e;
  }
  /**
   * Set shared main file path.
   */
  setMainFilePath(e) {
    this.mainFilePath = e;
  }
  /**
   * Get shared main file path.
   */
  getMainFilePath() {
    return this.mainFilePath;
  }
  removeTmp(e) {
    return e.mainFilePath.startsWith("/tmp/") ? this.unmapShadow(e.mainFilePath) : Promise.resolve();
  }
  /**
   * Adds a font to the compiler.
   *
   * @example
   *
   * ```typescript
   * const fonts = await fetch('fontInfo.json').then(res => res.json());
   * $typst.addFonts(fonts.map(font => $typst.loadFont(font.url)));
   * ```
   *
   * @param fontInfos the font infos to add.
   */
  async setFonts(e) {
    const t = await this.getFontResolver();
    for (const s of e)
      await t.addLazyFont(s, "blob" in s ? s.blob : O(s), s);
    const r = await this.getCompiler();
    await t.build(async (s) => r.setFonts(s));
  }
  /**
   * Add a source file to the compiler.
   * See {@link TypstCompiler#addSource}.
   */
  async addSource(e, t) {
    (await this.getCompiler()).addSource(e, t);
  }
  /**
   * Reset the shadow files.
   * Note: this function is independent to the {@link reset} function.
   * See {@link TypstCompiler#resetShadow}.
   */
  async resetShadow() {
    (await this.getCompiler()).resetShadow();
  }
  /**
   * Add a shadow file to the compiler.
   * See {@link TypstCompiler#mapShadow}.
   */
  async mapShadow(e, t) {
    (await this.getCompiler()).mapShadow(e, t);
  }
  /**
   * Remove a shadow file from the compiler.
   * See {@link TypstCompiler#unmapShadow}.
   */
  async unmapShadow(e) {
    (await this.getCompiler()).unmapShadow(e);
  }
  /**
   * Compile the document to vector (IR) format.
   * See {@link SweetCompileOptions}.
   */
  async vector(e) {
    const t = await this.getCompileOptions(e);
    return (await this.getCompilerReset()).compile(t).then((s) => s.result).finally(() => this.removeTmp(t));
  }
  /**
   * Compile the document to PDF format.
   * See {@link SweetCompileOptions}.
   */
  async pdf(e) {
    const t = await this.getCompileOptions(e);
    return t.format = f.pdf, (await this.getCompilerReset()).compile(t).then((s) => s.result).finally(() => this.removeTmp(t));
  }
  /**
   * Compile the document to SVG format.
   * See {@link SweetRenderOptions} and {@link RenderSvgOptions}.
   */
  async svg(e) {
    return this.transientRender(e, (t, r) => t.renderSvg({
      ...e,
      renderSession: r
    }));
  }
  /**
   * Compile the document to canvas operations.
   * See {@link SweetRenderOptions} and {@link RenderToCanvasOptions}.
   */
  async canvas(e, t) {
    return this.transientRender(t, (r, s) => r.renderToCanvas({
      container: e,
      ...t,
      renderSession: s
    }));
  }
  /**
   * Get semantic tokens for the document.
   */
  async query(e) {
    const t = await this.getCompileOptions(e);
    return (await this.getCompilerReset()).query({
      ...e,
      ...t
    }).finally(() => this.removeTmp(t));
  }
  /**
   * Get token legend for semantic tokens.
   */
  async getSemanticTokenLegend() {
    return (await this.getCompilerReset()).getSemanticTokenLegend();
  }
  /**
   * Get semantic tokens for the document.
   * See {@link SweetCompileOptions}.
   * See {@link TypstCompiler#getSemanticTokens}.
   */
  async getSemanticTokens(e) {
    const t = await this.getCompileOptions(e);
    return (await this.getCompilerReset()).getSemanticTokens({
      mainFilePath: t.mainFilePath,
      resultId: e.resultId
    }).finally(() => this.removeTmp(t));
  }
  async getCompileOptions(e) {
    if (e === void 0)
      return { mainFilePath: this.mainFilePath, diagnostics: "none" };
    if (typeof e == "string")
      throw new Error("please specify opts as {mainContent: '...'} or {mainFilePath: '...'}");
    if ("mainFilePath" in e)
      return { ...e, diagnostics: "none" };
    {
      const t = `/tmp/${x()}.typ`;
      return await this.addSource(t, e.mainContent), { mainFilePath: t, inputs: e.inputs, diagnostics: "none" };
    }
  }
  async getVector(e) {
    if (e && "vectorData" in e)
      return e.vectorData;
    const t = await this.getCompileOptions(e);
    return (await this.getCompiler()).compile(t).then((r) => r.result).finally(() => this.removeTmp(t));
  }
  async transientRender(e, t) {
    const r = await this.getRenderer();
    if (!r)
      throw new Error("does not provide renderer instance");
    const s = await this.getVector(e);
    return await r.runWithSession(async (n) => (r.manipulateData({
      renderSession: n,
      action: "reset",
      data: s
    }), t(r, n)));
  }
  prepareUseOnce = void 0;
  async prepareUse() {
    return this.prepareUseOnce ? this.prepareUseOnce : this.prepareUseOnce = this.doPrepareUse();
  }
  async doPrepareUse() {
    if (!this.providers)
      return;
    const e = await Promise.all(this.providers.map((a) => typeof a == "function" ? a() : a));
    if (this.providers = [], h == this && !e.some((a) => a.key.includes("package-registry") || a.key.includes("access-model")))
      if (T) {
        const a = new Function("m", "return import(m)");
        try {
          const l = new g(), { default: u } = await a("sync-request");
          h.use(c.withAccessModel(l), c.fetchPackageBy(l, (d, P) => {
            const y = u("GET", P);
            if (y.statusCode === 200)
              return y.getBody(void 0);
          }));
        } catch {
        }
      } else
        h.use(c.fetchPackageRegistry());
    const t = await Promise.all(this.providers.map((a) => typeof a == "function" ? a() : a)), r = this.ccOptions ||= {}, s = r.beforeBuild ||= [], n = this.exOptions ||= {}, o = n.beforeBuild ||= [];
    for (const a of [...e, ...t])
      a.forRoles.includes("compiler") && (this.requireIsUninitialized("compiler", this.cc), s.push(...a.provides)), a.forRoles.includes("renderer") && (this.requireIsUninitialized("renderer", this.ex), o.push(...a.provides));
    this.providers = void 0;
  }
  requireIsUninitialized(e, t, r) {
    if (t && typeof t != "function")
      throw new Error(`${e} has been initialized: ${t}`);
  }
  /** @internal */
  static async buildLocalCompiler() {
    const { createTypstCompiler: e } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/compiler"
    );
    await this.prepareUse();
    const t = e();
    return await t.init(this.ccOptions), t;
  }
  /** @internal */
  static async buildLocalFontResolver() {
    const { createTypstFontBuilder: e } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/compiler"
    );
    await this.prepareUse();
    const t = e();
    return await t.init(this.ccOptions), t;
  }
  /** @internal */
  static async buildGlobalCompiler() {
    const { createGlobalCompiler: e } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/contrib/global-compiler"
    ), { createTypstCompiler: t } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/compiler"
    );
    return await this.prepareUse(), e(t, this.ccOptions);
  }
  /** @internal */
  static async buildLocalRenderer() {
    const { createTypstRenderer: e } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/renderer"
    );
    await this.prepareUse();
    const t = e();
    return await t.init(this.exOptions), t;
  }
  /** @internal */
  static async buildGlobalRenderer() {
    const { createGlobalRenderer: e } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/contrib/global-renderer"
    ), { createTypstRenderer: t } = await import(
      // @ts-ignore
      "@myriaddreamin/typst.ts/renderer"
    );
    return await this.prepareUse(), e(t, this.exOptions);
  }
}
const h = new c({
  compiler: c.buildGlobalCompiler,
  renderer: c.buildGlobalRenderer
});
export {
  h as $typst,
  c as TypstSnippet
};

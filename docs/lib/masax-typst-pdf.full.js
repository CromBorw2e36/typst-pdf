function Hf(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ws = { exports: {} }, Ss = { exports: {} }, Re = {}, J = {};
J.__esModule = !0;
J.extend = Dh;
J.indexOf = zf;
J.escapeExpression = Kf;
J.isEmpty = Uf;
J.createFrame = Gf;
J.blockParams = jf;
J.appendContextPath = Jf;
var Wf = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;",
  "=": "&#x3D;"
}, Ff = /[&<>"'`=]/g, Vf = /[&<>"'`=]/;
function qf(n) {
  return Wf[n];
}
function Dh(n) {
  for (var e = 1; e < arguments.length; e++)
    for (var t in arguments[e])
      Object.prototype.hasOwnProperty.call(arguments[e], t) && (n[t] = arguments[e][t]);
  return n;
}
var Wo = Object.prototype.toString;
J.toString = Wo;
var ks = function(e) {
  return typeof e == "function";
};
ks(/x/) && (J.isFunction = ks = function(n) {
  return typeof n == "function" && Wo.call(n) === "[object Function]";
});
J.isFunction = ks;
var _h = Array.isArray || function(n) {
  return n && typeof n == "object" ? Wo.call(n) === "[object Array]" : !1;
};
J.isArray = _h;
function zf(n, e) {
  for (var t = 0, i = n.length; t < i; t++)
    if (n[t] === e)
      return t;
  return -1;
}
function Kf(n) {
  if (typeof n != "string") {
    if (n && n.toHTML)
      return n.toHTML();
    if (n == null)
      return "";
    if (!n)
      return n + "";
    n = "" + n;
  }
  return Vf.test(n) ? n.replace(Ff, qf) : n;
}
function Uf(n) {
  return !n && n !== 0 ? !0 : !!(_h(n) && n.length === 0);
}
function Gf(n) {
  var e = Dh({}, n);
  return e._parent = n, e;
}
function jf(n, e) {
  return n.path = e, n;
}
function Jf(n, e) {
  return (n ? n + "." : "") + e;
}
var Cs = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  var t = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
  function i(r, s) {
    var o = s && s.loc, l = void 0, a = void 0, h = void 0, c = void 0;
    o && (l = o.start.line, a = o.end.line, h = o.start.column, c = o.end.column, r += " - " + l + ":" + h);
    for (var f = Error.prototype.constructor.call(this, r), u = 0; u < t.length; u++)
      this[t[u]] = f[t[u]];
    Error.captureStackTrace && Error.captureStackTrace(this, i);
    try {
      o && (this.lineNumber = l, this.endLineNumber = a, Object.defineProperty ? (Object.defineProperty(this, "column", {
        value: h,
        enumerable: !0
      }), Object.defineProperty(this, "endColumn", {
        value: c,
        enumerable: !0
      })) : (this.column = h, this.endColumn = c));
    } catch {
    }
  }
  i.prototype = new Error(), e.default = i, n.exports = e.default;
})(Cs, Cs.exports);
var Ve = Cs.exports, tn = {}, Ms = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  var t = J;
  e.default = function(i) {
    i.registerHelper("blockHelperMissing", function(r, s) {
      var o = s.inverse, l = s.fn;
      if (r === !0)
        return l(this);
      if (r === !1 || r == null)
        return o(this);
      if (t.isArray(r))
        return r.length > 0 ? (s.ids && (s.ids = [s.name]), i.helpers.each(r, s)) : o(this);
      if (s.data && s.ids) {
        var a = t.createFrame(s.data);
        a.contextPath = t.appendContextPath(s.data.contextPath, s.name), s = { data: a };
      }
      return l(r, s);
    });
  }, n.exports = e.default;
})(Ms, Ms.exports);
var Yf = Ms.exports, As = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var i = J, r = Ve, s = t(r);
  e.default = function(o) {
    o.registerHelper("each", function(l, a) {
      if (!a)
        throw new s.default("Must pass iterator to #each");
      var h = a.fn, c = a.inverse, f = 0, u = "", d = void 0, p = void 0;
      a.data && a.ids && (p = i.appendContextPath(a.data.contextPath, a.ids[0]) + "."), i.isFunction(l) && (l = l.call(this)), a.data && (d = i.createFrame(a.data));
      function m(b, x, k) {
        d && (d.key = b, d.index = x, d.first = x === 0, d.last = !!k, p && (d.contextPath = p + b)), u = u + h(l[b], {
          data: d,
          blockParams: i.blockParams([l[b], b], [p + b, null])
        });
      }
      if (l && typeof l == "object")
        if (i.isArray(l))
          for (var g = l.length; f < g; f++)
            f in l && m(f, f, f === l.length - 1);
        else if (typeof Symbol == "function" && l[Symbol.iterator]) {
          for (var y = [], v = l[Symbol.iterator](), w = v.next(); !w.done; w = v.next())
            y.push(w.value);
          l = y;
          for (var g = l.length; f < g; f++)
            m(f, f, f === l.length - 1);
        } else
          (function() {
            var b = void 0;
            Object.keys(l).forEach(function(x) {
              b !== void 0 && m(b, f - 1), b = x, f++;
            }), b !== void 0 && m(b, f - 1, !0);
          })();
      return f === 0 && (u = c(this)), u;
    });
  }, n.exports = e.default;
})(As, As.exports);
var Xf = As.exports, Os = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  function t(s) {
    return s && s.__esModule ? s : { default: s };
  }
  var i = Ve, r = t(i);
  e.default = function(s) {
    s.registerHelper("helperMissing", function() {
      if (arguments.length !== 1)
        throw new r.default('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    });
  }, n.exports = e.default;
})(Os, Os.exports);
var Qf = Os.exports, Es = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var i = J, r = Ve, s = t(r);
  e.default = function(o) {
    o.registerHelper("if", function(l, a) {
      if (arguments.length != 2)
        throw new s.default("#if requires exactly one argument");
      return i.isFunction(l) && (l = l.call(this)), !a.hash.includeZero && !l || i.isEmpty(l) ? a.inverse(this) : a.fn(this);
    }), o.registerHelper("unless", function(l, a) {
      if (arguments.length != 2)
        throw new s.default("#unless requires exactly one argument");
      return o.helpers.if.call(this, l, {
        fn: a.inverse,
        inverse: a.fn,
        hash: a.hash
      });
    });
  }, n.exports = e.default;
})(Es, Es.exports);
var Zf = Es.exports, Ls = { exports: {} };
(function(n, e) {
  e.__esModule = !0, e.default = function(t) {
    t.registerHelper("log", function() {
      for (var i = [void 0], r = arguments[arguments.length - 1], s = 0; s < arguments.length - 1; s++)
        i.push(arguments[s]);
      var o = 1;
      r.hash.level != null ? o = r.hash.level : r.data && r.data.level != null && (o = r.data.level), i[0] = o, t.log.apply(t, i);
    });
  }, n.exports = e.default;
})(Ls, Ls.exports);
var $f = Ls.exports, Ps = { exports: {} };
(function(n, e) {
  e.__esModule = !0, e.default = function(t) {
    t.registerHelper("lookup", function(i, r, s) {
      return i && s.lookupProperty(i, r);
    });
  }, n.exports = e.default;
})(Ps, Ps.exports);
var ed = Ps.exports, Ds = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  function t(o) {
    return o && o.__esModule ? o : { default: o };
  }
  var i = J, r = Ve, s = t(r);
  e.default = function(o) {
    o.registerHelper("with", function(l, a) {
      if (arguments.length != 2)
        throw new s.default("#with requires exactly one argument");
      i.isFunction(l) && (l = l.call(this));
      var h = a.fn;
      if (i.isEmpty(l))
        return a.inverse(this);
      var c = a.data;
      return a.data && a.ids && (c = i.createFrame(a.data), c.contextPath = i.appendContextPath(a.data.contextPath, a.ids[0])), h(l, {
        data: c,
        blockParams: i.blockParams([l], [c && c.contextPath])
      });
    });
  }, n.exports = e.default;
})(Ds, Ds.exports);
var td = Ds.exports;
tn.__esModule = !0;
tn.registerDefaultHelpers = gd;
tn.moveHelperToHooks = yd;
function Gt(n) {
  return n && n.__esModule ? n : { default: n };
}
var id = Yf, nd = Gt(id), rd = Xf, sd = Gt(rd), od = Qf, ld = Gt(od), ad = Zf, hd = Gt(ad), cd = $f, ud = Gt(cd), fd = ed, dd = Gt(fd), pd = td, md = Gt(pd);
function gd(n) {
  nd.default(n), sd.default(n), ld.default(n), hd.default(n), ud.default(n), dd.default(n), md.default(n);
}
function yd(n, e, t) {
  n.helpers[e] && (n.hooks[e] = n.helpers[e], t || delete n.helpers[e]);
}
var Fo = {}, _s = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  var t = J;
  e.default = function(i) {
    i.registerDecorator("inline", function(r, s, o, l) {
      var a = r;
      return s.partials || (s.partials = {}, a = function(h, c) {
        var f = o.partials;
        o.partials = t.extend({}, f, s.partials);
        var u = r(h, c);
        return o.partials = f, u;
      }), s.partials[l.args[0]] = l.fn, a;
    });
  }, n.exports = e.default;
})(_s, _s.exports);
var vd = _s.exports;
Fo.__esModule = !0;
Fo.registerDefaultDecorators = Sd;
function bd(n) {
  return n && n.__esModule ? n : { default: n };
}
var xd = vd, wd = bd(xd);
function Sd(n) {
  wd.default(n);
}
var Ts = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  var t = J, i = {
    methodMap: ["debug", "info", "warn", "error"],
    level: "info",
    // Maps a given level value to the `methodMap` indexes above.
    lookupLevel: function(s) {
      if (typeof s == "string") {
        var o = t.indexOf(i.methodMap, s.toLowerCase());
        o >= 0 ? s = o : s = parseInt(s, 10);
      }
      return s;
    },
    // Can be overridden in the host environment
    log: function(s) {
      if (s = i.lookupLevel(s), typeof console < "u" && i.lookupLevel(i.level) <= s) {
        var o = i.methodMap[s];
        console[o] || (o = "log");
        for (var l = arguments.length, a = Array(l > 1 ? l - 1 : 0), h = 1; h < l; h++)
          a[h - 1] = arguments[h];
        console[o].apply(console, a);
      }
    }
  };
  e.default = i, n.exports = e.default;
})(Ts, Ts.exports);
var Th = Ts.exports, di = {}, Vo = {};
Vo.__esModule = !0;
Vo.createNewLookupObject = Cd;
var kd = J;
function Cd() {
  for (var n = arguments.length, e = Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  return kd.extend.apply(void 0, [/* @__PURE__ */ Object.create(null)].concat(e));
}
di.__esModule = !0;
di.createProtoAccessControl = Ed;
di.resultIsAllowed = Ld;
di.resetLoggedProperties = Dd;
function Md(n) {
  return n && n.__esModule ? n : { default: n };
}
var Dl = Vo, Ad = Th, Od = Md(Ad), Yn = /* @__PURE__ */ Object.create(null);
function Ed(n) {
  var e = /* @__PURE__ */ Object.create(null);
  e.constructor = !1, e.__defineGetter__ = !1, e.__defineSetter__ = !1, e.__lookupGetter__ = !1;
  var t = /* @__PURE__ */ Object.create(null);
  return t.__proto__ = !1, {
    properties: {
      whitelist: Dl.createNewLookupObject(t, n.allowedProtoProperties),
      defaultValue: n.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: Dl.createNewLookupObject(e, n.allowedProtoMethods),
      defaultValue: n.allowProtoMethodsByDefault
    }
  };
}
function Ld(n, e, t) {
  return _l(typeof n == "function" ? e.methods : e.properties, t);
}
function _l(n, e) {
  return n.whitelist[e] !== void 0 ? n.whitelist[e] === !0 : n.defaultValue !== void 0 ? n.defaultValue : (Pd(e), !1);
}
function Pd(n) {
  Yn[n] !== !0 && (Yn[n] = !0, Od.default.log("error", 'Handlebars: Access has been denied to resolve the property "' + n + `" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`));
}
function Dd() {
  Object.keys(Yn).forEach(function(n) {
    delete Yn[n];
  });
}
Re.__esModule = !0;
Re.HandlebarsEnvironment = Bs;
function Bh(n) {
  return n && n.__esModule ? n : { default: n };
}
var Tt = J, _d = Ve, Nr = Bh(_d), Td = tn, Bd = Fo, Rd = Th, Xn = Bh(Rd), Id = di, Nd = "4.7.8";
Re.VERSION = Nd;
var Hd = 8;
Re.COMPILER_REVISION = Hd;
var Wd = 7;
Re.LAST_COMPATIBLE_COMPILER_REVISION = Wd;
var Fd = {
  1: "<= 1.0.rc.2",
  // 1.0.rc.2 is actually rev2 but doesn't report it
  2: "== 1.0.0-rc.3",
  3: "== 1.0.0-rc.4",
  4: "== 1.x.x",
  5: "== 2.0.0-alpha.x",
  6: ">= 2.0.0-beta.1",
  7: ">= 4.0.0 <4.3.0",
  8: ">= 4.3.0"
};
Re.REVISION_CHANGES = Fd;
var Hr = "[object Object]";
function Bs(n, e, t) {
  this.helpers = n || {}, this.partials = e || {}, this.decorators = t || {}, Td.registerDefaultHelpers(this), Bd.registerDefaultDecorators(this);
}
Bs.prototype = {
  constructor: Bs,
  logger: Xn.default,
  log: Xn.default.log,
  registerHelper: function(e, t) {
    if (Tt.toString.call(e) === Hr) {
      if (t)
        throw new Nr.default("Arg not supported with multiple helpers");
      Tt.extend(this.helpers, e);
    } else
      this.helpers[e] = t;
  },
  unregisterHelper: function(e) {
    delete this.helpers[e];
  },
  registerPartial: function(e, t) {
    if (Tt.toString.call(e) === Hr)
      Tt.extend(this.partials, e);
    else {
      if (typeof t > "u")
        throw new Nr.default('Attempting to register a partial called "' + e + '" as undefined');
      this.partials[e] = t;
    }
  },
  unregisterPartial: function(e) {
    delete this.partials[e];
  },
  registerDecorator: function(e, t) {
    if (Tt.toString.call(e) === Hr) {
      if (t)
        throw new Nr.default("Arg not supported with multiple decorators");
      Tt.extend(this.decorators, e);
    } else
      this.decorators[e] = t;
  },
  unregisterDecorator: function(e) {
    delete this.decorators[e];
  },
  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function() {
    Id.resetLoggedProperties();
  }
};
var Vd = Xn.default.log;
Re.log = Vd;
Re.createFrame = Tt.createFrame;
Re.logger = Xn.default;
var Rs = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  function t(i) {
    this.string = i;
  }
  t.prototype.toString = t.prototype.toHTML = function() {
    return "" + this.string;
  }, e.default = t, n.exports = e.default;
})(Rs, Rs.exports);
var qd = Rs.exports, Lt = {}, qo = {};
qo.__esModule = !0;
qo.wrapHelper = zd;
function zd(n, e) {
  if (typeof n != "function")
    return n;
  var t = function() {
    var r = arguments[arguments.length - 1];
    return arguments[arguments.length - 1] = e(r), n.apply(this, arguments);
  };
  return t;
}
Lt.__esModule = !0;
Lt.checkRevision = Yd;
Lt.template = Xd;
Lt.wrapProgram = Wn;
Lt.resolvePartial = Qd;
Lt.invokePartial = Zd;
Lt.noop = Rh;
function Kd(n) {
  return n && n.__esModule ? n : { default: n };
}
function Ud(n) {
  if (n && n.__esModule)
    return n;
  var e = {};
  if (n != null)
    for (var t in n)
      Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
  return e.default = n, e;
}
var Gd = J, ot = Ud(Gd), jd = Ve, lt = Kd(jd), at = Re, Tl = tn, Jd = qo, Bl = di;
function Yd(n) {
  var e = n && n[0] || 1, t = at.COMPILER_REVISION;
  if (!(e >= at.LAST_COMPATIBLE_COMPILER_REVISION && e <= at.COMPILER_REVISION))
    if (e < at.LAST_COMPATIBLE_COMPILER_REVISION) {
      var i = at.REVISION_CHANGES[t], r = at.REVISION_CHANGES[e];
      throw new lt.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + i + ") or downgrade your runtime to an older version (" + r + ").");
    } else
      throw new lt.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + n[1] + ").");
}
function Xd(n, e) {
  if (!e)
    throw new lt.default("No environment passed to template");
  if (!n || !n.main)
    throw new lt.default("Unknown template object: " + typeof n);
  n.main.decorator = n.main_d, e.VM.checkRevision(n.compiler);
  var t = n.compiler && n.compiler[0] === 7;
  function i(o, l, a) {
    a.hash && (l = ot.extend({}, l, a.hash), a.ids && (a.ids[0] = !0)), o = e.VM.resolvePartial.call(this, o, l, a);
    var h = ot.extend({}, a, {
      hooks: this.hooks,
      protoAccessControl: this.protoAccessControl
    }), c = e.VM.invokePartial.call(this, o, l, h);
    if (c == null && e.compile && (a.partials[a.name] = e.compile(o, n.compilerOptions, e), c = a.partials[a.name](l, h)), c != null) {
      if (a.indent) {
        for (var f = c.split(`
`), u = 0, d = f.length; u < d && !(!f[u] && u + 1 === d); u++)
          f[u] = a.indent + f[u];
        c = f.join(`
`);
      }
      return c;
    } else
      throw new lt.default("The partial " + a.name + " could not be compiled when running in runtime-only mode");
  }
  var r = {
    strict: function(l, a, h) {
      if (!l || !(a in l))
        throw new lt.default('"' + a + '" not defined in ' + l, {
          loc: h
        });
      return r.lookupProperty(l, a);
    },
    lookupProperty: function(l, a) {
      var h = l[a];
      if (h == null || Object.prototype.hasOwnProperty.call(l, a) || Bl.resultIsAllowed(h, r.protoAccessControl, a))
        return h;
    },
    lookup: function(l, a) {
      for (var h = l.length, c = 0; c < h; c++) {
        var f = l[c] && r.lookupProperty(l[c], a);
        if (f != null)
          return l[c][a];
      }
    },
    lambda: function(l, a) {
      return typeof l == "function" ? l.call(a) : l;
    },
    escapeExpression: ot.escapeExpression,
    invokePartial: i,
    fn: function(l) {
      var a = n[l];
      return a.decorator = n[l + "_d"], a;
    },
    programs: [],
    program: function(l, a, h, c, f) {
      var u = this.programs[l], d = this.fn(l);
      return a || f || c || h ? u = Wn(this, l, d, a, h, c, f) : u || (u = this.programs[l] = Wn(this, l, d)), u;
    },
    data: function(l, a) {
      for (; l && a--; )
        l = l._parent;
      return l;
    },
    mergeIfNeeded: function(l, a) {
      var h = l || a;
      return l && a && l !== a && (h = ot.extend({}, a, l)), h;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),
    noop: e.VM.noop,
    compilerInfo: n.compiler
  };
  function s(o) {
    var l = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1], a = l.data;
    s._setup(l), !l.partial && n.useData && (a = $d(o, a));
    var h = void 0, c = n.useBlockParams ? [] : void 0;
    n.useDepths && (l.depths ? h = o != l.depths[0] ? [o].concat(l.depths) : l.depths : h = [o]);
    function f(u) {
      return "" + n.main(r, u, r.helpers, r.partials, a, c, h);
    }
    return f = Ih(n.main, f, r, l.depths || [], a, c), f(o, l);
  }
  return s.isTop = !0, s._setup = function(o) {
    if (o.partial)
      r.protoAccessControl = o.protoAccessControl, r.helpers = o.helpers, r.partials = o.partials, r.decorators = o.decorators, r.hooks = o.hooks;
    else {
      var l = ot.extend({}, e.helpers, o.helpers);
      ep(l, r), r.helpers = l, n.usePartial && (r.partials = r.mergeIfNeeded(o.partials, e.partials)), (n.usePartial || n.useDecorators) && (r.decorators = ot.extend({}, e.decorators, o.decorators)), r.hooks = {}, r.protoAccessControl = Bl.createProtoAccessControl(o);
      var a = o.allowCallsToHelperMissing || t;
      Tl.moveHelperToHooks(r, "helperMissing", a), Tl.moveHelperToHooks(r, "blockHelperMissing", a);
    }
  }, s._child = function(o, l, a, h) {
    if (n.useBlockParams && !a)
      throw new lt.default("must pass block params");
    if (n.useDepths && !h)
      throw new lt.default("must pass parent depths");
    return Wn(r, o, n[o], l, 0, a, h);
  }, s;
}
function Wn(n, e, t, i, r, s, o) {
  function l(a) {
    var h = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1], c = o;
    return o && a != o[0] && !(a === n.nullContext && o[0] === null) && (c = [a].concat(o)), t(n, a, n.helpers, n.partials, h.data || i, s && [h.blockParams].concat(s), c);
  }
  return l = Ih(t, l, n, o, i, s), l.program = e, l.depth = o ? o.length : 0, l.blockParams = r || 0, l;
}
function Qd(n, e, t) {
  return n ? !n.call && !t.name && (t.name = n, n = t.partials[n]) : t.name === "@partial-block" ? n = t.data["partial-block"] : n = t.partials[t.name], n;
}
function Zd(n, e, t) {
  var i = t.data && t.data["partial-block"];
  t.partial = !0, t.ids && (t.data.contextPath = t.ids[0] || t.data.contextPath);
  var r = void 0;
  if (t.fn && t.fn !== Rh && function() {
    t.data = at.createFrame(t.data);
    var s = t.fn;
    r = t.data["partial-block"] = function(l) {
      var a = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
      return a.data = at.createFrame(a.data), a.data["partial-block"] = i, s(l, a);
    }, s.partials && (t.partials = ot.extend({}, t.partials, s.partials));
  }(), n === void 0 && r && (n = r), n === void 0)
    throw new lt.default("The partial " + t.name + " could not be found");
  if (n instanceof Function)
    return n(e, t);
}
function Rh() {
  return "";
}
function $d(n, e) {
  return (!e || !("root" in e)) && (e = e ? at.createFrame(e) : {}, e.root = n), e;
}
function Ih(n, e, t, i, r, s) {
  if (n.decorator) {
    var o = {};
    e = n.decorator(e, o, t, i && i[0], r, s, i), ot.extend(e, o);
  }
  return e;
}
function ep(n, e) {
  Object.keys(n).forEach(function(t) {
    var i = n[t];
    n[t] = tp(i, e);
  });
}
function tp(n, e) {
  var t = e.lookupProperty;
  return Jd.wrapHelper(n, function(i) {
    return ot.extend({ lookupProperty: t }, i);
  });
}
var Is = { exports: {} };
(function(n, e) {
  e.__esModule = !0, e.default = function(t) {
    (function() {
      typeof globalThis != "object" && (Object.prototype.__defineGetter__("__magic__", function() {
        return this;
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__);
    })();
    var i = globalThis.Handlebars;
    t.noConflict = function() {
      return globalThis.Handlebars === t && (globalThis.Handlebars = i), t;
    };
  }, n.exports = e.default;
})(Is, Is.exports);
var Nh = Is.exports;
(function(n, e) {
  e.__esModule = !0;
  function t(v) {
    return v && v.__esModule ? v : { default: v };
  }
  function i(v) {
    if (v && v.__esModule)
      return v;
    var w = {};
    if (v != null)
      for (var b in v)
        Object.prototype.hasOwnProperty.call(v, b) && (w[b] = v[b]);
    return w.default = v, w;
  }
  var r = Re, s = i(r), o = qd, l = t(o), a = Ve, h = t(a), c = J, f = i(c), u = Lt, d = i(u), p = Nh, m = t(p);
  function g() {
    var v = new s.HandlebarsEnvironment();
    return f.extend(v, s), v.SafeString = l.default, v.Exception = h.default, v.Utils = f, v.escapeExpression = f.escapeExpression, v.VM = d, v.template = function(w) {
      return d.template(w, v);
    }, v;
  }
  var y = g();
  y.create = g, m.default(y), y.default = y, e.default = y, n.exports = e.default;
})(Ss, Ss.exports);
var ip = Ss.exports, Ns = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  var t = {
    // Public API used to evaluate derived attributes regarding AST nodes
    helpers: {
      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      helperExpression: function(r) {
        return r.type === "SubExpression" || (r.type === "MustacheStatement" || r.type === "BlockStatement") && !!(r.params && r.params.length || r.hash);
      },
      scopedId: function(r) {
        return /^\.|this\b/.test(r.original);
      },
      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      simpleId: function(r) {
        return r.parts.length === 1 && !t.helpers.scopedId(r) && !r.depth;
      }
    }
  };
  e.default = t, n.exports = e.default;
})(Ns, Ns.exports);
var Hh = Ns.exports, nn = {}, Hs = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  var t = function() {
    var i = {
      trace: function() {
      },
      yy: {},
      symbols_: { error: 2, root: 3, program: 4, EOF: 5, program_repetition0: 6, statement: 7, mustache: 8, block: 9, rawBlock: 10, partial: 11, partialBlock: 12, content: 13, COMMENT: 14, CONTENT: 15, openRawBlock: 16, rawBlock_repetition0: 17, END_RAW_BLOCK: 18, OPEN_RAW_BLOCK: 19, helperName: 20, openRawBlock_repetition0: 21, openRawBlock_option0: 22, CLOSE_RAW_BLOCK: 23, openBlock: 24, block_option0: 25, closeBlock: 26, openInverse: 27, block_option1: 28, OPEN_BLOCK: 29, openBlock_repetition0: 30, openBlock_option0: 31, openBlock_option1: 32, CLOSE: 33, OPEN_INVERSE: 34, openInverse_repetition0: 35, openInverse_option0: 36, openInverse_option1: 37, openInverseChain: 38, OPEN_INVERSE_CHAIN: 39, openInverseChain_repetition0: 40, openInverseChain_option0: 41, openInverseChain_option1: 42, inverseAndProgram: 43, INVERSE: 44, inverseChain: 45, inverseChain_option0: 46, OPEN_ENDBLOCK: 47, OPEN: 48, mustache_repetition0: 49, mustache_option0: 50, OPEN_UNESCAPED: 51, mustache_repetition1: 52, mustache_option1: 53, CLOSE_UNESCAPED: 54, OPEN_PARTIAL: 55, partialName: 56, partial_repetition0: 57, partial_option0: 58, openPartialBlock: 59, OPEN_PARTIAL_BLOCK: 60, openPartialBlock_repetition0: 61, openPartialBlock_option0: 62, param: 63, sexpr: 64, OPEN_SEXPR: 65, sexpr_repetition0: 66, sexpr_option0: 67, CLOSE_SEXPR: 68, hash: 69, hash_repetition_plus0: 70, hashSegment: 71, ID: 72, EQUALS: 73, blockParams: 74, OPEN_BLOCK_PARAMS: 75, blockParams_repetition_plus0: 76, CLOSE_BLOCK_PARAMS: 77, path: 78, dataName: 79, STRING: 80, NUMBER: 81, BOOLEAN: 82, UNDEFINED: 83, NULL: 84, DATA: 85, pathSegments: 86, SEP: 87, $accept: 0, $end: 1 },
      terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
      productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
      performAction: function(l, a, h, c, f, u, d) {
        var p = u.length - 1;
        switch (f) {
          case 1:
            return u[p - 1];
          case 2:
            this.$ = c.prepareProgram(u[p]);
            break;
          case 3:
            this.$ = u[p];
            break;
          case 4:
            this.$ = u[p];
            break;
          case 5:
            this.$ = u[p];
            break;
          case 6:
            this.$ = u[p];
            break;
          case 7:
            this.$ = u[p];
            break;
          case 8:
            this.$ = u[p];
            break;
          case 9:
            this.$ = {
              type: "CommentStatement",
              value: c.stripComment(u[p]),
              strip: c.stripFlags(u[p], u[p]),
              loc: c.locInfo(this._$)
            };
            break;
          case 10:
            this.$ = {
              type: "ContentStatement",
              original: u[p],
              value: u[p],
              loc: c.locInfo(this._$)
            };
            break;
          case 11:
            this.$ = c.prepareRawBlock(u[p - 2], u[p - 1], u[p], this._$);
            break;
          case 12:
            this.$ = { path: u[p - 3], params: u[p - 2], hash: u[p - 1] };
            break;
          case 13:
            this.$ = c.prepareBlock(u[p - 3], u[p - 2], u[p - 1], u[p], !1, this._$);
            break;
          case 14:
            this.$ = c.prepareBlock(u[p - 3], u[p - 2], u[p - 1], u[p], !0, this._$);
            break;
          case 15:
            this.$ = { open: u[p - 5], path: u[p - 4], params: u[p - 3], hash: u[p - 2], blockParams: u[p - 1], strip: c.stripFlags(u[p - 5], u[p]) };
            break;
          case 16:
            this.$ = { path: u[p - 4], params: u[p - 3], hash: u[p - 2], blockParams: u[p - 1], strip: c.stripFlags(u[p - 5], u[p]) };
            break;
          case 17:
            this.$ = { path: u[p - 4], params: u[p - 3], hash: u[p - 2], blockParams: u[p - 1], strip: c.stripFlags(u[p - 5], u[p]) };
            break;
          case 18:
            this.$ = { strip: c.stripFlags(u[p - 1], u[p - 1]), program: u[p] };
            break;
          case 19:
            var m = c.prepareBlock(u[p - 2], u[p - 1], u[p], u[p], !1, this._$), g = c.prepareProgram([m], u[p - 1].loc);
            g.chained = !0, this.$ = { strip: u[p - 2].strip, program: g, chain: !0 };
            break;
          case 20:
            this.$ = u[p];
            break;
          case 21:
            this.$ = { path: u[p - 1], strip: c.stripFlags(u[p - 2], u[p]) };
            break;
          case 22:
            this.$ = c.prepareMustache(u[p - 3], u[p - 2], u[p - 1], u[p - 4], c.stripFlags(u[p - 4], u[p]), this._$);
            break;
          case 23:
            this.$ = c.prepareMustache(u[p - 3], u[p - 2], u[p - 1], u[p - 4], c.stripFlags(u[p - 4], u[p]), this._$);
            break;
          case 24:
            this.$ = {
              type: "PartialStatement",
              name: u[p - 3],
              params: u[p - 2],
              hash: u[p - 1],
              indent: "",
              strip: c.stripFlags(u[p - 4], u[p]),
              loc: c.locInfo(this._$)
            };
            break;
          case 25:
            this.$ = c.preparePartialBlock(u[p - 2], u[p - 1], u[p], this._$);
            break;
          case 26:
            this.$ = { path: u[p - 3], params: u[p - 2], hash: u[p - 1], strip: c.stripFlags(u[p - 4], u[p]) };
            break;
          case 27:
            this.$ = u[p];
            break;
          case 28:
            this.$ = u[p];
            break;
          case 29:
            this.$ = {
              type: "SubExpression",
              path: u[p - 3],
              params: u[p - 2],
              hash: u[p - 1],
              loc: c.locInfo(this._$)
            };
            break;
          case 30:
            this.$ = { type: "Hash", pairs: u[p], loc: c.locInfo(this._$) };
            break;
          case 31:
            this.$ = { type: "HashPair", key: c.id(u[p - 2]), value: u[p], loc: c.locInfo(this._$) };
            break;
          case 32:
            this.$ = c.id(u[p - 1]);
            break;
          case 33:
            this.$ = u[p];
            break;
          case 34:
            this.$ = u[p];
            break;
          case 35:
            this.$ = { type: "StringLiteral", value: u[p], original: u[p], loc: c.locInfo(this._$) };
            break;
          case 36:
            this.$ = { type: "NumberLiteral", value: Number(u[p]), original: Number(u[p]), loc: c.locInfo(this._$) };
            break;
          case 37:
            this.$ = { type: "BooleanLiteral", value: u[p] === "true", original: u[p] === "true", loc: c.locInfo(this._$) };
            break;
          case 38:
            this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: c.locInfo(this._$) };
            break;
          case 39:
            this.$ = { type: "NullLiteral", original: null, value: null, loc: c.locInfo(this._$) };
            break;
          case 40:
            this.$ = u[p];
            break;
          case 41:
            this.$ = u[p];
            break;
          case 42:
            this.$ = c.preparePath(!0, u[p], this._$);
            break;
          case 43:
            this.$ = c.preparePath(!1, u[p], this._$);
            break;
          case 44:
            u[p - 2].push({ part: c.id(u[p]), original: u[p], separator: u[p - 1] }), this.$ = u[p - 2];
            break;
          case 45:
            this.$ = [{ part: c.id(u[p]), original: u[p] }];
            break;
          case 46:
            this.$ = [];
            break;
          case 47:
            u[p - 1].push(u[p]);
            break;
          case 48:
            this.$ = [];
            break;
          case 49:
            u[p - 1].push(u[p]);
            break;
          case 50:
            this.$ = [];
            break;
          case 51:
            u[p - 1].push(u[p]);
            break;
          case 58:
            this.$ = [];
            break;
          case 59:
            u[p - 1].push(u[p]);
            break;
          case 64:
            this.$ = [];
            break;
          case 65:
            u[p - 1].push(u[p]);
            break;
          case 70:
            this.$ = [];
            break;
          case 71:
            u[p - 1].push(u[p]);
            break;
          case 78:
            this.$ = [];
            break;
          case 79:
            u[p - 1].push(u[p]);
            break;
          case 82:
            this.$ = [];
            break;
          case 83:
            u[p - 1].push(u[p]);
            break;
          case 86:
            this.$ = [];
            break;
          case 87:
            u[p - 1].push(u[p]);
            break;
          case 90:
            this.$ = [];
            break;
          case 91:
            u[p - 1].push(u[p]);
            break;
          case 94:
            this.$ = [];
            break;
          case 95:
            u[p - 1].push(u[p]);
            break;
          case 98:
            this.$ = [u[p]];
            break;
          case 99:
            u[p - 1].push(u[p]);
            break;
          case 100:
            this.$ = [u[p]];
            break;
          case 101:
            u[p - 1].push(u[p]);
            break;
        }
      },
      table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
      defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
      parseError: function(l, a) {
        throw new Error(l);
      },
      parse: function(l) {
        var a = this, h = [0], c = [null], f = [], u = this.table, d = "", p = 0, m = 0;
        this.lexer.setInput(l), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc > "u" && (this.lexer.yylloc = {});
        var g = this.lexer.yylloc;
        f.push(g);
        var y = this.lexer.options && this.lexer.options.ranges;
        typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
        function v() {
          var H;
          return H = a.lexer.lex() || 1, typeof H != "number" && (H = a.symbols_[H] || H), H;
        }
        for (var w, b, x, k, S = {}, M, D, _, T; ; ) {
          if (b = h[h.length - 1], this.defaultActions[b] ? x = this.defaultActions[b] : ((w === null || typeof w > "u") && (w = v()), x = u[b] && u[b][w]), typeof x > "u" || !x.length || !x[0]) {
            var B = "";
            {
              T = [];
              for (M in u[b]) this.terminals_[M] && M > 2 && T.push("'" + this.terminals_[M] + "'");
              this.lexer.showPosition ? B = "Parse error on line " + (p + 1) + `:
` + this.lexer.showPosition() + `
Expecting ` + T.join(", ") + ", got '" + (this.terminals_[w] || w) + "'" : B = "Parse error on line " + (p + 1) + ": Unexpected " + (w == 1 ? "end of input" : "'" + (this.terminals_[w] || w) + "'"), this.parseError(B, { text: this.lexer.match, token: this.terminals_[w] || w, line: this.lexer.yylineno, loc: g, expected: T });
            }
          }
          if (x[0] instanceof Array && x.length > 1)
            throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + w);
          switch (x[0]) {
            case 1:
              h.push(w), c.push(this.lexer.yytext), f.push(this.lexer.yylloc), h.push(x[1]), w = null, m = this.lexer.yyleng, d = this.lexer.yytext, p = this.lexer.yylineno, g = this.lexer.yylloc;
              break;
            case 2:
              if (D = this.productions_[x[1]][1], S.$ = c[c.length - D], S._$ = { first_line: f[f.length - (D || 1)].first_line, last_line: f[f.length - 1].last_line, first_column: f[f.length - (D || 1)].first_column, last_column: f[f.length - 1].last_column }, y && (S._$.range = [f[f.length - (D || 1)].range[0], f[f.length - 1].range[1]]), k = this.performAction.call(S, d, m, p, this.yy, x[1], c, f), typeof k < "u")
                return k;
              D && (h = h.slice(0, -1 * D * 2), c = c.slice(0, -1 * D), f = f.slice(0, -1 * D)), h.push(this.productions_[x[1]][0]), c.push(S.$), f.push(S._$), _ = u[h[h.length - 2]][h[h.length - 1]], h.push(_);
              break;
            case 3:
              return !0;
          }
        }
        return !0;
      }
    }, r = function() {
      var o = {
        EOF: 1,
        parseError: function(a, h) {
          if (this.yy.parser)
            this.yy.parser.parseError(a, h);
          else
            throw new Error(a);
        },
        setInput: function(a) {
          return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
        },
        input: function() {
          var a = this._input[0];
          this.yytext += a, this.yyleng++, this.offset++, this.match += a, this.matched += a;
          var h = a.match(/(?:\r\n?|\n).*/g);
          return h ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), a;
        },
        unput: function(a) {
          var h = a.length, c = a.split(/(?:\r\n?|\n)/g);
          this._input = a + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - h - 1), this.offset -= h;
          var f = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
          var u = this.yylloc.range;
          return this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: c ? (c.length === f.length ? this.yylloc.first_column : 0) + f[f.length - c.length].length - c[0].length : this.yylloc.first_column - h
          }, this.options.ranges && (this.yylloc.range = [u[0], u[0] + this.yyleng - h]), this;
        },
        more: function() {
          return this._more = !0, this;
        },
        less: function(a) {
          this.unput(this.match.slice(a));
        },
        pastInput: function() {
          var a = this.matched.substr(0, this.matched.length - this.match.length);
          return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function() {
          var a = this.match;
          return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "");
        },
        showPosition: function() {
          var a = this.pastInput(), h = new Array(a.length + 1).join("-");
          return a + this.upcomingInput() + `
` + h + "^";
        },
        next: function() {
          if (this.done)
            return this.EOF;
          this._input || (this.done = !0);
          var a, h, c, f, u;
          this._more || (this.yytext = "", this.match = "");
          for (var d = this._currentRules(), p = 0; p < d.length && (c = this._input.match(this.rules[d[p]]), !(c && (!h || c[0].length > h[0].length) && (h = c, f = p, !this.options.flex))); p++)
            ;
          return h ? (u = h[0].match(/(?:\r\n?|\n).*/g), u && (this.yylineno += u.length), this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: u ? u[u.length - 1].length - u[u.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + h[0].length
          }, this.yytext += h[0], this.match += h[0], this.matches = h, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(h[0].length), this.matched += h[0], a = this.performAction.call(this, this.yy, this, d[f], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), a || void 0) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
        },
        lex: function() {
          var a = this.next();
          return typeof a < "u" ? a : this.lex();
        },
        begin: function(a) {
          this.conditionStack.push(a);
        },
        popState: function() {
          return this.conditionStack.pop();
        },
        _currentRules: function() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function(a) {
          this.begin(a);
        }
      };
      return o.options = {}, o.performAction = function(a, h, c, f) {
        function u(d, p) {
          return h.yytext = h.yytext.substring(d, h.yyleng - p + d);
        }
        switch (c) {
          case 0:
            if (h.yytext.slice(-2) === "\\\\" ? (u(0, 1), this.begin("mu")) : h.yytext.slice(-1) === "\\" ? (u(0, 1), this.begin("emu")) : this.begin("mu"), h.yytext) return 15;
            break;
          case 1:
            return 15;
          case 2:
            return this.popState(), 15;
          case 3:
            return this.begin("raw"), 15;
          case 4:
            return this.popState(), this.conditionStack[this.conditionStack.length - 1] === "raw" ? 15 : (u(5, 9), "END_RAW_BLOCK");
          case 5:
            return 15;
          case 6:
            return this.popState(), 14;
          case 7:
            return 65;
          case 8:
            return 68;
          case 9:
            return 19;
          case 10:
            return this.popState(), this.begin("raw"), 23;
          case 11:
            return 55;
          case 12:
            return 60;
          case 13:
            return 29;
          case 14:
            return 47;
          case 15:
            return this.popState(), 44;
          case 16:
            return this.popState(), 44;
          case 17:
            return 34;
          case 18:
            return 39;
          case 19:
            return 51;
          case 20:
            return 48;
          case 21:
            this.unput(h.yytext), this.popState(), this.begin("com");
            break;
          case 22:
            return this.popState(), 14;
          case 23:
            return 48;
          case 24:
            return 73;
          case 25:
            return 72;
          case 26:
            return 72;
          case 27:
            return 87;
          case 28:
            break;
          case 29:
            return this.popState(), 54;
          case 30:
            return this.popState(), 33;
          case 31:
            return h.yytext = u(1, 2).replace(/\\"/g, '"'), 80;
          case 32:
            return h.yytext = u(1, 2).replace(/\\'/g, "'"), 80;
          case 33:
            return 85;
          case 34:
            return 82;
          case 35:
            return 82;
          case 36:
            return 83;
          case 37:
            return 84;
          case 38:
            return 81;
          case 39:
            return 75;
          case 40:
            return 77;
          case 41:
            return 72;
          case 42:
            return h.yytext = h.yytext.replace(/\\([\\\]])/g, "$1"), 72;
          case 43:
            return "INVALID";
          case 44:
            return 5;
        }
      }, o.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/], o.conditions = { mu: { rules: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], inclusive: !1 }, emu: { rules: [2], inclusive: !1 }, com: { rules: [6], inclusive: !1 }, raw: { rules: [3, 4, 5], inclusive: !1 }, INITIAL: { rules: [0, 1, 44], inclusive: !0 } }, o;
    }();
    i.lexer = r;
    function s() {
      this.yy = {};
    }
    return s.prototype = i, i.Parser = s, new s();
  }();
  e.default = t, n.exports = e.default;
})(Hs, Hs.exports);
var np = Hs.exports, Ws = { exports: {} }, Fs = { exports: {} };
(function(n, e) {
  e.__esModule = !0;
  function t(h) {
    return h && h.__esModule ? h : { default: h };
  }
  var i = Ve, r = t(i);
  function s() {
    this.parents = [];
  }
  s.prototype = {
    constructor: s,
    mutating: !1,
    // Visits a given value. If mutating, will replace the value if necessary.
    acceptKey: function(c, f) {
      var u = this.accept(c[f]);
      if (this.mutating) {
        if (u && !s.prototype[u.type])
          throw new r.default('Unexpected node type "' + u.type + '" found when accepting ' + f + " on " + c.type);
        c[f] = u;
      }
    },
    // Performs an accept operation with added sanity check to ensure
    // required keys are not removed.
    acceptRequired: function(c, f) {
      if (this.acceptKey(c, f), !c[f])
        throw new r.default(c.type + " requires " + f);
    },
    // Traverses a given array. If mutating, empty respnses will be removed
    // for child elements.
    acceptArray: function(c) {
      for (var f = 0, u = c.length; f < u; f++)
        this.acceptKey(c, f), c[f] || (c.splice(f, 1), f--, u--);
    },
    accept: function(c) {
      if (c) {
        if (!this[c.type])
          throw new r.default("Unknown type: " + c.type, c);
        this.current && this.parents.unshift(this.current), this.current = c;
        var f = this[c.type](c);
        if (this.current = this.parents.shift(), !this.mutating || f)
          return f;
        if (f !== !1)
          return c;
      }
    },
    Program: function(c) {
      this.acceptArray(c.body);
    },
    MustacheStatement: o,
    Decorator: o,
    BlockStatement: l,
    DecoratorBlock: l,
    PartialStatement: a,
    PartialBlockStatement: function(c) {
      a.call(this, c), this.acceptKey(c, "program");
    },
    ContentStatement: function() {
    },
    CommentStatement: function() {
    },
    SubExpression: o,
    PathExpression: function() {
    },
    StringLiteral: function() {
    },
    NumberLiteral: function() {
    },
    BooleanLiteral: function() {
    },
    UndefinedLiteral: function() {
    },
    NullLiteral: function() {
    },
    Hash: function(c) {
      this.acceptArray(c.pairs);
    },
    HashPair: function(c) {
      this.acceptRequired(c, "value");
    }
  };
  function o(h) {
    this.acceptRequired(h, "path"), this.acceptArray(h.params), this.acceptKey(h, "hash");
  }
  function l(h) {
    o.call(this, h), this.acceptKey(h, "program"), this.acceptKey(h, "inverse");
  }
  function a(h) {
    this.acceptRequired(h, "name"), this.acceptArray(h.params), this.acceptKey(h, "hash");
  }
  e.default = s, n.exports = e.default;
})(Fs, Fs.exports);
var Wh = Fs.exports;
(function(n, e) {
  e.__esModule = !0;
  function t(c) {
    return c && c.__esModule ? c : { default: c };
  }
  var i = Wh, r = t(i);
  function s() {
    var c = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
    this.options = c;
  }
  s.prototype = new r.default(), s.prototype.Program = function(c) {
    var f = !this.options.ignoreStandalone, u = !this.isRootSeen;
    this.isRootSeen = !0;
    for (var d = c.body, p = 0, m = d.length; p < m; p++) {
      var g = d[p], y = this.accept(g);
      if (y) {
        var v = o(d, p, u), w = l(d, p, u), b = y.openStandalone && v, x = y.closeStandalone && w, k = y.inlineStandalone && v && w;
        y.close && a(d, p, !0), y.open && h(d, p, !0), f && k && (a(d, p), h(d, p) && g.type === "PartialStatement" && (g.indent = /([ \t]+$)/.exec(d[p - 1].original)[1])), f && b && (a((g.program || g.inverse).body), h(d, p)), f && x && (a(d, p), h((g.inverse || g.program).body));
      }
    }
    return c;
  }, s.prototype.BlockStatement = s.prototype.DecoratorBlock = s.prototype.PartialBlockStatement = function(c) {
    this.accept(c.program), this.accept(c.inverse);
    var f = c.program || c.inverse, u = c.program && c.inverse, d = u, p = u;
    if (u && u.chained)
      for (d = u.body[0].program; p.chained; )
        p = p.body[p.body.length - 1].program;
    var m = {
      open: c.openStrip.open,
      close: c.closeStrip.close,
      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: l(f.body),
      closeStandalone: o((d || f).body)
    };
    if (c.openStrip.close && a(f.body, null, !0), u) {
      var g = c.inverseStrip;
      g.open && h(f.body, null, !0), g.close && a(d.body, null, !0), c.closeStrip.open && h(p.body, null, !0), !this.options.ignoreStandalone && o(f.body) && l(d.body) && (h(f.body), a(d.body));
    } else c.closeStrip.open && h(f.body, null, !0);
    return m;
  }, s.prototype.Decorator = s.prototype.MustacheStatement = function(c) {
    return c.strip;
  }, s.prototype.PartialStatement = s.prototype.CommentStatement = function(c) {
    var f = c.strip || {};
    return {
      inlineStandalone: !0,
      open: f.open,
      close: f.close
    };
  };
  function o(c, f, u) {
    f === void 0 && (f = c.length);
    var d = c[f - 1], p = c[f - 2];
    if (!d)
      return u;
    if (d.type === "ContentStatement")
      return (p || !u ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(d.original);
  }
  function l(c, f, u) {
    f === void 0 && (f = -1);
    var d = c[f + 1], p = c[f + 2];
    if (!d)
      return u;
    if (d.type === "ContentStatement")
      return (p || !u ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(d.original);
  }
  function a(c, f, u) {
    var d = c[f == null ? 0 : f + 1];
    if (!(!d || d.type !== "ContentStatement" || !u && d.rightStripped)) {
      var p = d.value;
      d.value = d.value.replace(u ? /^\s+/ : /^[ \t]*\r?\n?/, ""), d.rightStripped = d.value !== p;
    }
  }
  function h(c, f, u) {
    var d = c[f == null ? c.length - 1 : f - 1];
    if (!(!d || d.type !== "ContentStatement" || !u && d.leftStripped)) {
      var p = d.value;
      return d.value = d.value.replace(u ? /\s+$/ : /[ \t]+$/, ""), d.leftStripped = d.value !== p, d.leftStripped;
    }
  }
  e.default = s, n.exports = e.default;
})(Ws, Ws.exports);
var rp = Ws.exports, Ie = {};
Ie.__esModule = !0;
Ie.SourceLocation = lp;
Ie.id = ap;
Ie.stripFlags = hp;
Ie.stripComment = cp;
Ie.preparePath = up;
Ie.prepareMustache = fp;
Ie.prepareRawBlock = dp;
Ie.prepareBlock = pp;
Ie.prepareProgram = mp;
Ie.preparePartialBlock = gp;
function sp(n) {
  return n && n.__esModule ? n : { default: n };
}
var op = Ve, zo = sp(op);
function Ko(n, e) {
  if (e = e.path ? e.path.original : e, n.path.original !== e) {
    var t = { loc: n.path.loc };
    throw new zo.default(n.path.original + " doesn't match " + e, t);
  }
}
function lp(n, e) {
  this.source = n, this.start = {
    line: e.first_line,
    column: e.first_column
  }, this.end = {
    line: e.last_line,
    column: e.last_column
  };
}
function ap(n) {
  return /^\[.*\]$/.test(n) ? n.substring(1, n.length - 1) : n;
}
function hp(n, e) {
  return {
    open: n.charAt(2) === "~",
    close: e.charAt(e.length - 3) === "~"
  };
}
function cp(n) {
  return n.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
}
function up(n, e, t) {
  t = this.locInfo(t);
  for (var i = n ? "@" : "", r = [], s = 0, o = 0, l = e.length; o < l; o++) {
    var a = e[o].part, h = e[o].original !== a;
    if (i += (e[o].separator || "") + a, !h && (a === ".." || a === "." || a === "this")) {
      if (r.length > 0)
        throw new zo.default("Invalid path: " + i, { loc: t });
      a === ".." && s++;
    } else
      r.push(a);
  }
  return {
    type: "PathExpression",
    data: n,
    depth: s,
    parts: r,
    original: i,
    loc: t
  };
}
function fp(n, e, t, i, r, s) {
  var o = i.charAt(3) || i.charAt(2), l = o !== "{" && o !== "&", a = /\*/.test(i);
  return {
    type: a ? "Decorator" : "MustacheStatement",
    path: n,
    params: e,
    hash: t,
    escaped: l,
    strip: r,
    loc: this.locInfo(s)
  };
}
function dp(n, e, t, i) {
  Ko(n, t), i = this.locInfo(i);
  var r = {
    type: "Program",
    body: e,
    strip: {},
    loc: i
  };
  return {
    type: "BlockStatement",
    path: n.path,
    params: n.params,
    hash: n.hash,
    program: r,
    openStrip: {},
    inverseStrip: {},
    closeStrip: {},
    loc: i
  };
}
function pp(n, e, t, i, r, s) {
  i && i.path && Ko(n, i);
  var o = /\*/.test(n.open);
  e.blockParams = n.blockParams;
  var l = void 0, a = void 0;
  if (t) {
    if (o)
      throw new zo.default("Unexpected inverse block on decorator", t);
    t.chain && (t.program.body[0].closeStrip = i.strip), a = t.strip, l = t.program;
  }
  return r && (r = l, l = e, e = r), {
    type: o ? "DecoratorBlock" : "BlockStatement",
    path: n.path,
    params: n.params,
    hash: n.hash,
    program: e,
    inverse: l,
    openStrip: n.strip,
    inverseStrip: a,
    closeStrip: i && i.strip,
    loc: this.locInfo(s)
  };
}
function mp(n, e) {
  if (!e && n.length) {
    var t = n[0].loc, i = n[n.length - 1].loc;
    t && i && (e = {
      source: t.source,
      start: {
        line: t.start.line,
        column: t.start.column
      },
      end: {
        line: i.end.line,
        column: i.end.column
      }
    });
  }
  return {
    type: "Program",
    body: n,
    strip: {},
    loc: e
  };
}
function gp(n, e, t, i) {
  return Ko(n, t), {
    type: "PartialBlockStatement",
    name: n.path,
    params: n.params,
    hash: n.hash,
    program: e,
    openStrip: n.strip,
    closeStrip: t && t.strip,
    loc: this.locInfo(i)
  };
}
nn.__esModule = !0;
nn.parseWithoutProcessing = Vh;
nn.parse = Cp;
function yp(n) {
  if (n && n.__esModule)
    return n;
  var e = {};
  if (n != null)
    for (var t in n)
      Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
  return e.default = n, e;
}
function Fh(n) {
  return n && n.__esModule ? n : { default: n };
}
var vp = np, Vs = Fh(vp), bp = rp, xp = Fh(bp), wp = Ie, Sp = yp(wp), kp = J;
nn.parser = Vs.default;
var Fn = {};
kp.extend(Fn, Sp);
function Vh(n, e) {
  if (n.type === "Program")
    return n;
  Vs.default.yy = Fn, Fn.locInfo = function(i) {
    return new Fn.SourceLocation(e && e.srcName, i);
  };
  var t = Vs.default.parse(n);
  return t;
}
function Cp(n, e) {
  var t = Vh(n, e), i = new xp.default(e);
  return i.accept(t);
}
var rn = {};
rn.__esModule = !0;
rn.Compiler = qs;
rn.precompile = Ep;
rn.compile = Lp;
function qh(n) {
  return n && n.__esModule ? n : { default: n };
}
var Mp = Ve, Li = qh(Mp), Ni = J, Ap = Hh, yi = qh(Ap), Op = [].slice;
function qs() {
}
qs.prototype = {
  compiler: qs,
  equals: function(e) {
    var t = this.opcodes.length;
    if (e.opcodes.length !== t)
      return !1;
    for (var i = 0; i < t; i++) {
      var r = this.opcodes[i], s = e.opcodes[i];
      if (r.opcode !== s.opcode || !zh(r.args, s.args))
        return !1;
    }
    t = this.children.length;
    for (var i = 0; i < t; i++)
      if (!this.children[i].equals(e.children[i]))
        return !1;
    return !0;
  },
  guid: 0,
  compile: function(e, t) {
    return this.sourceNode = [], this.opcodes = [], this.children = [], this.options = t, this.stringParams = t.stringParams, this.trackIds = t.trackIds, t.blockParams = t.blockParams || [], t.knownHelpers = Ni.extend(/* @__PURE__ */ Object.create(null), {
      helperMissing: !0,
      blockHelperMissing: !0,
      each: !0,
      if: !0,
      unless: !0,
      with: !0,
      log: !0,
      lookup: !0
    }, t.knownHelpers), this.accept(e);
  },
  compileProgram: function(e) {
    var t = new this.compiler(), i = t.compile(e, this.options), r = this.guid++;
    return this.usePartial = this.usePartial || i.usePartial, this.children[r] = i, this.useDepths = this.useDepths || i.useDepths, r;
  },
  accept: function(e) {
    if (!this[e.type])
      throw new Li.default("Unknown type: " + e.type, e);
    this.sourceNode.unshift(e);
    var t = this[e.type](e);
    return this.sourceNode.shift(), t;
  },
  Program: function(e) {
    this.options.blockParams.unshift(e.blockParams);
    for (var t = e.body, i = t.length, r = 0; r < i; r++)
      this.accept(t[r]);
    return this.options.blockParams.shift(), this.isSimple = i === 1, this.blockParams = e.blockParams ? e.blockParams.length : 0, this;
  },
  BlockStatement: function(e) {
    Rl(e);
    var t = e.program, i = e.inverse;
    t = t && this.compileProgram(t), i = i && this.compileProgram(i);
    var r = this.classifySexpr(e);
    r === "helper" ? this.helperSexpr(e, t, i) : r === "simple" ? (this.simpleSexpr(e), this.opcode("pushProgram", t), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("blockValue", e.path.original)) : (this.ambiguousSexpr(e, t, i), this.opcode("pushProgram", t), this.opcode("pushProgram", i), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append");
  },
  DecoratorBlock: function(e) {
    var t = e.program && this.compileProgram(e.program), i = this.setupFullMustacheParams(e, t, void 0), r = e.path;
    this.useDecorators = !0, this.opcode("registerDecorator", i.length, r.original);
  },
  PartialStatement: function(e) {
    this.usePartial = !0;
    var t = e.program;
    t && (t = this.compileProgram(e.program));
    var i = e.params;
    if (i.length > 1)
      throw new Li.default("Unsupported number of partial arguments: " + i.length, e);
    i.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : i.push({ type: "PathExpression", parts: [], depth: 0 }));
    var r = e.name.original, s = e.name.type === "SubExpression";
    s && this.accept(e.name), this.setupFullMustacheParams(e, t, void 0, !0);
    var o = e.indent || "";
    this.options.preventIndent && o && (this.opcode("appendContent", o), o = ""), this.opcode("invokePartial", s, r, o), this.opcode("append");
  },
  PartialBlockStatement: function(e) {
    this.PartialStatement(e);
  },
  MustacheStatement: function(e) {
    this.SubExpression(e), e.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
  },
  Decorator: function(e) {
    this.DecoratorBlock(e);
  },
  ContentStatement: function(e) {
    e.value && this.opcode("appendContent", e.value);
  },
  CommentStatement: function() {
  },
  SubExpression: function(e) {
    Rl(e);
    var t = this.classifySexpr(e);
    t === "simple" ? this.simpleSexpr(e) : t === "helper" ? this.helperSexpr(e) : this.ambiguousSexpr(e);
  },
  ambiguousSexpr: function(e, t, i) {
    var r = e.path, s = r.parts[0], o = t != null || i != null;
    this.opcode("getContext", r.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", i), r.strict = !0, this.accept(r), this.opcode("invokeAmbiguous", s, o);
  },
  simpleSexpr: function(e) {
    var t = e.path;
    t.strict = !0, this.accept(t), this.opcode("resolvePossibleLambda");
  },
  helperSexpr: function(e, t, i) {
    var r = this.setupFullMustacheParams(e, t, i), s = e.path, o = s.parts[0];
    if (this.options.knownHelpers[o])
      this.opcode("invokeKnownHelper", r.length, o);
    else {
      if (this.options.knownHelpersOnly)
        throw new Li.default("You specified knownHelpersOnly, but used the unknown helper " + o, e);
      s.strict = !0, s.falsy = !0, this.accept(s), this.opcode("invokeHelper", r.length, s.original, yi.default.helpers.simpleId(s));
    }
  },
  PathExpression: function(e) {
    this.addDepth(e.depth), this.opcode("getContext", e.depth);
    var t = e.parts[0], i = yi.default.helpers.scopedId(e), r = !e.depth && !i && this.blockParamIndex(t);
    r ? this.opcode("lookupBlockParam", r, e.parts) : t ? e.data ? (this.options.data = !0, this.opcode("lookupData", e.depth, e.parts, e.strict)) : this.opcode("lookupOnContext", e.parts, e.falsy, e.strict, i) : this.opcode("pushContext");
  },
  StringLiteral: function(e) {
    this.opcode("pushString", e.value);
  },
  NumberLiteral: function(e) {
    this.opcode("pushLiteral", e.value);
  },
  BooleanLiteral: function(e) {
    this.opcode("pushLiteral", e.value);
  },
  UndefinedLiteral: function() {
    this.opcode("pushLiteral", "undefined");
  },
  NullLiteral: function() {
    this.opcode("pushLiteral", "null");
  },
  Hash: function(e) {
    var t = e.pairs, i = 0, r = t.length;
    for (this.opcode("pushHash"); i < r; i++)
      this.pushParam(t[i].value);
    for (; i--; )
      this.opcode("assignToHash", t[i].key);
    this.opcode("popHash");
  },
  // HELPERS
  opcode: function(e) {
    this.opcodes.push({
      opcode: e,
      args: Op.call(arguments, 1),
      loc: this.sourceNode[0].loc
    });
  },
  addDepth: function(e) {
    e && (this.useDepths = !0);
  },
  classifySexpr: function(e) {
    var t = yi.default.helpers.simpleId(e.path), i = t && !!this.blockParamIndex(e.path.parts[0]), r = !i && yi.default.helpers.helperExpression(e), s = !i && (r || t);
    if (s && !r) {
      var o = e.path.parts[0], l = this.options;
      l.knownHelpers[o] ? r = !0 : l.knownHelpersOnly && (s = !1);
    }
    return r ? "helper" : s ? "ambiguous" : "simple";
  },
  pushParams: function(e) {
    for (var t = 0, i = e.length; t < i; t++)
      this.pushParam(e[t]);
  },
  pushParam: function(e) {
    var t = e.value != null ? e.value : e.original || "";
    if (this.stringParams)
      t.replace && (t = t.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), e.depth && this.addDepth(e.depth), this.opcode("getContext", e.depth || 0), this.opcode("pushStringParam", t, e.type), e.type === "SubExpression" && this.accept(e);
    else {
      if (this.trackIds) {
        var i = void 0;
        if (e.parts && !yi.default.helpers.scopedId(e) && !e.depth && (i = this.blockParamIndex(e.parts[0])), i) {
          var r = e.parts.slice(1).join(".");
          this.opcode("pushId", "BlockParam", i, r);
        } else
          t = e.original || t, t.replace && (t = t.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), this.opcode("pushId", e.type, t);
      }
      this.accept(e);
    }
  },
  setupFullMustacheParams: function(e, t, i, r) {
    var s = e.params;
    return this.pushParams(s), this.opcode("pushProgram", t), this.opcode("pushProgram", i), e.hash ? this.accept(e.hash) : this.opcode("emptyHash", r), s;
  },
  blockParamIndex: function(e) {
    for (var t = 0, i = this.options.blockParams.length; t < i; t++) {
      var r = this.options.blockParams[t], s = r && Ni.indexOf(r, e);
      if (r && s >= 0)
        return [t, s];
    }
  }
};
function Ep(n, e, t) {
  if (n == null || typeof n != "string" && n.type !== "Program")
    throw new Li.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + n);
  e = e || {}, "data" in e || (e.data = !0), e.compat && (e.useDepths = !0);
  var i = t.parse(n, e), r = new t.Compiler().compile(i, e);
  return new t.JavaScriptCompiler().compile(r, e);
}
function Lp(n, e, t) {
  if (e === void 0 && (e = {}), n == null || typeof n != "string" && n.type !== "Program")
    throw new Li.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + n);
  e = Ni.extend({}, e), "data" in e || (e.data = !0), e.compat && (e.useDepths = !0);
  var i = void 0;
  function r() {
    var o = t.parse(n, e), l = new t.Compiler().compile(o, e), a = new t.JavaScriptCompiler().compile(l, e, void 0, !0);
    return t.template(a);
  }
  function s(o, l) {
    return i || (i = r()), i.call(this, o, l);
  }
  return s._setup = function(o) {
    return i || (i = r()), i._setup(o);
  }, s._child = function(o, l, a, h) {
    return i || (i = r()), i._child(o, l, a, h);
  }, s;
}
function zh(n, e) {
  if (n === e)
    return !0;
  if (Ni.isArray(n) && Ni.isArray(e) && n.length === e.length) {
    for (var t = 0; t < n.length; t++)
      if (!zh(n[t], e[t]))
        return !1;
    return !0;
  }
}
function Rl(n) {
  if (!n.path.parts) {
    var e = n.path;
    n.path = {
      type: "PathExpression",
      data: !1,
      depth: 0,
      parts: [e.original + ""],
      original: e.original + "",
      loc: e.loc
    };
  }
}
var zs = { exports: {} }, Ks = { exports: {} }, vi = {}, Wr = {}, pn = {}, mn = {}, Il;
function Pp() {
  if (Il) return mn;
  Il = 1;
  var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return mn.encode = function(e) {
    if (0 <= e && e < n.length)
      return n[e];
    throw new TypeError("Must be between 0 and 63: " + e);
  }, mn.decode = function(e) {
    var t = 65, i = 90, r = 97, s = 122, o = 48, l = 57, a = 43, h = 47, c = 26, f = 52;
    return t <= e && e <= i ? e - t : r <= e && e <= s ? e - r + c : o <= e && e <= l ? e - o + f : e == a ? 62 : e == h ? 63 : -1;
  }, mn;
}
var Nl;
function Kh() {
  if (Nl) return pn;
  Nl = 1;
  var n = Pp(), e = 5, t = 1 << e, i = t - 1, r = t;
  function s(l) {
    return l < 0 ? (-l << 1) + 1 : (l << 1) + 0;
  }
  function o(l) {
    var a = (l & 1) === 1, h = l >> 1;
    return a ? -h : h;
  }
  return pn.encode = function(a) {
    var h = "", c, f = s(a);
    do
      c = f & i, f >>>= e, f > 0 && (c |= r), h += n.encode(c);
    while (f > 0);
    return h;
  }, pn.decode = function(a, h, c) {
    var f = a.length, u = 0, d = 0, p, m;
    do {
      if (h >= f)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (m = n.decode(a.charCodeAt(h++)), m === -1)
        throw new Error("Invalid base64 digit: " + a.charAt(h - 1));
      p = !!(m & r), m &= i, u = u + (m << d), d += e;
    } while (p);
    c.value = o(u), c.rest = h;
  }, pn;
}
var Fr = {}, Hl;
function sn() {
  return Hl || (Hl = 1, function(n) {
    function e(b, x, k) {
      if (x in b)
        return b[x];
      if (arguments.length === 3)
        return k;
      throw new Error('"' + x + '" is a required argument.');
    }
    n.getArg = e;
    var t = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, i = /^data:.+\,.+$/;
    function r(b) {
      var x = b.match(t);
      return x ? {
        scheme: x[1],
        auth: x[2],
        host: x[3],
        port: x[4],
        path: x[5]
      } : null;
    }
    n.urlParse = r;
    function s(b) {
      var x = "";
      return b.scheme && (x += b.scheme + ":"), x += "//", b.auth && (x += b.auth + "@"), b.host && (x += b.host), b.port && (x += ":" + b.port), b.path && (x += b.path), x;
    }
    n.urlGenerate = s;
    function o(b) {
      var x = b, k = r(b);
      if (k) {
        if (!k.path)
          return b;
        x = k.path;
      }
      for (var S = n.isAbsolute(x), M = x.split(/\/+/), D, _ = 0, T = M.length - 1; T >= 0; T--)
        D = M[T], D === "." ? M.splice(T, 1) : D === ".." ? _++ : _ > 0 && (D === "" ? (M.splice(T + 1, _), _ = 0) : (M.splice(T, 2), _--));
      return x = M.join("/"), x === "" && (x = S ? "/" : "."), k ? (k.path = x, s(k)) : x;
    }
    n.normalize = o;
    function l(b, x) {
      b === "" && (b = "."), x === "" && (x = ".");
      var k = r(x), S = r(b);
      if (S && (b = S.path || "/"), k && !k.scheme)
        return S && (k.scheme = S.scheme), s(k);
      if (k || x.match(i))
        return x;
      if (S && !S.host && !S.path)
        return S.host = x, s(S);
      var M = x.charAt(0) === "/" ? x : o(b.replace(/\/+$/, "") + "/" + x);
      return S ? (S.path = M, s(S)) : M;
    }
    n.join = l, n.isAbsolute = function(b) {
      return b.charAt(0) === "/" || t.test(b);
    };
    function a(b, x) {
      b === "" && (b = "."), b = b.replace(/\/$/, "");
      for (var k = 0; x.indexOf(b + "/") !== 0; ) {
        var S = b.lastIndexOf("/");
        if (S < 0 || (b = b.slice(0, S), b.match(/^([^\/]+:\/)?\/*$/)))
          return x;
        ++k;
      }
      return Array(k + 1).join("../") + x.substr(b.length + 1);
    }
    n.relative = a;
    var h = function() {
      var b = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in b);
    }();
    function c(b) {
      return b;
    }
    function f(b) {
      return d(b) ? "$" + b : b;
    }
    n.toSetString = h ? c : f;
    function u(b) {
      return d(b) ? b.slice(1) : b;
    }
    n.fromSetString = h ? c : u;
    function d(b) {
      if (!b)
        return !1;
      var x = b.length;
      if (x < 9 || b.charCodeAt(x - 1) !== 95 || b.charCodeAt(x - 2) !== 95 || b.charCodeAt(x - 3) !== 111 || b.charCodeAt(x - 4) !== 116 || b.charCodeAt(x - 5) !== 111 || b.charCodeAt(x - 6) !== 114 || b.charCodeAt(x - 7) !== 112 || b.charCodeAt(x - 8) !== 95 || b.charCodeAt(x - 9) !== 95)
        return !1;
      for (var k = x - 10; k >= 0; k--)
        if (b.charCodeAt(k) !== 36)
          return !1;
      return !0;
    }
    function p(b, x, k) {
      var S = g(b.source, x.source);
      return S !== 0 || (S = b.originalLine - x.originalLine, S !== 0) || (S = b.originalColumn - x.originalColumn, S !== 0 || k) || (S = b.generatedColumn - x.generatedColumn, S !== 0) || (S = b.generatedLine - x.generatedLine, S !== 0) ? S : g(b.name, x.name);
    }
    n.compareByOriginalPositions = p;
    function m(b, x, k) {
      var S = b.generatedLine - x.generatedLine;
      return S !== 0 || (S = b.generatedColumn - x.generatedColumn, S !== 0 || k) || (S = g(b.source, x.source), S !== 0) || (S = b.originalLine - x.originalLine, S !== 0) || (S = b.originalColumn - x.originalColumn, S !== 0) ? S : g(b.name, x.name);
    }
    n.compareByGeneratedPositionsDeflated = m;
    function g(b, x) {
      return b === x ? 0 : b === null ? 1 : x === null ? -1 : b > x ? 1 : -1;
    }
    function y(b, x) {
      var k = b.generatedLine - x.generatedLine;
      return k !== 0 || (k = b.generatedColumn - x.generatedColumn, k !== 0) || (k = g(b.source, x.source), k !== 0) || (k = b.originalLine - x.originalLine, k !== 0) || (k = b.originalColumn - x.originalColumn, k !== 0) ? k : g(b.name, x.name);
    }
    n.compareByGeneratedPositionsInflated = y;
    function v(b) {
      return JSON.parse(b.replace(/^\)]}'[^\n]*\n/, ""));
    }
    n.parseSourceMapInput = v;
    function w(b, x, k) {
      if (x = x || "", b && (b[b.length - 1] !== "/" && x[0] !== "/" && (b += "/"), x = b + x), k) {
        var S = r(k);
        if (!S)
          throw new Error("sourceMapURL could not be parsed");
        if (S.path) {
          var M = S.path.lastIndexOf("/");
          M >= 0 && (S.path = S.path.substring(0, M + 1));
        }
        x = l(s(S), x);
      }
      return o(x);
    }
    n.computeSourceURL = w;
  }(Fr)), Fr;
}
var Vr = {}, Wl;
function Uh() {
  if (Wl) return Vr;
  Wl = 1;
  var n = sn(), e = Object.prototype.hasOwnProperty, t = typeof Map < "u";
  function i() {
    this._array = [], this._set = t ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return i.fromArray = function(s, o) {
    for (var l = new i(), a = 0, h = s.length; a < h; a++)
      l.add(s[a], o);
    return l;
  }, i.prototype.size = function() {
    return t ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, i.prototype.add = function(s, o) {
    var l = t ? s : n.toSetString(s), a = t ? this.has(s) : e.call(this._set, l), h = this._array.length;
    (!a || o) && this._array.push(s), a || (t ? this._set.set(s, h) : this._set[l] = h);
  }, i.prototype.has = function(s) {
    if (t)
      return this._set.has(s);
    var o = n.toSetString(s);
    return e.call(this._set, o);
  }, i.prototype.indexOf = function(s) {
    if (t) {
      var o = this._set.get(s);
      if (o >= 0)
        return o;
    } else {
      var l = n.toSetString(s);
      if (e.call(this._set, l))
        return this._set[l];
    }
    throw new Error('"' + s + '" is not in the set.');
  }, i.prototype.at = function(s) {
    if (s >= 0 && s < this._array.length)
      return this._array[s];
    throw new Error("No element indexed by " + s);
  }, i.prototype.toArray = function() {
    return this._array.slice();
  }, Vr.ArraySet = i, Vr;
}
var qr = {}, Fl;
function Dp() {
  if (Fl) return qr;
  Fl = 1;
  var n = sn();
  function e(i, r) {
    var s = i.generatedLine, o = r.generatedLine, l = i.generatedColumn, a = r.generatedColumn;
    return o > s || o == s && a >= l || n.compareByGeneratedPositionsInflated(i, r) <= 0;
  }
  function t() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return t.prototype.unsortedForEach = function(r, s) {
    this._array.forEach(r, s);
  }, t.prototype.add = function(r) {
    e(this._last, r) ? (this._last = r, this._array.push(r)) : (this._sorted = !1, this._array.push(r));
  }, t.prototype.toArray = function() {
    return this._sorted || (this._array.sort(n.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  }, qr.MappingList = t, qr;
}
var Vl;
function Gh() {
  if (Vl) return Wr;
  Vl = 1;
  var n = Kh(), e = sn(), t = Uh().ArraySet, i = Dp().MappingList;
  function r(s) {
    s || (s = {}), this._file = e.getArg(s, "file", null), this._sourceRoot = e.getArg(s, "sourceRoot", null), this._skipValidation = e.getArg(s, "skipValidation", !1), this._sources = new t(), this._names = new t(), this._mappings = new i(), this._sourcesContents = null;
  }
  return r.prototype._version = 3, r.fromSourceMap = function(o) {
    var l = o.sourceRoot, a = new r({
      file: o.file,
      sourceRoot: l
    });
    return o.eachMapping(function(h) {
      var c = {
        generated: {
          line: h.generatedLine,
          column: h.generatedColumn
        }
      };
      h.source != null && (c.source = h.source, l != null && (c.source = e.relative(l, c.source)), c.original = {
        line: h.originalLine,
        column: h.originalColumn
      }, h.name != null && (c.name = h.name)), a.addMapping(c);
    }), o.sources.forEach(function(h) {
      var c = h;
      l !== null && (c = e.relative(l, h)), a._sources.has(c) || a._sources.add(c);
      var f = o.sourceContentFor(h);
      f != null && a.setSourceContent(h, f);
    }), a;
  }, r.prototype.addMapping = function(o) {
    var l = e.getArg(o, "generated"), a = e.getArg(o, "original", null), h = e.getArg(o, "source", null), c = e.getArg(o, "name", null);
    this._skipValidation || this._validateMapping(l, a, h, c), h != null && (h = String(h), this._sources.has(h) || this._sources.add(h)), c != null && (c = String(c), this._names.has(c) || this._names.add(c)), this._mappings.add({
      generatedLine: l.line,
      generatedColumn: l.column,
      originalLine: a != null && a.line,
      originalColumn: a != null && a.column,
      source: h,
      name: c
    });
  }, r.prototype.setSourceContent = function(o, l) {
    var a = o;
    this._sourceRoot != null && (a = e.relative(this._sourceRoot, a)), l != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[e.toSetString(a)] = l) : this._sourcesContents && (delete this._sourcesContents[e.toSetString(a)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, r.prototype.applySourceMap = function(o, l, a) {
    var h = l;
    if (l == null) {
      if (o.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      h = o.file;
    }
    var c = this._sourceRoot;
    c != null && (h = e.relative(c, h));
    var f = new t(), u = new t();
    this._mappings.unsortedForEach(function(d) {
      if (d.source === h && d.originalLine != null) {
        var p = o.originalPositionFor({
          line: d.originalLine,
          column: d.originalColumn
        });
        p.source != null && (d.source = p.source, a != null && (d.source = e.join(a, d.source)), c != null && (d.source = e.relative(c, d.source)), d.originalLine = p.line, d.originalColumn = p.column, p.name != null && (d.name = p.name));
      }
      var m = d.source;
      m != null && !f.has(m) && f.add(m);
      var g = d.name;
      g != null && !u.has(g) && u.add(g);
    }, this), this._sources = f, this._names = u, o.sources.forEach(function(d) {
      var p = o.sourceContentFor(d);
      p != null && (a != null && (d = e.join(a, d)), c != null && (d = e.relative(c, d)), this.setSourceContent(d, p));
    }, this);
  }, r.prototype._validateMapping = function(o, l, a, h) {
    if (l && typeof l.line != "number" && typeof l.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (!(o && "line" in o && "column" in o && o.line > 0 && o.column >= 0 && !l && !a && !h)) {
      if (o && "line" in o && "column" in o && l && "line" in l && "column" in l && o.line > 0 && o.column >= 0 && l.line > 0 && l.column >= 0 && a)
        return;
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: o,
        source: a,
        original: l,
        name: h
      }));
    }
  }, r.prototype._serializeMappings = function() {
    for (var o = 0, l = 1, a = 0, h = 0, c = 0, f = 0, u = "", d, p, m, g, y = this._mappings.toArray(), v = 0, w = y.length; v < w; v++) {
      if (p = y[v], d = "", p.generatedLine !== l)
        for (o = 0; p.generatedLine !== l; )
          d += ";", l++;
      else if (v > 0) {
        if (!e.compareByGeneratedPositionsInflated(p, y[v - 1]))
          continue;
        d += ",";
      }
      d += n.encode(p.generatedColumn - o), o = p.generatedColumn, p.source != null && (g = this._sources.indexOf(p.source), d += n.encode(g - f), f = g, d += n.encode(p.originalLine - 1 - h), h = p.originalLine - 1, d += n.encode(p.originalColumn - a), a = p.originalColumn, p.name != null && (m = this._names.indexOf(p.name), d += n.encode(m - c), c = m)), u += d;
    }
    return u;
  }, r.prototype._generateSourcesContent = function(o, l) {
    return o.map(function(a) {
      if (!this._sourcesContents)
        return null;
      l != null && (a = e.relative(l, a));
      var h = e.toSetString(a);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, h) ? this._sourcesContents[h] : null;
    }, this);
  }, r.prototype.toJSON = function() {
    var o = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (o.file = this._file), this._sourceRoot != null && (o.sourceRoot = this._sourceRoot), this._sourcesContents && (o.sourcesContent = this._generateSourcesContent(o.sources, o.sourceRoot)), o;
  }, r.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, Wr.SourceMapGenerator = r, Wr;
}
var bi = {}, zr = {}, ql;
function _p() {
  return ql || (ql = 1, function(n) {
    n.GREATEST_LOWER_BOUND = 1, n.LEAST_UPPER_BOUND = 2;
    function e(t, i, r, s, o, l) {
      var a = Math.floor((i - t) / 2) + t, h = o(r, s[a], !0);
      return h === 0 ? a : h > 0 ? i - a > 1 ? e(a, i, r, s, o, l) : l == n.LEAST_UPPER_BOUND ? i < s.length ? i : -1 : a : a - t > 1 ? e(t, a, r, s, o, l) : l == n.LEAST_UPPER_BOUND ? a : t < 0 ? -1 : t;
    }
    n.search = function(i, r, s, o) {
      if (r.length === 0)
        return -1;
      var l = e(
        -1,
        r.length,
        i,
        r,
        s,
        o || n.GREATEST_LOWER_BOUND
      );
      if (l < 0)
        return -1;
      for (; l - 1 >= 0 && s(r[l], r[l - 1], !0) === 0; )
        --l;
      return l;
    };
  }(zr)), zr;
}
var Kr = {}, zl;
function Tp() {
  if (zl) return Kr;
  zl = 1;
  function n(i, r, s) {
    var o = i[r];
    i[r] = i[s], i[s] = o;
  }
  function e(i, r) {
    return Math.round(i + Math.random() * (r - i));
  }
  function t(i, r, s, o) {
    if (s < o) {
      var l = e(s, o), a = s - 1;
      n(i, l, o);
      for (var h = i[o], c = s; c < o; c++)
        r(i[c], h) <= 0 && (a += 1, n(i, a, c));
      n(i, a + 1, c);
      var f = a + 1;
      t(i, r, s, f - 1), t(i, r, f + 1, o);
    }
  }
  return Kr.quickSort = function(i, r) {
    t(i, r, 0, i.length - 1);
  }, Kr;
}
var Kl;
function Bp() {
  if (Kl) return bi;
  Kl = 1;
  var n = sn(), e = _p(), t = Uh().ArraySet, i = Kh(), r = Tp().quickSort;
  function s(h, c) {
    var f = h;
    return typeof h == "string" && (f = n.parseSourceMapInput(h)), f.sections != null ? new a(f, c) : new o(f, c);
  }
  s.fromSourceMap = function(h, c) {
    return o.fromSourceMap(h, c);
  }, s.prototype._version = 3, s.prototype.__generatedMappings = null, Object.defineProperty(s.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
    }
  }), s.prototype.__originalMappings = null, Object.defineProperty(s.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
    }
  }), s.prototype._charIsMappingSeparator = function(c, f) {
    var u = c.charAt(f);
    return u === ";" || u === ",";
  }, s.prototype._parseMappings = function(c, f) {
    throw new Error("Subclasses must implement _parseMappings");
  }, s.GENERATED_ORDER = 1, s.ORIGINAL_ORDER = 2, s.GREATEST_LOWER_BOUND = 1, s.LEAST_UPPER_BOUND = 2, s.prototype.eachMapping = function(c, f, u) {
    var d = f || null, p = u || s.GENERATED_ORDER, m;
    switch (p) {
      case s.GENERATED_ORDER:
        m = this._generatedMappings;
        break;
      case s.ORIGINAL_ORDER:
        m = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var g = this.sourceRoot;
    m.map(function(y) {
      var v = y.source === null ? null : this._sources.at(y.source);
      return v = n.computeSourceURL(g, v, this._sourceMapURL), {
        source: v,
        generatedLine: y.generatedLine,
        generatedColumn: y.generatedColumn,
        originalLine: y.originalLine,
        originalColumn: y.originalColumn,
        name: y.name === null ? null : this._names.at(y.name)
      };
    }, this).forEach(c, d);
  }, s.prototype.allGeneratedPositionsFor = function(c) {
    var f = n.getArg(c, "line"), u = {
      source: n.getArg(c, "source"),
      originalLine: f,
      originalColumn: n.getArg(c, "column", 0)
    };
    if (u.source = this._findSourceIndex(u.source), u.source < 0)
      return [];
    var d = [], p = this._findMapping(
      u,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      n.compareByOriginalPositions,
      e.LEAST_UPPER_BOUND
    );
    if (p >= 0) {
      var m = this._originalMappings[p];
      if (c.column === void 0)
        for (var g = m.originalLine; m && m.originalLine === g; )
          d.push({
            line: n.getArg(m, "generatedLine", null),
            column: n.getArg(m, "generatedColumn", null),
            lastColumn: n.getArg(m, "lastGeneratedColumn", null)
          }), m = this._originalMappings[++p];
      else
        for (var y = m.originalColumn; m && m.originalLine === f && m.originalColumn == y; )
          d.push({
            line: n.getArg(m, "generatedLine", null),
            column: n.getArg(m, "generatedColumn", null),
            lastColumn: n.getArg(m, "lastGeneratedColumn", null)
          }), m = this._originalMappings[++p];
    }
    return d;
  }, bi.SourceMapConsumer = s;
  function o(h, c) {
    var f = h;
    typeof h == "string" && (f = n.parseSourceMapInput(h));
    var u = n.getArg(f, "version"), d = n.getArg(f, "sources"), p = n.getArg(f, "names", []), m = n.getArg(f, "sourceRoot", null), g = n.getArg(f, "sourcesContent", null), y = n.getArg(f, "mappings"), v = n.getArg(f, "file", null);
    if (u != this._version)
      throw new Error("Unsupported version: " + u);
    m && (m = n.normalize(m)), d = d.map(String).map(n.normalize).map(function(w) {
      return m && n.isAbsolute(m) && n.isAbsolute(w) ? n.relative(m, w) : w;
    }), this._names = t.fromArray(p.map(String), !0), this._sources = t.fromArray(d, !0), this._absoluteSources = this._sources.toArray().map(function(w) {
      return n.computeSourceURL(m, w, c);
    }), this.sourceRoot = m, this.sourcesContent = g, this._mappings = y, this._sourceMapURL = c, this.file = v;
  }
  o.prototype = Object.create(s.prototype), o.prototype.consumer = s, o.prototype._findSourceIndex = function(h) {
    var c = h;
    if (this.sourceRoot != null && (c = n.relative(this.sourceRoot, c)), this._sources.has(c))
      return this._sources.indexOf(c);
    var f;
    for (f = 0; f < this._absoluteSources.length; ++f)
      if (this._absoluteSources[f] == h)
        return f;
    return -1;
  }, o.fromSourceMap = function(c, f) {
    var u = Object.create(o.prototype), d = u._names = t.fromArray(c._names.toArray(), !0), p = u._sources = t.fromArray(c._sources.toArray(), !0);
    u.sourceRoot = c._sourceRoot, u.sourcesContent = c._generateSourcesContent(
      u._sources.toArray(),
      u.sourceRoot
    ), u.file = c._file, u._sourceMapURL = f, u._absoluteSources = u._sources.toArray().map(function(k) {
      return n.computeSourceURL(u.sourceRoot, k, f);
    });
    for (var m = c._mappings.toArray().slice(), g = u.__generatedMappings = [], y = u.__originalMappings = [], v = 0, w = m.length; v < w; v++) {
      var b = m[v], x = new l();
      x.generatedLine = b.generatedLine, x.generatedColumn = b.generatedColumn, b.source && (x.source = p.indexOf(b.source), x.originalLine = b.originalLine, x.originalColumn = b.originalColumn, b.name && (x.name = d.indexOf(b.name)), y.push(x)), g.push(x);
    }
    return r(u.__originalMappings, n.compareByOriginalPositions), u;
  }, o.prototype._version = 3, Object.defineProperty(o.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function l() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  o.prototype._parseMappings = function(c, f) {
    for (var u = 1, d = 0, p = 0, m = 0, g = 0, y = 0, v = c.length, w = 0, b = {}, x = {}, k = [], S = [], M, D, _, T, B; w < v; )
      if (c.charAt(w) === ";")
        u++, w++, d = 0;
      else if (c.charAt(w) === ",")
        w++;
      else {
        for (M = new l(), M.generatedLine = u, T = w; T < v && !this._charIsMappingSeparator(c, T); T++)
          ;
        if (D = c.slice(w, T), _ = b[D], _)
          w += D.length;
        else {
          for (_ = []; w < T; )
            i.decode(c, w, x), B = x.value, w = x.rest, _.push(B);
          if (_.length === 2)
            throw new Error("Found a source, but no line and column");
          if (_.length === 3)
            throw new Error("Found a source and line, but no column");
          b[D] = _;
        }
        M.generatedColumn = d + _[0], d = M.generatedColumn, _.length > 1 && (M.source = g + _[1], g += _[1], M.originalLine = p + _[2], p = M.originalLine, M.originalLine += 1, M.originalColumn = m + _[3], m = M.originalColumn, _.length > 4 && (M.name = y + _[4], y += _[4])), S.push(M), typeof M.originalLine == "number" && k.push(M);
      }
    r(S, n.compareByGeneratedPositionsDeflated), this.__generatedMappings = S, r(k, n.compareByOriginalPositions), this.__originalMappings = k;
  }, o.prototype._findMapping = function(c, f, u, d, p, m) {
    if (c[u] <= 0)
      throw new TypeError("Line must be greater than or equal to 1, got " + c[u]);
    if (c[d] < 0)
      throw new TypeError("Column must be greater than or equal to 0, got " + c[d]);
    return e.search(c, f, p, m);
  }, o.prototype.computeColumnSpans = function() {
    for (var c = 0; c < this._generatedMappings.length; ++c) {
      var f = this._generatedMappings[c];
      if (c + 1 < this._generatedMappings.length) {
        var u = this._generatedMappings[c + 1];
        if (f.generatedLine === u.generatedLine) {
          f.lastGeneratedColumn = u.generatedColumn - 1;
          continue;
        }
      }
      f.lastGeneratedColumn = 1 / 0;
    }
  }, o.prototype.originalPositionFor = function(c) {
    var f = {
      generatedLine: n.getArg(c, "line"),
      generatedColumn: n.getArg(c, "column")
    }, u = this._findMapping(
      f,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      n.compareByGeneratedPositionsDeflated,
      n.getArg(c, "bias", s.GREATEST_LOWER_BOUND)
    );
    if (u >= 0) {
      var d = this._generatedMappings[u];
      if (d.generatedLine === f.generatedLine) {
        var p = n.getArg(d, "source", null);
        p !== null && (p = this._sources.at(p), p = n.computeSourceURL(this.sourceRoot, p, this._sourceMapURL));
        var m = n.getArg(d, "name", null);
        return m !== null && (m = this._names.at(m)), {
          source: p,
          line: n.getArg(d, "originalLine", null),
          column: n.getArg(d, "originalColumn", null),
          name: m
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, o.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(c) {
      return c == null;
    }) : !1;
  }, o.prototype.sourceContentFor = function(c, f) {
    if (!this.sourcesContent)
      return null;
    var u = this._findSourceIndex(c);
    if (u >= 0)
      return this.sourcesContent[u];
    var d = c;
    this.sourceRoot != null && (d = n.relative(this.sourceRoot, d));
    var p;
    if (this.sourceRoot != null && (p = n.urlParse(this.sourceRoot))) {
      var m = d.replace(/^file:\/\//, "");
      if (p.scheme == "file" && this._sources.has(m))
        return this.sourcesContent[this._sources.indexOf(m)];
      if ((!p.path || p.path == "/") && this._sources.has("/" + d))
        return this.sourcesContent[this._sources.indexOf("/" + d)];
    }
    if (f)
      return null;
    throw new Error('"' + d + '" is not in the SourceMap.');
  }, o.prototype.generatedPositionFor = function(c) {
    var f = n.getArg(c, "source");
    if (f = this._findSourceIndex(f), f < 0)
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    var u = {
      source: f,
      originalLine: n.getArg(c, "line"),
      originalColumn: n.getArg(c, "column")
    }, d = this._findMapping(
      u,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      n.compareByOriginalPositions,
      n.getArg(c, "bias", s.GREATEST_LOWER_BOUND)
    );
    if (d >= 0) {
      var p = this._originalMappings[d];
      if (p.source === u.source)
        return {
          line: n.getArg(p, "generatedLine", null),
          column: n.getArg(p, "generatedColumn", null),
          lastColumn: n.getArg(p, "lastGeneratedColumn", null)
        };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, bi.BasicSourceMapConsumer = o;
  function a(h, c) {
    var f = h;
    typeof h == "string" && (f = n.parseSourceMapInput(h));
    var u = n.getArg(f, "version"), d = n.getArg(f, "sections");
    if (u != this._version)
      throw new Error("Unsupported version: " + u);
    this._sources = new t(), this._names = new t();
    var p = {
      line: -1,
      column: 0
    };
    this._sections = d.map(function(m) {
      if (m.url)
        throw new Error("Support for url field in sections not implemented.");
      var g = n.getArg(m, "offset"), y = n.getArg(g, "line"), v = n.getArg(g, "column");
      if (y < p.line || y === p.line && v < p.column)
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return p = g, {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: y + 1,
          generatedColumn: v + 1
        },
        consumer: new s(n.getArg(m, "map"), c)
      };
    });
  }
  return a.prototype = Object.create(s.prototype), a.prototype.constructor = s, a.prototype._version = 3, Object.defineProperty(a.prototype, "sources", {
    get: function() {
      for (var h = [], c = 0; c < this._sections.length; c++)
        for (var f = 0; f < this._sections[c].consumer.sources.length; f++)
          h.push(this._sections[c].consumer.sources[f]);
      return h;
    }
  }), a.prototype.originalPositionFor = function(c) {
    var f = {
      generatedLine: n.getArg(c, "line"),
      generatedColumn: n.getArg(c, "column")
    }, u = e.search(
      f,
      this._sections,
      function(p, m) {
        var g = p.generatedLine - m.generatedOffset.generatedLine;
        return g || p.generatedColumn - m.generatedOffset.generatedColumn;
      }
    ), d = this._sections[u];
    return d ? d.consumer.originalPositionFor({
      line: f.generatedLine - (d.generatedOffset.generatedLine - 1),
      column: f.generatedColumn - (d.generatedOffset.generatedLine === f.generatedLine ? d.generatedOffset.generatedColumn - 1 : 0),
      bias: c.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, a.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(c) {
      return c.consumer.hasContentsOfAllSources();
    });
  }, a.prototype.sourceContentFor = function(c, f) {
    for (var u = 0; u < this._sections.length; u++) {
      var d = this._sections[u], p = d.consumer.sourceContentFor(c, !0);
      if (p)
        return p;
    }
    if (f)
      return null;
    throw new Error('"' + c + '" is not in the SourceMap.');
  }, a.prototype.generatedPositionFor = function(c) {
    for (var f = 0; f < this._sections.length; f++) {
      var u = this._sections[f];
      if (u.consumer._findSourceIndex(n.getArg(c, "source")) !== -1) {
        var d = u.consumer.generatedPositionFor(c);
        if (d) {
          var p = {
            line: d.line + (u.generatedOffset.generatedLine - 1),
            column: d.column + (u.generatedOffset.generatedLine === d.line ? u.generatedOffset.generatedColumn - 1 : 0)
          };
          return p;
        }
      }
    }
    return {
      line: null,
      column: null
    };
  }, a.prototype._parseMappings = function(c, f) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var u = 0; u < this._sections.length; u++)
      for (var d = this._sections[u], p = d.consumer._generatedMappings, m = 0; m < p.length; m++) {
        var g = p[m], y = d.consumer._sources.at(g.source);
        y = n.computeSourceURL(d.consumer.sourceRoot, y, this._sourceMapURL), this._sources.add(y), y = this._sources.indexOf(y);
        var v = null;
        g.name && (v = d.consumer._names.at(g.name), this._names.add(v), v = this._names.indexOf(v));
        var w = {
          source: y,
          generatedLine: g.generatedLine + (d.generatedOffset.generatedLine - 1),
          generatedColumn: g.generatedColumn + (d.generatedOffset.generatedLine === g.generatedLine ? d.generatedOffset.generatedColumn - 1 : 0),
          originalLine: g.originalLine,
          originalColumn: g.originalColumn,
          name: v
        };
        this.__generatedMappings.push(w), typeof w.originalLine == "number" && this.__originalMappings.push(w);
      }
    r(this.__generatedMappings, n.compareByGeneratedPositionsDeflated), r(this.__originalMappings, n.compareByOriginalPositions);
  }, bi.IndexedSourceMapConsumer = a, bi;
}
var Ur = {}, Ul;
function Rp() {
  if (Ul) return Ur;
  Ul = 1;
  var n = Gh().SourceMapGenerator, e = sn(), t = /(\r?\n)/, i = 10, r = "$$$isSourceNode$$$";
  function s(o, l, a, h, c) {
    this.children = [], this.sourceContents = {}, this.line = o ?? null, this.column = l ?? null, this.source = a ?? null, this.name = c ?? null, this[r] = !0, h != null && this.add(h);
  }
  return s.fromStringWithSourceMap = function(l, a, h) {
    var c = new s(), f = l.split(t), u = 0, d = function() {
      var v = b(), w = b() || "";
      return v + w;
      function b() {
        return u < f.length ? f[u++] : void 0;
      }
    }, p = 1, m = 0, g = null;
    return a.eachMapping(function(v) {
      if (g !== null)
        if (p < v.generatedLine)
          y(g, d()), p++, m = 0;
        else {
          var w = f[u] || "", b = w.substr(0, v.generatedColumn - m);
          f[u] = w.substr(v.generatedColumn - m), m = v.generatedColumn, y(g, b), g = v;
          return;
        }
      for (; p < v.generatedLine; )
        c.add(d()), p++;
      if (m < v.generatedColumn) {
        var w = f[u] || "";
        c.add(w.substr(0, v.generatedColumn)), f[u] = w.substr(v.generatedColumn), m = v.generatedColumn;
      }
      g = v;
    }, this), u < f.length && (g && y(g, d()), c.add(f.splice(u).join(""))), a.sources.forEach(function(v) {
      var w = a.sourceContentFor(v);
      w != null && (h != null && (v = e.join(h, v)), c.setSourceContent(v, w));
    }), c;
    function y(v, w) {
      if (v === null || v.source === void 0)
        c.add(w);
      else {
        var b = h ? e.join(h, v.source) : v.source;
        c.add(new s(
          v.originalLine,
          v.originalColumn,
          b,
          w,
          v.name
        ));
      }
    }
  }, s.prototype.add = function(l) {
    if (Array.isArray(l))
      l.forEach(function(a) {
        this.add(a);
      }, this);
    else if (l[r] || typeof l == "string")
      l && this.children.push(l);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + l
      );
    return this;
  }, s.prototype.prepend = function(l) {
    if (Array.isArray(l))
      for (var a = l.length - 1; a >= 0; a--)
        this.prepend(l[a]);
    else if (l[r] || typeof l == "string")
      this.children.unshift(l);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + l
      );
    return this;
  }, s.prototype.walk = function(l) {
    for (var a, h = 0, c = this.children.length; h < c; h++)
      a = this.children[h], a[r] ? a.walk(l) : a !== "" && l(a, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
  }, s.prototype.join = function(l) {
    var a, h, c = this.children.length;
    if (c > 0) {
      for (a = [], h = 0; h < c - 1; h++)
        a.push(this.children[h]), a.push(l);
      a.push(this.children[h]), this.children = a;
    }
    return this;
  }, s.prototype.replaceRight = function(l, a) {
    var h = this.children[this.children.length - 1];
    return h[r] ? h.replaceRight(l, a) : typeof h == "string" ? this.children[this.children.length - 1] = h.replace(l, a) : this.children.push("".replace(l, a)), this;
  }, s.prototype.setSourceContent = function(l, a) {
    this.sourceContents[e.toSetString(l)] = a;
  }, s.prototype.walkSourceContents = function(l) {
    for (var a = 0, h = this.children.length; a < h; a++)
      this.children[a][r] && this.children[a].walkSourceContents(l);
    for (var c = Object.keys(this.sourceContents), a = 0, h = c.length; a < h; a++)
      l(e.fromSetString(c[a]), this.sourceContents[c[a]]);
  }, s.prototype.toString = function() {
    var l = "";
    return this.walk(function(a) {
      l += a;
    }), l;
  }, s.prototype.toStringWithSourceMap = function(l) {
    var a = {
      code: "",
      line: 1,
      column: 0
    }, h = new n(l), c = !1, f = null, u = null, d = null, p = null;
    return this.walk(function(m, g) {
      a.code += m, g.source !== null && g.line !== null && g.column !== null ? ((f !== g.source || u !== g.line || d !== g.column || p !== g.name) && h.addMapping({
        source: g.source,
        original: {
          line: g.line,
          column: g.column
        },
        generated: {
          line: a.line,
          column: a.column
        },
        name: g.name
      }), f = g.source, u = g.line, d = g.column, p = g.name, c = !0) : c && (h.addMapping({
        generated: {
          line: a.line,
          column: a.column
        }
      }), f = null, c = !1);
      for (var y = 0, v = m.length; y < v; y++)
        m.charCodeAt(y) === i ? (a.line++, a.column = 0, y + 1 === v ? (f = null, c = !1) : c && h.addMapping({
          source: g.source,
          original: {
            line: g.line,
            column: g.column
          },
          generated: {
            line: a.line,
            column: a.column
          },
          name: g.name
        })) : a.column++;
    }), this.walkSourceContents(function(m, g) {
      h.setSourceContent(m, g);
    }), { code: a.code, map: h };
  }, Ur.SourceNode = s, Ur;
}
var Gl;
function Ip() {
  return Gl || (Gl = 1, vi.SourceMapGenerator = Gh().SourceMapGenerator, vi.SourceMapConsumer = Bp().SourceMapConsumer, vi.SourceNode = Rp().SourceNode), vi;
}
(function(n, e) {
  e.__esModule = !0;
  var t = J, i = void 0;
  try {
    var r = Ip();
    i = r.SourceNode;
  } catch {
  }
  i || (i = function(l, a, h, c) {
    this.src = "", c && this.add(c);
  }, i.prototype = {
    add: function(a) {
      t.isArray(a) && (a = a.join("")), this.src += a;
    },
    prepend: function(a) {
      t.isArray(a) && (a = a.join("")), this.src = a + this.src;
    },
    toStringWithSourceMap: function() {
      return { code: this.toString() };
    },
    toString: function() {
      return this.src;
    }
  });
  function s(l, a, h) {
    if (t.isArray(l)) {
      for (var c = [], f = 0, u = l.length; f < u; f++)
        c.push(a.wrap(l[f], h));
      return c;
    } else if (typeof l == "boolean" || typeof l == "number")
      return l + "";
    return l;
  }
  function o(l) {
    this.srcFile = l, this.source = [];
  }
  o.prototype = {
    isEmpty: function() {
      return !this.source.length;
    },
    prepend: function(a, h) {
      this.source.unshift(this.wrap(a, h));
    },
    push: function(a, h) {
      this.source.push(this.wrap(a, h));
    },
    merge: function() {
      var a = this.empty();
      return this.each(function(h) {
        a.add(["  ", h, `
`]);
      }), a;
    },
    each: function(a) {
      for (var h = 0, c = this.source.length; h < c; h++)
        a(this.source[h]);
    },
    empty: function() {
      var a = this.currentLocation || { start: {} };
      return new i(a.start.line, a.start.column, this.srcFile);
    },
    wrap: function(a) {
      var h = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1];
      return a instanceof i ? a : (a = s(a, this, h), new i(h.start.line, h.start.column, this.srcFile, a));
    },
    functionCall: function(a, h, c) {
      return c = this.generateList(c), this.wrap([a, h ? "." + h + "(" : "(", c, ")"]);
    },
    quotedString: function(a) {
      return '"' + (a + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
    },
    objectLiteral: function(a) {
      var h = this, c = [];
      Object.keys(a).forEach(function(u) {
        var d = s(a[u], h);
        d !== "undefined" && c.push([h.quotedString(u), ":", d]);
      });
      var f = this.generateList(c);
      return f.prepend("{"), f.add("}"), f;
    },
    generateList: function(a) {
      for (var h = this.empty(), c = 0, f = a.length; c < f; c++)
        c && h.add(","), h.add(s(a[c], this));
      return h;
    },
    generateArray: function(a) {
      var h = this.generateList(a);
      return h.prepend("["), h.add("]"), h;
    }
  }, e.default = o, n.exports = e.default;
})(Ks, Ks.exports);
var Np = Ks.exports;
(function(n, e) {
  e.__esModule = !0;
  function t(u) {
    return u && u.__esModule ? u : { default: u };
  }
  var i = Re, r = Ve, s = t(r), o = J, l = Np, a = t(l);
  function h(u) {
    this.value = u;
  }
  function c() {
  }
  c.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(d, p) {
      return this.internalNameLookup(d, p);
    },
    depthedLookup: function(d) {
      return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(d), ")"];
    },
    compilerInfo: function() {
      var d = i.COMPILER_REVISION, p = i.REVISION_CHANGES[d];
      return [d, p];
    },
    appendToBuffer: function(d, p, m) {
      return o.isArray(d) || (d = [d]), d = this.source.wrap(d, p), this.environment.isSimple ? ["return ", d, ";"] : m ? ["buffer += ", d, ";"] : (d.appendToBuffer = !0, d);
    },
    initializeBuffer: function() {
      return this.quotedString("");
    },
    // END PUBLIC API
    internalNameLookup: function(d, p) {
      return this.lookupPropertyFunctionIsUsed = !0, ["lookupProperty(", d, ",", JSON.stringify(p), ")"];
    },
    lookupPropertyFunctionIsUsed: !1,
    compile: function(d, p, m, g) {
      this.environment = d, this.options = p, this.stringParams = this.options.stringParams, this.trackIds = this.options.trackIds, this.precompile = !g, this.name = this.environment.name, this.isChild = !!m, this.context = m || {
        decorators: [],
        programs: [],
        environments: []
      }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, this.registers = { list: [] }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], this.compileChildren(d, p), this.useDepths = this.useDepths || d.useDepths || d.useDecorators || this.options.compat, this.useBlockParams = this.useBlockParams || d.useBlockParams;
      var y = d.opcodes, v = void 0, w = void 0, b = void 0, x = void 0;
      for (b = 0, x = y.length; b < x; b++)
        v = y[b], this.source.currentLocation = v.loc, w = w || v.loc, this[v.opcode].apply(this, v.args);
      if (this.source.currentLocation = w, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length)
        throw new s.default("Compile completed with content left on stack");
      this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), `;
`]), this.decorators.push("return fn;"), g ? this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]) : (this.decorators.prepend(`function(fn, props, container, depth0, data, blockParams, depths) {
`), this.decorators.push(`}
`), this.decorators = this.decorators.merge()));
      var k = this.createFunctionContext(g);
      if (this.isChild)
        return k;
      var S = {
        compiler: this.compilerInfo(),
        main: k
      };
      this.decorators && (S.main_d = this.decorators, S.useDecorators = !0);
      var M = this.context, D = M.programs, _ = M.decorators;
      for (b = 0, x = D.length; b < x; b++)
        D[b] && (S[b] = D[b], _[b] && (S[b + "_d"] = _[b], S.useDecorators = !0));
      return this.environment.usePartial && (S.usePartial = !0), this.options.data && (S.useData = !0), this.useDepths && (S.useDepths = !0), this.useBlockParams && (S.useBlockParams = !0), this.options.compat && (S.compat = !0), g ? S.compilerOptions = this.options : (S.compiler = JSON.stringify(S.compiler), this.source.currentLocation = { start: { line: 1, column: 0 } }, S = this.objectLiteral(S), p.srcName ? (S = S.toStringWithSourceMap({ file: p.destName }), S.map = S.map && S.map.toString()) : S = S.toString()), S;
    },
    preamble: function() {
      this.lastContext = 0, this.source = new a.default(this.options.srcName), this.decorators = new a.default(this.options.srcName);
    },
    createFunctionContext: function(d) {
      var p = this, m = "", g = this.stackVars.concat(this.registers.list);
      g.length > 0 && (m += ", " + g.join(", "));
      var y = 0;
      Object.keys(this.aliases).forEach(function(b) {
        var x = p.aliases[b];
        x.children && x.referenceCount > 1 && (m += ", alias" + ++y + "=" + b, x.children[0] = "alias" + y);
      }), this.lookupPropertyFunctionIsUsed && (m += ", " + this.lookupPropertyFunctionVarDeclaration());
      var v = ["container", "depth0", "helpers", "partials", "data"];
      (this.useBlockParams || this.useDepths) && v.push("blockParams"), this.useDepths && v.push("depths");
      var w = this.mergeSource(m);
      return d ? (v.push(w), Function.apply(this, v)) : this.source.wrap(["function(", v.join(","), `) {
  `, w, "}"]);
    },
    mergeSource: function(d) {
      var p = this.environment.isSimple, m = !this.forceBuffer, g = void 0, y = void 0, v = void 0, w = void 0;
      return this.source.each(function(b) {
        b.appendToBuffer ? (v ? b.prepend("  + ") : v = b, w = b) : (v && (y ? v.prepend("buffer += ") : g = !0, w.add(";"), v = w = void 0), y = !0, p || (m = !1));
      }), m ? v ? (v.prepend("return "), w.add(";")) : y || this.source.push('return "";') : (d += ", buffer = " + (g ? "" : this.initializeBuffer()), v ? (v.prepend("return buffer + "), w.add(";")) : this.source.push("return buffer;")), d && this.source.prepend("var " + d.substring(2) + (g ? "" : `;
`)), this.source.merge();
    },
    lookupPropertyFunctionVarDeclaration: function() {
      return `
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }
    `.trim();
    },
    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function(d) {
      var p = this.aliasable("container.hooks.blockHelperMissing"), m = [this.contextName(0)];
      this.setupHelperArgs(d, 0, m);
      var g = this.popStack();
      m.splice(1, 0, g), this.push(this.source.functionCall(p, "call", m));
    },
    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      var d = this.aliasable("container.hooks.blockHelperMissing"), p = [this.contextName(0)];
      this.setupHelperArgs("", 0, p, !0), this.flushInline();
      var m = this.topStack();
      p.splice(1, 0, m), this.pushSource(["if (!", this.lastHelper, ") { ", m, " = ", this.source.functionCall(d, "call", p), "}"]);
    },
    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(d) {
      this.pendingContent ? d = this.pendingContent + d : this.pendingLocation = this.source.currentLocation, this.pendingContent = d;
    },
    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      if (this.isInline())
        this.replaceStack(function(p) {
          return [" != null ? ", p, ' : ""'];
        }), this.pushSource(this.appendToBuffer(this.popStack()));
      else {
        var d = this.popStack();
        this.pushSource(["if (", d, " != null) { ", this.appendToBuffer(d, void 0, !0), " }"]), this.environment.isSimple && this.pushSource(["else { ", this.appendToBuffer("''", void 0, !0), " }"]);
      }
    },
    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
    },
    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(d) {
      this.lastContext = d;
    },
    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    },
    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(d, p, m, g) {
      var y = 0;
      !g && this.options.compat && !this.lastContext ? this.push(this.depthedLookup(d[y++])) : this.pushContext(), this.resolvePath("context", d, y, p, m);
    },
    // [lookupBlockParam]
    //
    // On stack, before: ...
    // On stack, after: blockParam[name], ...
    //
    // Looks up the value of `parts` on the given block param and pushes
    // it onto the stack.
    lookupBlockParam: function(d, p) {
      this.useBlockParams = !0, this.push(["blockParams[", d[0], "][", d[1], "]"]), this.resolvePath("context", p, 1);
    },
    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function(d, p, m) {
      d ? this.pushStackLiteral("container.data(data, " + d + ")") : this.pushStackLiteral("data"), this.resolvePath("data", p, 0, !0, m);
    },
    resolvePath: function(d, p, m, g, y) {
      var v = this;
      if (this.options.strict || this.options.assumeObjects) {
        this.push(f(this.options.strict && y, this, p, m, d));
        return;
      }
      for (var w = p.length; m < w; m++)
        this.replaceStack(function(b) {
          var x = v.nameLookup(b, p[m], d);
          return g ? [" && ", x] : [" != null ? ", x, " : ", b];
        });
    },
    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
    },
    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(d, p) {
      this.pushContext(), this.pushString(p), p !== "SubExpression" && (typeof d == "string" ? this.pushString(d) : this.pushStackLiteral(d));
    },
    emptyHash: function(d) {
      this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), this.pushStackLiteral(d ? "undefined" : "{}");
    },
    pushHash: function() {
      this.hash && this.hashes.push(this.hash), this.hash = { values: {}, types: [], contexts: [], ids: [] };
    },
    popHash: function() {
      var d = this.hash;
      this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(d.ids)), this.stringParams && (this.push(this.objectLiteral(d.contexts)), this.push(this.objectLiteral(d.types))), this.push(this.objectLiteral(d.values));
    },
    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(d) {
      this.pushStackLiteral(this.quotedString(d));
    },
    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(d) {
      this.pushStackLiteral(d);
    },
    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(d) {
      d != null ? this.pushStackLiteral(this.programExpression(d)) : this.pushStackLiteral(null);
    },
    // [registerDecorator]
    //
    // On stack, before: hash, program, params..., ...
    // On stack, after: ...
    //
    // Pops off the decorator's parameters, invokes the decorator,
    // and inserts the decorator into the decorators list.
    registerDecorator: function(d, p) {
      var m = this.nameLookup("decorators", p, "decorator"), g = this.setupHelperArgs(p, d);
      this.decorators.push(["fn = ", this.decorators.functionCall(m, "", ["fn", "props", "container", g]), " || fn;"]);
    },
    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(d, p, m) {
      var g = this.popStack(), y = this.setupHelper(d, p), v = [];
      m && v.push(y.name), v.push(g), this.options.strict || v.push(this.aliasable("container.hooks.helperMissing"));
      var w = ["(", this.itemsSeparatedBy(v, "||"), ")"], b = this.source.functionCall(w, "call", y.callParams);
      this.push(b);
    },
    itemsSeparatedBy: function(d, p) {
      var m = [];
      m.push(d[0]);
      for (var g = 1; g < d.length; g++)
        m.push(p, d[g]);
      return m;
    },
    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(d, p) {
      var m = this.setupHelper(d, p);
      this.push(this.source.functionCall(m.name, "call", m.callParams));
    },
    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(d, p) {
      this.useRegister("helper");
      var m = this.popStack();
      this.emptyHash();
      var g = this.setupHelper(0, d, p), y = this.lastHelper = this.nameLookup("helpers", d, "helper"), v = ["(", "(helper = ", y, " || ", m, ")"];
      this.options.strict || (v[0] = "(helper = ", v.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"))), this.push(["(", v, g.paramsInit ? ["),(", g.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", g.callParams), " : helper))"]);
    },
    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(d, p, m) {
      var g = [], y = this.setupParams(p, 1, g);
      d && (p = this.popStack(), delete y.name), m && (y.indent = JSON.stringify(m)), y.helpers = "helpers", y.partials = "partials", y.decorators = "container.decorators", d ? g.unshift(p) : g.unshift(this.nameLookup("partials", p, "partial")), this.options.compat && (y.depths = "depths"), y = this.objectLiteral(y), g.push(y), this.push(this.source.functionCall("container.invokePartial", "", g));
    },
    // [assignToHash]
    //
    // On stack, before: value, ..., hash, ...
    // On stack, after: ..., hash, ...
    //
    // Pops a value off the stack and assigns it to the current hash
    assignToHash: function(d) {
      var p = this.popStack(), m = void 0, g = void 0, y = void 0;
      this.trackIds && (y = this.popStack()), this.stringParams && (g = this.popStack(), m = this.popStack());
      var v = this.hash;
      m && (v.contexts[d] = m), g && (v.types[d] = g), y && (v.ids[d] = y), v.values[d] = p;
    },
    pushId: function(d, p, m) {
      d === "BlockParam" ? this.pushStackLiteral("blockParams[" + p[0] + "].path[" + p[1] + "]" + (m ? " + " + JSON.stringify("." + m) : "")) : d === "PathExpression" ? this.pushString(p) : d === "SubExpression" ? this.pushStackLiteral("true") : this.pushStackLiteral("null");
    },
    // HELPERS
    compiler: c,
    compileChildren: function(d, p) {
      for (var m = d.children, g = void 0, y = void 0, v = 0, w = m.length; v < w; v++) {
        g = m[v], y = new this.compiler();
        var b = this.matchExistingProgram(g);
        if (b == null) {
          this.context.programs.push("");
          var x = this.context.programs.length;
          g.index = x, g.name = "program" + x, this.context.programs[x] = y.compile(g, p, this.context, !this.precompile), this.context.decorators[x] = y.decorators, this.context.environments[x] = g, this.useDepths = this.useDepths || y.useDepths, this.useBlockParams = this.useBlockParams || y.useBlockParams, g.useDepths = this.useDepths, g.useBlockParams = this.useBlockParams;
        } else
          g.index = b.index, g.name = "program" + b.index, this.useDepths = this.useDepths || b.useDepths, this.useBlockParams = this.useBlockParams || b.useBlockParams;
      }
    },
    matchExistingProgram: function(d) {
      for (var p = 0, m = this.context.environments.length; p < m; p++) {
        var g = this.context.environments[p];
        if (g && g.equals(d))
          return g;
      }
    },
    programExpression: function(d) {
      var p = this.environment.children[d], m = [p.index, "data", p.blockParams];
      return (this.useBlockParams || this.useDepths) && m.push("blockParams"), this.useDepths && m.push("depths"), "container.program(" + m.join(", ") + ")";
    },
    useRegister: function(d) {
      this.registers[d] || (this.registers[d] = !0, this.registers.list.push(d));
    },
    push: function(d) {
      return d instanceof h || (d = this.source.wrap(d)), this.inlineStack.push(d), d;
    },
    pushStackLiteral: function(d) {
      this.push(new h(d));
    },
    pushSource: function(d) {
      this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), this.pendingContent = void 0), d && this.source.push(d);
    },
    replaceStack: function(d) {
      var p = ["("], m = void 0, g = void 0, y = void 0;
      if (!this.isInline())
        throw new s.default("replaceStack on non-inline");
      var v = this.popStack(!0);
      if (v instanceof h)
        m = [v.value], p = ["(", m], y = !0;
      else {
        g = !0;
        var w = this.incrStack();
        p = ["((", this.push(w), " = ", v, ")"], m = this.topStack();
      }
      var b = d.call(this, m);
      y || this.popStack(), g && this.stackSlot--, this.push(p.concat(b, ")"));
    },
    incrStack: function() {
      return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var d = this.inlineStack;
      this.inlineStack = [];
      for (var p = 0, m = d.length; p < m; p++) {
        var g = d[p];
        if (g instanceof h)
          this.compileStack.push(g);
        else {
          var y = this.incrStack();
          this.pushSource([y, " = ", g, ";"]), this.compileStack.push(y);
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },
    popStack: function(d) {
      var p = this.isInline(), m = (p ? this.inlineStack : this.compileStack).pop();
      if (!d && m instanceof h)
        return m.value;
      if (!p) {
        if (!this.stackSlot)
          throw new s.default("Invalid stack pop");
        this.stackSlot--;
      }
      return m;
    },
    topStack: function() {
      var d = this.isInline() ? this.inlineStack : this.compileStack, p = d[d.length - 1];
      return p instanceof h ? p.value : p;
    },
    contextName: function(d) {
      return this.useDepths && d ? "depths[" + d + "]" : "depth" + d;
    },
    quotedString: function(d) {
      return this.source.quotedString(d);
    },
    objectLiteral: function(d) {
      return this.source.objectLiteral(d);
    },
    aliasable: function(d) {
      var p = this.aliases[d];
      return p ? (p.referenceCount++, p) : (p = this.aliases[d] = this.source.wrap(d), p.aliasable = !0, p.referenceCount = 1, p);
    },
    setupHelper: function(d, p, m) {
      var g = [], y = this.setupHelperArgs(p, d, g, m), v = this.nameLookup("helpers", p, "helper"), w = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
      return {
        params: g,
        paramsInit: y,
        name: v,
        callParams: [w].concat(g)
      };
    },
    setupParams: function(d, p, m) {
      var g = {}, y = [], v = [], w = [], b = !m, x = void 0;
      b && (m = []), g.name = this.quotedString(d), g.hash = this.popStack(), this.trackIds && (g.hashIds = this.popStack()), this.stringParams && (g.hashTypes = this.popStack(), g.hashContexts = this.popStack());
      var k = this.popStack(), S = this.popStack();
      (S || k) && (g.fn = S || "container.noop", g.inverse = k || "container.noop");
      for (var M = p; M--; )
        x = this.popStack(), m[M] = x, this.trackIds && (w[M] = this.popStack()), this.stringParams && (v[M] = this.popStack(), y[M] = this.popStack());
      return b && (g.args = this.source.generateArray(m)), this.trackIds && (g.ids = this.source.generateArray(w)), this.stringParams && (g.types = this.source.generateArray(v), g.contexts = this.source.generateArray(y)), this.options.data && (g.data = "data"), this.useBlockParams && (g.blockParams = "blockParams"), g;
    },
    setupHelperArgs: function(d, p, m, g) {
      var y = this.setupParams(d, p, m);
      return y.loc = JSON.stringify(this.source.currentLocation), y = this.objectLiteral(y), g ? (this.useRegister("options"), m.push("options"), ["options=", y]) : m ? (m.push(y), "") : y;
    }
  }, function() {
    for (var u = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), d = c.RESERVED_WORDS = {}, p = 0, m = u.length; p < m; p++)
      d[u[p]] = !0;
  }(), c.isValidJavaScriptVariableName = function(u) {
    return !c.RESERVED_WORDS[u] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(u);
  };
  function f(u, d, p, m, g) {
    var y = d.popStack(), v = p.length;
    for (u && v--; m < v; m++)
      y = d.nameLookup(y, p[m], g);
    return u ? [d.aliasable("container.strict"), "(", y, ", ", d.quotedString(p[m]), ", ", JSON.stringify(d.source.currentLocation), " )"] : y;
  }
  e.default = c, n.exports = e.default;
})(zs, zs.exports);
var Hp = zs.exports;
(function(n, e) {
  e.__esModule = !0;
  function t(v) {
    return v && v.__esModule ? v : { default: v };
  }
  var i = ip, r = t(i), s = Hh, o = t(s), l = nn, a = rn, h = Hp, c = t(h), f = Wh, u = t(f), d = Nh, p = t(d), m = r.default.create;
  function g() {
    var v = m();
    return v.compile = function(w, b) {
      return a.compile(w, b, v);
    }, v.precompile = function(w, b) {
      return a.precompile(w, b, v);
    }, v.AST = o.default, v.Compiler = a.Compiler, v.JavaScriptCompiler = c.default, v.Parser = l.parser, v.parse = l.parse, v.parseWithoutProcessing = l.parseWithoutProcessing, v;
  }
  var y = g();
  y.create = g, p.default(y), y.Visitor = u.default, y.default = y, e.default = y, n.exports = e.default;
})(ws, ws.exports);
var Wp = ws.exports;
const Fp = /* @__PURE__ */ Hf(Wp);
class Vp {
  constructor() {
    this.handlebars = Fp.create(), this.registerDefaultHelpers();
  }
  /**
   * Register common formatting helpers.
   */
  registerDefaultHelpers() {
    this.handlebars.registerHelper("formatCurrency", (e) => e ? Number(e).toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0 ₫"), this.handlebars.registerHelper("formatDate", (e) => e ? new Date(e).toLocaleDateString("vi-VN") : ""), this.handlebars.registerHelper("eq", function(e, t) {
      return e === t;
    }), this.handlebars.registerHelper("neq", function(e, t) {
      return e !== t;
    });
  }
  /**
   * Register a custom helper from outside.
   * @param {string} name 
   * @param {Function} fn 
   */
  registerHelper(e, t) {
    this.handlebars.registerHelper(e, t);
  }
  /**
   * Compiles and resolves the template with provided data.
   * @param {string} templateString 
   * @param {Object} data 
   * @returns {string} resolved string
   */
  resolve(e, t) {
    try {
      return this.handlebars.compile(e, { noEscape: !0 })(t);
    } catch (i) {
      throw console.error("MasaxTypst: Handlebars Compilation Error:", i), i;
    }
  }
}
const jl = new Vp();
let Jl = !1, Us = null;
const qp = "https://cdn.jsdelivr.net/npm", zp = "0.7.0-rc2";
function Hi(n, e) {
  return window.location.protocol !== "file:" && !window.location.href.includes("localhost") && !window.location.href.includes("127.0.0.1") ? `${qp}/${n}@${zp}/${e}` : `/node_modules/${n}/${e}`;
}
async function jh(n) {
  const e = await fetch(n);
  if (!e.ok) throw new Error(`Failed to fetch WASM: ${n}`);
  return await e.arrayBuffer();
}
async function Kp() {
  const n = Hi("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer.mjs"), e = Hi("@myriaddreamin/typst-ts-renderer", "pkg/typst_ts_renderer_bg.wasm"), t = await import(
    /* @vite-ignore */
    n
  );
  return t.setImportWasmModule && t.setImportWasmModule(async (i, r) => await jh(e)), t.default && await t.default(), t;
}
async function Up() {
  const n = Hi("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler.mjs"), e = Hi("@myriaddreamin/typst-ts-web-compiler", "pkg/typst_ts_web_compiler_bg.wasm"), t = await import(
    /* @vite-ignore */
    n
  );
  return t.setImportWasmModule && t.setImportWasmModule(async (i, r) => await jh(e)), t.default && await t.default(), t;
}
async function Jh() {
  if (!Jl)
    try {
      const [n, e] = await Promise.all([
        Kp(),
        Up()
      ]);
      Us = (await import(Hi("@myriaddreamin/typst.ts", "dist/esm/contrib/snippet.mjs"))).$typst, Jl = !0, console.info("MasaxTypst: WASM Compiler & Renderer ready.");
    } catch (n) {
      throw console.error("MasaxTypst: Failed to init compiler:", n), n;
    }
}
function Uo() {
  if (!Us) throw new Error("Typst not initialized. Call initCompiler() first.");
  return Us;
}
async function Yh(n) {
  const e = Uo(), t = /#image\(\s*"([^"]+)"/g;
  let i, r = n;
  for (; (i = t.exec(n)) !== null; ) {
    const s = i[1];
    let o = s;
    if (!o.startsWith("http"))
      try {
        o = new URL(s, window.location.href).href;
      } catch {
        o = s;
      }
    const a = `/assets/${s.split("/").pop().replace(/[^a-zA-Z0-9.-]/g, "_") || `image_${Date.now()}.png`}`;
    try {
      console.log("MasaxTypst: Fetching asset ->", o);
      let h;
      if (o.startsWith(window.location.origin) || !o.startsWith("http"))
        h = await fetch(o);
      else {
        const c = `https://api.allorigins.win/raw?url=${encodeURIComponent(o)}`;
        h = await fetch(c);
      }
      if (h.ok) {
        const c = await h.arrayBuffer(), f = new Uint8Array(c);
        await e.mapShadow(a, f), r = r.replaceAll(`"${s}"`, `"${a}"`);
      } else
        console.warn(`MasaxTypst: Missing image at: ${o}`), r = r.replaceAll(`"${s}"`, '""');
    } catch (h) {
      console.error(`MasaxTypst: Failed to fetch image ${o}`, h), r = r.replaceAll(`"${s}"`, '""');
    }
  }
  return r;
}
async function Gp(n) {
  await Jh();
  const e = Uo(), t = await Yh(n), i = await e.pdf({ mainContent: t });
  return new Blob([i], { type: "application/pdf" });
}
async function jp(n) {
  await Jh();
  const e = Uo(), t = await Yh(n), i = await e.svg({ mainContent: t });
  return Array.isArray(i) ? i.join("") : i || "";
}
class Jp {
  /**
   * @param {Object|string} blueprint - The blueprint containing the Typst template and configuration
   */
  constructor(e = null) {
    this.blueprint = null, this.extraFonts = [], e && this.loadBlueprint(e);
  }
  /**
   * Loads a new blueprint.
   * @param {Object|string} blueprintObj 
   */
  loadBlueprint(e) {
    try {
      typeof e == "string" ? this.blueprint = JSON.parse(e) : this.blueprint = e;
    } catch (t) {
      throw console.error("MasaxTypst: Invalid blueprint format."), t;
    }
  }
  /**
   * Alias for loadBlueprint
   * @param {Object|string} blueprintObj 
   */
  setBlueprint(e) {
    this.loadBlueprint(e);
  }
  /**
   * Creates a standard blueprint structure from a Typst template string
   * @param {string} typstTemplateString 
   * @returns {Object}
   */
  genBlueprint(e) {
    return {
      typstTemplate: e
    };
  }
  /**
   * Alias for generatePDF
   */
  async genPDF(e = {}) {
    return await this.generatePDF(e);
  }
  /**
   * Register additional fonts before generation
   * @param {Array<{path: string, data: Uint8Array}>} fonts 
   */
  setFonts(e) {
    this.extraFonts = e;
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
  async generatePDF(e = {}) {
    const t = this._getTemplate(), i = jl.resolve(t, e);
    return await Gp(i, this.extraFonts);
  }
  /**
   * Generates an array of SVG strings for live preview
   * @param {Object} data - Context data to resolve the template
   * @returns {Promise<Array<string>>}
   */
  async generateSVG(e = {}) {
    const t = this._getTemplate(), i = jl.resolve(t, e);
    return await jp(i, this.extraFonts);
  }
}
let Gs = [], Xh = [];
(() => {
  let n = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < n.length; e++)
    (e % 2 ? Xh : Gs).push(t = t + n[e]);
})();
function Yp(n) {
  if (n < 768) return !1;
  for (let e = 0, t = Gs.length; ; ) {
    let i = e + t >> 1;
    if (n < Gs[i]) t = i;
    else if (n >= Xh[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function Yl(n) {
  return n >= 127462 && n <= 127487;
}
const Xl = 8205;
function Xp(n, e, t = !0, i = !0) {
  return (t ? Qh : Qp)(n, e, i);
}
function Qh(n, e, t) {
  if (e == n.length) return e;
  e && Zh(n.charCodeAt(e)) && $h(n.charCodeAt(e - 1)) && e--;
  let i = Gr(n, e);
  for (e += Ql(i); e < n.length; ) {
    let r = Gr(n, e);
    if (i == Xl || r == Xl || t && Yp(r))
      e += Ql(r), i = r;
    else if (Yl(r)) {
      let s = 0, o = e - 2;
      for (; o >= 0 && Yl(Gr(n, o)); )
        s++, o -= 2;
      if (s % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Qp(n, e, t) {
  for (; e > 0; ) {
    let i = Qh(n, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function Gr(n, e) {
  let t = n.charCodeAt(e);
  if (!$h(t) || e + 1 == n.length) return t;
  let i = n.charCodeAt(e + 1);
  return Zh(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Zh(n) {
  return n >= 56320 && n < 57344;
}
function $h(n) {
  return n >= 55296 && n < 56320;
}
function Ql(n) {
  return n < 65536 ? 1 : 2;
}
class V {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = li(this, e, t);
    let r = [];
    return this.decompose(
      0,
      e,
      r,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      r,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      r,
      1
      /* Open.From */
    ), Xe.from(r, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = li(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), Xe.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), r = new Pi(this), s = new Pi(e);
    for (let o = t, l = t; ; ) {
      if (r.next(o), s.next(o), o = 0, r.lineBreak != s.lineBreak || r.done != s.done || r.value != s.value)
        return !1;
      if (l += r.value.length, r.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new Pi(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new ec(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let r = this.line(e).from;
      i = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new tc(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? V.empty : e.length <= 32 ? new Q(e) : Xe.from(Q.split(e, []));
  }
}
class Q extends V {
  constructor(e, t = Zp(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, r) {
    for (let s = 0; ; s++) {
      let o = this.text[s], l = r + o.length;
      if ((t ? i : l) >= e)
        return new $p(r, l, i, o);
      r = l + 1, i++;
    }
  }
  decompose(e, t, i, r) {
    let s = e <= 0 && t >= this.length ? this : new Q(Zl(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (r & 1) {
      let o = i.pop(), l = Vn(s.text, o.text.slice(), 0, s.length);
      if (l.length <= 32)
        i.push(new Q(l, o.length + s.length));
      else {
        let a = l.length >> 1;
        i.push(new Q(l.slice(0, a)), new Q(l.slice(a)));
      }
    } else
      i.push(s);
  }
  replace(e, t, i) {
    if (!(i instanceof Q))
      return super.replace(e, t, i);
    [e, t] = li(this, e, t);
    let r = Vn(this.text, Vn(i.text, Zl(this.text, 0, e)), t), s = this.length + i.length - (t - e);
    return r.length <= 32 ? new Q(r, s) : Xe.from(Q.split(r, []), s);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = li(this, e, t);
    let r = "";
    for (let s = 0, o = 0; s <= t && o < this.text.length; o++) {
      let l = this.text[o], a = s + l.length;
      s > e && o && (r += i), e < a && t > s && (r += l.slice(Math.max(0, e - s), t - s)), s = a + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], r = -1;
    for (let s of e)
      i.push(s), r += s.length + 1, i.length == 32 && (t.push(new Q(i, r)), i = [], r = -1);
    return r > -1 && t.push(new Q(i, r)), t;
  }
}
class Xe extends V {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, r) {
    for (let s = 0; ; s++) {
      let o = this.children[s], l = r + o.length, a = i + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, i, r);
      r = l + 1, i = a + 1;
    }
  }
  decompose(e, t, i, r) {
    for (let s = 0, o = 0; o <= t && s < this.children.length; s++) {
      let l = this.children[s], a = o + l.length;
      if (e <= a && t >= o) {
        let h = r & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = li(this, e, t), i.lines < this.lines)
      for (let r = 0, s = 0; r < this.children.length; r++) {
        let o = this.children[r], l = s + o.length;
        if (e >= s && t <= l) {
          let a = o.replace(e - s, t - s, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[r] = a, new Xe(c, this.length - (t - e) + i.length);
          }
          return super.replace(s, l, a);
        }
        s = l + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = li(this, e, t);
    let r = "";
    for (let s = 0, o = 0; s < this.children.length && o <= t; s++) {
      let l = this.children[s], a = o + l.length;
      o > e && s && (r += i), e < a && t > o && (r += l.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return r;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof Xe))
      return 0;
    let i = 0, [r, s, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; r += t, s += t) {
      if (r == o || s == l)
        return i;
      let a = this.children[r], h = e.children[s];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, r) => i + r.length + 1, -1)) {
    let i = 0;
    for (let d of e)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let p of e)
        p.flatten(d);
      return new Q(d, t);
    }
    let r = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), s = r << 1, o = r >> 1, l = [], a = 0, h = -1, c = [];
    function f(d) {
      let p;
      if (d.lines > s && d instanceof Xe)
        for (let m of d.children)
          f(m);
      else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof Q && a && (p = c[c.length - 1]) instanceof Q && d.lines + p.lines <= 32 ? (a += d.lines, h += d.length + 1, c[c.length - 1] = new Q(p.text.concat(d.text), p.length + 1 + d.length)) : (a + d.lines > r && u(), a += d.lines, h += d.length + 1, c.push(d));
    }
    function u() {
      a != 0 && (l.push(c.length == 1 ? c[0] : Xe.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let d of e)
      f(d);
    return u(), l.length == 1 ? l[0] : new Xe(l, t);
  }
}
V.empty = /* @__PURE__ */ new Q([""], 0);
function Zp(n) {
  let e = -1;
  for (let t of n)
    e += t.length + 1;
  return e;
}
function Vn(n, e, t = 0, i = 1e9) {
  for (let r = 0, s = 0, o = !0; s < n.length && r <= i; s++) {
    let l = n[s], a = r + l.length;
    a >= t && (a > i && (l = l.slice(0, i - r)), r < t && (l = l.slice(t - r)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), r = a + 1;
  }
  return e;
}
function Zl(n, e, t) {
  return Vn(n, [""], e, t);
}
class Pi {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof Q ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, r = this.nodes[i], s = this.offsets[i], o = s >> 1, l = r instanceof Q ? r.text.length : r.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((s & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (r instanceof Q) {
        let a = r.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = r.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof Q ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class ec {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new Pi(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: r } = this.cursor.next(e);
    return this.pos += (r.length + e) * t, this.value = r.length <= i ? r : t < 0 ? r.slice(r.length - i) : r.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class tc {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: r } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (V.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Pi.prototype[Symbol.iterator] = ec.prototype[Symbol.iterator] = tc.prototype[Symbol.iterator] = function() {
  return this;
});
class $p {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.number = i, this.text = r;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function li(n, e, t) {
  return e = Math.max(0, Math.min(n.length, e)), [e, Math.max(e, Math.min(n.length, t))];
}
function ne(n, e, t = !0, i = !0) {
  return Xp(n, e, t, i);
}
function em(n) {
  return n >= 56320 && n < 57344;
}
function tm(n) {
  return n >= 55296 && n < 56320;
}
function ye(n, e) {
  let t = n.charCodeAt(e);
  if (!tm(t) || e + 1 == n.length)
    return t;
  let i = n.charCodeAt(e + 1);
  return em(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Go(n) {
  return n <= 65535 ? String.fromCharCode(n) : (n -= 65536, String.fromCharCode((n >> 10) + 55296, (n & 1023) + 56320));
}
function Qe(n) {
  return n < 65536 ? 1 : 2;
}
const js = /\r\n?|\n/;
var me = /* @__PURE__ */ function(n) {
  return n[n.Simple = 0] = "Simple", n[n.TrackDel = 1] = "TrackDel", n[n.TrackBefore = 2] = "TrackBefore", n[n.TrackAfter = 3] = "TrackAfter", n;
}(me || (me = {}));
class nt {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, r = 0; t < this.sections.length; ) {
      let s = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, r, s), r += s) : r += o, i += s;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    Js(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], r = this.sections[t++];
      r < 0 ? e.push(i, r) : e.push(r, i);
    }
    return new nt(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : ic(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : Ys(this, e, t);
  }
  mapPos(e, t = -1, i = me.Simple) {
    let r = 0, s = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = r + l;
      if (a < 0) {
        if (h > e)
          return s + (e - r);
        s += l;
      } else {
        if (i != me.Simple && h >= e && (i == me.TrackDel && r < e && h > e || i == me.TrackBefore && r < e || i == me.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !l)
          return e == r || t < 0 ? s : s + a;
        s += a;
      }
      r = h;
    }
    if (e > r)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${r}`);
    return s;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, r = 0; i < this.sections.length && r <= t; ) {
      let s = this.sections[i++], o = this.sections[i++], l = r + s;
      if (o >= 0 && r <= t && l >= e)
        return r < e && l > t ? "cover" : !0;
      r = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], r = this.sections[t++];
      e += (e ? " " : "") + i + (r >= 0 ? ":" + r : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new nt(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new nt(e);
  }
}
class ee extends nt {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return Js(this, (t, i, r, s, o) => e = e.replace(r, r + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return Ys(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let r = 0, s = 0; r < t.length; r += 2) {
      let o = t[r], l = t[r + 1];
      if (l >= 0) {
        t[r] = l, t[r + 1] = o;
        let a = r >> 1;
        for (; i.length < a; )
          i.push(V.empty);
        i.push(o ? e.slice(s, s + o) : V.empty);
      }
      s += o;
    }
    return new ee(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : ic(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : Ys(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    Js(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return nt.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], r = [], s = new Wi(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && s.len == 0; ) {
        if (s.done)
          break e;
        let c = Math.min(s.len, a - l);
        he(r, c, -1);
        let f = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
        he(t, c, f), f > 0 && bt(i, t, s.text), s.forward(c), l += c;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (s.done)
          break e;
        let c = Math.min(s.len, h - l);
        he(t, c, -1), he(r, c, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(c), l += c;
      }
    }
    return {
      changes: new ee(t, i),
      filtered: nt.create(r)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], r = this.sections[t + 1];
      r < 0 ? e.push(i) : r == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let r = [], s = [], o = 0, l = null;
    function a(c = !1) {
      if (!c && !r.length)
        return;
      o < t && he(r, t - o, -1);
      let f = new ee(r, s);
      l = l ? l.compose(f.map(l)) : f, r = [], s = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof ee) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: u = f, insert: d } = c;
        if (f > u || f < 0 || u > t)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
        let p = d ? typeof d == "string" ? V.of(d.split(i || js)) : d : V.empty, m = p.length;
        if (f == u && m == 0)
          return;
        f < o && a(), f > o && he(r, f - o, -1), he(r, u - f, m), bt(s, r, p), o = u;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new ee(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let r = 0; r < e.length; r++) {
      let s = e[r];
      if (typeof s == "number")
        t.push(s, -1);
      else {
        if (!Array.isArray(s) || typeof s[0] != "number" || s.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (s.length == 1)
          t.push(s[0], 0);
        else {
          for (; i.length < r; )
            i.push(V.empty);
          i[r] = V.of(s.slice(1)), t.push(s[0], i[r].length);
        }
      }
    }
    return new ee(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new ee(e, t);
  }
}
function he(n, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let r = n.length - 2;
  r >= 0 && t <= 0 && t == n[r + 1] ? n[r] += e : r >= 0 && e == 0 && n[r] == 0 ? n[r + 1] += t : i ? (n[r] += e, n[r + 1] += t) : n.push(e, t);
}
function bt(n, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < n.length)
    n[n.length - 1] = n[n.length - 1].append(t);
  else {
    for (; n.length < i; )
      n.push(V.empty);
    n.push(t);
  }
}
function Js(n, e, t) {
  let i = n.inserted;
  for (let r = 0, s = 0, o = 0; o < n.sections.length; ) {
    let l = n.sections[o++], a = n.sections[o++];
    if (a < 0)
      r += l, s += l;
    else {
      let h = r, c = s, f = V.empty;
      for (; h += l, c += a, a && i && (f = f.append(i[o - 2 >> 1])), !(t || o == n.sections.length || n.sections[o + 1] < 0); )
        l = n.sections[o++], a = n.sections[o++];
      e(r, h, s, c, f), r = h, s = c;
    }
  }
}
function Ys(n, e, t, i = !1) {
  let r = [], s = i ? [] : null, o = new Wi(n), l = new Wi(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      he(r, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (he(r, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (he(r, 0, o.ins), s && bt(s, r, o.text), a = o.i), o.forward(c), h -= c;
      }
      l.next();
    } else if (o.ins >= 0) {
      let h = 0, c = o.len;
      for (; c; )
        if (l.ins == -1) {
          let f = Math.min(c, l.len);
          h += f, c -= f, l.forward(f);
        } else if (l.ins == 0 && l.len < c)
          c -= l.len, l.next();
        else
          break;
      he(r, h, a < o.i ? o.ins : 0), s && a < o.i && bt(s, r, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return s ? ee.createSet(r, s) : nt.create(r);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function ic(n, e, t = !1) {
  let i = [], r = t ? [] : null, s = new Wi(n), o = new Wi(e);
  for (let l = !1; ; ) {
    if (s.done && o.done)
      return r ? ee.createSet(i, r) : nt.create(i);
    if (s.ins == 0)
      he(i, s.len, 0, l), s.next();
    else if (o.len == 0 && !o.done)
      he(i, 0, o.ins, l), r && bt(r, i, o.text), o.next();
    else {
      if (s.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(s.len2, o.len), h = i.length;
        if (s.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          he(i, a, c, l), r && c && bt(r, i, o.text);
        } else o.ins == -1 ? (he(i, s.off ? 0 : s.len, a, l), r && bt(r, i, s.textBit(a))) : (he(i, s.off ? 0 : s.len, o.off ? 0 : o.ins, l), r && !o.off && bt(r, i, o.text));
        l = (s.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), s.forward2(a), o.forward(a);
      }
    }
  }
}
class Wi {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? V.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? V.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class Nt {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let e = this.flags >> 6;
    return e == 16777215 ? void 0 : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, r;
    return this.empty ? i = r = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), r = e.mapPos(this.to, -1)), i == this.from && r == this.to ? this : new Nt(i, r, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e) {
    if (e <= this.anchor && t >= this.anchor)
      return C.range(e, t);
    let i = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return C.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return C.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new Nt(e, t, i);
  }
}
class C {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : C.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new C([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return C.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, C.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new C(e.ranges.map((t) => Nt.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new C([C.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, r = 0; r < e.length; r++) {
      let s = e[r];
      if (s.empty ? s.from <= i : s.from < i)
        return C.normalized(e.slice(), t);
      i = s.to;
    }
    return new C(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, r) {
    return Nt.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (r ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, r) {
    let s = (i ?? 16777215) << 6 | (r == null ? 7 : Math.min(6, r));
    return t < e ? Nt.create(t, e, 48 | s) : Nt.create(e, t, (t > e ? 8 : 0) | s);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((r, s) => r.from - s.from), t = e.indexOf(i);
    for (let r = 1; r < e.length; r++) {
      let s = e[r], o = e[r - 1];
      if (s.empty ? s.from <= o.to : s.from < o.to) {
        let l = o.from, a = Math.max(s.to, o.to);
        r <= t && t--, e.splice(--r, 2, s.anchor > s.head ? C.range(a, l) : C.range(l, a));
      }
    }
    return new C(e, t);
  }
}
function nc(n, e) {
  for (let t of n.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let jo = 0;
class L {
  constructor(e, t, i, r, s) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = r, this.id = jo++, this.default = e([]), this.extensions = typeof s == "function" ? s(this) : s;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new L(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : Jo), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new qn([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new qn(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new qn(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function Jo(n, e) {
  return n == e || n.length == e.length && n.every((t, i) => t === e[i]);
}
class qn {
  constructor(e, t, i, r) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = r, this.id = jo++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, r = this.facet.compareInput, s = this.id, o = e[s] >> 1, l = this.type == 2, a = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? a = !0 : f == "selection" ? h = !0 : ((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1 || c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = i(f), 1;
      },
      update(f, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || Xs(f, c)) {
          let d = i(f);
          if (l ? !$l(d, f.values[o], r) : !r(d, f.values[o]))
            return f.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let d, p = u.config.address[s];
        if (p != null) {
          let m = Zn(u, p);
          if (this.dependencies.every((g) => g instanceof L ? u.facet(g) === f.facet(g) : g instanceof ue ? u.field(g, !1) == f.field(g, !1) : !0) || (l ? $l(d = i(f), m, r) : r(d = i(f), m)))
            return f.values[o] = m, 0;
        } else
          d = i(f);
        return f.values[o] = d, 1;
      }
    };
  }
}
function $l(n, e, t) {
  if (n.length != e.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (!t(n[i], e[i]))
      return !1;
  return !0;
}
function Xs(n, e) {
  let t = !1;
  for (let i of e)
    Di(n, i) & 1 && (t = !0);
  return t;
}
function im(n, e, t) {
  let i = t.map((a) => n[a.id]), r = t.map((a) => a.type), s = i.filter((a) => !(a & 1)), o = n[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < i.length; c++) {
      let f = Zn(a, i[c]);
      if (r[c] == 2)
        for (let u of f)
          h.push(u);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        Di(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!Xs(a, s))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = Xs(a, i), f = h.config.facets[e.id], u = h.facet(e);
      if (f && !c && Jo(t, f))
        return a.values[o] = u, 0;
      let d = l(a);
      return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
    }
  };
}
const gn = /* @__PURE__ */ L.define({ static: !0 });
class ue {
  constructor(e, t, i, r, s) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = r, this.spec = s, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new ue(jo++, e.create, e.update, e.compare || ((i, r) => i === r), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(gn).find((i) => i.field == this);
    return (t?.create || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, r) => {
        let s = i.values[t], o = this.updateF(s, r);
        return this.compareF(s, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, r) => {
        let s = i.facet(gn), o = r.facet(gn), l;
        return (l = s.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : r.config.address[this.id] != null ? (i.values[t] = r.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, gn.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const Rt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function xi(n) {
  return (e) => new rc(e, n);
}
const jt = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ xi(Rt.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ xi(Rt.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ xi(Rt.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ xi(Rt.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ xi(Rt.lowest)
};
class rc {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
}
class Sr {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new Qs(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Sr.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class Qs {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
}
class Qn {
  constructor(e, t, i, r, s, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = r, this.staticValues = s, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let r = [], s = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of nm(e, t, o))
      u instanceof ue ? r.push(u) : (s[u.facet.id] || (s[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of r)
      l[u.id] = h.length << 1, h.push((d) => u.slot(d));
    let c = i?.config.facets;
    for (let u in s) {
      let d = s[u], p = d[0].facet, m = c && c[u] || [];
      if (d.every(
        (g) => g.type == 0
        /* Provider.Static */
      ))
        if (l[p.id] = a.length << 1 | 1, Jo(m, d))
          a.push(i.facet(p));
        else {
          let g = p.combine(d.map((y) => y.value));
          a.push(i && p.compare(g, i.facet(p)) ? i.facet(p) : g);
        }
      else {
        for (let g of d)
          g.type == 0 ? (l[g.id] = a.length << 1 | 1, a.push(g.value)) : (l[g.id] = h.length << 1, h.push((y) => g.dynamicSlot(y)));
        l[p.id] = h.length << 1, h.push((g) => im(g, p, d));
      }
    }
    let f = h.map((u) => u(l));
    return new Qn(e, o, f, l, a, s);
  }
}
function nm(n, e, t) {
  let i = [[], [], [], [], []], r = /* @__PURE__ */ new Map();
  function s(o, l) {
    let a = r.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = i[a].indexOf(o);
      h > -1 && i[a].splice(h, 1), o instanceof Qs && t.delete(o.compartment);
    }
    if (r.set(o, l), Array.isArray(o))
      for (let h of o)
        s(h, l);
    else if (o instanceof Qs) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), s(h, l);
    } else if (o instanceof rc)
      s(o.inner, o.prec);
    else if (o instanceof ue)
      i[l].push(o), o.provides && s(o.provides, l);
    else if (o instanceof qn)
      i[l].push(o), o.facet.extensions && s(o.facet.extensions, Rt.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      s(h, l);
    }
  }
  return s(n, Rt.default), i.reduce((o, l) => o.concat(l));
}
function Di(n, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = n.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  n.status[t] = 4;
  let r = n.computeSlot(n, n.config.dynamicSlots[t]);
  return n.status[t] = 2 | r;
}
function Zn(n, e) {
  return e & 1 ? n.config.staticValues[e >> 1] : n.values[e >> 1];
}
const sc = /* @__PURE__ */ L.define(), Zs = /* @__PURE__ */ L.define({
  combine: (n) => n.some((e) => e),
  static: !0
}), oc = /* @__PURE__ */ L.define({
  combine: (n) => n.length ? n[0] : void 0,
  static: !0
}), lc = /* @__PURE__ */ L.define(), ac = /* @__PURE__ */ L.define(), hc = /* @__PURE__ */ L.define(), cc = /* @__PURE__ */ L.define({
  combine: (n) => n.length ? n[0] : !1
});
class pt {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new rm();
  }
}
class rm {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new pt(this, e);
  }
}
class sm {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new I(this, e);
  }
}
class I {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new I(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new sm(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let r of e) {
      let s = r.map(t);
      s && i.push(s);
    }
    return i;
  }
}
I.reconfigure = /* @__PURE__ */ I.define();
I.appendConfig = /* @__PURE__ */ I.define();
class te {
  constructor(e, t, i, r, s, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = r, this.annotations = s, this.scrollIntoView = o, this._doc = null, this._state = null, i && nc(i, t.newLength), s.some((l) => l.type == te.time) || (this.annotations = s.concat(te.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, r, s, o) {
    return new te(e, t, i, r, s, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(te.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
te.time = /* @__PURE__ */ pt.define();
te.userEvent = /* @__PURE__ */ pt.define();
te.addToHistory = /* @__PURE__ */ pt.define();
te.remote = /* @__PURE__ */ pt.define();
function om(n, e) {
  let t = [];
  for (let i = 0, r = 0; ; ) {
    let s, o;
    if (i < n.length && (r == e.length || e[r] >= n[i]))
      s = n[i++], o = n[i++];
    else if (r < e.length)
      s = e[r++], o = e[r++];
    else
      return t;
    !t.length || t[t.length - 1] < s ? t.push(s, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function uc(n, e, t) {
  var i;
  let r, s, o;
  return t ? (r = e.changes, s = ee.empty(e.changes.length), o = n.changes.compose(e.changes)) : (r = e.changes.map(n.changes), s = n.changes.mapDesc(e.changes, !0), o = n.changes.compose(r)), {
    changes: o,
    selection: e.selection ? e.selection.map(s) : (i = n.selection) === null || i === void 0 ? void 0 : i.map(r),
    effects: I.mapEffects(n.effects, r).concat(I.mapEffects(e.effects, s)),
    annotations: n.annotations.length ? n.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: n.scrollIntoView || e.scrollIntoView
  };
}
function $s(n, e, t) {
  let i = e.selection, r = ti(e.annotations);
  return e.userEvent && (r = r.concat(te.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof ee ? e.changes : ee.of(e.changes || [], t, n.facet(oc)),
    selection: i && (i instanceof C ? i : C.single(i.anchor, i.head)),
    effects: ti(e.effects),
    annotations: r,
    scrollIntoView: !!e.scrollIntoView
  };
}
function fc(n, e, t) {
  let i = $s(n, e.length ? e[0] : {}, n.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let s = 1; s < e.length; s++) {
    e[s].filter === !1 && (t = !1);
    let o = !!e[s].sequential;
    i = uc(i, $s(n, e[s], o ? i.changes.newLength : n.doc.length), o);
  }
  let r = te.create(n, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return am(t ? lm(r) : r);
}
function lm(n) {
  let e = n.startState, t = !0;
  for (let r of e.facet(lc)) {
    let s = r(n);
    if (s === !1) {
      t = !1;
      break;
    }
    Array.isArray(s) && (t = t === !0 ? s : om(t, s));
  }
  if (t !== !0) {
    let r, s;
    if (t === !1)
      s = n.changes.invertedDesc, r = ee.empty(e.doc.length);
    else {
      let o = n.changes.filter(t);
      r = o.changes, s = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    n = te.create(e, r, n.selection && n.selection.map(s), I.mapEffects(n.effects, s), n.annotations, n.scrollIntoView);
  }
  let i = e.facet(ac);
  for (let r = i.length - 1; r >= 0; r--) {
    let s = i[r](n);
    s instanceof te ? n = s : Array.isArray(s) && s.length == 1 && s[0] instanceof te ? n = s[0] : n = fc(e, ti(s), !1);
  }
  return n;
}
function am(n) {
  let e = n.startState, t = e.facet(hc), i = n;
  for (let r = t.length - 1; r >= 0; r--) {
    let s = t[r](n);
    s && Object.keys(s).length && (i = uc(i, $s(e, s, n.changes.newLength), !0));
  }
  return i == n ? n : te.create(e, n.changes, n.selection, i.effects, i.annotations, i.scrollIntoView);
}
const hm = [];
function ti(n) {
  return n == null ? hm : Array.isArray(n) ? n : [n];
}
var Y = /* @__PURE__ */ function(n) {
  return n[n.Word = 0] = "Word", n[n.Space = 1] = "Space", n[n.Other = 2] = "Other", n;
}(Y || (Y = {}));
const cm = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let eo;
try {
  eo = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function um(n) {
  if (eo)
    return eo.test(n);
  for (let e = 0; e < n.length; e++) {
    let t = n[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || cm.test(t)))
      return !0;
  }
  return !1;
}
function fm(n) {
  return (e) => {
    if (!/\S/.test(e))
      return Y.Space;
    if (um(e))
      return Y.Word;
    for (let t = 0; t < n.length; t++)
      if (e.indexOf(n[t]) > -1)
        return Y.Word;
    return Y.Other;
  };
}
class F {
  constructor(e, t, i, r, s, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = s, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      Di(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Di(this, i), Zn(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return fc(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: r } = t;
    for (let l of e.effects)
      l.is(Sr.reconfigure) ? (t && (r = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => r.set(h, a)), t = null), r.set(l.value.compartment, l.value.extension)) : l.is(I.reconfigure) ? (t = null, i = l.value) : l.is(I.appendConfig) && (t = null, i = ti(i).concat(l.value));
    let s;
    t ? s = e.startState.values.slice() : (t = Qn.resolve(i, r, this), s = new F(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(Zs) ? e.newSelection : e.newSelection.asSingle();
    new F(t, e.newDoc, o, s, (l, a) => a.update(l, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: C.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), r = this.changes(i.changes), s = [i.range], o = ti(i.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(r);
      for (let u = 0; u < l; u++)
        s[u] = s[u].map(c);
      let f = r.mapDesc(h, !0);
      s.push(a.range.map(f)), r = r.compose(c), o = I.mapEffects(o, c).concat(I.mapEffects(ti(a.effects), f));
    }
    return {
      changes: r,
      selection: C.create(s, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof ee ? e : ee.of(e, this.doc.length, this.facet(F.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return V.of(e.split(this.facet(F.lineSeparator) || js));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (Di(this, t), Zn(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let r = e[i];
        r instanceof ue && this.config.address[r.id] != null && (t[i] = r.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let r = [];
    if (i) {
      for (let s in i)
        if (Object.prototype.hasOwnProperty.call(e, s)) {
          let o = i[s], l = e[s];
          r.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return F.create({
      doc: e.doc,
      selection: C.fromJSON(e.selection),
      extensions: t.extensions ? r.concat([t.extensions]) : r
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = Qn.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof V ? e.doc : V.of((e.doc || "").split(t.staticFacet(F.lineSeparator) || js)), r = e.selection ? e.selection instanceof C ? e.selection : C.single(e.selection.anchor, e.selection.head) : C.single(0);
    return nc(r, i.length), t.staticFacet(Zs) || (r = r.asSingle()), new F(t, i, r, t.dynamicSlots.map(() => null), (s, o) => o.create(s), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(F.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(F.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(cc);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(F.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, r) => {
      if (r == "$")
        return "$";
      let s = +(r || 1);
      return !s || s > t.length ? i : t[s - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let r = [];
    for (let s of this.facet(sc))
      for (let o of s(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && r.push(o[e]);
    return r;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return fm(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: r } = this.doc.lineAt(e), s = this.charCategorizer(e), o = e - i, l = e - i;
    for (; o > 0; ) {
      let a = ne(t, o, !1);
      if (s(t.slice(a, o)) != Y.Word)
        break;
      o = a;
    }
    for (; l < r; ) {
      let a = ne(t, l);
      if (s(t.slice(l, a)) != Y.Word)
        break;
      l = a;
    }
    return o == l ? null : C.range(o + i, l + i);
  }
}
F.allowMultipleSelections = Zs;
F.tabSize = /* @__PURE__ */ L.define({
  combine: (n) => n.length ? n[0] : 4
});
F.lineSeparator = oc;
F.readOnly = cc;
F.phrases = /* @__PURE__ */ L.define({
  compare(n, e) {
    let t = Object.keys(n), i = Object.keys(e);
    return t.length == i.length && t.every((r) => n[r] == e[r]);
  }
});
F.languageData = sc;
F.changeFilter = lc;
F.transactionFilter = ac;
F.transactionExtender = hc;
Sr.reconfigure = /* @__PURE__ */ I.define();
function rt(n, e, t = {}) {
  let i = {};
  for (let r of n)
    for (let s of Object.keys(r)) {
      let o = r[s], l = i[s];
      if (l === void 0)
        i[s] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, s))
        i[s] = t[s](l, o);
      else
        throw new Error("Config merge conflict for field " + s);
    }
  for (let r in e)
    i[r] === void 0 && (i[r] = e[r]);
  return i;
}
class St {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return to.create(e, t, this);
  }
}
St.prototype.startSide = St.prototype.endSide = 0;
St.prototype.point = !1;
St.prototype.mapMode = me.TrackDel;
function Yo(n, e) {
  return n == e || n.constructor == e.constructor && n.eq(e);
}
let to = class dc {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new dc(e, t, i);
  }
};
function io(n, e) {
  return n.from - e.from || n.value.startSide - e.value.startSide;
}
class Xo {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = r;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, r = 0) {
    let s = i ? this.to : this.from;
    for (let o = r, l = s.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = s[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, i, r) {
    for (let s = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, s); s < o; s++)
      if (r(this.from[s] + e, this.to[s] + e, this.value[s]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], r = [], s = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, d;
      if (c == f) {
        let p = t.mapPos(c, h.startSide, h.mapMode);
        if (p == null || (u = d = p, h.startSide != h.endSide && (d = t.mapPos(c, h.endSide), d < u)))
          continue;
      } else if (u = t.mapPos(c, h.startSide), d = t.mapPos(f, h.endSide), u > d || u == d && h.startSide > 0 && h.endSide <= 0)
        continue;
      (d - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, d - u)), i.push(h), r.push(u - o), s.push(d - o));
    }
    return { mapped: i.length ? new Xo(r, s, i, l) : null, pos: o };
  }
}
class N {
  constructor(e, t, i, r) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = r;
  }
  /**
  @internal
  */
  static create(e, t, i, r) {
    return new N(e, t, i, r);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: r = 0, filterTo: s = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(io)), this.isEmpty)
      return t.length ? N.of(t) : this;
    let l = new pc(this, null, -1).goto(0), a = 0, h = [], c = new ut();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || r > this.chunkEnd(l.chunkIndex) || s < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || r > l.to || s < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(to.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? N.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: r, filterTo: s }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], r = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        r = Math.max(r, a.maxPoint), t.push(a), i.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: c, pos: f } = a.map(l, e);
        c && (r = Math.max(r, c.maxPoint), t.push(c), i.push(f));
      }
    }
    let s = this.nextLayer.map(e);
    return t.length == 0 ? s : new N(i, t, s || N.empty, r);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let r = 0; r < this.chunk.length; r++) {
        let s = this.chunkPos[r], o = this.chunk[r];
        if (t >= s && e <= s + o.length && o.between(s, e - s, t - s, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return Fi.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return Fi.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, r, s = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= s), a = ea(o, l, i), h = new wi(o, a, s), c = new wi(l, a, s);
    i.iterGaps((f, u, d) => ta(h, f, c, u, d, r)), i.empty && i.length == 0 && ta(h, 0, c, 0, 0, r);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, r) {
    r == null && (r = 999999999);
    let s = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0), o = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0);
    if (s.length != o.length)
      return !1;
    if (!s.length)
      return !0;
    let l = ea(s, o), a = new wi(s, l, 0).goto(i), h = new wi(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !no(a.active, h.active) || a.point && (!h.point || !Yo(a.point, h.point)))
        return !1;
      if (a.to > r)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, r, s = -1) {
    let o = new wi(e, null, s).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, i);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, a);
        r.point(l, h, o.point, c, f, o.pointRank), a = Math.min(o.openEnd(h), c.length);
      } else h > l && (r.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new ut();
    for (let r of e instanceof to ? [e] : t ? dm(e) : e)
      i.add(r.from, r.to, r.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return N.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let r = e[i]; r != N.empty; r = r.nextLayer)
        t = new N(r.chunkPos, r.chunk, t, Math.max(r.maxPoint, t.maxPoint));
    return t;
  }
}
N.empty = /* @__PURE__ */ new N([], [], null, -1);
function dm(n) {
  if (n.length > 1)
    for (let e = n[0], t = 1; t < n.length; t++) {
      let i = n[t];
      if (io(e, i) > 0)
        return n.slice().sort(io);
      e = i;
    }
  return n;
}
N.empty.nextLayer = N.empty;
class ut {
  finishChunk(e) {
    this.chunks.push(new Xo(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new ut())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let r = e - this.lastTo || i.startSide - this.last.endSide;
    if (r <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return r < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(N.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = N.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function ea(n, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let s of n)
    for (let o = 0; o < s.chunk.length; o++)
      s.chunk[o].maxPoint <= 0 && i.set(s.chunk[o], s.chunkPos[o]);
  let r = /* @__PURE__ */ new Set();
  for (let s of e)
    for (let o = 0; o < s.chunk.length; o++) {
      let l = i.get(s.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == s.chunkPos[o] && !t?.touchesRange(l, l + s.chunk[o].length) && r.add(s.chunk[o]);
    }
  return r;
}
class pc {
  constructor(e, t, i, r = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = r;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let r = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(r) || this.layer.chunkEnd(this.chunkIndex) < e || r.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < r) && this.setRangeIndex(r);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class Fi {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let r = [];
    for (let s = 0; s < e.length; s++)
      for (let o = e[s]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && r.push(new pc(o, t, i, s));
    return r.length == 1 ? r[0] : new Fi(r);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      jr(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      jr(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), jr(this.heap, 0);
    }
  }
}
function jr(n, e) {
  for (let t = n[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= n.length)
      break;
    let r = n[i];
    if (i + 1 < n.length && r.compare(n[i + 1]) >= 0 && (r = n[i + 1], i++), t.compare(r) < 0)
      break;
    n[i] = t, n[e] = r, e = i;
  }
}
class wi {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Fi.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    yn(this.active, e), yn(this.activeTo, e), yn(this.activeRank, e), this.minActive = ia(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: r, rank: s } = this.cursor;
    for (; t < this.activeRank.length && (s - this.activeRank[t] || r - this.activeTo[t]) > 0; )
      t++;
    vn(this.active, t, i), vn(this.activeTo, t, r), vn(this.activeRank, t, s), e && vn(e, t, this.cursor.from), this.minActive = ia(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let r = this.minActive;
      if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[r] > e) {
          this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
          break;
        }
        this.removeActive(r), i && yn(i, r);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let s = this.cursor.value;
          if (!s.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = s, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = s.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let r = i.length - 1; r >= 0 && i[r] < e; r--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function ta(n, e, t, i, r, s) {
  n.goto(e), t.goto(i);
  let o = i + r, l = i, a = i - e, h = !!s.boundChange;
  for (let c = !1; ; ) {
    let f = n.to + a - t.to, u = f || n.endSide - t.endSide, d = u < 0 ? n.to + a : t.to, p = Math.min(d, o);
    if (n.point || t.point ? (n.point && t.point && Yo(n.point, t.point) && no(n.activeForPoint(n.to), t.activeForPoint(t.to)) || s.comparePoint(l, p, n.point, t.point), c = !1) : (c && s.boundChange(l), p > l && !no(n.active, t.active) && s.compareRange(l, p, n.active, t.active), h && p < o && (f || n.openEnd(d) != t.openEnd(d)) && (c = !0)), d > o)
      break;
    l = d, u <= 0 && n.next(), u >= 0 && t.next();
  }
}
function no(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (n[t] != e[t] && !Yo(n[t], e[t]))
      return !1;
  return !0;
}
function yn(n, e) {
  for (let t = e, i = n.length - 1; t < i; t++)
    n[t] = n[t + 1];
  n.pop();
}
function vn(n, e, t) {
  for (let i = n.length - 1; i >= e; i--)
    n[i + 1] = n[i];
  n[e] = t;
}
function ia(n, e) {
  let t = -1, i = 1e9;
  for (let r = 0; r < e.length; r++)
    (e[r] - i || n[r].endSide - n[t].endSide) < 0 && (t = r, i = e[r]);
  return t;
}
function pi(n, e, t = n.length) {
  let i = 0;
  for (let r = 0; r < t && r < n.length; )
    n.charCodeAt(r) == 9 ? (i += e - i % e, r++) : (i++, r = ne(n, r));
  return i;
}
function ro(n, e, t, i) {
  for (let r = 0, s = 0; ; ) {
    if (s >= e)
      return r;
    if (r == n.length)
      break;
    s += n.charCodeAt(r) == 9 ? t - s % t : 1, r = ne(n, r);
  }
  return i === !0 ? -1 : n.length;
}
const so = "ͼ", na = typeof Symbol > "u" ? "__" + so : Symbol.for(so), oo = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), ra = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class kt {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function r(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function s(o, l, a, h) {
      let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
      if (f && l == null) return a.push(o[0] + ";");
      for (let d in l) {
        let p = l[d];
        if (/&/.test(d))
          s(
            d.split(/,\s*/).map((m) => o.map((g) => m.replace(/&/, g))).reduce((m, g) => m.concat(g)),
            p,
            a
          );
        else if (p && typeof p == "object") {
          if (!f) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
          s(r(d), p, c, u);
        } else p != null && c.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()) + ": " + p + ";");
      }
      (c.length || u) && a.push((i && !f && !h ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in e) s(r(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = ra[na] || 1;
    return ra[na] = e + 1, so + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let r = e[oo], s = i && i.nonce;
    r ? s && r.setNonce(s) : r = new pm(e, s), r.mount(Array.isArray(t) ? t : [t], e);
  }
}
let sa = /* @__PURE__ */ new Map();
class pm {
  constructor(e, t) {
    let i = e.ownerDocument || e, r = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
      let s = sa.get(i);
      if (s) return e[oo] = s;
      this.sheet = new r.CSSStyleSheet(), sa.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[oo] = this;
  }
  mount(e, t) {
    let i = this.sheet, r = 0, s = 0;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = this.modules.indexOf(l);
      if (a < s && a > -1 && (this.modules.splice(a, 1), s--, a = -1), a == -1) {
        if (this.modules.splice(s++, 0, l), i) for (let h = 0; h < l.rules.length; h++)
          i.insertRule(l.rules[h], r++);
      } else {
        for (; s < a; ) r += this.modules[s++].rules.length;
        r += l.rules.length, s++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let a = 0; a < this.modules.length; a++)
        o += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = o;
      let l = t.head || t;
      this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var Ct = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Vi = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, mm = typeof navigator < "u" && /Mac/.test(navigator.platform), gm = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var oe = 0; oe < 10; oe++) Ct[48 + oe] = Ct[96 + oe] = String(oe);
for (var oe = 1; oe <= 24; oe++) Ct[oe + 111] = "F" + oe;
for (var oe = 65; oe <= 90; oe++)
  Ct[oe] = String.fromCharCode(oe + 32), Vi[oe] = String.fromCharCode(oe);
for (var Jr in Ct) Vi.hasOwnProperty(Jr) || (Vi[Jr] = Ct[Jr]);
function ym(n) {
  var e = mm && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || gm && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? Vi : Ct)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
function z() {
  var n = arguments[0];
  typeof n == "string" && (n = document.createElement(n));
  var e = 1, t = arguments[1];
  if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
    for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) {
      var r = t[i];
      typeof r == "string" ? n.setAttribute(i, r) : r != null && (n[i] = r);
    }
    e++;
  }
  for (; e < arguments.length; e++) mc(n, arguments[e]);
  return n;
}
function mc(n, e) {
  if (typeof e == "string")
    n.appendChild(document.createTextNode(e));
  else if (e != null) if (e.nodeType != null)
    n.appendChild(e);
  else if (Array.isArray(e))
    for (var t = 0; t < e.length; t++) mc(n, e[t]);
  else
    throw new RangeError("Unsupported child node: " + e);
}
let pe = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, lo = typeof document < "u" ? document : { documentElement: { style: {} } };
const ao = /* @__PURE__ */ /Edge\/(\d+)/.exec(pe.userAgent), gc = /* @__PURE__ */ /MSIE \d/.test(pe.userAgent), ho = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(pe.userAgent), kr = !!(gc || ho || ao), oa = !kr && /* @__PURE__ */ /gecko\/(\d+)/i.test(pe.userAgent), Yr = !kr && /* @__PURE__ */ /Chrome\/(\d+)/.exec(pe.userAgent), vm = "webkitFontSmoothing" in lo.documentElement.style, co = !kr && /* @__PURE__ */ /Apple Computer/.test(pe.vendor), la = co && (/* @__PURE__ */ /Mobile\/\w+/.test(pe.userAgent) || pe.maxTouchPoints > 2);
var E = {
  mac: la || /* @__PURE__ */ /Mac/.test(pe.platform),
  windows: /* @__PURE__ */ /Win/.test(pe.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(pe.platform),
  ie: kr,
  ie_version: gc ? lo.documentMode || 6 : ho ? +ho[1] : ao ? +ao[1] : 0,
  gecko: oa,
  gecko_version: oa ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(pe.userAgent) || [0, 0])[1] : 0,
  chrome: !!Yr,
  chrome_version: Yr ? +Yr[1] : 0,
  ios: la,
  android: /* @__PURE__ */ /Android\b/.test(pe.userAgent),
  webkit_version: vm ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(pe.userAgent) || [0, 0])[1] : 0,
  safari: co,
  safari_version: co ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(pe.userAgent) || [0, 0])[1] : 0,
  tabSize: lo.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function Qo(n, e) {
  for (let t in n)
    t == "class" && e.class ? e.class += " " + n.class : t == "style" && e.style ? e.style += ";" + n.style : e[t] = n[t];
  return e;
}
const $n = /* @__PURE__ */ Object.create(null);
function Zo(n, e, t) {
  if (n == e)
    return !0;
  n || (n = $n), e || (e = $n);
  let i = Object.keys(n), r = Object.keys(e);
  if (i.length - 0 != r.length - 0)
    return !1;
  for (let s of i)
    if (s != t && (r.indexOf(s) == -1 || n[s] !== e[s]))
      return !1;
  return !0;
}
function bm(n, e) {
  for (let t = n.attributes.length - 1; t >= 0; t--) {
    let i = n.attributes[t].name;
    e[i] == null && n.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? n.style.cssText = i : n.getAttribute(t) != i && n.setAttribute(t, i);
  }
}
function aa(n, e, t) {
  let i = !1;
  if (e)
    for (let r in e)
      t && r in t || (i = !0, r == "style" ? n.style.cssText = "" : n.removeAttribute(r));
  if (t)
    for (let r in t)
      e && e[r] == t[r] || (i = !0, r == "style" ? n.style.cssText = t[r] : n.setAttribute(r, t[r]));
  return i;
}
function xm(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < n.attributes.length; t++) {
    let i = n.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class mt {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var ae = /* @__PURE__ */ function(n) {
  return n[n.Text = 0] = "Text", n[n.WidgetBefore = 1] = "WidgetBefore", n[n.WidgetAfter = 2] = "WidgetAfter", n[n.WidgetRange = 3] = "WidgetRange", n;
}(ae || (ae = {}));
class R extends St {
  constructor(e, t, i, r) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = r;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new on(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new qt(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, r;
    if (e.isBlockGap)
      i = -5e8, r = 4e8;
    else {
      let { start: s, end: o } = yc(e, t);
      i = (s ? t ? -3e8 : -1 : 5e8) - 1, r = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new qt(e, i, r, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new ln(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return N.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
R.none = N.empty;
class on extends R {
  constructor(e) {
    let { start: t, end: i } = yc(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Qo(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || $n;
  }
  eq(e) {
    return this == e || e instanceof on && this.tagName == e.tagName && Zo(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
on.prototype.point = !1;
class ln extends R {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof ln && this.spec.class == e.spec.class && Zo(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
ln.prototype.mapMode = me.TrackBefore;
ln.prototype.point = !0;
class qt extends R {
  constructor(e, t, i, r, s, o) {
    super(t, i, s, e), this.block = r, this.isReplace = o, this.mapMode = r ? t <= 0 ? me.TrackBefore : me.TrackAfter : me.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? ae.WidgetRange : this.startSide <= 0 ? ae.WidgetBefore : ae.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof qt && wm(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
qt.prototype.point = !0;
function yc(n, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = n;
  return t == null && (t = n.inclusive), i == null && (i = n.inclusive), { start: t ?? e, end: i ?? e };
}
function wm(n, e) {
  return n == e || !!(n && e && n.compare(e));
}
function ii(n, e, t, i = 0) {
  let r = t.length - 1;
  r >= 0 && t[r] + i >= n ? t[r] = Math.max(t[r], e) : t.push(n, e);
}
class qi extends St {
  constructor(e, t) {
    super(), this.tagName = e, this.attributes = t;
  }
  eq(e) {
    return e == this || e instanceof qi && this.tagName == e.tagName && Zo(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new qi(e.tagName, e.attributes || $n);
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return N.of(e, t);
  }
}
qi.prototype.startSide = qi.prototype.endSide = -1;
function zi(n) {
  let e;
  return n.nodeType == 11 ? e = n.getSelection ? n : n.ownerDocument : e = n, e.getSelection();
}
function uo(n, e) {
  return e ? n == e || n.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function _i(n, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return uo(n, e.anchorNode);
  } catch {
    return !1;
  }
}
function zn(n) {
  return n.nodeType == 3 ? Ki(n, 0, n.nodeValue.length).getClientRects() : n.nodeType == 1 ? n.getClientRects() : [];
}
function Ti(n, e, t, i) {
  return t ? ha(n, e, t, i, -1) || ha(n, e, t, i, 1) : !1;
}
function Mt(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}
function er(n) {
  return n.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(n.nodeName);
}
function ha(n, e, t, i, r) {
  for (; ; ) {
    if (n == t && e == i)
      return !0;
    if (e == (r < 0 ? 0 : ft(n))) {
      if (n.nodeName == "DIV")
        return !1;
      let s = n.parentNode;
      if (!s || s.nodeType != 1)
        return !1;
      e = Mt(n) + (r < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      if (n = n.childNodes[e + (r < 0 ? -1 : 0)], n.nodeType == 1 && n.contentEditable == "false")
        return !1;
      e = r < 0 ? ft(n) : 0;
    } else
      return !1;
  }
}
function ft(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function tr(n, e) {
  let t = e ? n.left : n.right;
  return { left: t, right: t, top: n.top, bottom: n.bottom };
}
function Sm(n) {
  let e = n.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.innerWidth,
    top: 0,
    bottom: n.innerHeight
  };
}
function vc(n, e) {
  let t = e.width / n.offsetWidth, i = e.height / n.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - n.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - n.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function km(n, e, t, i, r, s, o, l) {
  let a = n.ownerDocument, h = a.defaultView || window;
  for (let c = n, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let u, d = c == a.body, p = 1, m = 1;
      if (d)
        u = Sm(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let v = c.getBoundingClientRect();
        ({ scaleX: p, scaleY: m } = vc(c, v)), u = {
          left: v.left,
          right: v.left + c.clientWidth * p,
          top: v.top,
          bottom: v.top + c.clientHeight * m
        };
      }
      let g = 0, y = 0;
      if (r == "nearest")
        e.top < u.top ? (y = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + y && (y = e.bottom - u.bottom + o)) : e.bottom > u.bottom && (y = e.bottom - u.bottom + o, t < 0 && e.top - y < u.top && (y = e.top - (u.top + o)));
      else {
        let v = e.bottom - e.top, w = u.bottom - u.top;
        y = (r == "center" && v <= w ? e.top + v / 2 - w / 2 : r == "start" || r == "center" && t < 0 ? e.top - o : e.bottom - w + o) - u.top;
      }
      if (i == "nearest" ? e.left < u.left ? (g = e.left - (u.left + s), t > 0 && e.right > u.right + g && (g = e.right - u.right + s)) : e.right > u.right && (g = e.right - u.right + s, t < 0 && e.left < u.left + g && (g = e.left - (u.left + s))) : g = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - s : e.right - (u.right - u.left) + s) - u.left, g || y)
        if (d)
          h.scrollBy(g, y);
        else {
          let v = 0, w = 0;
          if (y) {
            let b = c.scrollTop;
            c.scrollTop += y / m, w = (c.scrollTop - b) * m;
          }
          if (g) {
            let b = c.scrollLeft;
            c.scrollLeft += g / p, v = (c.scrollLeft - b) * p;
          }
          e = {
            left: e.left - v,
            top: e.top - w,
            right: e.right - v,
            bottom: e.bottom - w
          }, v && Math.abs(v - g) < 1 && (i = "nearest"), w && Math.abs(w - y) < 1 && (r = "nearest");
        }
      if (d)
        break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function bc(n, e = !0) {
  let t = n.ownerDocument, i = null, r = null;
  for (let s = n.parentNode; s && !(s == t.body || (!e || i) && r); )
    if (s.nodeType == 1)
      !r && s.scrollHeight > s.clientHeight && (r = s), e && !i && s.scrollWidth > s.clientWidth && (i = s), s = s.assignedSlot || s.parentNode;
    else if (s.nodeType == 11)
      s = s.host;
    else
      break;
  return { x: i, y: r };
}
class Cm {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? ft(t) : 0), i, Math.min(e.focusOffset, i ? ft(i) : 0));
  }
  set(e, t, i, r) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = r;
  }
}
let Bt = null;
E.safari && E.safari_version >= 26 && (Bt = !1);
function xc(n) {
  if (n.setActive)
    return n.setActive();
  if (Bt)
    return n.focus(Bt);
  let e = [];
  for (let t = n; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (n.focus(Bt == null ? {
    get preventScroll() {
      return Bt = { preventScroll: !0 }, !0;
    }
  } : void 0), !Bt) {
    Bt = !1;
    for (let t = 0; t < e.length; ) {
      let i = e[t++], r = e[t++], s = e[t++];
      i.scrollTop != r && (i.scrollTop = r), i.scrollLeft != s && (i.scrollLeft = s);
    }
  }
}
let ca;
function Ki(n, e, t = e) {
  let i = ca || (ca = document.createRange());
  return i.setEnd(n, t), i.setStart(n, e), i;
}
function ni(n, e, t, i) {
  let r = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: r.altKey, ctrlKey: r.ctrlKey, shiftKey: r.shiftKey, metaKey: r.metaKey } = i);
  let s = new KeyboardEvent("keydown", r);
  s.synthetic = !0, n.dispatchEvent(s);
  let o = new KeyboardEvent("keyup", r);
  return o.synthetic = !0, n.dispatchEvent(o), s.defaultPrevented || o.defaultPrevented;
}
function Mm(n) {
  for (; n; ) {
    if (n && (n.nodeType == 9 || n.nodeType == 11 && n.host))
      return n;
    n = n.assignedSlot || n.parentNode;
  }
  return null;
}
function Am(n, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, ft(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let r = t.childNodes[i - 1];
      r.contentEditable == "false" ? i-- : (t = r, i = ft(t));
    } else {
      if (t == n)
        return !0;
      i = Mt(t), t = t.parentNode;
    }
}
function wc(n) {
  return n instanceof Window ? n.pageYOffset > Math.max(0, n.document.documentElement.scrollHeight - n.innerHeight - 4) : n.scrollTop > Math.max(1, n.scrollHeight - n.clientHeight - 4);
}
function Sc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = ft(t);
    } else if (t.parentNode && !er(t))
      i = Mt(t), t = t.parentNode;
    else
      return null;
  }
}
function kc(n, e) {
  for (let t = n, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !er(t))
      i = Mt(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class We {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new We(e.parentNode, Mt(e), t);
  }
  static after(e, t) {
    return new We(e.parentNode, Mt(e) + 1, t);
  }
}
var U = /* @__PURE__ */ function(n) {
  return n[n.LTR = 0] = "LTR", n[n.RTL = 1] = "RTL", n;
}(U || (U = {}));
const zt = U.LTR, $o = U.RTL;
function Cc(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    e.push(1 << +n[t]);
  return e;
}
const Om = /* @__PURE__ */ Cc("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Em = /* @__PURE__ */ Cc("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), fo = /* @__PURE__ */ Object.create(null), Ge = [];
for (let n of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ n.charCodeAt(0), t = /* @__PURE__ */ n.charCodeAt(1);
  fo[e] = t, fo[t] = -e;
}
function Mc(n) {
  return n <= 247 ? Om[n] : 1424 <= n && n <= 1524 ? 2 : 1536 <= n && n <= 1785 ? Em[n - 1536] : 1774 <= n && n <= 2220 ? 4 : 8192 <= n && n <= 8204 ? 256 : 64336 <= n && n <= 65023 ? 4 : 1;
}
const Lm = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class $e {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? $o : zt;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, r) {
    let s = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == i)
          return o;
        (s < 0 || (r != 0 ? r < 0 ? l.from < t : l.to > t : e[s].level > l.level)) && (s = o);
      }
    }
    if (s < 0)
      throw new RangeError("Index out of range");
    return s;
  }
}
function Ac(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++) {
    let i = n[t], r = e[t];
    if (i.from != r.from || i.to != r.to || i.direction != r.direction || !Ac(i.inner, r.inner))
      return !1;
  }
  return !0;
}
const K = [];
function Pm(n, e, t, i, r) {
  for (let s = 0; s <= i.length; s++) {
    let o = s ? i[s - 1].to : e, l = s < i.length ? i[s].from : t, a = s ? 256 : r;
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = Mc(n.charCodeAt(h));
      u == 512 ? u = c : u == 8 && f == 4 && (u = 16), K[h] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
    }
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = K[h];
      if (u == 128)
        h < l - 1 && c == K[h + 1] && c & 24 ? u = K[h] = c : K[h] = 256;
      else if (u == 64) {
        let d = h + 1;
        for (; d < l && K[d] == 64; )
          d++;
        let p = h && c == 8 || d < t && K[d] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let m = h; m < d; m++)
          K[m] = p;
        h = d - 1;
      } else u == 8 && f == 1 && (K[h] = 1);
      c = u, u & 7 && (f = u);
    }
  }
}
function Dm(n, e, t, i, r) {
  let s = r == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
    let h = o ? i[o - 1].to : e, c = o < i.length ? i[o].from : t;
    for (let f = h, u, d, p; f < c; f++)
      if (d = fo[u = n.charCodeAt(f)])
        if (d < 0) {
          for (let m = l - 3; m >= 0; m -= 3)
            if (Ge[m + 1] == -d) {
              let g = Ge[m + 2], y = g & 2 ? r : g & 4 ? g & 1 ? s : r : 0;
              y && (K[f] = K[Ge[m]] = y), l = m;
              break;
            }
        } else {
          if (Ge.length == 189)
            break;
          Ge[l++] = f, Ge[l++] = u, Ge[l++] = a;
        }
      else if ((p = K[f]) == 2 || p == 1) {
        let m = p == r;
        a = m ? 0 : 1;
        for (let g = l - 3; g >= 0; g -= 3) {
          let y = Ge[g + 2];
          if (y & 2)
            break;
          if (m)
            Ge[g + 2] |= 2;
          else {
            if (y & 4)
              break;
            Ge[g + 2] |= 4;
          }
        }
      }
  }
}
function _m(n, e, t, i) {
  for (let r = 0, s = i; r <= t.length; r++) {
    let o = r ? t[r - 1].to : n, l = r < t.length ? t[r].from : e;
    for (let a = o; a < l; ) {
      let h = K[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == l) {
            if (r == t.length)
              break;
            c = t[r++].to, l = r < t.length ? t[r].from : e;
          } else if (K[c] == 256)
            c++;
          else
            break;
        let f = s == 1, u = (c < e ? K[c] : i) == 1, d = f == u ? f ? 1 : 2 : i;
        for (let p = c, m = r, g = m ? t[m - 1].to : n; p > a; )
          p == g && (p = t[--m].from, g = m ? t[m - 1].to : n), K[--p] = d;
        a = c;
      } else
        s = h, a++;
    }
  }
}
function po(n, e, t, i, r, s, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == r % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == s.length || a < s[h].from) {
        let m = K[a];
        m != l && (c = !1, f = m == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, p = a;
      e: for (; ; )
        if (h < s.length && p == s[h].from) {
          if (f)
            break e;
          let m = s[h];
          if (!c)
            for (let g = m.to, y = h + 1; ; ) {
              if (g == t)
                break e;
              if (y < s.length && s[y].from == g)
                g = s[y++].to;
              else {
                if (K[g] == l)
                  break e;
                break;
              }
            }
          if (h++, u)
            u.push(m);
          else {
            m.from > a && o.push(new $e(a, m.from, d));
            let g = m.direction == zt != !(d % 2);
            mo(n, g ? i + 1 : i, r, m.inner, m.from, m.to, o), a = m.to;
          }
          p = m.to;
        } else {
          if (p == t || (c ? K[p] != l : K[p] == l))
            break;
          p++;
        }
      u ? po(n, a, p, i + 1, r, u, o) : a < p && o.push(new $e(a, p, d)), a = p;
    }
  else
    for (let a = t, h = s.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > s[h - 1].to) {
        let m = K[a - 1];
        m != l && (c = !1, f = m == 16);
      }
      let u = !c && l == 1 ? [] : null, d = c ? i : i + 1, p = a;
      e: for (; ; )
        if (h && p == s[h - 1].to) {
          if (f)
            break e;
          let m = s[--h];
          if (!c)
            for (let g = m.from, y = h; ; ) {
              if (g == e)
                break e;
              if (y && s[y - 1].to == g)
                g = s[--y].from;
              else {
                if (K[g - 1] == l)
                  break e;
                break;
              }
            }
          if (u)
            u.push(m);
          else {
            m.to < a && o.push(new $e(m.to, a, d));
            let g = m.direction == zt != !(d % 2);
            mo(n, g ? i + 1 : i, r, m.inner, m.from, m.to, o), a = m.from;
          }
          p = m.from;
        } else {
          if (p == e || (c ? K[p - 1] != l : K[p - 1] == l))
            break;
          p--;
        }
      u ? po(n, p, a, i + 1, r, u, o) : p < a && o.push(new $e(p, a, d)), a = p;
    }
}
function mo(n, e, t, i, r, s, o) {
  let l = e % 2 ? 2 : 1;
  Pm(n, r, s, i, l), Dm(n, r, s, i, l), _m(r, s, i, l), po(n, r, s, e, t, i, o);
}
function Tm(n, e, t) {
  if (!n)
    return [new $e(0, 0, e == $o ? 1 : 0)];
  if (e == zt && !t.length && !Lm.test(n))
    return Oc(n.length);
  if (t.length)
    for (; n.length > K.length; )
      K[K.length] = 256;
  let i = [], r = e == zt ? 0 : 1;
  return mo(n, r, r, t, 0, n.length, i), i;
}
function Oc(n) {
  return [new $e(0, n, 0)];
}
let Ec = "";
function Bm(n, e, t, i, r) {
  var s;
  let o = i.head - n.from, l = $e.find(e, o, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc), a = e[l], h = a.side(r, t);
  if (o == h) {
    let u = l += r ? 1 : -1;
    if (u < 0 || u >= e.length)
      return null;
    a = e[l = u], o = a.side(!r, t), h = a.side(r, t);
  }
  let c = ne(n.text, o, a.forward(r, t));
  (c < a.from || c > a.to) && (c = h), Ec = n.text.slice(Math.min(o, c), Math.max(o, c));
  let f = l == (r ? e.length - 1 : 0) ? null : e[l + (r ? 1 : -1)];
  return f && c == h && f.level + (r ? 0 : 1) < a.level ? C.cursor(f.side(!r, t) + n.from, f.forward(r, t) ? 1 : -1, f.level) : C.cursor(c + n.from, a.forward(r, t) ? -1 : 1, a.level);
}
function Rm(n, e, t) {
  for (let i = e; i < t; i++) {
    let r = Mc(n.charCodeAt(i));
    if (r == 1)
      return zt;
    if (r == 2 || r == 4)
      return $o;
  }
  return zt;
}
const Lc = /* @__PURE__ */ L.define(), Pc = /* @__PURE__ */ L.define(), Dc = /* @__PURE__ */ L.define(), _c = /* @__PURE__ */ L.define(), go = /* @__PURE__ */ L.define(), Tc = /* @__PURE__ */ L.define(), Bc = /* @__PURE__ */ L.define(), el = /* @__PURE__ */ L.define(), tl = /* @__PURE__ */ L.define(), Rc = /* @__PURE__ */ L.define({
  combine: (n) => n.some((e) => e)
}), Ic = /* @__PURE__ */ L.define({
  combine: (n) => n.some((e) => e)
}), Nc = /* @__PURE__ */ L.define();
class ri {
  constructor(e, t = "nearest", i = "nearest", r = 5, s = 5, o = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = r, this.xMargin = s, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new ri(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new ri(C.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const bn = /* @__PURE__ */ I.define({ map: (n, e) => n.map(e) }), Hc = /* @__PURE__ */ I.define();
function xe(n, e, t) {
  let i = n.facet(_c);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const ht = /* @__PURE__ */ L.define({ combine: (n) => n.length ? n[0] : !0 });
let Im = 0;
const Zt = /* @__PURE__ */ L.define({
  combine(n) {
    return n.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (n[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class $ {
  constructor(e, t, i, r, s) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = r, this.baseExtensions = s(this), this.extension = this.baseExtensions.concat(Zt.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Zt.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: r, provide: s, decorations: o } = t || {};
    return new $(Im++, e, i, r, (l) => {
      let a = [];
      return o && a.push(Cr.of((h) => {
        let c = h.plugin(l);
        return c ? o(c) : R.none;
      })), s && a.push(s(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return $.define((i, r) => new e(i, r), t);
  }
}
class Xr {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (xe(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        xe(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        xe(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const Wc = /* @__PURE__ */ L.define(), il = /* @__PURE__ */ L.define(), Cr = /* @__PURE__ */ L.define(), Fc = /* @__PURE__ */ L.define(), nl = /* @__PURE__ */ L.define(), an = /* @__PURE__ */ L.define(), Vc = /* @__PURE__ */ L.define();
function ua(n, e) {
  let t = n.state.facet(Vc);
  if (!t.length)
    return t;
  let i = t.map((s) => s instanceof Function ? s(n) : s), r = [];
  return N.spans(i, e.from, e.to, {
    point() {
    },
    span(s, o, l, a) {
      let h = s - e.from, c = o - e.from, f = r;
      for (let u = l.length - 1; u >= 0; u--, a--) {
        let d = l[u].spec.bidiIsolate, p;
        if (d == null && (d = Rm(e.text, h, c)), a > 0 && f.length && (p = f[f.length - 1]).to == h && p.direction == d)
          p.to = c, f = p.inner;
        else {
          let m = { from: h, to: c, direction: d, inner: [] };
          f.push(m), f = m.inner;
        }
      }
    }
  }), r;
}
const qc = /* @__PURE__ */ L.define();
function rl(n) {
  let e = 0, t = 0, i = 0, r = 0;
  for (let s of n.state.facet(qc)) {
    let o = s(n);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (r = Math.max(r, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: r };
}
const Mi = /* @__PURE__ */ L.define();
class Pe {
  constructor(e, t, i, r) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = r;
  }
  join(e) {
    return new Pe(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let r = e[t - 1];
      if (!(r.fromA > i.toA)) {
        if (r.toA < i.fromA)
          break;
        i = i.join(r), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let r = 0, s = 0, o = 0; ; ) {
      let l = r < e.length ? e[r].fromB : 1e9, a = s < t.length ? t[s] : 1e9, h = Math.min(l, a);
      if (h == 1e9)
        break;
      let c = h + o, f = h, u = c;
      for (; ; )
        if (s < t.length && t[s] <= f) {
          let d = t[s + 1];
          s += 2, f = Math.max(f, d);
          for (let p = r; p < e.length && e[p].fromB <= f; p++)
            o = e[p].toA - e[p].toB;
          u = Math.max(u, d + o);
        } else if (r < e.length && e[r].fromB <= f) {
          let d = e[r++];
          f = Math.max(f, d.toB), u = Math.max(u, d.toA), o = d.toA - d.toB;
        } else
          break;
      i.push(new Pe(c, u, h, f));
    }
    return i;
  }
}
class ir {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = ee.empty(this.startState.doc.length);
    for (let s of i)
      this.changes = this.changes.compose(s.changes);
    let r = [];
    this.changes.iterChangedRanges((s, o, l, a) => r.push(new Pe(s, o, l, a))), this.changedRanges = r;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new ir(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const Nm = [];
class X {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return Nm;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && bm(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let r of this.children) {
      if (r == e)
        return i;
      i += r.length + r.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t) {
    return null;
  }
  domPosFor(e, t) {
    let i = Mt(this.dom), r = this.length ? e > 0 : t > 0;
    return new We(this.parent.dom, i + (r ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof Ar)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class Mr extends X {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, r, s = e?.node == t ? e : null, o = 0;
    for (let l of this.children) {
      if (l.sync(e), o += l.length + l.breakAfter, r = i ? i.nextSibling : t.firstChild, s && r != l.dom && (s.written = !0), l.dom.parentNode == t)
        for (; r && r != l.dom; )
          r = fa(r);
      else
        t.insertBefore(l.dom, r);
      i = l.dom;
    }
    for (r = i ? i.nextSibling : t.firstChild, s && r && (s.written = !0); r; )
      r = fa(r);
    this.length = o;
  }
}
function fa(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Ar extends Mr {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = X.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, r = 0, s = 0; ; )
      if (r == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && s++, r = t.pop();
      } else {
        let o = i.children[r++];
        if (o instanceof ct)
          t.push(r), i = o, r = 0;
        else {
          let l = s + o.length, a = e(o, s);
          if (a !== void 0)
            return a;
          s = l + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, r = -1, s, o = -1;
    if (this.blockTiles((l, a) => {
      let h = a + l.length;
      if (e >= a && e <= h) {
        if (l.isWidget() && t >= -1 && t <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (i = void 0);
        }
        (a < e || e == h && (t < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, r = e - a), (h > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!s || !l.isWidget() && s.isWidget()) && (s = l, o = e - a);
      }
    }), !i && !s)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !s ? { tile: i, offset: r } : { tile: s, offset: o };
  }
}
class ct extends Mr {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new ct(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class ai extends Mr {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let r = new ai(t || document.createElement("div"), e);
    return (!t || !i) && (r.flags |= 4), r;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, i) {
    let r = null, s = -1, o = null, l = -1;
    function a(c, f) {
      for (let u = 0, d = 0; u < c.children.length && d <= f; u++) {
        let p = c.children[u], m = d + p.length;
        m >= f && (p.isComposite() ? a(p, f - d) : (!o || o.isHidden && (t > 0 || i && Wm(o, p))) && (m > f || p.flags & 32) ? (o = p, l = f - d) : (d < f || p.flags & 16 && !p.isHidden) && (r = p, s = f - d)), d = m;
      }
    }
    a(this, e);
    let h = (t < 0 ? r : o) || r || o;
    return h ? { tile: h, offset: h == r ? s : l } : null;
  }
  coordsIn(e, t) {
    let i = this.resolveInline(e, t, !0);
    return i ? i.tile.coordsIn(Math.max(0, i.offset), t) : Hm(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: r, offset: s } = i;
      if (this.dom.contains(r.dom))
        return r.isText() ? new We(r.dom, Math.min(r.dom.nodeValue.length, s)) : r.domPosFor(s, r.flags & 16 ? 1 : r.flags & 32 ? -1 : t);
      let o = i.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new We(a.dom, 0);
        a == i.tile && (l = !0);
      }
    }
    return new We(this.dom, 0);
  }
}
function Hm(n) {
  let e = n.dom.lastChild;
  if (!e)
    return n.dom.getBoundingClientRect();
  let t = zn(e);
  return t[t.length - 1] || null;
}
function Wm(n, e) {
  let t = n.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class be extends Mr {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new be(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Ht extends X {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t) {
    let i = this.dom.nodeValue.length;
    e > i && (e = i);
    let r = e, s = e, o = 0;
    e == 0 && t < 0 || e == i && t >= 0 ? E.chrome || E.gecko || (e ? (r--, o = 1) : s < i && (s++, o = -1)) : t < 0 ? r-- : s < i && s++;
    let l = Ki(this.dom, r, s).getClientRects();
    if (!l.length)
      return null;
    let a = l[(o ? o < 0 : t >= 0) ? 0 : l.length - 1];
    return E.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (h) => h.width) || a), o ? tr(a, o < 0) : a || null;
  }
  static of(e, t) {
    let i = new Ht(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class Kt extends X {
  constructor(e, t, i, r) {
    super(e, t, r), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let r = this.widget.coordsAt(this.dom, e, t);
    if (r)
      return r;
    if (i)
      return tr(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let s = this.dom.getClientRects(), o = null;
      if (!s.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? s.length - 1 : 0; o = s[a], !(e > 0 ? a == 0 : a == s.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return tr(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return V.empty;
    let { root: e } = this;
    if (!e)
      return V.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, r, s) {
    return s || (s = e.toDOM(t), e.editable || (s.contentEditable = "false")), new Kt(s, i, e, r);
  }
}
class nr extends X {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return V.empty;
  }
  coordsIn(e) {
    return this.dom.getBoundingClientRect();
  }
}
class Fm {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: r, index: s, beforeBreak: o, parents: l } = this;
    for (; e || t > 0; )
      if (r.isComposite())
        if (o) {
          if (!e)
            break;
          i && i.break(), e--, o = !1;
        } else if (s == r.children.length) {
          if (!e && !l.length)
            break;
          i && i.leave(r), o = !!r.breakAfter, { tile: r, index: s } = l.pop(), s++;
        } else {
          let a = r.children[s], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!h, s++, e -= a.length) : (l.push({ tile: r, index: s }), r = a, s = 0, i && a.isComposite() && i.enter(a));
        }
      else if (s == r.length)
        o = !!r.breakAfter, { tile: r, index: s } = l.pop(), s++;
      else if (e) {
        let a = Math.min(e, r.length - s);
        i && i.skip(r, s, s + a), e -= a, s += a;
      } else
        break;
    return this.tile = r, this.index = s, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Vm {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = r;
  }
}
class qm {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, r) {
    var s;
    this.flushBuffer();
    let o = this.ensureMarks(t, i), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new Ht(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(r || Ht.of(e, (s = this.cache.find(Ht)) === null || s === void 0 ? void 0 : s.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? Qr(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let r = i;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = r.lastChild;
      if (h instanceof be && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(Qr(a.dom)), r = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = X.get(a.dom);
          f && f.setDOM(Qr(a.dom));
        }
        let c = be.of(a.mark, a.dom);
        r.append(c), r = c;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let s = X.get(e.text);
    s && this.cache.reused.set(
      s,
      2
      /* Reused.DOM */
    );
    let o = new Ht(e.text, e.text.nodeValue);
    o.flags |= 8, r.append(o);
  }
  addInlineWidget(e, t, i) {
    let r = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    r || this.flushBuffer();
    let s = this.ensureMarks(t, i);
    !r && !(e.flags & 16) && s.append(this.getBuffer(1)), s.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = zc);
    let r = ai.start(e, t || ((i = this.cache.find(ai)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = r);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let r = this.curLine;
    for (let s = e.length - 1; s >= 0; s--) {
      let o = e[s], l;
      if (t > 0 && (l = r.lastChild) && l instanceof be && l.mark.eq(o))
        r = l, t--;
      else {
        let a = be.of(o, (i = this.cache.find(be, (h) => h.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        r.append(a), r = a, t = 0;
      }
    }
    return r;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !da(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(E.ios && da(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        Zr,
        0,
        32
        /* TileFlag.After */
      ) || new Kt(
        Zr.toDOM(),
        0,
        Zr,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = new Vm(e.from, e.to, e.value, e.rank), i = this.wrappers.length;
        for (; i > 0 && (this.wrappers[i - 1].rank - t.rank || this.wrappers[i - 1].to - t.to) < 0; )
          i--;
        this.wrappers.splice(i, 0, t);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let r = t.lastChild;
      if (i.from < this.pos && r instanceof ct && r.wrapper.eq(i.wrapper))
        t = r;
      else {
        let s = ct.of(i.wrapper, (e = this.cache.find(ct, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(s), t = s;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      nr,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new nr(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class zm {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: r, lineBreak: s, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = r;
      let l = this.textOff = Math.min(e, r.length);
      return s ? null : r.slice(0, l);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const rr = [Kt, ai, Ht, be, nr, ct, Ar];
for (let n = 0; n < rr.length; n++)
  rr[n].bucket = n;
class Km {
  constructor(e) {
    this.view = e, this.buckets = rr.map(() => []), this.index = rr.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let r = e.bucket, s = this.buckets[r], o = this.index[r];
    for (let l = s.length - 1; l >= 0; l--) {
      let a = (l + o) % s.length, h = s[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return s.splice(a, 1), a < o && this.index[r]--, this.reused.set(h, i), h;
    }
    return null;
  }
  findWidget(e, t, i) {
    let r = this.buckets[0];
    if (r.length)
      for (let s = 0, o = 0; ; s++) {
        if (s == r.length) {
          if (o)
            return null;
          o = 1, s = 0;
        }
        let l = r[s];
        if (!this.reused.has(l) && (o == 0 ? l.widget.compare(e) : l.widget.constructor == e.constructor && e.updateDOM(l.dom, this.view)))
          return r.splice(s, 1), s < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == i ? (this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l) : (this.reused.set(
            l,
            2
            /* Reused.DOM */
          ), new Kt(l.dom, t, e, l.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class Um {
  constructor(e, t, i, r, s) {
    this.view = e, this.decorations = r, this.disallowBlockEffectsFor = s, this.openWidget = !1, this.openMarks = 0, this.cache = new Km(e), this.text = new zm(e.state.doc), this.builder = new qm(this.cache, new Ar(e, e.contentDOM), N.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new Fm(t), this.reuseWalker = {
      skip: (o, l, a) => {
        if (this.cache.add(o), o.isComposite())
          return !1;
      },
      enter: (o) => this.cache.add(o),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let r = 0, s = 0, o = 0; ; ) {
      let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
      if (a > r) {
        let h = a - r;
        this.preserve(h, !o, !l), r = a, s += h;
      }
      if (!l)
        break;
      t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(s, t.range.fromB), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(s, l.toB)), s = l.toB, r = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let r = Jm(this.old), s = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? Kt.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, r, s), s = r.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !l && a == o.length && !this.cache.reused.has(o) ? this.builder.addText(o.text, r, s, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, a), r, s)), s = r.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof nr)
          this.cache.add(o);
        else if (o instanceof be)
          this.builder.ensureLine(null), this.builder.addMark(o, r, s), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), s = r.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof be && r.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? r.length && (r.length = s = 0) : o instanceof be && (r.shift(), s = Math.min(s, r.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, r = this.builder, s = 0, o = N.spans(this.decorations, e, t, {
      point: (l, a, h, c, f, u) => {
        if (h instanceof qt) {
          if (this.disallowBlockEffectsFor[u]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (s = c.length, f > c.length)
            r.continueWidget(a - l);
          else {
            let d = h.widget || (h.block ? hi.block : hi.inline), p = Gm(h), m = this.cache.findWidget(d, a - l, p) || Kt.of(d, this.view, a - l, p);
            h.block ? (h.startSide > 0 && r.addLineStartIfNotCovered(i), r.addBlockWidget(m)) : (r.ensureLine(i), r.addInlineWidget(m, c, f));
          }
          i = null;
        } else
          i = jm(i, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, c) => {
        for (let f = l; f < a; ) {
          let u = this.text.next(Math.min(512, a - f));
          u == null ? (r.addLineStartIfNotCovered(i), r.addBreak(), f++) : (r.ensureLine(i), r.addText(u, h, f == l ? c : h.length), f += u.length), i = null;
        }
      }
    });
    r.addLineStartIfNotCovered(i), this.openWidget = o > s, this.openMarks = o;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let r = e.parentNode; ; r = r.parentNode) {
      let s = X.get(r);
      if (r == this.view.contentDOM)
        break;
      s instanceof be ? t.push(s) : s?.isLine() ? i = s : s instanceof ct || (r.nodeName == "DIV" && !i && r != this.view.contentDOM ? i = new ai(r, zc) : i || t.push(be.of(new on({ tagName: r.nodeName.toLowerCase(), attributes: xm(r) }), r)));
    }
    return { line: i, marks: t };
  }
}
function da(n, e) {
  let t = (i) => {
    for (let r of i.children)
      if ((e ? r.isText() : r.length) || t(r))
        return !0;
    return !1;
  };
  return t(n);
}
function Gm(n) {
  let e = n.isReplace ? (n.startSide < 0 ? 64 : 0) | (n.endSide > 0 ? 128 : 0) : n.startSide > 0 ? 32 : 16;
  return n.block && (e |= 256), e;
}
const zc = { class: "cm-line" };
function jm(n, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (n || (n = { class: "cm-line" }), t && Qo(t, n), i && (n.class += " " + i)), n;
}
function Jm(n) {
  let e = [];
  for (let t = n.parents.length; t > 1; t--) {
    let i = t == n.parents.length ? n.tile : n.parents[t].tile;
    i instanceof be && e.push(i.mark);
  }
  return e;
}
function Qr(n) {
  let e = X.get(n);
  return e && e.setDOM(n.cloneNode()), n;
}
class hi extends mt {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
hi.inline = /* @__PURE__ */ new hi("span");
hi.block = /* @__PURE__ */ new hi("div");
const Zr = /* @__PURE__ */ new class extends mt {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class pa {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = R.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new Ar(e, e.contentDOM), this.updateInner([new Pe(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let r = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? r = this.domChanged.newSel.head : !ng(e.changes, this.hasComposition) && !e.selectionSet && (r = e.state.selection.main.head));
    let s = r > -1 ? Xm(this.view, e.changes, r) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      i = new Pe(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(i.slice());
    }
    this.hasComposition = s ? { from: s.range.fromB, to: s.range.toB } : null, (E.ie || E.chrome) && !s && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = $m(o, this.decorations, e.changes);
    a.length && (i = Pe.extendWithRanges(i, a));
    let h = tg(l, this.blockWrappers, e.changes);
    return h.length && (i = Pe.extendWithRanges(i, h)), s && !i.some((c) => c.fromA <= s.range.fromA && c.toA >= s.range.toA) && (i = s.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, s), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new Um(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && X.get(t.text) && l.cache.reused.set(
          X.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = l.run(e, t), yo(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let s = E.chrome || E.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(s), s && (s.written || i.selectionRange.focusNode != s.node || !this.tile.dom.contains(s.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let r = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let s of this.tile.children)
        s.isWidget() && s.widget instanceof $r && r.push(s.dom);
    i.updateGaps(r);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(Hc) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, r = this.view.root.activeElement, s = r == i, o = !s && !(this.view.state.facet(ht) || i.tabIndex > -1) && _i(i, this.view.observer.selectionRange) && !(r && i.contains(r));
    if (!(s || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), E.gecko && a.empty && !this.hasComposition && Ym(h)) {
      let u = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(u, h.node.childNodes[h.offset] || null)), h = c = new We(u, 0), l = !0;
    }
    let f = this.view.observer.selectionRange;
    (l || !f.focusNode || (!Ti(h.node, h.offset, f.anchorNode, f.anchorOffset) || !Ti(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      E.android && E.chrome && i.contains(f.focusNode) && ig(f.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let u = zi(this.view.root);
      if (u) if (a.empty) {
        if (E.gecko) {
          let d = Qm(h.node, h.offset);
          if (d && d != 3) {
            let p = (d == 1 ? Sc : kc)(h.node, h.offset);
            p && (h = new We(p.node, p.offset));
          }
        }
        u.collapse(h.node, h.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
      } else if (u.extend) {
        u.collapse(h.node, h.offset);
        try {
          u.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let d = document.createRange();
        a.anchor > a.head && ([h, c] = [c, h]), d.setEnd(c.node, c.offset), d.setStart(h.node, h.offset), u.removeAllRanges(), u.addRange(d);
      }
      o && this.view.root.activeElement == i && (i.blur(), r && r.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new We(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new We(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && Ti(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = zi(e.root), { anchorNode: r, anchorOffset: s } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let l = o.posAtStart;
    if (t.head == l || t.head == l + o.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let c = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(c.node, c.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let f = e.observer.selectionRange;
    e.docView.posFromDOM(f.anchorNode, f.anchorOffset) != t.from && i.collapse(r, s);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let r = i.posAtStart;
    if (i.isComposite()) {
      let s;
      if (e == i.dom)
        s = i.dom.childNodes[t];
      else {
        let o = ft(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let l = e.parentNode;
          if (l == i.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
        }
        o < 0 ? s = e : s = e.nextSibling;
      }
      if (s == i.dom.firstChild)
        return r;
      for (; s && !X.get(s); )
        s = s.nextSibling;
      if (!s)
        return r + i.length;
      for (let o = 0, l = r; ; o++) {
        let a = i.children[o];
        if (a.dom == s)
          return l;
        l += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? r + t : r + (t ? i.length : 0) : r;
  }
  domAtPos(e, t) {
    let { tile: i, offset: r } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(e, t) : i.domIn(r, t);
  }
  inlineDOMNearPos(e, t) {
    let i, r = -1, s = !1, o, l = -1, a = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (s = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (i = h, r = e - c, s = f < e), f >= e && !o && (o = h, l = e - c, a = c > e), c > e && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(e, t) : (s && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(r, t) : o.domIn(l, t));
  }
  coordsAt(e, t) {
    let { tile: i, offset: r } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.widget instanceof $r ? null : i.coordsInWidget(r, t, !0) : i.coordsIn(r, t);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function r(s, o) {
      if (s.isComposite())
        for (let l of s.children) {
          if (l.length >= o) {
            let a = r(l, o);
            if (a)
              return a;
          }
          if (o -= l.length, o < 0)
            break;
        }
      else if (s.isText() && o < s.length) {
        let l = ne(s.text, o);
        if (l == o)
          return null;
        let a = Ki(s.dom, o, l).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let c = a[h];
          if (h == a.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return r(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: r } = e, s = this.view.contentDOM.clientWidth, o = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == U.LTR, h = 0, c = (f, u, d) => {
      for (let p = 0; p < f.children.length && !(u > r); p++) {
        let m = f.children[p], g = u + m.length, y = m.dom.getBoundingClientRect(), { height: v } = y;
        if (d && !p && (h += y.top - d.top), m instanceof ct)
          g > i && c(m, u, y);
        else if (u >= i && (h > 0 && t.push(-h), t.push(v + h), h = 0, o)) {
          let w = m.dom.lastChild, b = w ? zn(w) : [];
          if (b.length) {
            let x = b[b.length - 1], k = a ? x.right - y.left : y.right - x.left;
            k > l && (l = k, this.minWidth = s, this.minWidthFrom = u, this.minWidthTo = g);
          }
        }
        d && p == f.children.length - 1 && (h += d.bottom - y.bottom), u = g + m.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? U.RTL : U.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = zn(h.dom);
          if (c.length != 1)
            return;
          l += c[0].width, a = c[0].height;
        }
        if (l)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: l / o.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, r, s;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = zn(t.firstChild)[0];
      i = t.getBoundingClientRect().height, r = o && o.width ? o.width / 27 : 7, s = o && o.height ? o.height : i, t.remove();
    }), { lineHeight: i, charWidth: r, textHeight: s };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, r = 0; ; r++) {
      let s = r == t.viewports.length ? null : t.viewports[r], o = s ? s.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(R.replace({
          widget: new $r(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!s)
        break;
      i = s.to + 1;
    }
    return R.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Cr).map((s) => (this.dynamicDecorationMap[e++] = typeof s == "function") ? s(this.view) : s), i = !1, r = this.view.state.facet(nl).map((s, o) => {
      let l = typeof s == "function";
      return l && (i = !0), l ? s(this.view) : s;
    });
    for (r.length && (this.dynamicDecorationMap[e++] = i, t.push(N.join(r))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(Fc).map((s) => typeof s == "function" ? s(this.view) : s);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(Nc))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        xe(this.view.state, c, "scroll handler");
      }
    let { range: t } = e, i = this.coordsAt(t.head, t.empty ? t.assoc : t.head > t.anchor ? -1 : 1), r;
    if (!i)
      return;
    !t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, r.left),
      top: Math.min(i.top, r.top),
      right: Math.max(i.right, r.right),
      bottom: Math.max(i.bottom, r.bottom)
    });
    let s = rl(this.view), o = {
      left: i.left - s.left,
      top: i.top - s.top,
      right: i.right + s.right,
      bottom: i.bottom + s.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    if (km(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == U.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (i.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || i.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      h && h.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    yo(this.tile);
  }
}
function yo(n, e) {
  let t = e?.get(n);
  if (t != 1) {
    t == null && n.destroy();
    for (let i of n.children)
      yo(i, e);
  }
}
function Ym(n) {
  return n.node.nodeType == 1 && n.node.firstChild && (n.offset == 0 || n.node.childNodes[n.offset - 1].contentEditable == "false") && (n.offset == n.node.childNodes.length || n.node.childNodes[n.offset].contentEditable == "false");
}
function Kc(n, e) {
  let t = n.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = Sc(t.focusNode, t.focusOffset), r = kc(t.focusNode, t.focusOffset), s = i || r;
  if (r && i && r.node != i.node) {
    let l = X.get(r.node);
    if (!l || l.isText() && l.text != r.node.nodeValue)
      s = r;
    else if (n.docView.lastCompositionAfterCursor) {
      let a = X.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (s = r);
    }
  }
  if (n.docView.lastCompositionAfterCursor = s != i, !s)
    return null;
  let o = e - s.offset;
  return { from: o, to: o + s.node.nodeValue.length, node: s.node };
}
function Xm(n, e, t) {
  let i = Kc(n, t);
  if (!i)
    return null;
  let { node: r, from: s, to: o } = i, l = r.nodeValue;
  if (/[\n\r]/.test(l) || n.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new Pe(a.mapPos(s), a.mapPos(o), s, o), text: r };
}
function Qm(n, e) {
  return n.nodeType != 1 ? 0 : (e && n.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < n.childNodes.length && n.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let Zm = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    ii(e, t, this.changes);
  }
  comparePoint(e, t) {
    ii(e, t, this.changes);
  }
  boundChange(e) {
    ii(e, e, this.changes);
  }
};
function $m(n, e, t) {
  let i = new Zm();
  return N.compare(n, e, t, i), i.changes;
}
class eg {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    ii(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    ii(e, e, this.changes);
  }
}
function tg(n, e, t) {
  let i = new eg();
  return N.compare(n, e, t, i), i.changes;
}
function ig(n, e) {
  for (let t = n; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function ng(n, e) {
  let t = !1;
  return e && n.iterChangedRanges((i, r) => {
    i < e.to && r > e.from && (t = !0);
  }), t;
}
class $r extends mt {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function rg(n, e, t = 1) {
  let i = n.charCategorizer(e), r = n.doc.lineAt(e), s = e - r.from;
  if (r.length == 0)
    return C.cursor(e);
  s == 0 ? t = 1 : s == r.length && (t = -1);
  let o = s, l = s;
  t < 0 ? o = ne(r.text, s, !1) : l = ne(r.text, s);
  let a = i(r.text.slice(o, l));
  for (; o > 0; ) {
    let h = ne(r.text, o, !1);
    if (i(r.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < r.length; ) {
    let h = ne(r.text, l);
    if (i(r.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return C.range(o + r.from, l + r.from);
}
function sg(n, e, t, i, r) {
  let s = Math.round((i - e.left) * n.defaultCharacterWidth);
  if (n.lineWrapping && t.height > n.defaultLineHeight * 1.5) {
    let l = n.viewState.heightOracle.textHeight, a = Math.floor((r - t.top - (n.defaultLineHeight - l) * 0.5) / l);
    s += a * n.viewState.heightOracle.lineLength;
  }
  let o = n.state.sliceDoc(t.from, t.to);
  return t.from + ro(o, s, n.state.tabSize);
}
function vo(n, e, t) {
  let i = n.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let r;
    for (let s of i.type) {
      if (s.from > e)
        break;
      if (!(s.to < e)) {
        if (s.from < e && s.to > e)
          return s;
        (!r || s.type == ae.Text && (r.type != s.type || (t < 0 ? s.from < e : s.to > e))) && (r = s);
      }
    }
    return r || i;
  }
  return i;
}
function og(n, e, t, i) {
  let r = vo(n, e.head, e.assoc || -1), s = !i || r.type != ae.Text || !(n.lineWrapping || r.widgetLineBreaks) ? null : n.coordsAtPos(e.assoc < 0 && e.head > r.from ? e.head - 1 : e.head);
  if (s) {
    let o = n.dom.getBoundingClientRect(), l = n.textDirectionAt(r.from), a = n.posAtCoords({
      x: t == (l == U.LTR) ? o.right - 1 : o.left + 1,
      y: (s.top + s.bottom) / 2
    });
    if (a != null)
      return C.cursor(a, t ? -1 : 1);
  }
  return C.cursor(t ? r.to : r.from, t ? -1 : 1);
}
function ma(n, e, t, i) {
  let r = n.state.doc.lineAt(e.head), s = n.bidiSpans(r), o = n.textDirectionAt(r.from);
  for (let l = e, a = null; ; ) {
    let h = Bm(r, s, o, l, t), c = Ec;
    if (!h) {
      if (r.number == (t ? n.state.doc.lines : 1))
        return l;
      c = `
`, r = n.state.doc.line(r.number + (t ? 1 : -1)), s = n.bidiSpans(r), h = n.visualLineSide(r, !t);
    }
    if (a) {
      if (!a(c))
        return l;
    } else {
      if (!i)
        return h;
      a = i(c);
    }
    l = h;
  }
}
function lg(n, e, t) {
  let i = n.state.charCategorizer(e), r = i(t);
  return (s) => {
    let o = i(s);
    return r == Y.Space && (r = o), r == o;
  };
}
function ag(n, e, t, i) {
  let r = e.head, s = t ? 1 : -1;
  if (r == (t ? n.state.doc.length : 0))
    return C.cursor(r, e.assoc);
  let o = e.goalColumn, l, a = n.contentDOM.getBoundingClientRect(), h = n.coordsAtPos(r, (e.empty ? e.assoc : 0) || (t ? 1 : -1)), c = n.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = s < 0 ? h.top : h.bottom;
  else {
    let p = n.viewState.lineBlockAt(r);
    o == null && (o = Math.min(a.right - a.left, n.defaultCharacterWidth * (r - p.from))), l = (s < 0 ? p.top : p.bottom) + c;
  }
  let f = a.left + o, u = i ?? n.viewState.heightOracle.textHeight >> 1, d = bo(n, { x: f, y: l + u * s }, !1, s);
  return C.cursor(d.pos, d.assoc, void 0, o);
}
function Bi(n, e, t) {
  for (; ; ) {
    let i = 0;
    for (let r of n)
      r.between(e - 1, e + 1, (s, o, l) => {
        if (e > s && e < o) {
          let a = i || t || (e - s < o - e ? -1 : 1);
          e = a < 0 ? s : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function Uc(n, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let r = e.ranges[i], s = null;
    if (r.empty) {
      let o = Bi(n, r.from, 0);
      o != r.from && (s = C.cursor(o, -1));
    } else {
      let o = Bi(n, r.from, -1), l = Bi(n, r.to, 1);
      (o != r.from || l != r.to) && (s = C.range(r.from == r.anchor ? o : l, r.from == r.head ? o : l));
    }
    s && (t || (t = e.ranges.slice()), t[i] = s);
  }
  return t ? C.create(t, e.mainIndex) : e;
}
function es(n, e, t) {
  let i = Bi(n.state.facet(an).map((r) => r(n)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : C.cursor(i, i < t.from ? 1 : -1);
}
class Ze {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function bo(n, e, t, i) {
  let r = n.contentDOM.getBoundingClientRect(), s = r.top + n.viewState.paddingTop, { x: o, y: l } = e, a = l - s, h;
  for (; ; ) {
    if (a < 0)
      return new Ze(0, 1);
    if (a > n.viewState.docHeight)
      return new Ze(n.state.doc.length, -1);
    if (h = n.elementAtHeight(a), i == null)
      break;
    if (h.type == ae.Text) {
      if (i < 0 ? h.to < n.viewport.from : h.from > n.viewport.to)
        break;
      let u = n.docView.coordsAt(i < 0 ? h.from : h.to, i > 0 ? -1 : 1);
      if (u && (i < 0 ? u.top <= a + s : u.bottom >= a + s))
        break;
    }
    let f = n.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? h.bottom + f : h.top - f;
  }
  if (n.viewport.from >= h.to || n.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == ae.Text) {
      let f = sg(n, r, h, o, l);
      return new Ze(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != ae.Text)
    return a < (h.top + h.bottom) / 2 ? new Ze(h.from, 1) : new Ze(h.to, -1);
  let c = n.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = n.docView.lineAt(h.from, -2)), new hg(n, o, l, n.textDirectionAt(h.from)).scanTile(c, h.from);
}
class hg {
  constructor(e, t, i, r) {
    this.view = e, this.x = t, this.y = i, this.baseDir = r, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: i, spans: r } = this.bidiSpansAt(e);
    return r[$e.find(r, e - i.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: i, spans: r } = this.bidiSpansAt(e);
    return r[$e.find(r, e - i.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: i, line: r } = this.bidiSpansAt(e);
    return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + r.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically andis
  // closest horizontally. The caller is responsible for dividing its
  // content into N pieces, and pass an array with N+1 positions
  // (including the position after the last piece). For a text tile,
  // these will be character clusters, for a composite tile, these
  // will be child tiles.
  scan(e, t) {
    let i = 0, r = e.length - 1, s = /* @__PURE__ */ new Set(), o = this.bidiIn(e[0], e[r]), l, a, h = -1, c = 1e9, f;
    e: for (; i < r; ) {
      let d = r - i, p = i + r >> 1;
      t: if (s.has(p)) {
        let g = i + Math.floor(Math.random() * d);
        for (let y = 0; y < d; y++) {
          if (!s.has(g)) {
            p = g;
            break t;
          }
          g++, g == r && (g = i);
        }
        break e;
      }
      s.add(p);
      let m = t(p);
      if (m)
        for (let g = 0; g < m.length; g++) {
          let y = m[g], v = 0;
          if (y.bottom < this.y)
            (!l || l.bottom < y.bottom) && (l = y), v = 1;
          else if (y.top > this.y)
            (!a || a.top > y.top) && (a = y), v = -1;
          else {
            let w = y.left > this.x ? this.x - y.left : y.right < this.x ? this.x - y.right : 0, b = Math.abs(w);
            b < c && (h = p, c = b, f = y), w && (v = w < 0 == (this.baseDir == U.LTR) ? -1 : 1);
          }
          v == -1 && (!o || this.baseDirAt(e[p], 1)) ? r = p : v == 1 && (!o || this.baseDirAt(e[p + 1], -1)) && (i = p + 1);
        }
    }
    if (!f) {
      let d = l && (!a || this.y - l.bottom < a.top - this.y) ? l : a;
      return this.y = (d.top + d.bottom) / 2, this.scan(e, t);
    }
    let u = (o ? this.dirAt(e[h], 1) : this.baseDir) == U.LTR;
    return {
      i: h,
      // Test whether x is closes to the start or end of this element
      after: this.x > (f.left + f.right) / 2 == u
    };
  }
  scanText(e, t) {
    let i = [];
    for (let s = 0; s < e.length; s = ne(e.text, s))
      i.push(t + s);
    i.push(t + e.length);
    let r = this.scan(i, (s) => {
      let o = i[s] - t, l = i[s + 1] - t;
      return Ki(e.dom, o, l).getClientRects();
    });
    return r.after ? new Ze(i[r.i + 1], -1) : new Ze(i[r.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new Ze(t, 1);
    if (e.children.length == 1) {
      let l = e.children[0];
      if (l.isText())
        return this.scanText(l, t);
      if (l.isComposite())
        return this.scanTile(l, t);
    }
    let i = [t];
    for (let l = 0, a = t; l < e.children.length; l++)
      i.push(a += e.children[l].length);
    let r = this.scan(i, (l) => {
      let a = e.children[l];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : Ki(a.dom, 0, a.length)).getClientRects();
    }), s = e.children[r.i], o = i[r.i];
    return s.isText() ? this.scanText(s, o) : s.isComposite() ? this.scanTile(s, o) : r.after ? new Ze(i[r.i + 1], -1) : new Ze(o, 1);
  }
}
const Yt = "￿";
class cg {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(F.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Yt;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let r = e; ; ) {
      this.findPointBefore(i, r);
      let s = this.text.length;
      this.readNode(r);
      let o = X.get(r), l = r.nextSibling;
      if (l == t) {
        o?.breakAfter && !l && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = X.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : er(r)) || er(l) && (r.nodeName != "BR" || o?.isWidget()) && this.text.length > s) && !fg(l, t) && this.lineBreak(), r = l;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, r = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let s = -1, o = 1, l;
      if (this.lineSeparator ? (s = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = r.exec(t)) && (s = l.index, o = l[0].length), this.append(t.slice(i, s < 0 ? t.length : s)), s < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = s + o;
    }
  }
  readNode(e) {
    let t = X.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let r = i.iter(); !r.next().done; )
        r.lineBreak ? this.lineBreak() : this.append(r.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (ug(e, i.node, i.offset) ? t : 0));
  }
}
function ug(n, e, t) {
  for (; ; ) {
    if (!e || t < ft(e))
      return !1;
    if (e == n)
      return !0;
    t = Mt(e) + 1, e = e.parentNode;
  }
}
function fg(n, e) {
  let t;
  for (; !(n == e || !n); n = n.nextSibling) {
    let i = X.get(n);
    if (!i?.isWidget())
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let r = i.overrideDOMText;
      if (r?.length)
        return !1;
    }
  return !0;
}
class ga {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class dg {
  constructor(e, t, i, r) {
    this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: s, impreciseAnchor: o } = e.docView;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = Gc(e.docView.tile, t, i, 0))) {
      let l = s || o ? [] : mg(e), a = new cg(l, e);
      a.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = a.text, this.newSel = gg(l, this.bounds.from);
    } else {
      let l = e.observer.selectionRange, a = s && s.node == l.focusNode && s.offset == l.focusOffset || !uo(e.contentDOM, l.focusNode) ? e.state.selection.main.head : e.docView.posFromDOM(l.focusNode, l.focusOffset), h = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !uo(e.contentDOM, l.anchorNode) ? e.state.selection.main.anchor : e.docView.posFromDOM(l.anchorNode, l.anchorOffset), c = e.viewport;
      if ((E.ios || E.chrome) && e.state.selection.main.empty && a != h && (c.from > 0 || c.to < e.state.doc.length)) {
        let f = Math.min(a, h), u = Math.max(a, h), d = c.from - f, p = c.to - u;
        (d == 0 || d == 1 || f == 0) && (p == 0 || p == -1 || u == e.state.doc.length) && (a = 0, h = e.state.doc.length);
      }
      e.inputState.composing > -1 && e.state.selection.ranges.length > 1 ? this.newSel = e.state.selection.replaceRange(C.range(h, a)) : this.newSel = C.single(h, a);
    }
  }
}
function Gc(n, e, t, i) {
  if (n.isComposite()) {
    let r = -1, s = -1, o = -1, l = -1;
    for (let a = 0, h = i, c = i; a < n.children.length; a++) {
      let f = n.children[a], u = h + f.length;
      if (h < e && u > t)
        return Gc(f, e, t, h);
      if (u >= e && r == -1 && (r = a, s = h), h > t && f.dom.parentNode == n.dom) {
        o = a, l = c;
        break;
      }
      c = u, h = u + f.breakAfter;
    }
    return {
      from: s,
      to: l < 0 ? i + n.length : l,
      startDOM: (r ? n.children[r - 1].dom.nextSibling : null) || n.dom.firstChild,
      endDOM: o < n.children.length && o >= 0 ? n.children[o].dom : null
    };
  } else return n.isText() ? { from: i, to: i + n.length, startDOM: n.dom, endDOM: n.dom.nextSibling } : null;
}
function jc(n, e) {
  let t, { newSel: i } = e, { state: r } = n, s = r.selection.main, o = n.inputState.lastKeyTime > Date.now() - 100 ? n.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: l, to: a } = e.bounds, h = s.from, c = null;
    (o === 8 || E.android && e.text.length < a - l) && (h = s.to, c = "end");
    let f = r.doc.sliceString(l, a, Yt), u, d;
    !s.empty && s.from >= l && s.to <= a && (e.typeOver || f != e.text) && f.slice(0, s.from - l) == e.text.slice(0, s.from - l) && f.slice(s.to - l) == e.text.slice(u = e.text.length - (f.length - (s.to - l))) ? t = {
      from: s.from,
      to: s.to,
      insert: V.of(e.text.slice(s.from - l, u).split(Yt))
    } : (d = Jc(f, e.text, h - l, c)) && (E.chrome && o == 13 && d.toB == d.from + 2 && e.text.slice(d.from, d.toB) == Yt + Yt && d.toB--, t = {
      from: l + d.from,
      to: l + d.toA,
      insert: V.of(e.text.slice(d.from, d.toB).split(Yt))
    });
  } else i && (!n.hasFocus && r.facet(ht) || sr(i, s)) && (i = null);
  if (!t && !i)
    return !1;
  if ((E.mac || E.android) && t && t.from == t.to && t.from == s.head - 1 && /^\. ?$/.test(t.insert.toString()) && n.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = C.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: V.of([t.insert.toString().replace(".", " ")]) }) : r.doc.lineAt(s.from).to < s.to && n.docView.lineHasWidget(s.to) && n.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: s.from,
    to: s.to,
    insert: r.toText(n.inputState.insertingText)
  } : E.chrome && t && t.from == t.to && t.from == s.head && t.insert.toString() == `
 ` && n.lineWrapping && (i && (i = C.single(i.main.anchor - 1, i.main.head - 1)), t = { from: s.from, to: s.to, insert: V.of([" "]) }), t)
    return sl(n, t, i, o);
  if (i && !sr(i, s)) {
    let l = !1, a = "select";
    return n.inputState.lastSelectionTime > Date.now() - 50 && (n.inputState.lastSelectionOrigin == "select" && (l = !0), a = n.inputState.lastSelectionOrigin, a == "select.pointer" && (i = Uc(r.facet(an).map((h) => h(n)), i))), n.dispatch({ selection: i, scrollIntoView: l, userEvent: a }), !0;
  } else
    return !1;
}
function sl(n, e, t, i = -1) {
  if (E.ios && n.inputState.flushIOSKey(e))
    return !0;
  let r = n.state.selection.main;
  if (E.android && (e.to == r.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == r.from || e.from == r.from - 1 && n.state.sliceDoc(e.from, r.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && ni(n.contentDOM, "Enter", 13) || (e.from == r.from - 1 && e.to == r.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > r.head) && ni(n.contentDOM, "Backspace", 8) || e.from == r.from && e.to == r.to + 1 && e.insert.length == 0 && ni(n.contentDOM, "Delete", 46)))
    return !0;
  let s = e.insert.toString();
  n.inputState.composing >= 0 && n.inputState.composing++;
  let o, l = () => o || (o = pg(n, e, t));
  return n.state.facet(Tc).some((a) => a(n, e.from, e.to, s, l)) || n.dispatch(l()), !0;
}
function pg(n, e, t) {
  let i, r = n.state, s = r.selection.main, o = -1;
  if (e.from == e.to && e.from < s.from || e.from > s.to) {
    let a = e.from < s.from ? -1 : 1, h = a < 0 ? s.from : s.to, c = Bi(r.facet(an).map((f) => f(n)), h, a);
    e.from == c && (o = c);
  }
  if (o > -1)
    i = {
      changes: e,
      selection: C.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= s.from && e.to <= s.to && e.to - e.from >= (s.to - s.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && n.inputState.composing < 0) {
    let a = s.from < e.from ? r.sliceDoc(s.from, e.from) : "", h = s.to > e.to ? r.sliceDoc(e.to, s.to) : "";
    i = r.replaceSelection(n.state.toText(a + e.insert.sliceString(0, void 0, n.state.lineBreak) + h));
  } else {
    let a = r.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (r.selection.ranges.length > 1 && (n.inputState.composing >= 0 || n.inputState.compositionPendingChange) && e.to <= s.to + 10 && e.to >= s.to - 10) {
      let c = n.state.sliceDoc(e.from, e.to), f, u = t && Kc(n, t.main.head);
      if (u) {
        let p = e.insert.length - (e.to - e.from);
        f = { from: u.from, to: u.to - p };
      } else
        f = n.state.doc.lineAt(s.head);
      let d = s.to - e.to;
      i = r.changeByRange((p) => {
        if (p.from == s.from && p.to == s.to)
          return { changes: a, range: h || p.map(a) };
        let m = p.to - d, g = m - c.length;
        if (n.state.sliceDoc(g, m) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        m >= f.from && g <= f.to)
          return { range: p };
        let y = r.changes({ from: g, to: m, insert: e.insert }), v = p.to - s.to;
        return {
          changes: y,
          range: h ? C.range(Math.max(0, h.anchor + v), Math.max(0, h.head + v)) : p.map(y)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && r.selection.replaceRange(h)
      };
  }
  let l = "input.type";
  return (n.composing || n.inputState.compositionPendingChange && n.inputState.compositionEndedAt > Date.now() - 50) && (n.inputState.compositionPendingChange = !1, l += ".compose", n.inputState.compositionFirstChange && (l += ".start", n.inputState.compositionFirstChange = !1)), r.update(i, { userEvent: l, scrollIntoView: !0 });
}
function Jc(n, e, t, i) {
  let r = Math.min(n.length, e.length), s = 0;
  for (; s < r && n.charCodeAt(s) == e.charCodeAt(s); )
    s++;
  if (s == r && n.length == e.length)
    return null;
  let o = n.length, l = e.length;
  for (; o > 0 && l > 0 && n.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, s - Math.min(o, l));
    t -= o + a - s;
  }
  if (o < s && n.length < e.length) {
    let a = t <= s && t >= o ? s - t : 0;
    s -= a, l = s + (l - o), o = s;
  } else if (l < s) {
    let a = t <= s && t >= l ? s - t : 0;
    s -= a, o = s + (o - l), l = s;
  }
  return { from: s, toA: o, toB: l };
}
function mg(n) {
  let e = [];
  if (n.root.activeElement != n.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s } = n.observer.selectionRange;
  return t && (e.push(new ga(t, i)), (r != t || s != i) && e.push(new ga(r, s))), e;
}
function gg(n, e) {
  if (n.length == 0)
    return null;
  let t = n[0].pos, i = n.length == 2 ? n[1].pos : t;
  return t > -1 && i > -1 ? C.single(t + e, i + e) : null;
}
function sr(n, e) {
  return e.head == n.main.head && e.anchor == n.main.anchor;
}
class yg {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, E.safari && e.contentDOM.addEventListener("input", () => null), E.gecko && _g(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !Mg(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let r of i.observers)
        r(this.view, t);
      for (let r of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (r(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = vg(e), i = this.handlers, r = this.view.contentDOM;
    for (let s in t)
      if (s != "scroll") {
        let o = !t[s].handlers.length, l = i[s];
        l && o != !l.handlers.length && (r.removeEventListener(s, this.handleEvent), l = null), l || r.addEventListener(s, this.handleEvent, { passive: o });
      }
    for (let s in i)
      s != "scroll" && !t[s] && r.removeEventListener(s, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && Xc.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), E.android && E.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    let t;
    return E.ios && !e.synthetic && !e.altKey && !e.metaKey && ((t = Yc.find((i) => i.keyCode == e.keyCode)) && !e.ctrlKey || bg.indexOf(e.key) > -1 && e.ctrlKey && !e.shiftKey) ? (this.pendingIOSKey = t || e, setTimeout(() => this.flushIOSKey(), 250), !0) : (e.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, ni(this.view.contentDOM, t.key, t.keyCode, t instanceof KeyboardEvent ? t : void 0));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : E.safari && !E.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function ya(n, e) {
  return (t, i) => {
    try {
      return e.call(n, i, t);
    } catch (r) {
      xe(t.state, r);
    }
  };
}
function vg(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of n) {
    let r = i.spec, s = r && r.plugin.domEventHandlers, o = r && r.plugin.domEventObservers;
    if (s)
      for (let l in s) {
        let a = s[l];
        a && t(l).handlers.push(ya(i.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(ya(i.value, a));
      }
  }
  for (let i in Fe)
    t(i).handlers.push(Fe[i]);
  for (let i in Se)
    t(i).observers.push(Se[i]);
  return e;
}
const Yc = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], bg = "dthko", Xc = [16, 17, 18, 20, 91, 92, 224, 225], xn = 6;
function wn(n) {
  return Math.max(0, n) * 0.7 + 8;
}
function xg(n, e) {
  return Math.max(Math.abs(n.clientX - e.clientX), Math.abs(n.clientY - e.clientY));
}
class wg {
  constructor(e, t, i, r) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = r, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = bc(e.contentDOM), this.atoms = e.state.facet(an).map((o) => o(e));
    let s = e.contentDOM.ownerDocument;
    s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(F.allowMultipleSelections) && Sg(e, t), this.dragging = Cg(e, t) && $c(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && xg(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, r = 0, s = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: r, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: s, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = rl(this.view);
    e.clientX - a.left <= r + xn ? t = -wn(r - e.clientX) : e.clientX + a.right >= o - xn && (t = wn(e.clientX - o)), e.clientY - a.top <= s + xn ? i = -wn(s - e.clientY) : e.clientY + a.bottom >= l - xn && (i = wn(e.clientY - l)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = Uc(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Sg(n, e) {
  let t = n.state.facet(Lc);
  return t.length ? t[0](e) : E.mac ? e.metaKey : e.ctrlKey;
}
function kg(n, e) {
  let t = n.state.facet(Pc);
  return t.length ? t[0](e) : E.mac ? !e.altKey : !e.ctrlKey;
}
function Cg(n, e) {
  let { main: t } = n.state.selection;
  if (t.empty)
    return !1;
  let i = zi(n.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let r = i.getRangeAt(0).getClientRects();
  for (let s = 0; s < r.length; s++) {
    let o = r[s];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function Mg(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != n.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = X.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Fe = /* @__PURE__ */ Object.create(null), Se = /* @__PURE__ */ Object.create(null), Qc = E.ie && E.ie_version < 15 || E.ios && E.webkit_version < 604;
function Ag(n) {
  let e = n.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    n.focus(), t.remove(), Zc(n, t.value);
  }, 50);
}
function Or(n, e, t) {
  for (let i of n.facet(e))
    t = i(t, n);
  return t;
}
function Zc(n, e) {
  e = Or(n.state, el, e);
  let { state: t } = n, i, r = 1, s = t.toText(e), o = s.lines == t.selection.ranges.length;
  if (xo != null && t.selection.ranges.every((a) => a.empty) && xo == s.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == a)
        return { range: h };
      a = c.from;
      let f = t.toText((o ? s.line(r++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: C.cursor(h.from + f.length)
      };
    });
  } else o ? i = t.changeByRange((a) => {
    let h = s.line(r++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: C.cursor(a.from + h.length)
    };
  }) : i = t.replaceSelection(s);
  n.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
Se.scroll = (n) => {
  n.inputState.lastScrollTop = n.scrollDOM.scrollTop, n.inputState.lastScrollLeft = n.scrollDOM.scrollLeft;
};
Se.wheel = Se.mousewheel = (n) => {
  n.inputState.lastWheelEvent = Date.now();
};
Fe.keydown = (n, e) => (n.inputState.setSelectionOrigin("select"), e.keyCode == 27 && n.inputState.tabFocusMode != 0 && (n.inputState.tabFocusMode = Date.now() + 2e3), !1);
Se.touchstart = (n, e) => {
  n.inputState.lastTouchTime = Date.now(), n.inputState.setSelectionOrigin("select.pointer");
};
Se.touchmove = (n) => {
  n.inputState.setSelectionOrigin("select.pointer");
};
Fe.mousedown = (n, e) => {
  if (n.observer.flush(), n.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of n.state.facet(Dc))
    if (t = i(n, e), t)
      break;
  if (!t && e.button == 0 && (t = Eg(n, e)), t) {
    let i = !n.hasFocus;
    n.inputState.startMouseSelection(new wg(n, e, t, i)), i && n.observer.ignore(() => {
      xc(n.contentDOM);
      let s = n.root.activeElement;
      s && !s.contains(n.contentDOM) && s.blur();
    });
    let r = n.inputState.mouseSelection;
    if (r)
      return r.start(e), r.dragging === !1;
  } else
    n.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function va(n, e, t, i) {
  if (i == 1)
    return C.cursor(e, t);
  if (i == 2)
    return rg(n.state, e, t);
  {
    let r = n.docView.lineAt(e, t), s = n.state.doc.lineAt(r ? r.posAtEnd : e), o = r ? r.posAtStart : s.from, l = r ? r.posAtEnd : s.to;
    return l < n.state.doc.length && l == s.to && l++, C.range(o, l);
  }
}
const Og = E.ie && E.ie_version <= 11;
let ba = null, xa = 0, wa = 0;
function $c(n) {
  if (!Og)
    return n.detail;
  let e = ba, t = wa;
  return ba = n, wa = Date.now(), xa = !e || t > Date.now() - 400 && Math.abs(e.clientX - n.clientX) < 2 && Math.abs(e.clientY - n.clientY) < 2 ? (xa + 1) % 3 : 1;
}
function Eg(n, e) {
  let t = n.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = $c(e), r = n.state.selection;
  return {
    update(s) {
      s.docChanged && (t.pos = s.changes.mapPos(t.pos), r = r.map(s.changes));
    },
    get(s, o, l) {
      let a = n.posAndSideAtCoords({ x: s.clientX, y: s.clientY }, !1), h, c = va(n, a.pos, a.assoc, i);
      if (t.pos != a.pos && !o) {
        let f = va(n, t.pos, t.assoc, i), u = Math.min(f.from, c.from), d = Math.max(f.to, c.to);
        c = u < c.from ? C.range(u, d) : C.range(d, u);
      }
      return o ? r.replaceRange(r.main.extend(c.from, c.to)) : l && i == 1 && r.ranges.length > 1 && (h = Lg(r, a.pos)) ? h : l ? r.addRange(c) : C.create([c]);
    }
  };
}
function Lg(n, e) {
  for (let t = 0; t < n.ranges.length; t++) {
    let { from: i, to: r } = n.ranges[t];
    if (i <= e && r >= e)
      return C.create(n.ranges.slice(0, t).concat(n.ranges.slice(t + 1)), n.mainIndex == t ? 0 : n.mainIndex - (n.mainIndex > t ? 1 : 0));
  }
  return null;
}
Fe.dragstart = (n, e) => {
  let { selection: { main: t } } = n.state;
  if (e.target.draggable) {
    let r = n.docView.tile.nearest(e.target);
    if (r && r.isWidget()) {
      let s = r.posAtStart, o = s + r.length;
      (s >= t.to || o <= t.from) && (t = C.range(s, o));
    }
  }
  let { inputState: i } = n;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Or(n.state, tl, n.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Fe.dragend = (n) => (n.inputState.draggedContent = null, !1);
function Sa(n, e, t, i) {
  if (t = Or(n.state, el, t), !t)
    return;
  let r = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: s } = n.inputState, o = i && s && kg(n, e) ? { from: s.from, to: s.to } : null, l = { from: r, insert: t }, a = n.state.changes(o ? [o, l] : l);
  n.focus(), n.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(r, -1), head: a.mapPos(r, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), n.inputState.draggedContent = null;
}
Fe.drop = (n, e) => {
  if (!e.dataTransfer)
    return !1;
  if (n.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), r = 0, s = () => {
      ++r == t.length && Sa(n, e, i.filter((o) => o != null).join(n.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = s, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), s();
      }, l.readAsText(t[o]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return Sa(n, e, i, !0), !0;
  }
  return !1;
};
Fe.paste = (n, e) => {
  if (n.state.readOnly)
    return !0;
  n.observer.flush();
  let t = Qc ? null : e.clipboardData;
  return t ? (Zc(n, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (Ag(n), !1);
};
function Pg(n, e) {
  let t = n.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), n.focus();
  }, 50);
}
function Dg(n) {
  let e = [], t = [], i = !1;
  for (let r of n.selection.ranges)
    r.empty || (e.push(n.sliceDoc(r.from, r.to)), t.push(r));
  if (!e.length) {
    let r = -1;
    for (let { from: s } of n.selection.ranges) {
      let o = n.doc.lineAt(s);
      o.number > r && (e.push(o.text), t.push({ from: o.from, to: Math.min(n.doc.length, o.to + 1) })), r = o.number;
    }
    i = !0;
  }
  return { text: Or(n, tl, e.join(n.lineBreak)), ranges: t, linewise: i };
}
let xo = null;
Fe.copy = Fe.cut = (n, e) => {
  if (!_i(n.contentDOM, n.observer.selectionRange))
    return !1;
  let { text: t, ranges: i, linewise: r } = Dg(n.state);
  if (!t && !r)
    return !1;
  xo = r ? t : null, e.type == "cut" && !n.state.readOnly && n.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let s = Qc ? null : e.clipboardData;
  return s ? (s.clearData(), s.setData("text/plain", t), !0) : (Pg(n, t), !1);
};
const eu = /* @__PURE__ */ pt.define();
function tu(n, e) {
  let t = [];
  for (let i of n.facet(Bc)) {
    let r = i(n, e);
    r && t.push(r);
  }
  return t.length ? n.update({ effects: t, annotations: eu.of(!0) }) : null;
}
function iu(n) {
  setTimeout(() => {
    let e = n.hasFocus;
    if (e != n.inputState.notifiedFocused) {
      let t = tu(n.state, e);
      t ? n.dispatch(t) : n.update([]);
    }
  }, 10);
}
Se.focus = (n) => {
  n.inputState.lastFocusTime = Date.now(), !n.scrollDOM.scrollTop && (n.inputState.lastScrollTop || n.inputState.lastScrollLeft) && (n.scrollDOM.scrollTop = n.inputState.lastScrollTop, n.scrollDOM.scrollLeft = n.inputState.lastScrollLeft), iu(n);
};
Se.blur = (n) => {
  n.observer.clearSelectionRange(), iu(n);
};
Se.compositionstart = Se.compositionupdate = (n) => {
  n.observer.editContext || (n.inputState.compositionFirstChange == null && (n.inputState.compositionFirstChange = !0), n.inputState.composing < 0 && (n.inputState.composing = 0));
};
Se.compositionend = (n) => {
  n.observer.editContext || (n.inputState.composing = -1, n.inputState.compositionEndedAt = Date.now(), n.inputState.compositionPendingKey = !0, n.inputState.compositionPendingChange = n.observer.pendingRecords().length > 0, n.inputState.compositionFirstChange = null, E.chrome && E.android ? n.observer.flushSoon() : n.inputState.compositionPendingChange ? Promise.resolve().then(() => n.observer.flush()) : setTimeout(() => {
    n.inputState.composing < 0 && n.docView.hasComposition && n.update([]);
  }, 50));
};
Se.contextmenu = (n) => {
  n.inputState.lastContextMenu = Date.now();
};
Fe.beforeinput = (n, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (n.inputState.insertingText = e.data, n.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && n.observer.editContext) {
    let s = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (s && o.length) {
      let l = o[0], a = n.posAtDOM(l.startContainer, l.startOffset), h = n.posAtDOM(l.endContainer, l.endOffset);
      return sl(n, { from: a, to: h, insert: n.state.toText(s) }, null), !0;
    }
  }
  let r;
  if (E.chrome && E.android && (r = Yc.find((s) => s.inputType == e.inputType)) && (n.observer.delayAndroidKey(r.key, r.keyCode), r.key == "Backspace" || r.key == "Delete")) {
    let s = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > s + 10 && n.hasFocus && (n.contentDOM.blur(), n.focus());
    }, 100);
  }
  return E.ios && e.inputType == "deleteContentForward" && n.observer.flushSoon(), E.safari && e.inputType == "insertText" && n.inputState.composing >= 0 && setTimeout(() => Se.compositionend(n, e), 20), !1;
};
const ka = /* @__PURE__ */ new Set();
function _g(n) {
  ka.has(n) || (ka.add(n), n.addEventListener("copy", () => {
  }), n.addEventListener("cut", () => {
  }));
}
const Ca = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let ci = !1;
function Ma() {
  ci = !1;
}
class Tg {
  constructor(e) {
    this.lineWrapping = e, this.doc = V.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return Ca.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i];
      r < 0 ? i++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, r, s, o) {
    let l = Ca.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l || Math.abs(i - this.charWidth) > 0.1;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = r, this.lineLength = s, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return a;
  }
}
class Bg {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class He {
  /**
  @internal
  */
  constructor(e, t, i, r, s) {
    this.from = e, this.length = t, this.top = i, this.height = r, this._content = s;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? ae.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof qt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new He(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var j = /* @__PURE__ */ function(n) {
  return n[n.ByPos = 0] = "ByPos", n[n.ByHeight = 1] = "ByHeight", n[n.ByPosNoHeight = 2] = "ByPosNoHeight", n;
}(j || (j = {}));
const Kn = 1e-3;
class ge {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > Kn && (ci = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return ge.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, r) {
    let s = this, o = i.doc;
    for (let l = r.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: c, toB: f } = r[l], u = s.lineAt(a, j.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h ? u : s.lineAt(h, j.ByPosNoHeight, i, 0, 0);
      for (f += d.to - h, h = d.to; l > 0 && u.from <= r[l - 1].toA; )
        a = r[l - 1].fromA, c = r[l - 1].fromB, l--, a < u.from && (u = s.lineAt(a, j.ByPosNoHeight, i, 0, 0));
      c += u.from - a, a = u.from;
      let p = ol.build(i.setDoc(o), e, c, f);
      s = or(s, s.replace(a, h, p));
    }
    return s.updateHeight(i, 0);
  }
  static empty() {
    return new Me(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, r = 0, s = 0;
    for (; ; )
      if (t == i)
        if (r > s * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, r -= l.size;
        } else if (s > r * 2) {
          let l = e[i];
          l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, s -= l.size;
        } else
          break;
      else if (r < s) {
        let l = e[t++];
        l && (r += l.size);
      } else {
        let l = e[--i];
        l && (s += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new Ig(ge.of(e.slice(0, t)), o, ge.of(e.slice(i)));
  }
}
function or(n, e) {
  return n == e ? n : (n.constructor != e.constructor && (ci = !0), e);
}
ge.prototype.size = 1;
const Rg = /* @__PURE__ */ R.replace({});
class nu extends ge {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new He(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, r) {
    return this.spaceAbove && e < i + this.spaceAbove ? new He(r, 0, i, this.spaceAbove, Rg) : this.mainBlock(i, r);
  }
  lineAt(e, t, i, r, s) {
    let o = this.mainBlock(r, s);
    return this.spaceAbove ? this.blockAt(0, i, r, s).join(o) : o;
  }
  forEachLine(e, t, i, r, s, o) {
    e <= s + this.length && t >= s && o(this.lineAt(0, j.ByPos, i, r, s));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, r) {
    return r && r.from <= t && r.more && this.setMeasuredHeight(r), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class Me extends nu {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new He(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let r = i[0];
    return i.length == 1 && (r instanceof Me || r instanceof se && r.flags & 4) && Math.abs(this.length - r.length) < 10 ? (r instanceof se ? r = new Me(r.length, this.height, this.spaceAbove) : r.height = this.height, this.outdated || (r.outdated = !1), r) : ge.of(i);
  }
  updateHeight(e, t = 0, i = !1, r) {
    return r && r.from <= t && r.more ? this.setMeasuredHeight(r) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class se extends ge {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, r = e.doc.lineAt(t + this.length).number, s = r - i + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * s);
      o = a / s, this.length > s + 1 && (l = (this.height - a) / (this.length - s - 1));
    } else
      o = this.height / s;
    return { firstLine: i, lastLine: r, perLine: o, perChar: l };
  }
  blockAt(e, t, i, r) {
    let { firstLine: s, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, r);
    if (t.lineWrapping) {
      let h = r + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, u = Math.max(i, e - f / 2);
      return new He(c.from, c.length, u, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - s, Math.floor((e - i) / l))), { from: c, length: f } = t.doc.line(s + h);
      return new He(c, f, i + l * h, l, 0);
    }
  }
  lineAt(e, t, i, r, s) {
    if (t == j.ByHeight)
      return this.blockAt(e, i, r, s);
    if (t == j.ByPosNoHeight) {
      let { from: d, to: p } = i.doc.lineAt(e);
      return new He(d, p - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, s), h = i.doc.lineAt(e), c = l + h.length * a, f = h.number - o, u = r + l * f + a * (h.from - s - f);
    return new He(h.from, h.length, Math.max(r, Math.min(u, r + this.height - c)), c, 0);
  }
  forEachLine(e, t, i, r, s, o) {
    e = Math.max(e, s), t = Math.min(t, s + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, s);
    for (let c = e, f = r; c <= t; ) {
      let u = i.doc.lineAt(c);
      if (c == e) {
        let p = u.number - l;
        f += a * p + h * (e - s - p);
      }
      let d = a + h * u.length;
      o(new He(u.from, u.length, f, d, 0)), f += d, c = u.to + 1;
    }
  }
  replace(e, t, i) {
    let r = this.length - t;
    if (r > 0) {
      let s = i[i.length - 1];
      s instanceof se ? i[i.length - 1] = new se(s.length + r) : i.push(null, new se(r - 1));
    }
    if (e > 0) {
      let s = i[0];
      s instanceof se ? i[0] = new se(e + s.length) : i.unshift(new se(e - 1), null);
    }
    return ge.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new se(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new se(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, r) {
    let s = t + this.length;
    if (r && r.from <= t + this.length && r.more) {
      let o = [], l = Math.max(t, r.from), a = -1;
      for (r.from > t && o.push(new se(r.from - t - 1).updateHeight(e, t)); l <= s && r.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = r.heights[r.index++], u = 0;
        f < 0 && (u = -f, f = r.heights[r.index++]), a == -1 ? a = f : Math.abs(f - a) >= Kn && (a = -2);
        let d = new Me(c, f, u);
        d.outdated = !1, o.push(d), l += c + 1;
      }
      l <= s && o.push(null, new se(s - l).updateHeight(e, l));
      let h = ge.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= Kn || Math.abs(a - this.heightMetrics(e, t).perLine) >= Kn) && (ci = !0), or(this, h);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class Ig extends ge {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, r) {
    let s = i + this.left.height;
    return e < s ? this.left.blockAt(e, t, i, r) : this.right.blockAt(e, t, s, r + this.left.length + this.break);
  }
  lineAt(e, t, i, r, s) {
    let o = r + this.left.height, l = s + this.left.length + this.break, a = t == j.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, r, s) : this.right.lineAt(e, t, i, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == j.ByPosNoHeight ? j.ByPosNoHeight : j.ByPos;
    return a ? h.join(this.right.lineAt(l, c, i, o, l)) : this.left.lineAt(l, c, i, r, s).join(h);
  }
  forEachLine(e, t, i, r, s, o) {
    let l = r + this.left.height, a = s + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, r, s, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
    else {
      let h = this.lineAt(a, j.ByPos, i, r, s);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, r, s, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
    }
  }
  replace(e, t, i) {
    let r = this.left.length + this.break;
    if (t < r)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - r, t - r, i));
    let s = [];
    e > 0 && this.decomposeLeft(e, s);
    let o = s.length;
    for (let l of i)
      s.push(l);
    if (e > 0 && Aa(s, o - 1), t < this.length) {
      let l = s.length;
      this.decomposeRight(t, s), Aa(s, l);
    }
    return ge.of(s);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, r = i + this.break;
    if (e >= r)
      return this.right.decomposeRight(e - r, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? ge.of(this.break ? [e, null, t] : [e, t]) : (this.left = or(this.left, e), this.right = or(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, r) {
    let { left: s, right: o } = this, l = t + s.length + this.break, a = null;
    return r && r.from <= t + s.length && r.more ? a = s = s.updateHeight(e, t, i, r) : s.updateHeight(e, t, i), r && r.from <= l + o.length && r.more ? a = o = o.updateHeight(e, l, i, r) : o.updateHeight(e, l, i), a ? this.balanced(s, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Aa(n, e) {
  let t, i;
  n[e] == null && (t = n[e - 1]) instanceof se && (i = n[e + 1]) instanceof se && n.splice(e - 1, 3, new se(t.length + 1 + i.length));
}
const Ng = 5;
class ol {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), r = this.nodes[this.nodes.length - 1];
      r instanceof Me ? r.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new Me(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let r = i.widget ? i.widget.estimatedHeight : 0, s = i.widget ? i.widget.lineBreaks : 0;
      r < 0 && (r = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new nu(o, r, i)) : (o || s || r >= Ng) && this.addLineDeco(r, s, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Me(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new se(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof Me)
      return e;
    let t = new Me(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let r = this.ensureLine();
    r.length += i, r.collapsed += i, r.widgetHeight = Math.max(r.widgetHeight, e), r.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof Me) && !this.isCovered ? this.nodes.push(new Me(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let r of this.nodes)
      r instanceof Me && r.updateHeight(this.oracle, i), i += r ? r.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, r) {
    let s = new ol(i, e);
    return N.spans(t, i, r, s, 0), s.finish(i);
  }
}
function Hg(n, e, t) {
  let i = new Wg();
  return N.compare(n, e, t, i, 0), i.changes;
}
class Wg {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, r) {
    (e < t || i && i.heightRelevant || r && r.heightRelevant) && ii(e, t, this.changes, 5);
  }
}
function Fg(n, e) {
  let t = n.getBoundingClientRect(), i = n.ownerDocument, r = i.defaultView || window, s = Math.max(0, t.left), o = Math.min(r.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(r.innerHeight, t.bottom);
  for (let h = n.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        s = Math.max(s, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h == n.parentNode ? r.innerHeight : a, u.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: s - t.left,
    right: Math.max(s, o) - t.left,
    top: l - (t.top + e),
    bottom: Math.max(l, a) - (t.top + e)
  };
}
function Vg(n) {
  let e = n.getBoundingClientRect(), t = n.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function qg(n, e) {
  let t = n.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class ts {
  constructor(e, t, i, r) {
    this.from = e, this.to = t, this.size = i, this.displaySize = r;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let r = e[i], s = t[i];
      if (r.from != s.from || r.to != s.to || r.size != s.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return R.replace({
      widget: new zg(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class zg extends mt {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class Oa {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Ea, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = U.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let i = t.facet(il).some((r) => typeof r != "function" && r.class == "cm-lineWrapping");
    this.heightOracle = new Tg(i), this.stateDeco = La(t), this.heightMap = ge.empty().applyChanges(this.stateDeco, V.empty, this.heightOracle.setDoc(t.doc), [new Pe(0, 0, 0, t.doc.length)]);
    for (let r = 0; r < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); r++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = R.set(this.lineGaps.map((r) => r.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let r = i ? t.head : t.anchor;
      if (!e.some(({ from: s, to: o }) => r >= s && r <= o)) {
        let { from: s, to: o } = this.lineBlockAt(r);
        e.push(new Sn(s, o));
      }
    }
    return this.viewports = e.sort((i, r) => i.from - r.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Ea : new ll(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(Ai(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = La(this.state);
    let r = e.changedRanges, s = Pe.extendWithRanges(r, Hg(i, this.stateDeco, e ? e.changes : ee.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    Ma(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), s), (this.heightMap.height != o || ci) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = s.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Ic) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, i = window.getComputedStyle(t), r = this.heightOracle, s = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? U.RTL : U.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(s) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (l.width && l.height) {
      let { scaleX: x, scaleY: k } = vc(t, l);
      (x > 5e-3 && Math.abs(this.scaleX - x) > 5e-3 || k > 5e-3 && Math.abs(this.scaleY - k) > 5e-3) && (this.scaleX = x, this.scaleY = k, h |= 16, o = a = !0);
    }
    let f = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let d = bc(this.view.contentDOM, !1).y;
    d != this.scrollParent && (this.scrollParent = d, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let p = this.getScrollOffset();
    this.scrollOffset != p && (this.scrollAnchorHeight = -1, this.scrollOffset = p), this.scrolledToBottom = wc(this.scrollParent || e.win);
    let m = (this.printing ? qg : Fg)(t, this.paddingTop), g = m.top - this.pixelViewport.top, y = m.bottom - this.pixelViewport.bottom;
    this.pixelViewport = m;
    let v = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (v != this.inView && (this.inView = v, v && (a = !0)), !this.inView && !this.scrollTarget && !Vg(e.dom))
      return 0;
    let w = l.width;
    if ((this.contentDOMWidth != w || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let x = e.docView.measureVisibleLineHeights(this.viewport);
      if (r.mustRefreshForHeights(x) && (o = !0), o || r.lineWrapping && Math.abs(w - this.contentDOMWidth) > r.charWidth) {
        let { lineHeight: k, charWidth: S, textHeight: M } = e.docView.measureTextSize();
        o = k > 0 && r.refresh(s, k, S, M, Math.max(5, w / S), x), o && (e.docView.minWidth = 0, h |= 16);
      }
      g > 0 && y > 0 ? c = Math.max(g, y) : g < 0 && y < 0 && (c = Math.min(g, y)), Ma();
      for (let k of this.viewports) {
        let S = k.from == this.viewport.from ? x : e.docView.measureVisibleLineHeights(k);
        this.heightMap = (o ? ge.empty().applyChanges(this.stateDeco, V.empty, this.heightOracle, [new Pe(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, o, new Bg(k.from, S));
      }
      ci && (h |= 2);
    }
    let b = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return b && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || b) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), r = this.heightMap, s = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new Sn(r.lineAt(o - i * 1e3, j.ByHeight, s, 0, 0).from, r.lineAt(l + (1 - i) * 1e3, j.ByHeight, s, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = r.lineAt(h, j.ByPos, s, 0, 0), u;
        t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new Sn(r.lineAt(u - 1e3 / 2, j.ByHeight, s, 0, 0).from, r.lineAt(u + c + 1e3 / 2, j.ByHeight, s, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
    return new Sn(this.heightMap.lineAt(i, j.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, j.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: r } = this.heightMap.lineAt(e, j.ByPos, this.heightOracle, 0, 0), { bottom: s } = this.heightMap.lineAt(t, j.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || r <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || s >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && r > o - 2 * 1e3 && s < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let r of e)
      t.touchesRange(r.from, r.to) || i.push(new ts(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, r = i ? 1e4 : 2e3, s = r >> 1, o = r << 1;
    if (this.defaultTextDirection != U.LTR && !i)
      return [];
    let l = [], a = (c, f, u, d) => {
      if (f - c < s)
        return;
      let p = this.state.selection.main, m = [p.from];
      p.empty || m.push(p.to);
      for (let y of m)
        if (y > c && y < f) {
          a(c, y - 10, u, d), a(y + 10, f, u, d);
          return;
        }
      let g = Ug(e, (y) => y.from >= u.from && y.to <= u.to && Math.abs(y.from - c) < s && Math.abs(y.to - f) < s && !m.some((v) => y.from < v && y.to > v));
      if (!g) {
        if (f < u.to && t && i && t.visibleRanges.some((w) => w.from <= f && w.to >= f)) {
          let w = t.moveToLineBoundary(C.cursor(f), !1, !0).head;
          w > c && (f = w);
        }
        let y = this.gapSize(u, c, f, d), v = i || y < 2e6 ? y : 2e6;
        g = new ts(c, f, y, v);
      }
      l.push(g);
    }, h = (c) => {
      if (c.length < o || c.type != ae.Text)
        return;
      let f = Kg(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, p;
      if (i) {
        let m = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, g, y;
        if (u != null) {
          let v = Cn(f, u), w = ((this.visibleBottom - this.visibleTop) / 2 + m) / c.height;
          g = v - w, y = v + w;
        } else
          g = (this.visibleTop - c.top - m) / c.height, y = (this.visibleBottom - c.top + m) / c.height;
        d = kn(f, g), p = kn(f, y);
      } else {
        let m = f.total * this.heightOracle.charWidth, g = r * this.heightOracle.charWidth, y = 0;
        if (m > 2e6)
          for (let k of e)
            k.from >= c.from && k.from < c.to && k.size != k.displaySize && k.from * this.heightOracle.charWidth + y < this.pixelViewport.left && (y = k.size - k.displaySize);
        let v = this.pixelViewport.left + y, w = this.pixelViewport.right + y, b, x;
        if (u != null) {
          let k = Cn(f, u), S = ((w - v) / 2 + g) / m;
          b = k - S, x = k + S;
        } else
          b = (v - g) / m, x = (w + g) / m;
        d = kn(f, b), p = kn(f, x);
      }
      d > c.from && a(c.from, d, c, f), p < c.to && a(p, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return l;
  }
  gapSize(e, t, i, r) {
    let s = Cn(r, i) - Cn(r, t);
    return this.heightOracle.lineWrapping ? e.height * s : r.total * this.heightOracle.charWidth * s;
  }
  updateLineGaps(e) {
    ts.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = R.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    N.spans(t, this.viewport.from, this.viewport.to, {
      span(s, o) {
        i.push({ from: s, to: o });
      },
      point() {
      }
    }, 20);
    let r = 0;
    if (i.length != this.visibleRanges.length)
      r = 12;
    else
      for (let s = 0; s < i.length && !(r & 8); s++) {
        let o = this.visibleRanges[s], l = i[s];
        (o.from != l.from || o.to != l.to) && (r |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (r |= 8));
      }
    return this.visibleRanges = i, r;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Ai(this.heightMap.lineAt(e, j.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Ai(this.heightMap.lineAt(this.scaler.fromDOM(e), j.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Ai(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Sn {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function Kg(n, e, t) {
  let i = [], r = n, s = 0;
  return N.spans(t, n, e, {
    span() {
    },
    point(o, l) {
      o > r && (i.push({ from: r, to: o }), s += o - r), r = l;
    }
  }, 20), r < e && (i.push({ from: r, to: e }), s += e - r), { total: s, ranges: i };
}
function kn({ total: n, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(n * t);
  for (let r = 0; ; r++) {
    let { from: s, to: o } = e[r], l = o - s;
    if (i <= l)
      return s + i;
    i -= l;
  }
}
function Cn(n, e) {
  let t = 0;
  for (let { from: i, to: r } of n.ranges) {
    if (e <= r) {
      t += e - i;
      break;
    }
    t += r - i;
  }
  return t / n.total;
}
function Ug(n, e) {
  for (let t of n)
    if (e(t))
      return t;
}
const Ea = {
  toDOM(n) {
    return n;
  },
  fromDOM(n) {
    return n;
  },
  scale: 1,
  eq(n) {
    return n == this;
  }
};
function La(n) {
  let e = n.facet(Cr).filter((i) => typeof i != "function"), t = n.facet(nl).filter((i) => typeof i != "function");
  return t.length && e.push(N.join(t)), e;
}
class ll {
  constructor(e, t, i) {
    let r = 0, s = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, j.ByPos, e, 0, 0).top, c = t.lineAt(a, j.ByPos, e, 0, 0).bottom;
      return r += c - h, { from: l, to: a, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - r) / (t.height - r);
    for (let l of this.viewports)
      l.domTop = o + (l.top - s) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), s = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.top)
        return r + (e - i) * this.scale;
      if (e <= s.bottom)
        return s.domTop + (e - s.top);
      i = s.bottom, r = s.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, r = 0; ; t++) {
      let s = t < this.viewports.length ? this.viewports[t] : null;
      if (!s || e < s.domTop)
        return i + (e - r) / this.scale;
      if (e <= s.domBottom)
        return s.top + (e - s.domTop);
      i = s.bottom, r = s.domBottom;
    }
  }
  eq(e) {
    return e instanceof ll ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function Ai(n, e) {
  if (e.scale == 1)
    return n;
  let t = e.toDOM(n.top), i = e.toDOM(n.bottom);
  return new He(n.from, n.length, t, i - t, Array.isArray(n._content) ? n._content.map((r) => Ai(r, e)) : n._content);
}
const Mn = /* @__PURE__ */ L.define({ combine: (n) => n.join(" ") }), wo = /* @__PURE__ */ L.define({ combine: (n) => n.indexOf(!0) > -1 }), So = /* @__PURE__ */ kt.newName(), ru = /* @__PURE__ */ kt.newName(), su = /* @__PURE__ */ kt.newName(), ou = { "&light": "." + ru, "&dark": "." + su };
function ko(n, e, t) {
  return new kt(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (r) => {
        if (r == "&")
          return n;
        if (!t || !t[r])
          throw new RangeError(`Unsupported selector: ${r}`);
        return t[r];
      }) : n + " " + i;
    }
  });
}
const Gg = /* @__PURE__ */ ko("." + So, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, ou), jg = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, is = E.ie && E.ie_version <= 11;
class Jg {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Cm(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (E.ie && E.ie_version <= 11 || E.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && E.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(E.chrome && E.chrome_version < 126) && (this.editContext = new Xg(e), e.state.facet(ht) && (e.contentDOM.editContext = this.editContext.editContext)), is && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, r = this.selectionRange;
    if (i.state.facet(ht) ? i.root.activeElement != this.dom : !_i(this.dom, r))
      return;
    let s = r.anchorNode && i.docView.tile.nearest(r.anchorNode);
    if (s && s.isWidget() && s.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (E.ie && E.ie_version <= 11 || E.android && E.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    r.focusNode && Ti(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = zi(e.root);
    if (!t)
      return !1;
    let i = E.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Yg(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let r = _i(this.dom, i);
    return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Am(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), r && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, jg), is && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), is && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let r = () => {
        let s = this.delayedAndroidKey;
        s && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = s.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && s.force && ni(this.dom, s.key, s.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(r);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, r = !1;
    for (let s of e) {
      let o = this.readMutation(s);
      o && (o.typeOver && (r = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: r };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), r = this.selectionChanged && _i(this.dom, this.selectionRange);
    if (e < 0 && !r)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let s = new dg(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: s.newSel ? s.newSel.main : null }, s;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, r = jc(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !sr(this.view.state.selection, t.newSel.main)) && this.view.update([]), r;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = Pa(t, e.previousSibling || e.target.previousSibling, -1), r = Pa(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: r ? t.posBefore(r) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(ht) != e.state.facet(ht) && (e.view.contentDOM.editContext = e.state.facet(ht) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let r of this.scrollTargets)
      r.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function Pa(n, e, t) {
  for (; e; ) {
    let i = X.get(e);
    if (i && i.parent == n)
      return i;
    let r = e.parentNode;
    e = r != n.dom ? r : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function Da(n, e) {
  let t = e.startContainer, i = e.startOffset, r = e.endContainer, s = e.endOffset, o = n.docView.domAtPos(n.state.selection.main.anchor, 1);
  return Ti(o.node, o.offset, r, s) && ([t, i, r, s] = [r, s, t, i]), { anchorNode: t, anchorOffset: i, focusNode: r, focusOffset: s };
}
function Yg(n, e) {
  if (e.getComposedRanges) {
    let r = e.getComposedRanges(n.root)[0];
    if (r)
      return Da(n, r);
  }
  let t = null;
  function i(r) {
    r.preventDefault(), r.stopImmediatePropagation(), t = r.getTargetRanges()[0];
  }
  return n.contentDOM.addEventListener("beforeinput", i, !0), n.dom.ownerDocument.execCommand("indent"), n.contentDOM.removeEventListener("beforeinput", i, !0), t ? Da(n, t) : null;
}
class Xg {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let r = e.state.selection.main, { anchor: s, head: o } = r, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: !1 });
      let h = a - l > i.text.length;
      l == this.from && s < this.from ? l = s : a == this.to && s > this.to && (a = s);
      let c = Jc(e.state.sliceDoc(l, a), i.text, (h ? r.from : r.to) - l, h ? "end" : null);
      if (!c) {
        let u = C.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        sr(u, r) || e.dispatch({ selection: u, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + l,
        to: c.toA + l,
        insert: V.of(i.text.slice(c.from, c.toB).split(`
`))
      };
      if ((E.mac || E.android) && f.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: V.of([i.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let u = this.to - this.from + (f.to - f.from + f.insert.length);
        sl(e, f, C.single(this.toEditorPos(i.selectionStart, u), this.toEditorPos(i.selectionEnd, u)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let r = [], s = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let a = e.coordsForChar(o);
        s = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || s || new DOMRect(), r.push(s);
      }
      t.updateCharacterBounds(i.rangeStart, r);
    }, this.handlers.textformatupdate = (i) => {
      let r = [];
      for (let s of i.getTextFormats()) {
        let o = s.underlineStyle, l = s.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let a = this.toEditorPos(s.rangeStart), h = this.toEditorPos(s.rangeEnd);
          if (a < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            r.push(R.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: Hc.of(R.set(r)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let r = zi(i.root);
      r && r.rangeCount && this.editContext.updateSelectionBounds(r.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, r = this.pendingContextChange;
    return e.changes.iterChanges((s, o, l, a, h) => {
      if (i)
        return;
      let c = h.length - (o - s);
      if (r && o >= r.to)
        if (r.from == s && r.to == o && r.insert.eq(h)) {
          r = this.pendingContextChange = null, t += c, this.to += c;
          return;
        } else
          r = null, this.revertPending(e.state);
      if (s += t, o += t, o <= this.from)
        this.from += c, this.to += c;
      else if (s < this.to) {
        if (s < this.from || o > this.to || this.to - this.from + h.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(s), this.toContextPos(o), h.toString()), this.to += c;
      }
      t += c;
    }), r && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((r) => !r.isUserEvent("input.type") && r.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), r = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != r) && this.editContext.updateSelection(i, r);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class P {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((r) => r.forEach((s) => i(s, this))) || ((r) => this.update(r)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Mm(e.parent) || document, this.viewState = new Oa(this, e.state || F.create(e)), e.scrollTo && e.scrollTo.is(bn) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Zt).map((r) => new Xr(r));
    for (let r of this.plugins)
      r.update(this);
    this.observer = new Jg(this), this.inputState = new yg(this), this.inputState.ensureHandlers(this.plugins), this.docView = new pa(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof te ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, r, s = this.state;
    for (let u of e) {
      if (u.startState != s)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      s = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = s;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((u) => u.annotation(eu)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = tu(s, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(s.doc) || !this.state.selection.eq(s.selection)) && (c = null)) : this.observer.clear(), s.facet(F.phrases) != this.state.facet(F.phrases))
      return this.setState(s);
    r = ir.create(this, s, e), r.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection;
          f = new ri(d.empty ? d : C.cursor(d.head, d.head > d.anchor ? -1 : 1));
        }
        for (let d of u.effects)
          d.is(bn) && (f = d.value.clip(this.state));
      }
      this.viewState.update(r, f), this.bidiCache = lr.update(this.bidiCache, r.changes), r.empty || (this.updatePlugins(r), this.inputState.update(r)), t = this.docView.update(r), this.state.facet(Mi) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (r.startState.facet(Mn) != r.state.facet(Mn) && (this.viewState.mustMeasureContent = !0), (t || i || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !r.empty)
      for (let u of this.state.facet(go))
        try {
          u(r);
        } catch (d) {
          xe(this.state, d, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !jc(this, c) && h.force && ni(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new Oa(this, e), this.plugins = e.facet(Zt).map((i) => new Xr(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new pa(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Zt), i = e.state.facet(Zt);
    if (t != i) {
      let r = [];
      for (let s of i) {
        let o = t.indexOf(s);
        if (o < 0)
          r.push(new Xr(s));
        else {
          let l = this.plugins[o];
          l.mustUpdate = e, r.push(l);
        }
      }
      for (let s of this.plugins)
        s.mustUpdate != e && s.destroy(this);
      this.plugins = r, this.pluginMap.clear();
    } else
      for (let r of this.plugins)
        r.mustUpdate = e;
    for (let r = 0; r < this.plugins.length; r++)
      this.plugins[r].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          xe(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.viewState.scrollParent, r = this.viewState.getScrollOffset(), { scrollAnchorPos: s, scrollAnchorHeight: o } = this.viewState;
    Math.abs(r - this.viewState.scrollOffset) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (wc(i || this.win))
            s = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(r);
            s = d.from, o = d.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure();
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((d) => {
          try {
            return d.read(this);
          } catch (p) {
            return xe(this.state, p), _a;
          }
        }), f = ir.create(this, this.state, []), u = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let d = 0; d < h.length; d++)
          if (c[d] != _a)
            try {
              let p = h[d];
              p.write && p.write(c[d], this);
            } catch (p) {
              xe(this.state, p);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = ((s < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(s).top) - o) / this.scaleY;
              if ((p > 1 || p < -1) && (i == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                r = r + p, i ? i.scrollTop += p : this.win.scrollBy(0, p), o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let l of this.state.facet(go))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return So + " " + (this.state.facet(wo) ? su : ru) + " " + this.state.facet(Mn);
  }
  updateAttrs() {
    let e = Ta(this, Wc, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(ht) ? "true" : "false",
      class: "cm-content",
      style: `${E.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), Ta(this, il, t);
    let i = this.observer.ignore(() => {
      let r = aa(this.contentDOM, this.contentAttrs, t), s = aa(this.dom, this.editorAttrs, e);
      return r || s;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let r of i.effects)
        if (r.is(P.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let s = this.announceDOM.appendChild(document.createElement("div"));
          s.textContent = r.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Mi);
    let e = this.state.facet(P.cspNonce);
    kt.mount(this.root, this.styleModules.concat(Gg).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return es(this, e, ma(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return es(this, e, ma(this, e, t, (i) => lg(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), r = this.textDirectionAt(e.from), s = i[t ? i.length - 1 : 0];
    return C.cursor(s.side(t, r) + e.from, s.forward(!t, r) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return og(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return es(this, e, ag(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = bo(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), bo(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(e, t);
    if (!i || i.left == i.right)
      return i;
    let r = this.state.doc.lineAt(e), s = this.bidiSpans(r), o = s[$e.find(s, e - r.from, -1, t)];
    return tr(i, o.dir == U.LTR == t > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(Rc) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > Qg)
      return Oc(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let s of this.bidiCache)
      if (s.from == e.from && s.dir == t && (s.fresh || Ac(s.isolates, i = ua(this, e))))
        return s.order;
    i || (i = ua(this, e));
    let r = Tm(e.text, t, i);
    return this.bidiCache.push(new lr(e.from, e.to, t, i, !0, r)), r;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || E.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      xc(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    return bn.of(new ri(typeof e == "number" ? C.cursor(e) : e, t.y, t.x, t.yMargin, t.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return bn.of(new ri(C.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return $.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return $.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = kt.newName(), r = [Mn.of(i), Mi.of(ko(`.${i}`, e))];
    return t && t.dark && r.push(wo.of(!0)), r;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return jt.lowest(Mi.of(ko("." + So, e, ou)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), r = i && X.get(i) || X.get(e);
    return ((t = r?.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
P.styleModule = Mi;
P.inputHandler = Tc;
P.clipboardInputFilter = el;
P.clipboardOutputFilter = tl;
P.scrollHandler = Nc;
P.focusChangeEffect = Bc;
P.perLineTextDirection = Rc;
P.exceptionSink = _c;
P.updateListener = go;
P.editable = ht;
P.mouseSelectionStyle = Dc;
P.dragMovesSelection = Pc;
P.clickAddsSelectionRange = Lc;
P.decorations = Cr;
P.blockWrappers = Fc;
P.outerDecorations = nl;
P.atomicRanges = an;
P.bidiIsolatedRanges = Vc;
P.scrollMargins = qc;
P.darkTheme = wo;
P.cspNonce = /* @__PURE__ */ L.define({ combine: (n) => n.length ? n[0] : "" });
P.contentAttributes = il;
P.editorAttributes = Wc;
P.lineWrapping = /* @__PURE__ */ P.contentAttributes.of({ class: "cm-lineWrapping" });
P.announce = /* @__PURE__ */ I.define();
const Qg = 4096, _a = {};
class lr {
  constructor(e, t, i, r, s, o) {
    this.from = e, this.to = t, this.dir = i, this.isolates = r, this.fresh = s, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((s) => s.fresh))
      return e;
    let i = [], r = e.length ? e[e.length - 1].dir : U.LTR;
    for (let s = Math.max(0, e.length - 10); s < e.length; s++) {
      let o = e[s];
      o.dir == r && !t.touchesRange(o.from, o.to) && i.push(new lr(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function Ta(n, e, t) {
  for (let i = n.state.facet(e), r = i.length - 1; r >= 0; r--) {
    let s = i[r], o = typeof s == "function" ? s(n) : s;
    o && Qo(o, t);
  }
  return t;
}
const Zg = E.mac ? "mac" : E.windows ? "win" : E.linux ? "linux" : "key";
function $g(n, e) {
  const t = n.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let r, s, o, l;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      l = !0;
    else if (/^a(lt)?$/i.test(h))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      s = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? l = !0 : s = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return r && (i = "Alt-" + i), s && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function An(n, e, t) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t !== !1 && e.shiftKey && (n = "Shift-" + n), n;
}
const e0 = /* @__PURE__ */ jt.default(/* @__PURE__ */ P.domEventHandlers({
  keydown(n, e) {
    return au(lu(e.state), n, e, "editor");
  }
})), al = /* @__PURE__ */ L.define({ enables: e0 }), Ba = /* @__PURE__ */ new WeakMap();
function lu(n) {
  let e = n.facet(al), t = Ba.get(e);
  return t || Ba.set(e, t = n0(e.reduce((i, r) => i.concat(r), []))), t;
}
function t0(n, e, t) {
  return au(lu(n.state), e, n, t);
}
let vt = null;
const i0 = 4e3;
function n0(n, e = Zg) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), r = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, s = (o, l, a, h, c) => {
    var f, u;
    let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((y) => $g(y, e));
    for (let y = 1; y < p.length; y++) {
      let v = p.slice(0, y).join(" ");
      r(v, !0), d[v] || (d[v] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(w) => {
          let b = vt = { view: w, prefix: v, scope: o };
          return setTimeout(() => {
            vt == b && (vt = null);
          }, i0), !0;
        }]
      });
    }
    let m = p.join(" ");
    r(m, !1);
    let g = d[m] || (d[m] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = d._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && g.run.push(a), h && (g.preventDefault = !0), c && (g.stopPropagation = !0);
  };
  for (let o of n) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let u in c)
          c[u].run.push((d) => f(d, Co));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        s(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && s(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let Co = null;
function au(n, e, t, i) {
  Co = e;
  let r = ym(e), s = ye(r, 0), o = Qe(s) == r.length && r != " ", l = "", a = !1, h = !1, c = !1;
  vt && vt.view == t && vt.scope == i && (l = vt.prefix + " ", Xc.indexOf(e.keyCode) < 0 && (h = !0, vt = null));
  let f = /* @__PURE__ */ new Set(), u = (g) => {
    if (g) {
      for (let y of g.run)
        if (!f.has(y) && (f.add(y), y(t)))
          return g.stopPropagation && (c = !0), !0;
      g.preventDefault && (g.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, d = n[i], p, m;
  return d && (u(d[l + An(r, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(E.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(E.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (p = Ct[e.keyCode]) && p != r ? (u(d[l + An(p, e, !0)]) || e.shiftKey && (m = Vi[e.keyCode]) != r && m != p && u(d[l + An(m, e, !1)])) && (a = !0) : o && e.shiftKey && u(d[l + An(r, e, !0)]) && (a = !0), !a && u(d._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), Co = null, a;
}
class hn {
  /**
  Create a marker with the given class and dimensions. If `width`
  is null, the DOM element will get no width style.
  */
  constructor(e, t, i, r, s) {
    this.className = e, this.left = t, this.top = i, this.width = r, this.height = s;
  }
  draw() {
    let e = document.createElement("div");
    return e.className = this.className, this.adjust(e), e;
  }
  update(e, t) {
    return t.className != this.className ? !1 : (this.adjust(e), !0);
  }
  adjust(e) {
    e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
  }
  eq(e) {
    return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
  }
  /**
  Create a set of rectangles for the given selection range,
  assigning them theclass`className`. Will create a single
  rectangle for empty ranges, and a set of selection-style
  rectangles covering the range's content (in a bidi-aware
  way) for non-empty ones.
  */
  static forRange(e, t, i) {
    if (i.empty) {
      let r = e.coordsAtPos(i.head, i.assoc || 1);
      if (!r)
        return [];
      let s = hu(e);
      return [new hn(t, r.left - s.left, r.top - s.top, null, r.bottom - r.top)];
    } else
      return r0(e, t, i);
  }
}
function hu(n) {
  let e = n.scrollDOM.getBoundingClientRect();
  return { left: (n.textDirection == U.LTR ? e.left : e.right - n.scrollDOM.clientWidth * n.scaleX) - n.scrollDOM.scrollLeft * n.scaleX, top: e.top - n.scrollDOM.scrollTop * n.scaleY };
}
function Ra(n, e, t, i) {
  let r = n.coordsAtPos(e, t * 2);
  if (!r)
    return i;
  let s = n.dom.getBoundingClientRect(), o = (r.top + r.bottom) / 2, l = n.posAtCoords({ x: s.left + 1, y: o }), a = n.posAtCoords({ x: s.right - 1, y: o });
  return l == null || a == null ? i : { from: Math.max(i.from, Math.min(l, a)), to: Math.min(i.to, Math.max(l, a)) };
}
function r0(n, e, t) {
  if (t.to <= n.viewport.from || t.from >= n.viewport.to)
    return [];
  let i = Math.max(t.from, n.viewport.from), r = Math.min(t.to, n.viewport.to), s = n.textDirection == U.LTR, o = n.contentDOM, l = o.getBoundingClientRect(), a = hu(n), h = o.querySelector(".cm-line"), c = h && window.getComputedStyle(h), f = l.left + (c ? parseInt(c.paddingLeft) + Math.min(0, parseInt(c.textIndent)) : 0), u = l.right - (c ? parseInt(c.paddingRight) : 0), d = vo(n, i, 1), p = vo(n, r, -1), m = d.type == ae.Text ? d : null, g = p.type == ae.Text ? p : null;
  if (m && (n.lineWrapping || d.widgetLineBreaks) && (m = Ra(n, i, 1, m)), g && (n.lineWrapping || p.widgetLineBreaks) && (g = Ra(n, r, -1, g)), m && g && m.from == g.from && m.to == g.to)
    return v(w(t.from, t.to, m));
  {
    let x = m ? w(t.from, null, m) : b(d, !1), k = g ? w(null, t.to, g) : b(p, !0), S = [];
    return (m || d).to < (g || p).from - (m && g ? 1 : 0) || d.widgetLineBreaks > 1 && x.bottom + n.defaultLineHeight / 2 < k.top ? S.push(y(f, x.bottom, u, k.top)) : x.bottom < k.top && n.elementAtHeight((x.bottom + k.top) / 2).type == ae.Text && (x.bottom = k.top = (x.bottom + k.top) / 2), v(x).concat(S).concat(v(k));
  }
  function y(x, k, S, M) {
    return new hn(e, x - a.left, k - a.top, Math.max(0, S - x), M - k);
  }
  function v({ top: x, bottom: k, horizontal: S }) {
    let M = [];
    for (let D = 0; D < S.length; D += 2)
      M.push(y(S[D], x, S[D + 1], k));
    return M;
  }
  function w(x, k, S) {
    let M = 1e9, D = -1e9, _ = [];
    function T(q, G, de, ke, Ke) {
      let re = n.coordsAtPos(q, q == S.to ? -2 : 2), Oe = n.coordsAtPos(de, de == S.from ? 2 : -2);
      !re || !Oe || (M = Math.min(re.top, Oe.top, M), D = Math.max(re.bottom, Oe.bottom, D), Ke == U.LTR ? _.push(s && G ? f : re.left, s && ke ? u : Oe.right) : _.push(!s && ke ? f : Oe.left, !s && G ? u : re.right));
    }
    let B = x ?? S.from, H = k ?? S.to;
    for (let q of n.visibleRanges)
      if (q.to > B && q.from < H)
        for (let G = Math.max(q.from, B), de = Math.min(q.to, H); ; ) {
          let ke = n.state.doc.lineAt(G);
          for (let Ke of n.bidiSpans(ke)) {
            let re = Ke.from + ke.from, Oe = Ke.to + ke.from;
            if (re >= de)
              break;
            Oe > G && T(Math.max(re, G), x == null && re <= B, Math.min(Oe, de), k == null && Oe >= H, Ke.dir);
          }
          if (G = ke.to + 1, G >= de)
            break;
        }
    return _.length == 0 && T(B, x == null, H, k == null, n.textDirection), { top: M, bottom: D, horizontal: _ };
  }
  function b(x, k) {
    let S = l.top + (k ? x.top : x.bottom);
    return { top: S, bottom: S, horizontal: [] };
  }
}
function s0(n, e) {
  return n.constructor == e.constructor && n.eq(e);
}
class o0 {
  constructor(e, t) {
    this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = { read: this.measure.bind(this), write: this.draw.bind(this) }, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
  }
  update(e) {
    e.startState.facet(Un) != e.state.facet(Un) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
  }
  docViewUpdate(e) {
    this.layer.updateOnDocViewUpdate !== !1 && e.requestMeasure(this.measureReq);
  }
  setOrder(e) {
    let t = 0, i = e.facet(Un);
    for (; t < i.length && i[t] != this.layer; )
      t++;
    this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
  }
  measure() {
    return this.layer.markers(this.view);
  }
  scale() {
    let { scaleX: e, scaleY: t } = this.view;
    (e != this.scaleX || t != this.scaleY) && (this.scaleX = e, this.scaleY = t, this.dom.style.transform = `scale(${1 / e}, ${1 / t})`);
  }
  draw(e) {
    if (e.length != this.drawn.length || e.some((t, i) => !s0(t, this.drawn[i]))) {
      let t = this.dom.firstChild, i = 0;
      for (let r of e)
        r.update && t && r.constructor && this.drawn[i].constructor && r.update(t, this.drawn[i]) ? (t = t.nextSibling, i++) : this.dom.insertBefore(r.draw(), t);
      for (; t; ) {
        let r = t.nextSibling;
        t.remove(), t = r;
      }
      this.drawn = e, E.safari && E.safari_version >= 26 && (this.dom.style.display = this.dom.firstChild ? "" : "none");
    }
  }
  destroy() {
    this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
  }
}
const Un = /* @__PURE__ */ L.define();
function cu(n) {
  return [
    $.define((e) => new o0(e, n)),
    Un.of(n)
  ];
}
const Ui = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, {
      cursorBlinkRate: 1200,
      drawRangeCursor: !0
    }, {
      cursorBlinkRate: (e, t) => Math.min(e, t),
      drawRangeCursor: (e, t) => e || t
    });
  }
});
function l0(n = {}) {
  return [
    Ui.of(n),
    a0,
    h0,
    c0,
    Ic.of(!0)
  ];
}
function uu(n) {
  return n.startState.facet(Ui) != n.state.facet(Ui);
}
const a0 = /* @__PURE__ */ cu({
  above: !0,
  markers(n) {
    let { state: e } = n, t = e.facet(Ui), i = [];
    for (let r of e.selection.ranges) {
      let s = r == e.selection.main;
      if (r.empty || t.drawRangeCursor) {
        let o = s ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", l = r.empty ? r : C.cursor(r.head, r.head > r.anchor ? -1 : 1);
        for (let a of hn.forRange(n, o, l))
          i.push(a);
      }
    }
    return i;
  },
  update(n, e) {
    n.transactions.some((i) => i.selection) && (e.style.animationName = e.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
    let t = uu(n);
    return t && Ia(n.state, e), n.docChanged || n.selectionSet || t;
  },
  mount(n, e) {
    Ia(e.state, n);
  },
  class: "cm-cursorLayer"
});
function Ia(n, e) {
  e.style.animationDuration = n.facet(Ui).cursorBlinkRate + "ms";
}
const h0 = /* @__PURE__ */ cu({
  above: !1,
  markers(n) {
    return n.state.selection.ranges.map((e) => e.empty ? [] : hn.forRange(n, "cm-selectionBackground", e)).reduce((e, t) => e.concat(t));
  },
  update(n, e) {
    return n.docChanged || n.selectionSet || n.viewportChanged || uu(n);
  },
  class: "cm-selectionLayer"
}), c0 = /* @__PURE__ */ jt.highest(/* @__PURE__ */ P.theme({
  ".cm-line": {
    "& ::selection, &::selection": { backgroundColor: "transparent !important" },
    caretColor: "transparent !important"
  },
  ".cm-content": {
    caretColor: "transparent !important",
    "& :focus": {
      caretColor: "initial !important",
      "&::selection, & ::selection": {
        backgroundColor: "Highlight !important"
      }
    }
  }
})), fu = /* @__PURE__ */ I.define({
  map(n, e) {
    return n == null ? null : e.mapPos(n);
  }
}), Oi = /* @__PURE__ */ ue.define({
  create() {
    return null;
  },
  update(n, e) {
    return n != null && (n = e.changes.mapPos(n)), e.effects.reduce((t, i) => i.is(fu) ? i.value : t, n);
  }
}), u0 = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.cursor = null, this.measureReq = { read: this.readPos.bind(this), write: this.drawCursor.bind(this) };
  }
  update(n) {
    var e;
    let t = n.state.field(Oi);
    t == null ? this.cursor != null && ((e = this.cursor) === null || e === void 0 || e.remove(), this.cursor = null) : (this.cursor || (this.cursor = this.view.scrollDOM.appendChild(document.createElement("div")), this.cursor.className = "cm-dropCursor"), (n.startState.field(Oi) != t || n.docChanged || n.geometryChanged) && this.view.requestMeasure(this.measureReq));
  }
  readPos() {
    let { view: n } = this, e = n.state.field(Oi), t = e != null && n.coordsAtPos(e);
    if (!t)
      return null;
    let i = n.scrollDOM.getBoundingClientRect();
    return {
      left: t.left - i.left + n.scrollDOM.scrollLeft * n.scaleX,
      top: t.top - i.top + n.scrollDOM.scrollTop * n.scaleY,
      height: t.bottom - t.top
    };
  }
  drawCursor(n) {
    if (this.cursor) {
      let { scaleX: e, scaleY: t } = this.view;
      n ? (this.cursor.style.left = n.left / e + "px", this.cursor.style.top = n.top / t + "px", this.cursor.style.height = n.height / t + "px") : this.cursor.style.left = "-100000px";
    }
  }
  destroy() {
    this.cursor && this.cursor.remove();
  }
  setDropPos(n) {
    this.view.state.field(Oi) != n && this.view.dispatch({ effects: fu.of(n) });
  }
}, {
  eventObservers: {
    dragover(n) {
      this.setDropPos(this.view.posAtCoords({ x: n.clientX, y: n.clientY }));
    },
    dragleave(n) {
      (n.target == this.view.contentDOM || !this.view.contentDOM.contains(n.relatedTarget)) && this.setDropPos(null);
    },
    dragend() {
      this.setDropPos(null);
    },
    drop() {
      this.setDropPos(null);
    }
  }
});
function f0() {
  return [Oi, u0];
}
function Na(n, e, t, i, r) {
  e.lastIndex = 0;
  for (let s = n.iterRange(t, i), o = t, l; !s.next().done; o += s.value.length)
    if (!s.lineBreak)
      for (; l = e.exec(s.value); )
        r(o + l.index, l);
}
function d0(n, e) {
  let t = n.visibleRanges;
  if (t.length == 1 && t[0].from == n.viewport.from && t[0].to == n.viewport.to)
    return t;
  let i = [];
  for (let { from: r, to: s } of t)
    r = Math.max(n.state.doc.lineAt(r).from, r - e), s = Math.min(n.state.doc.lineAt(s).to, s + e), i.length && i[i.length - 1].to >= r ? i[i.length - 1].to = s : i.push({ from: r, to: s });
  return i;
}
class p0 {
  /**
  Create a decorator.
  */
  constructor(e) {
    const { regexp: t, decoration: i, decorate: r, boundary: s, maxLength: o = 1e3 } = e;
    if (!t.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    if (this.regexp = t, r)
      this.addMatch = (l, a, h, c) => r(c, h, h + l[0].length, l, a);
    else if (typeof i == "function")
      this.addMatch = (l, a, h, c) => {
        let f = i(l, a, h);
        f && c(h, h + l[0].length, f);
      };
    else if (i)
      this.addMatch = (l, a, h, c) => c(h, h + l[0].length, i);
    else
      throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
    this.boundary = s, this.maxLength = o;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(e) {
    let t = new ut(), i = t.add.bind(t);
    for (let { from: r, to: s } of d0(e, this.maxLength))
      Na(e.state.doc, this.regexp, r, s, (o, l) => this.addMatch(l, e, o, i));
    return t.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(e, t) {
    let i = 1e9, r = -1;
    return e.docChanged && e.changes.iterChanges((s, o, l, a) => {
      a >= e.view.viewport.from && l <= e.view.viewport.to && (i = Math.min(l, i), r = Math.max(a, r));
    }), e.viewportMoved || r - i > 1e3 ? this.createDeco(e.view) : r > -1 ? this.updateRange(e.view, t.map(e.changes), i, r) : t;
  }
  updateRange(e, t, i, r) {
    for (let s of e.visibleRanges) {
      let o = Math.max(s.from, i), l = Math.min(s.to, r);
      if (l >= o) {
        let a = e.state.doc.lineAt(o), h = a.to < l ? e.state.doc.lineAt(l) : a, c = Math.max(s.from, a.from), f = Math.min(s.to, h.to);
        if (this.boundary) {
          for (; o > a.from; o--)
            if (this.boundary.test(a.text[o - 1 - a.from])) {
              c = o;
              break;
            }
          for (; l < h.to; l++)
            if (this.boundary.test(h.text[l - h.from])) {
              f = l;
              break;
            }
        }
        let u = [], d, p = (m, g, y) => u.push(y.range(m, g));
        if (a == h)
          for (this.regexp.lastIndex = c - a.from; (d = this.regexp.exec(a.text)) && d.index < f - a.from; )
            this.addMatch(d, e, d.index + a.from, p);
        else
          Na(e.state.doc, this.regexp, c, f, (m, g) => this.addMatch(g, e, m, p));
        t = t.update({ filterFrom: c, filterTo: f, filter: (m, g) => m < c || g > f, add: u });
      }
    }
    return t;
  }
}
const Mo = /x/.unicode != null ? "gu" : "g", m0 = /* @__PURE__ */ new RegExp(`[\0-\b
--­؜​‎‏\u2028\u2029‭‮⁦⁧⁩\uFEFF￹-￼]`, Mo), g0 = {
  0: "null",
  7: "bell",
  8: "backspace",
  10: "newline",
  11: "vertical tab",
  13: "carriage return",
  27: "escape",
  8203: "zero width space",
  8204: "zero width non-joiner",
  8205: "zero width joiner",
  8206: "left-to-right mark",
  8207: "right-to-left mark",
  8232: "line separator",
  8237: "left-to-right override",
  8238: "right-to-left override",
  8294: "left-to-right isolate",
  8295: "right-to-left isolate",
  8297: "pop directional isolate",
  8233: "paragraph separator",
  65279: "zero width no-break space",
  65532: "object replacement"
};
let ns = null;
function y0() {
  var n;
  if (ns == null && typeof document < "u" && document.body) {
    let e = document.body.style;
    ns = ((n = e.tabSize) !== null && n !== void 0 ? n : e.MozTabSize) != null;
  }
  return ns || !1;
}
const Gn = /* @__PURE__ */ L.define({
  combine(n) {
    let e = rt(n, {
      render: null,
      specialChars: m0,
      addSpecialChars: null
    });
    return (e.replaceTabs = !y0()) && (e.specialChars = new RegExp("	|" + e.specialChars.source, Mo)), e.addSpecialChars && (e.specialChars = new RegExp(e.specialChars.source + "|" + e.addSpecialChars.source, Mo)), e;
  }
});
function v0(n = {}) {
  return [Gn.of(n), b0()];
}
let Ha = null;
function b0() {
  return Ha || (Ha = $.fromClass(class {
    constructor(n) {
      this.view = n, this.decorations = R.none, this.decorationCache = /* @__PURE__ */ Object.create(null), this.decorator = this.makeDecorator(n.state.facet(Gn)), this.decorations = this.decorator.createDeco(n);
    }
    makeDecorator(n) {
      return new p0({
        regexp: n.specialChars,
        decoration: (e, t, i) => {
          let { doc: r } = t.state, s = ye(e[0], 0);
          if (s == 9) {
            let o = r.lineAt(i), l = t.state.tabSize, a = pi(o.text, l, i - o.from);
            return R.replace({
              widget: new k0((l - a % l) * this.view.defaultCharacterWidth / this.view.scaleX)
            });
          }
          return this.decorationCache[s] || (this.decorationCache[s] = R.replace({ widget: new S0(n, s) }));
        },
        boundary: n.replaceTabs ? void 0 : /[^]/
      });
    }
    update(n) {
      let e = n.state.facet(Gn);
      n.startState.facet(Gn) != e ? (this.decorator = this.makeDecorator(e), this.decorations = this.decorator.createDeco(n.view)) : this.decorations = this.decorator.updateDeco(n, this.decorations);
    }
  }, {
    decorations: (n) => n.decorations
  }));
}
const x0 = "•";
function w0(n) {
  return n >= 32 ? x0 : n == 10 ? "␤" : String.fromCharCode(9216 + n);
}
class S0 extends mt {
  constructor(e, t) {
    super(), this.options = e, this.code = t;
  }
  eq(e) {
    return e.code == this.code;
  }
  toDOM(e) {
    let t = w0(this.code), i = e.state.phrase("Control character") + " " + (g0[this.code] || "0x" + this.code.toString(16)), r = this.options.render && this.options.render(this.code, i, t);
    if (r)
      return r;
    let s = document.createElement("span");
    return s.textContent = t, s.title = i, s.setAttribute("aria-label", i), s.className = "cm-specialChar", s;
  }
  ignoreEvent() {
    return !1;
  }
}
class k0 extends mt {
  constructor(e) {
    super(), this.width = e;
  }
  eq(e) {
    return e.width == this.width;
  }
  toDOM() {
    let e = document.createElement("span");
    return e.textContent = "	", e.className = "cm-tab", e.style.width = this.width + "px", e;
  }
  ignoreEvent() {
    return !1;
  }
}
function C0() {
  return A0;
}
const M0 = /* @__PURE__ */ R.line({ class: "cm-activeLine" }), A0 = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.docChanged || n.selectionSet) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = -1, t = [];
    for (let i of n.state.selection.ranges) {
      let r = n.lineBlockAt(i.head);
      r.from > e && (t.push(M0.range(r.from)), e = r.from);
    }
    return R.set(t);
  }
}, {
  decorations: (n) => n.decorations
}), Ao = 2e3;
function O0(n, e, t) {
  let i = Math.min(e.line, t.line), r = Math.max(e.line, t.line), s = [];
  if (e.off > Ao || t.off > Ao || e.col < 0 || t.col < 0) {
    let o = Math.min(e.off, t.off), l = Math.max(e.off, t.off);
    for (let a = i; a <= r; a++) {
      let h = n.doc.line(a);
      h.length <= l && s.push(C.range(h.from + o, h.to + l));
    }
  } else {
    let o = Math.min(e.col, t.col), l = Math.max(e.col, t.col);
    for (let a = i; a <= r; a++) {
      let h = n.doc.line(a), c = ro(h.text, o, n.tabSize, !0);
      if (c < 0)
        s.push(C.cursor(h.to));
      else {
        let f = ro(h.text, l, n.tabSize);
        s.push(C.range(h.from + c, h.from + f));
      }
    }
  }
  return s;
}
function E0(n, e) {
  let t = n.coordsAtPos(n.viewport.from);
  return t ? Math.round(Math.abs((t.left - e) / n.defaultCharacterWidth)) : -1;
}
function Wa(n, e) {
  let t = n.posAtCoords({ x: e.clientX, y: e.clientY }, !1), i = n.state.doc.lineAt(t), r = t - i.from, s = r > Ao ? -1 : r == i.length ? E0(n, e.clientX) : pi(i.text, n.state.tabSize, t - i.from);
  return { line: i.number, col: s, off: r };
}
function L0(n, e) {
  let t = Wa(n, e), i = n.state.selection;
  return t ? {
    update(r) {
      if (r.docChanged) {
        let s = r.changes.mapPos(r.startState.doc.line(t.line).from), o = r.state.doc.lineAt(s);
        t = { line: o.number, col: t.col, off: Math.min(t.off, o.length) }, i = i.map(r.changes);
      }
    },
    get(r, s, o) {
      let l = Wa(n, r);
      if (!l)
        return i;
      let a = O0(n.state, t, l);
      return a.length ? o ? C.create(a.concat(i.ranges)) : C.create(a) : i;
    }
  } : null;
}
function P0(n) {
  let e = (t) => t.altKey && t.button == 0;
  return P.mouseSelectionStyle.of((t, i) => e(i) ? L0(t, i) : null);
}
const D0 = {
  Alt: [18, (n) => !!n.altKey],
  Control: [17, (n) => !!n.ctrlKey],
  Shift: [16, (n) => !!n.shiftKey],
  Meta: [91, (n) => !!n.metaKey]
}, _0 = { style: "cursor: crosshair" };
function T0(n = {}) {
  let [e, t] = D0[n.key || "Alt"], i = $.fromClass(class {
    constructor(r) {
      this.view = r, this.isDown = !1;
    }
    set(r) {
      this.isDown != r && (this.isDown = r, this.view.update([]));
    }
  }, {
    eventObservers: {
      keydown(r) {
        this.set(r.keyCode == e || t(r));
      },
      keyup(r) {
        (r.keyCode == e || !t(r)) && this.set(!1);
      },
      mousemove(r) {
        this.set(t(r));
      }
    }
  });
  return [
    i,
    P.contentAttributes.of((r) => {
      var s;
      return !((s = r.plugin(i)) === null || s === void 0) && s.isDown ? _0 : null;
    })
  ];
}
const On = "-10000px";
class du {
  constructor(e, t, i, r) {
    this.facet = t, this.createTooltipView = i, this.removeTooltipView = r, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let s = null;
    this.tooltipViews = this.tooltips.map((o) => s = i(o, s));
  }
  update(e, t) {
    var i;
    let r = e.state.facet(this.facet), s = r.filter((a) => a);
    if (r === this.input) {
      for (let a of this.tooltipViews)
        a.update && a.update(e);
      return !1;
    }
    let o = [], l = t ? [] : null;
    for (let a = 0; a < s.length; a++) {
      let h = s[a], c = -1;
      if (h) {
        for (let f = 0; f < this.tooltips.length; f++) {
          let u = this.tooltips[f];
          u && u.create == h.create && (c = f);
        }
        if (c < 0)
          o[a] = this.createTooltipView(h, a ? o[a - 1] : null), l && (l[a] = !!h.above);
        else {
          let f = o[a] = this.tooltipViews[c];
          l && (l[a] = t[c]), f.update && f.update(e);
        }
      }
    }
    for (let a of this.tooltipViews)
      o.indexOf(a) < 0 && (this.removeTooltipView(a), (i = a.destroy) === null || i === void 0 || i.call(a));
    return t && (l.forEach((a, h) => t[h] = a), t.length = l.length), this.input = r, this.tooltips = s, this.tooltipViews = o, !0;
  }
}
function B0(n) {
  let e = n.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const rs = /* @__PURE__ */ L.define({
  combine: (n) => {
    var e, t, i;
    return {
      position: E.ios ? "absolute" : ((e = n.find((r) => r.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = n.find((r) => r.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((i = n.find((r) => r.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || B0
    };
  }
}), Fa = /* @__PURE__ */ new WeakMap(), hl = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = n.state.facet(rs);
    this.position = e.position, this.parent = e.parent, this.classes = n.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new du(n, cl, (t, i) => this.createTooltip(t, i), (t) => {
      this.resizeObserver && this.resizeObserver.unobserve(t.dom), t.dom.remove();
    }), this.above = this.manager.tooltips.map((t) => !!t.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((t) => {
      Date.now() > this.lastTransaction - 50 && t.length > 0 && t[t.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), n.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let n of this.manager.tooltipViews)
        this.intersectionObserver.observe(n.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(n) {
    n.transactions.length && (this.lastTransaction = Date.now());
    let e = this.manager.update(n, this.above);
    e && this.observeIntersection();
    let t = e || n.geometryChanged, i = n.state.facet(rs);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let r of this.manager.tooltipViews)
        r.dom.style.position = this.position;
      t = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let r of this.manager.tooltipViews)
        this.container.appendChild(r.dom);
      t = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    t && this.maybeMeasure();
  }
  createTooltip(n, e) {
    let t = n.create(this.view), i = e ? e.dom : null;
    if (t.dom.classList.add("cm-tooltip"), n.arrow && !t.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let r = document.createElement("div");
      r.className = "cm-tooltip-arrow", t.dom.appendChild(r);
    }
    return t.dom.style.position = this.position, t.dom.style.top = On, t.dom.style.left = "0px", this.container.insertBefore(t.dom, i), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
  }
  destroy() {
    var n, e, t;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (n = i.destroy) === null || n === void 0 || n.call(i);
    this.parent && this.container.remove(), (e = this.resizeObserver) === null || e === void 0 || e.disconnect(), (t = this.intersectionObserver) === null || t === void 0 || t.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let n = 1, e = 1, t = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: s } = this.manager.tooltipViews[0];
      if (E.safari) {
        let o = s.getBoundingClientRect();
        t = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      } else
        t = !!s.offsetParent && s.offsetParent != this.container.ownerDocument.body;
    }
    if (t || this.position == "absolute")
      if (this.parent) {
        let s = this.parent.getBoundingClientRect();
        s.width && s.height && (n = s.width / this.parent.offsetWidth, e = s.height / this.parent.offsetHeight);
      } else
        ({ scaleX: n, scaleY: e } = this.view.viewState);
    let i = this.view.scrollDOM.getBoundingClientRect(), r = rl(this.view);
    return {
      visible: {
        left: i.left + r.left,
        top: i.top + r.top,
        right: i.right - r.right,
        bottom: i.bottom - r.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((s, o) => {
        let l = this.manager.tooltipViews[o];
        return l.getCoords ? l.getCoords(s.pos) : this.view.coordsAtPos(s.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: s }) => s.getBoundingClientRect()),
      space: this.view.state.facet(rs).tooltipSpace(this.view),
      scaleX: n,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(n) {
    var e;
    if (n.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let l of this.manager.tooltipViews)
        l.dom.style.position = "absolute";
    }
    let { visible: t, space: i, scaleX: r, scaleY: s } = n, o = [];
    for (let l = 0; l < this.manager.tooltips.length; l++) {
      let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = n.pos[l], u = n.size[l];
      if (!f || a.clip !== !1 && (f.bottom <= Math.max(t.top, i.top) || f.top >= Math.min(t.bottom, i.bottom) || f.right < Math.max(t.left, i.left) - 0.1 || f.left > Math.min(t.right, i.right) + 0.1)) {
        c.style.top = On;
        continue;
      }
      let d = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, p = d ? 7 : 0, m = u.right - u.left, g = (e = Fa.get(h)) !== null && e !== void 0 ? e : u.bottom - u.top, y = h.offset || I0, v = this.view.textDirection == U.LTR, w = u.width > i.right - i.left ? v ? i.left : i.right - u.width : v ? Math.max(i.left, Math.min(f.left - (d ? 14 : 0) + y.x, i.right - m)) : Math.min(Math.max(i.left, f.left - m + (d ? 14 : 0) - y.x), i.right - m), b = this.above[l];
      !a.strictSide && (b ? f.top - g - p - y.y < i.top : f.bottom + g + p + y.y > i.bottom) && b == i.bottom - f.bottom > f.top - i.top && (b = this.above[l] = !b);
      let x = (b ? f.top - i.top : i.bottom - f.bottom) - p;
      if (x < g && h.resize !== !1) {
        if (x < this.view.defaultLineHeight) {
          c.style.top = On;
          continue;
        }
        Fa.set(h, g), c.style.height = (g = x) / s + "px";
      } else c.style.height && (c.style.height = "");
      let k = b ? f.top - g - p - y.y : f.bottom + p + y.y, S = w + m;
      if (h.overlap !== !0)
        for (let M of o)
          M.left < S && M.right > w && M.top < k + g && M.bottom > k && (k = b ? M.top - g - 2 - p : M.bottom + p + 2);
      if (this.position == "absolute" ? (c.style.top = (k - n.parent.top) / s + "px", Va(c, (w - n.parent.left) / r)) : (c.style.top = k / s + "px", Va(c, w / r)), d) {
        let M = f.left + (v ? y.x : -y.x) - (w + 14 - 7);
        d.style.left = M / r + "px";
      }
      h.overlap !== !0 && o.push({ left: w, top: k, right: S, bottom: k + g }), c.classList.toggle("cm-tooltip-above", b), c.classList.toggle("cm-tooltip-below", !b), h.positioned && h.positioned(n.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let n of this.manager.tooltipViews)
        n.dom.style.top = On;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function Va(n, e) {
  let t = parseInt(n.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (n.style.left = e + "px");
}
const R0 = /* @__PURE__ */ P.baseTheme({
  ".cm-tooltip": {
    zIndex: 500,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), I0 = { x: 0, y: 0 }, cl = /* @__PURE__ */ L.define({
  enables: [hl, R0]
}), ar = /* @__PURE__ */ L.define({
  combine: (n) => n.reduce((e, t) => e.concat(t), [])
});
class Er {
  // Needs to be static so that host tooltip instances always match
  static create(e) {
    return new Er(e);
  }
  constructor(e) {
    this.view = e, this.mounted = !1, this.dom = document.createElement("div"), this.dom.classList.add("cm-tooltip-hover"), this.manager = new du(e, ar, (t, i) => this.createHostedView(t, i), (t) => t.dom.remove());
  }
  createHostedView(e, t) {
    let i = e.create(this.view);
    return i.dom.classList.add("cm-tooltip-section"), this.dom.insertBefore(i.dom, t ? t.dom.nextSibling : this.dom.firstChild), this.mounted && i.mount && i.mount(this.view), i;
  }
  mount(e) {
    for (let t of this.manager.tooltipViews)
      t.mount && t.mount(e);
    this.mounted = !0;
  }
  positioned(e) {
    for (let t of this.manager.tooltipViews)
      t.positioned && t.positioned(e);
  }
  update(e) {
    this.manager.update(e);
  }
  destroy() {
    var e;
    for (let t of this.manager.tooltipViews)
      (e = t.destroy) === null || e === void 0 || e.call(t);
  }
  passProp(e) {
    let t;
    for (let i of this.manager.tooltipViews) {
      let r = i[e];
      if (r !== void 0) {
        if (t === void 0)
          t = r;
        else if (t !== r)
          return;
      }
    }
    return t;
  }
  get offset() {
    return this.passProp("offset");
  }
  get getCoords() {
    return this.passProp("getCoords");
  }
  get overlap() {
    return this.passProp("overlap");
  }
  get resize() {
    return this.passProp("resize");
  }
}
const N0 = /* @__PURE__ */ cl.compute([ar], (n) => {
  let e = n.facet(ar);
  return e.length === 0 ? null : {
    pos: Math.min(...e.map((t) => t.pos)),
    end: Math.max(...e.map((t) => {
      var i;
      return (i = t.end) !== null && i !== void 0 ? i : t.pos;
    })),
    create: Er.create,
    above: e[0].above,
    arrow: e.some((t) => t.arrow)
  };
});
class H0 {
  constructor(e, t, i, r, s) {
    this.view = e, this.source = t, this.field = i, this.setHover = r, this.hoverTime = s, this.hoverTimeout = -1, this.restartTimeout = -1, this.pending = null, this.lastMove = { x: 0, y: 0, target: e.dom, time: 0 }, this.checkHover = this.checkHover.bind(this), e.dom.addEventListener("mouseleave", this.mouseleave = this.mouseleave.bind(this)), e.dom.addEventListener("mousemove", this.mousemove = this.mousemove.bind(this));
  }
  update() {
    this.pending && (this.pending = null, clearTimeout(this.restartTimeout), this.restartTimeout = setTimeout(() => this.startHover(), 20));
  }
  get active() {
    return this.view.state.field(this.field);
  }
  checkHover() {
    if (this.hoverTimeout = -1, this.active.length)
      return;
    let e = Date.now() - this.lastMove.time;
    e < this.hoverTime ? this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime - e) : this.startHover();
  }
  startHover() {
    clearTimeout(this.restartTimeout);
    let { view: e, lastMove: t } = this, i = e.docView.tile.nearest(t.target);
    if (!i)
      return;
    let r, s = 1;
    if (i.isWidget())
      r = i.posAtStart;
    else {
      if (r = e.posAtCoords(t), r == null)
        return;
      let l = e.coordsAtPos(r);
      if (!l || t.y < l.top || t.y > l.bottom || t.x < l.left - e.defaultCharacterWidth || t.x > l.right + e.defaultCharacterWidth)
        return;
      let a = e.bidiSpans(e.state.doc.lineAt(r)).find((c) => c.from <= r && c.to >= r), h = a && a.dir == U.RTL ? -1 : 1;
      s = t.x < l.left ? -h : h;
    }
    let o = this.source(e, r, s);
    if (o?.then) {
      let l = this.pending = { pos: r };
      o.then((a) => {
        this.pending == l && (this.pending = null, a && !(Array.isArray(a) && !a.length) && e.dispatch({ effects: this.setHover.of(Array.isArray(a) ? a : [a]) }));
      }, (a) => xe(e.state, a, "hover tooltip"));
    } else o && !(Array.isArray(o) && !o.length) && e.dispatch({ effects: this.setHover.of(Array.isArray(o) ? o : [o]) });
  }
  get tooltip() {
    let e = this.view.plugin(hl), t = e ? e.manager.tooltips.findIndex((i) => i.create == Er.create) : -1;
    return t > -1 ? e.manager.tooltipViews[t] : null;
  }
  mousemove(e) {
    var t, i;
    this.lastMove = { x: e.clientX, y: e.clientY, target: e.target, time: Date.now() }, this.hoverTimeout < 0 && (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
    let { active: r, tooltip: s } = this;
    if (r.length && s && !W0(s.dom, e) || this.pending) {
      let { pos: o } = r[0] || this.pending, l = (i = (t = r[0]) === null || t === void 0 ? void 0 : t.end) !== null && i !== void 0 ? i : o;
      (o == l ? this.view.posAtCoords(this.lastMove) != o : !F0(this.view, o, l, e.clientX, e.clientY)) && (this.view.dispatch({ effects: this.setHover.of([]) }), this.pending = null);
    }
  }
  mouseleave(e) {
    clearTimeout(this.hoverTimeout), this.hoverTimeout = -1;
    let { active: t } = this;
    if (t.length) {
      let { tooltip: i } = this;
      i && i.dom.contains(e.relatedTarget) ? this.watchTooltipLeave(i.dom) : this.view.dispatch({ effects: this.setHover.of([]) });
    }
  }
  watchTooltipLeave(e) {
    let t = (i) => {
      e.removeEventListener("mouseleave", t), this.active.length && !this.view.dom.contains(i.relatedTarget) && this.view.dispatch({ effects: this.setHover.of([]) });
    };
    e.addEventListener("mouseleave", t);
  }
  destroy() {
    clearTimeout(this.hoverTimeout), clearTimeout(this.restartTimeout), this.view.dom.removeEventListener("mouseleave", this.mouseleave), this.view.dom.removeEventListener("mousemove", this.mousemove);
  }
}
const En = 4;
function W0(n, e) {
  let { left: t, right: i, top: r, bottom: s } = n.getBoundingClientRect(), o;
  if (o = n.querySelector(".cm-tooltip-arrow")) {
    let l = o.getBoundingClientRect();
    r = Math.min(l.top, r), s = Math.max(l.bottom, s);
  }
  return e.clientX >= t - En && e.clientX <= i + En && e.clientY >= r - En && e.clientY <= s + En;
}
function F0(n, e, t, i, r, s) {
  let o = n.scrollDOM.getBoundingClientRect(), l = n.documentTop + n.documentPadding.top + n.contentHeight;
  if (o.left > i || o.right < i || o.top > r || Math.min(o.bottom, l) < r)
    return !1;
  let a = n.posAtCoords({ x: i, y: r }, !1);
  return a >= e && a <= t;
}
function V0(n, e = {}) {
  let t = I.define(), i = ue.define({
    create() {
      return [];
    },
    update(r, s) {
      if (r.length && (e.hideOnChange && (s.docChanged || s.selection) ? r = [] : e.hideOn && (r = r.filter((o) => !e.hideOn(s, o))), s.docChanged)) {
        let o = [];
        for (let l of r) {
          let a = s.changes.mapPos(l.pos, -1, me.TrackDel);
          if (a != null) {
            let h = Object.assign(/* @__PURE__ */ Object.create(null), l);
            h.pos = a, h.end != null && (h.end = s.changes.mapPos(h.end)), o.push(h);
          }
        }
        r = o;
      }
      for (let o of s.effects)
        o.is(t) && (r = o.value), o.is(q0) && (r = []);
      return r;
    },
    provide: (r) => ar.from(r)
  });
  return {
    active: i,
    extension: [
      i,
      $.define((r) => new H0(
        r,
        n,
        i,
        t,
        e.hoverTime || 300
        /* Hover.Time */
      )),
      N0
    ]
  };
}
function pu(n, e) {
  let t = n.plugin(hl);
  if (!t)
    return null;
  let i = t.manager.tooltips.indexOf(e);
  return i < 0 ? null : t.manager.tooltipViews[i];
}
const q0 = /* @__PURE__ */ I.define(), qa = /* @__PURE__ */ L.define({
  combine(n) {
    let e, t;
    for (let i of n)
      e = e || i.topContainer, t = t || i.bottomContainer;
    return { topContainer: e, bottomContainer: t };
  }
});
function ul(n, e) {
  let t = n.plugin(mu), i = t ? t.specs.indexOf(e) : -1;
  return i > -1 ? t.panels[i] : null;
}
const mu = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.input = n.state.facet(Gi), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(n));
    let e = n.state.facet(qa);
    this.top = new Ln(n, !0, e.topContainer), this.bottom = new Ln(n, !1, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
    for (let t of this.panels)
      t.dom.classList.add("cm-panel"), t.mount && t.mount();
  }
  update(n) {
    let e = n.state.facet(qa);
    this.top.container != e.topContainer && (this.top.sync([]), this.top = new Ln(n.view, !0, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new Ln(n.view, !1, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let t = n.state.facet(Gi);
    if (t != this.input) {
      let i = t.filter((a) => a), r = [], s = [], o = [], l = [];
      for (let a of i) {
        let h = this.specs.indexOf(a), c;
        h < 0 ? (c = a(n.view), l.push(c)) : (c = this.panels[h], c.update && c.update(n)), r.push(c), (c.top ? s : o).push(c);
      }
      this.specs = i, this.panels = r, this.top.sync(s), this.bottom.sync(o);
      for (let a of l)
        a.dom.classList.add("cm-panel"), a.mount && a.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(n);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (n) => P.scrollMargins.of((e) => {
    let t = e.plugin(n);
    return t && { top: t.top.scrollMargin(), bottom: t.bottom.scrollMargin() };
  })
});
class Ln {
  constructor(e, t, i) {
    this.view = e, this.top = t, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(e) {
    for (let t of this.panels)
      t.destroy && e.indexOf(t) < 0 && t.destroy();
    this.panels = e, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
      let t = this.container || this.view.dom;
      t.insertBefore(this.dom, this.top ? t.firstChild : null);
    }
    let e = this.dom.firstChild;
    for (let t of this.panels)
      if (t.dom.parentNode == this.dom) {
        for (; e != t.dom; )
          e = za(e);
        e = e.nextSibling;
      } else
        this.dom.insertBefore(t.dom, e);
    for (; e; )
      e = za(e);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let e of this.classes.split(" "))
        e && this.container.classList.remove(e);
      for (let e of (this.classes = this.view.themeClasses).split(" "))
        e && this.container.classList.add(e);
    }
  }
}
function za(n) {
  let e = n.nextSibling;
  return n.remove(), e;
}
const Gi = /* @__PURE__ */ L.define({
  enables: mu
});
function z0(n, e) {
  let t, i = new Promise((o) => t = o), r = (o) => K0(o, e, t);
  n.state.field(ss, !1) ? n.dispatch({ effects: gu.of(r) }) : n.dispatch({ effects: I.appendConfig.of(ss.init(() => [r])) });
  let s = yu.of(r);
  return { close: s, result: i.then((o) => ((n.win.queueMicrotask || ((a) => n.win.setTimeout(a, 10)))(() => {
    n.state.field(ss).indexOf(r) > -1 && n.dispatch({ effects: s });
  }), o)) };
}
const ss = /* @__PURE__ */ ue.define({
  create() {
    return [];
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(gu) ? n = [t.value].concat(n) : t.is(yu) && (n = n.filter((i) => i != t.value));
    return n;
  },
  provide: (n) => Gi.computeN([n], (e) => e.field(n))
}), gu = /* @__PURE__ */ I.define(), yu = /* @__PURE__ */ I.define();
function K0(n, e, t) {
  let i = e.content ? e.content(n, () => o(null)) : null;
  if (!i) {
    if (i = z("form"), e.input) {
      let l = z("input", e.input);
      /^(text|password|number|email|tel|url)$/.test(l.type) && l.classList.add("cm-textfield"), l.name || (l.name = "input"), i.appendChild(z("label", (e.label || "") + ": ", l));
    } else
      i.appendChild(document.createTextNode(e.label || ""));
    i.appendChild(document.createTextNode(" ")), i.appendChild(z("button", { class: "cm-button", type: "submit" }, e.submitLabel || "OK"));
  }
  let r = i.nodeName == "FORM" ? [i] : i.querySelectorAll("form");
  for (let l = 0; l < r.length; l++) {
    let a = r[l];
    a.addEventListener("keydown", (h) => {
      h.keyCode == 27 ? (h.preventDefault(), o(null)) : h.keyCode == 13 && (h.preventDefault(), o(a));
    }), a.addEventListener("submit", (h) => {
      h.preventDefault(), o(a);
    });
  }
  let s = z("div", i, z("button", {
    onclick: () => o(null),
    "aria-label": n.state.phrase("close"),
    class: "cm-dialog-close",
    type: "button"
  }, ["×"]));
  e.class && (s.className = e.class), s.classList.add("cm-dialog");
  function o(l) {
    s.contains(s.ownerDocument.activeElement) && n.focus(), t(l);
  }
  return {
    dom: s,
    top: e.top,
    mount: () => {
      if (e.focus) {
        let l;
        typeof e.focus == "string" ? l = i.querySelector(e.focus) : l = i.querySelector("input") || i.querySelector("button"), l && "select" in l ? l.select() : l && "focus" in l && l.focus();
      }
    }
  };
}
class dt extends St {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
dt.prototype.elementClass = "";
dt.prototype.toDOM = void 0;
dt.prototype.mapMode = me.TrackBefore;
dt.prototype.startSide = dt.prototype.endSide = -1;
dt.prototype.point = !0;
const jn = /* @__PURE__ */ L.define(), U0 = /* @__PURE__ */ L.define(), G0 = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => N.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {},
  side: "before"
}, Ri = /* @__PURE__ */ L.define();
function j0(n) {
  return [vu(), Ri.of({ ...G0, ...n })];
}
const Ka = /* @__PURE__ */ L.define({
  combine: (n) => n.some((e) => e)
});
function vu(n) {
  return [
    J0
  ];
}
const J0 = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.domAfter = null, this.prevViewport = n.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = n.state.facet(Ri).map((e) => new Ga(n, e)), this.fixed = !n.state.facet(Ka);
    for (let e of this.gutters)
      e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
    this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), n.scrollDOM.insertBefore(this.dom, n.contentDOM);
  }
  getDOMAfter() {
    return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
  }
  update(n) {
    if (this.updateGutters(n)) {
      let e = this.prevViewport, t = n.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(i < (t.to - t.from) * 0.8);
    }
    if (n.geometryChanged) {
      let e = this.view.contentHeight / this.view.scaleY + "px";
      this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
    }
    this.view.state.facet(Ka) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = n.view.viewport;
  }
  syncGutters(n) {
    let e = this.dom.nextSibling;
    n && (this.dom.remove(), this.domAfter && this.domAfter.remove());
    let t = N.iter(this.view.state.facet(jn), this.view.viewport.from), i = [], r = this.gutters.map((s) => new Y0(s, this.view.viewport, -this.view.documentPadding.top));
    for (let s of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(s.type)) {
        let o = !0;
        for (let l of s.type)
          if (l.type == ae.Text && o) {
            Oo(t, i, l.from);
            for (let a of r)
              a.line(this.view, l, i);
            o = !1;
          } else if (l.widget)
            for (let a of r)
              a.widget(this.view, l);
      } else if (s.type == ae.Text) {
        Oo(t, i, s.from);
        for (let o of r)
          o.line(this.view, s, i);
      } else if (s.widget)
        for (let o of r)
          o.widget(this.view, s);
    for (let s of r)
      s.finish();
    n && (this.view.scrollDOM.insertBefore(this.dom, e), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
  }
  updateGutters(n) {
    let e = n.startState.facet(Ri), t = n.state.facet(Ri), i = n.docChanged || n.heightChanged || n.viewportChanged || !N.eq(n.startState.facet(jn), n.state.facet(jn), n.view.viewport.from, n.view.viewport.to);
    if (e == t)
      for (let r of this.gutters)
        r.update(n) && (i = !0);
    else {
      i = !0;
      let r = [];
      for (let s of t) {
        let o = e.indexOf(s);
        o < 0 ? r.push(new Ga(this.view, s)) : (this.gutters[o].update(n), r.push(this.gutters[o]));
      }
      for (let s of this.gutters)
        s.dom.remove(), r.indexOf(s) < 0 && s.destroy();
      for (let s of r)
        s.config.side == "after" ? this.getDOMAfter().appendChild(s.dom) : this.dom.appendChild(s.dom);
      this.gutters = r;
    }
    return i;
  }
  destroy() {
    for (let n of this.gutters)
      n.destroy();
    this.dom.remove(), this.domAfter && this.domAfter.remove();
  }
}, {
  provide: (n) => P.scrollMargins.of((e) => {
    let t = e.plugin(n);
    if (!t || t.gutters.length == 0 || !t.fixed)
      return null;
    let i = t.dom.offsetWidth * e.scaleX, r = t.domAfter ? t.domAfter.offsetWidth * e.scaleX : 0;
    return e.textDirection == U.LTR ? { left: i, right: r } : { right: i, left: r };
  })
});
function Ua(n) {
  return Array.isArray(n) ? n : [n];
}
function Oo(n, e, t) {
  for (; n.value && n.from <= t; )
    n.from == t && e.push(n.value), n.next();
}
class Y0 {
  constructor(e, t, i) {
    this.gutter = e, this.height = i, this.i = 0, this.cursor = N.iter(e.markers, t.from);
  }
  addElement(e, t, i) {
    let { gutter: r } = this, s = (t.top - this.height) / e.scaleY, o = t.height / e.scaleY;
    if (this.i == r.elements.length) {
      let l = new bu(e, o, s, i);
      r.elements.push(l), r.dom.appendChild(l.dom);
    } else
      r.elements[this.i].update(e, o, s, i);
    this.height = t.bottom, this.i++;
  }
  line(e, t, i) {
    let r = [];
    Oo(this.cursor, r, t.from), i.length && (r = r.concat(i));
    let s = this.gutter.config.lineMarker(e, t, r);
    s && r.unshift(s);
    let o = this.gutter;
    r.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, r);
  }
  widget(e, t) {
    let i = this.gutter.config.widgetMarker(e, t.widget, t), r = i ? [i] : null;
    for (let s of e.state.facet(U0)) {
      let o = s(e, t.widget, t);
      o && (r || (r = [])).push(o);
    }
    r && this.addElement(e, t, r);
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class Ga {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in t.domEventHandlers)
      this.dom.addEventListener(i, (r) => {
        let s = r.target, o;
        if (s != this.dom && this.dom.contains(s)) {
          for (; s.parentNode != this.dom; )
            s = s.parentNode;
          let a = s.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else
          o = r.clientY;
        let l = e.lineBlockAtHeight(o - e.documentTop);
        t.domEventHandlers[i](e, l, r) && r.preventDefault();
      });
    this.markers = Ua(t.markers(e)), t.initialSpacer && (this.spacer = new bu(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = Ua(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let r = this.config.updateSpacer(this.spacer.markers[0], e);
      r != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [r]);
    }
    let i = e.view.viewport;
    return !N.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class bu {
  constructor(e, t, i, r) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, r);
  }
  update(e, t, i, r) {
    this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), X0(this.markers, r) || this.setMarkers(e, r);
  }
  setMarkers(e, t) {
    let i = "cm-gutterElement", r = this.dom.firstChild;
    for (let s = 0, o = 0; ; ) {
      let l = o, a = s < t.length ? t[s++] : null, h = !1;
      if (a) {
        let c = a.elementClass;
        c && (i += " " + c);
        for (let f = o; f < this.markers.length; f++)
          if (this.markers[f].compare(a)) {
            l = f, h = !0;
            break;
          }
      } else
        l = this.markers.length;
      for (; o < l; ) {
        let c = this.markers[o++];
        if (c.toDOM) {
          c.destroy(r);
          let f = r.nextSibling;
          r.remove(), r = f;
        }
      }
      if (!a)
        break;
      a.toDOM && (h ? r = r.nextSibling : this.dom.insertBefore(a.toDOM(e), r)), h && o++;
    }
    this.dom.className = i, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function X0(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].compare(e[t]))
      return !1;
  return !0;
}
const Q0 = /* @__PURE__ */ L.define(), Z0 = /* @__PURE__ */ L.define(), $t = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let i = Object.assign({}, e);
        for (let r in t) {
          let s = i[r], o = t[r];
          i[r] = s ? (l, a, h) => s(l, a, h) || o(l, a, h) : o;
        }
        return i;
      }
    });
  }
});
class os extends dt {
  constructor(e) {
    super(), this.number = e;
  }
  eq(e) {
    return this.number == e.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function ls(n, e) {
  return n.state.facet($t).formatNumber(e, n.state);
}
const $0 = /* @__PURE__ */ Ri.compute([$t], (n) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(Q0);
  },
  lineMarker(e, t, i) {
    return i.some((r) => r.toDOM) ? null : new os(ls(e, e.state.doc.lineAt(t.from).number));
  },
  widgetMarker: (e, t, i) => {
    for (let r of e.state.facet(Z0)) {
      let s = r(e, t, i);
      if (s)
        return s;
    }
    return null;
  },
  lineMarkerChange: (e) => e.startState.facet($t) != e.state.facet($t),
  initialSpacer(e) {
    return new os(ls(e, ja(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let i = ls(t.view, ja(t.view.state.doc.lines));
    return i == e.number ? e : new os(i);
  },
  domEventHandlers: n.facet($t).domEventHandlers,
  side: "before"
}));
function e1(n = {}) {
  return [
    $t.of(n),
    vu(),
    $0
  ];
}
function ja(n) {
  let e = 9;
  for (; e < n; )
    e = e * 10 + 9;
  return e;
}
const t1 = /* @__PURE__ */ new class extends dt {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), i1 = /* @__PURE__ */ jn.compute(["selection"], (n) => {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let r = n.doc.lineAt(i.head).from;
    r > t && (t = r, e.push(t1.range(r)));
  }
  return N.of(e);
});
function n1() {
  return i1;
}
const r1 = 1024;
let s1 = 0;
class as {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class W {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = s1++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = Be.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
W.closedBy = new W({ deserialize: (n) => n.split(" ") });
W.openedBy = new W({ deserialize: (n) => n.split(" ") });
W.group = new W({ deserialize: (n) => n.split(" ") });
W.isolate = new W({ deserialize: (n) => {
  if (n && n != "rtl" && n != "ltr" && n != "auto")
    throw new RangeError("Invalid value for isolate: " + n);
  return n || "auto";
} });
W.contextHash = new W({ perNode: !0 });
W.lookAhead = new W({ perNode: !0 });
W.mounted = new W({ perNode: !0 });
class Ii {
  constructor(e, t, i, r = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = r;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[W.mounted.id];
  }
}
const o1 = /* @__PURE__ */ Object.create(null);
class Be {
  /**
  @internal
  */
  constructor(e, t, i, r = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = r;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : o1, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), r = new Be(e.name || "", t, e.id, i);
    if (e.props) {
      for (let s of e.props)
        if (Array.isArray(s) || (s = s(r)), s) {
          if (s[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[s[0].id] = s[1];
        }
    }
    return r;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(W.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let r of i.split(" "))
        t[r] = e[i];
    return (i) => {
      for (let r = i.prop(W.group), s = -1; s < (r ? r.length : 0); s++) {
        let o = t[s < 0 ? i.name : r[s]];
        if (o)
          return o;
      }
    };
  }
}
Be.none = new Be(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
const Pn = /* @__PURE__ */ new WeakMap(), Ja = /* @__PURE__ */ new WeakMap();
var Z;
(function(n) {
  n[n.ExcludeBuffers = 1] = "ExcludeBuffers", n[n.IncludeAnonymous = 2] = "IncludeAnonymous", n[n.IgnoreMounts = 4] = "IgnoreMounts", n[n.IgnoreOverlays = 8] = "IgnoreOverlays", n[n.EnterBracketed = 16] = "EnterBracketed";
})(Z || (Z = {}));
class le {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, r, s) {
    if (this.type = e, this.children = t, this.positions = i, this.length = r, this.props = null, s && s.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of s)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = Ii.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let r = i.toString();
      r && (t && (t += ","), t += r);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new Lo(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let r = Pn.get(this) || this.topNode, s = new Lo(r);
    return s.moveTo(e, t), Pn.set(this, s._tree), s;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new Te(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = ji(Pn.get(this) || this.topNode, e, t, !1);
    return Pn.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = ji(Ja.get(this) || this.topNode, e, t, !0);
    return Ja.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return h1(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: r = 0, to: s = this.length } = e, o = e.mode || 0, l = (o & Z.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | Z.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= s && a.to >= r && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : pl(Be.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, r) => new le(this.type, t, i, r, this.propValues), e.makeTree || ((t, i, r) => new le(Be.none, t, i, r)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return c1(e);
  }
}
le.empty = new le(Be.none, [], [], 0);
class fl {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new fl(this.buffer, this.index);
  }
}
class At {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return Be.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], r = this.set.types[t], s = r.name;
    if (/\W/.test(s) && !r.isError && (s = JSON.stringify(s)), e += 4, i == e)
      return s;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return s + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, r, s) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(xu(s, r, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3])
      ;
    return l;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let r = this.buffer, s = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      s[a++] = r[l++], s[a++] = r[l++] - i;
      let h = s[a++] = r[l++] - i;
      s[a++] = r[l++] - e, o = Math.max(o, h);
    }
    return new At(s, o, this.set);
  }
}
function xu(n, e, t, i) {
  switch (n) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function ji(n, e, t, i) {
  for (var r; n.from == n.to || (t < 1 ? n.from >= e : n.from > e) || (t > -1 ? n.to <= e : n.to < e); ) {
    let o = !i && n instanceof Te && n.index < 0 ? null : n.parent;
    if (!o)
      return n;
    n = o;
  }
  let s = i ? 0 : Z.IgnoreOverlays;
  if (i)
    for (let o = n, l = o.parent; l; o = l, l = o.parent)
      o instanceof Te && o.index < 0 && ((r = l.enter(e, t, s)) === null || r === void 0 ? void 0 : r.from) != o.from && (n = l);
  for (; ; ) {
    let o = n.enter(e, t, s);
    if (!o)
      return n;
    n = o;
  }
}
class wu {
  cursor(e = 0) {
    return new Lo(this, e);
  }
  getChild(e, t = null, i = null) {
    let r = Ya(this, e, t, i);
    return r.length ? r[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return Ya(this, e, t, i);
  }
  resolve(e, t = 0) {
    return ji(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return ji(this, e, t, !0);
  }
  matchContext(e) {
    return Eo(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let r = t.lastChild;
      if (!r || r.to != t.to)
        break;
      r.type.isError && r.from == r.to ? (i = t, t = r.prevSibling) : t = r;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class Te extends wu {
  constructor(e, t, i, r) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = r;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, r, s = 0) {
    for (let o = this; ; ) {
      for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
        let c = l[e], f = a[e] + o.from, u;
        if (!(!(s & Z.EnterBracketed && c instanceof le && (u = Ii.get(c)) && !u.overlay && u.bracketed && i >= f && i <= f + c.length) && !xu(r, i, f, f + c.length))) {
          if (c instanceof At) {
            if (s & Z.ExcludeBuffers)
              continue;
            let d = c.findChild(0, c.buffer.length, t, i - f, r);
            if (d > -1)
              return new xt(new l1(o, c, e, f), null, d);
          } else if (s & Z.IncludeAnonymous || !c.type.isAnonymous || dl(c)) {
            let d;
            if (!(s & Z.IgnoreMounts) && (d = Ii.get(c)) && !d.overlay)
              return new Te(d.tree, f, e, o);
            let p = new Te(c, f, e, o);
            return s & Z.IncludeAnonymous || !p.type.isAnonymous ? p : p.nextChild(t < 0 ? c.children.length - 1 : 0, t, i, r, s);
          }
        }
      }
      if (s & Z.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let r;
    if (!(i & Z.IgnoreOverlays) && (r = Ii.get(this._tree)) && r.overlay) {
      let s = e - this.from, o = i & Z.EnterBracketed && r.bracketed;
      for (let { from: l, to: a } of r.overlay)
        if ((t > 0 || o ? l <= s : l < s) && (t < 0 || o ? a >= s : a > s))
          return new Te(r.tree, r.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function Ya(n, e, t, i) {
  let r = n.cursor(), s = [];
  if (!r.firstChild())
    return s;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = r.type.is(t), !r.nextSibling())
        return s;
  }
  for (; ; ) {
    if (i != null && r.type.is(i))
      return s;
    if (r.type.is(e) && s.push(r.node), !r.nextSibling())
      return i == null ? s : [];
  }
}
function Eo(n, e, t = e.length - 1) {
  for (let i = n; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class l1 {
  constructor(e, t, i, r) {
    this.parent = e, this.buffer = t, this.index = i, this.start = r;
  }
}
class xt extends wu {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.context.start, i);
    return s < 0 ? null : new xt(this.context, this, s);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & Z.ExcludeBuffers)
      return null;
    let { buffer: r } = this.context, s = r.findChild(this.index + 4, r.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return s < 0 ? null : new xt(this.context, this, s);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new xt(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new xt(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, r = this.index + 4, s = i.buffer[this.index + 3];
    if (s > r) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(r, s, o)), t.push(0);
    }
    return new le(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function Su(n) {
  if (!n.length)
    return null;
  let e = 0, t = n[0];
  for (let s = 1; s < n.length; s++) {
    let o = n[s];
    (o.from > t.from || o.to < t.to) && (t = o, e = s);
  }
  let i = t instanceof Te && t.index < 0 ? null : t.parent, r = n.slice();
  return i ? r[e] = i : r.splice(e, 1), new a1(r, t);
}
class a1 {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return Su(this.heads);
  }
}
function h1(n, e, t) {
  let i = n.resolveInner(e, t), r = null;
  for (let s = i instanceof Te ? i : i.context.parent; s; s = s.parent)
    if (s.index < 0) {
      let o = s.parent;
      (r || (r = [i])).push(o.resolve(e, t)), s = o;
    } else {
      let o = Ii.get(s.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new Te(o.tree, o.overlay[0].from + s.from, -1, s);
        (r || (r = [i])).push(ji(l, e, t, !1));
      }
    }
  return r ? Su(r) : i;
}
class Lo {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~Z.EnterBracketed, e instanceof Te)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: r } = this.buffer;
    return this.type = t || r.set.types[r.buffer[e]], this.from = i + r.buffer[e + 1], this.to = i + r.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof Te ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: r } = this.buffer, s = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, i);
    return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & Z.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & Z.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & Z.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let r = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != r)
        return this.yieldBuf(t.findChild(
          r,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let r = t.buffer[this.index + 3];
      if (r < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(r);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: r } = this;
    if (r) {
      if (e > 0) {
        if (this.index < r.buffer.buffer.length)
          return !1;
      } else
        for (let s = 0; s < this.index; s++)
          if (r.buffer.buffer[s + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = r);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let s = t + e, o = e < 0 ? -1 : i._tree.children.length; s != o; s += e) {
          let l = i._tree.children[s];
          if (this.mode & Z.IncludeAnonymous || l instanceof At || !l.type.isAnonymous || dl(l))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let r = this.index, s = this.stack.length; s >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == r) {
            if (r == this.index)
              return o;
            t = o, i = s + 1;
            break e;
          }
        r = this.stack[--s];
      }
    for (let r = i; r < this.stack.length; r++)
      t = new xt(this.buffer, t, this.stack[r]);
    return this.bufferNode = new xt(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let r = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (r = !0);
      }
      for (; ; ) {
        if (r && t && t(this), r = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, r = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return Eo(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let r = e.length - 1, s = this.stack.length - 1; r >= 0; s--) {
      if (s < 0)
        return Eo(this._tree, e, r);
      let o = i[t.buffer[this.stack[s]]];
      if (!o.isAnonymous) {
        if (e[r] && e[r] != o.name)
          return !1;
        r--;
      }
    }
    return !0;
  }
}
function dl(n) {
  return n.children.some((e) => e instanceof At || !e.type.isAnonymous || dl(e));
}
function c1(n) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: r = r1, reused: s = [], minRepeatType: o = i.types.length } = n, l = Array.isArray(t) ? new fl(t, t.length) : t, a = i.types, h = 0, c = 0;
  function f(x, k, S, M, D, _) {
    let { id: T, start: B, end: H, size: q } = l, G = c, de = h;
    if (q < 0)
      if (l.next(), q == -1) {
        let st = s[T];
        S.push(st), M.push(B - x);
        return;
      } else if (q == -3) {
        h = T;
        return;
      } else if (q == -4) {
        c = T;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${q}`);
    let ke = a[T], Ke, re, Oe = B - x;
    if (H - B <= r && (re = g(l.pos - k, D))) {
      let st = new Uint16Array(re.size - re.skip), Ee = l.pos - re.size, Ue = st.length;
      for (; l.pos > Ee; )
        Ue = y(re.start, st, Ue);
      Ke = new At(st, H - re.start, i), Oe = re.start - x;
    } else {
      let st = l.pos - q;
      l.next();
      let Ee = [], Ue = [], Dt = T >= o ? T : -1, Jt = 0, dn = H;
      for (; l.pos > st; )
        Dt >= 0 && l.id == Dt && l.size >= 0 ? (l.end <= dn - r && (p(Ee, Ue, B, Jt, l.end, dn, Dt, G, de), Jt = Ee.length, dn = l.end), l.next()) : _ > 2500 ? u(B, st, Ee, Ue) : f(B, st, Ee, Ue, Dt, _ + 1);
      if (Dt >= 0 && Jt > 0 && Jt < Ee.length && p(Ee, Ue, B, Jt, B, dn, Dt, G, de), Ee.reverse(), Ue.reverse(), Dt > -1 && Jt > 0) {
        let Pl = d(ke, de);
        Ke = pl(ke, Ee, Ue, 0, Ee.length, 0, H - B, Pl, Pl);
      } else
        Ke = m(ke, Ee, Ue, H - B, G - H, de);
    }
    S.push(Ke), M.push(Oe);
  }
  function u(x, k, S, M) {
    let D = [], _ = 0, T = -1;
    for (; l.pos > k; ) {
      let { id: B, start: H, end: q, size: G } = l;
      if (G > 4)
        l.next();
      else {
        if (T > -1 && H < T)
          break;
        T < 0 && (T = q - r), D.push(B, H, q), _++, l.next();
      }
    }
    if (_) {
      let B = new Uint16Array(_ * 4), H = D[D.length - 2];
      for (let q = D.length - 3, G = 0; q >= 0; q -= 3)
        B[G++] = D[q], B[G++] = D[q + 1] - H, B[G++] = D[q + 2] - H, B[G++] = G;
      S.push(new At(B, D[2] - H, i)), M.push(H - x);
    }
  }
  function d(x, k) {
    return (S, M, D) => {
      let _ = 0, T = S.length - 1, B, H;
      if (T >= 0 && (B = S[T]) instanceof le) {
        if (!T && B.type == x && B.length == D)
          return B;
        (H = B.prop(W.lookAhead)) && (_ = M[T] + B.length + H);
      }
      return m(x, S, M, D, _, k);
    };
  }
  function p(x, k, S, M, D, _, T, B, H) {
    let q = [], G = [];
    for (; x.length > M; )
      q.push(x.pop()), G.push(k.pop() + S - D);
    x.push(m(i.types[T], q, G, _ - D, B - _, H)), k.push(D - S);
  }
  function m(x, k, S, M, D, _, T) {
    if (_) {
      let B = [W.contextHash, _];
      T = T ? [B].concat(T) : [B];
    }
    if (D > 25) {
      let B = [W.lookAhead, D];
      T = T ? [B].concat(T) : [B];
    }
    return new le(x, k, S, M, T);
  }
  function g(x, k) {
    let S = l.fork(), M = 0, D = 0, _ = 0, T = S.end - r, B = { size: 0, start: 0, skip: 0 };
    e: for (let H = S.pos - x; S.pos > H; ) {
      let q = S.size;
      if (S.id == k && q >= 0) {
        B.size = M, B.start = D, B.skip = _, _ += 4, M += 4, S.next();
        continue;
      }
      let G = S.pos - q;
      if (q < 0 || G < H || S.start < T)
        break;
      let de = S.id >= o ? 4 : 0, ke = S.start;
      for (S.next(); S.pos > G; ) {
        if (S.size < 0)
          if (S.size == -3 || S.size == -4)
            de += 4;
          else
            break e;
        else S.id >= o && (de += 4);
        S.next();
      }
      D = ke, M += q, _ += de;
    }
    return (k < 0 || M == x) && (B.size = M, B.start = D, B.skip = _), B.size > 4 ? B : void 0;
  }
  function y(x, k, S) {
    let { id: M, start: D, end: _, size: T } = l;
    if (l.next(), T >= 0 && M < o) {
      let B = S;
      if (T > 4) {
        let H = l.pos - (T - 4);
        for (; l.pos > H; )
          S = y(x, k, S);
      }
      k[--S] = B, k[--S] = _ - x, k[--S] = D - x, k[--S] = M;
    } else T == -3 ? h = M : T == -4 && (c = M);
    return S;
  }
  let v = [], w = [];
  for (; l.pos > 0; )
    f(n.start || 0, n.bufferStart || 0, v, w, -1, 0);
  let b = (e = n.length) !== null && e !== void 0 ? e : v.length ? w[0] + v[0].length : 0;
  return new le(a[n.topID], v.reverse(), w.reverse(), b);
}
const Xa = /* @__PURE__ */ new WeakMap();
function Jn(n, e) {
  if (!n.isAnonymous || e instanceof At || e.type != n)
    return 1;
  let t = Xa.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != n || !(i instanceof le)) {
        t = 1;
        break;
      }
      t += Jn(n, i);
    }
    Xa.set(e, t);
  }
  return t;
}
function pl(n, e, t, i, r, s, o, l, a) {
  let h = 0;
  for (let p = i; p < r; p++)
    h += Jn(n, e[p]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], u = [];
  function d(p, m, g, y, v) {
    for (let w = g; w < y; ) {
      let b = w, x = m[w], k = Jn(n, p[w]);
      for (w++; w < y; w++) {
        let S = Jn(n, p[w]);
        if (k + S >= c)
          break;
        k += S;
      }
      if (w == b + 1) {
        if (k > c) {
          let S = p[b];
          d(S.children, S.positions, 0, S.children.length, m[b] + v);
          continue;
        }
        f.push(p[b]);
      } else {
        let S = m[w - 1] + p[w - 1].length - x;
        f.push(pl(n, p, m, b, w, x, S, null, a));
      }
      u.push(x + v - s);
    }
  }
  return d(e, t, i, r, 0), (l || a)(f, u, o);
}
class Ft {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, r, s = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = r, this.open = (s ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let r = [new Ft(0, e.length, e, 0, !1, i)];
    for (let s of t)
      s.to > e.length && r.push(s);
    return r;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let r = [], s = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let c = l < t.length ? t[l] : null, f = c ? c.fromA : 1e9;
      if (f - a >= i)
        for (; o && o.from < f; ) {
          let u = o;
          if (a >= u.from || f <= u.to || h) {
            let d = Math.max(u.from, a) - h, p = Math.min(u.to, f) - h;
            u = d >= p ? null : new Ft(d, p, u.tree, u.offset + h, l > 0, !!c);
          }
          if (u && r.push(u), o.to > f)
            break;
          o = s < e.length ? e[s++] : null;
        }
      if (!c)
        break;
      a = c.toA, h = c.toA - c.toB;
    }
    return r;
  }
}
class u1 {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new f1(e)), i = i ? i.length ? i.map((r) => new as(r.from, r.to)) : [new as(0, 0)] : [new as(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let r = this.startParse(e, t, i);
    for (; ; ) {
      let s = r.advance();
      if (s)
        return s;
    }
  }
}
class f1 {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
new W({ perNode: !0 });
let d1 = 0;
class Le {
  /**
  @internal
  */
  constructor(e, t, i, r) {
    this.name = e, this.set = t, this.base = i, this.modified = r, this.id = d1++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof Le && (t = e), t?.base)
      throw new Error("Can not derive from a modified tag");
    let r = new Le(i, [], null, []);
    if (r.set.push(r), t)
      for (let s of t.set)
        r.set.push(s);
    return r;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new hr(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : hr.get(i.base || i, i.modified.concat(t).sort((r, s) => r.id - s.id));
  }
}
let p1 = 0;
class hr {
  constructor(e) {
    this.name = e, this.instances = [], this.id = p1++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((l) => l.base == e && m1(t, l.modified));
    if (i)
      return i;
    let r = [], s = new Le(e.name, r, e, t);
    for (let l of t)
      l.instances.push(s);
    let o = g1(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          r.push(hr.get(l, a));
    return s;
  }
}
function m1(n, e) {
  return n.length == e.length && n.every((t, i) => t == e[i]);
}
function g1(n) {
  let e = [[]];
  for (let t = 0; t < n.length; t++)
    for (let i = 0, r = e.length; i < r; i++)
      e.push(e[i].concat(n[t]));
  return e.sort((t, i) => i.length - t.length);
}
function y1(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let i = n[t];
    Array.isArray(i) || (i = [i]);
    for (let r of t.split(" "))
      if (r) {
        let s = [], o = 2, l = r;
        for (let f = 0; ; ) {
          if (l == "..." && f > 0 && f + 3 == r.length) {
            o = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u)
            throw new RangeError("Invalid path: " + r);
          if (s.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == r.length)
            break;
          let d = r[f++];
          if (f == r.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/")
            throw new RangeError("Invalid path: " + r);
          l = r.slice(f);
        }
        let a = s.length - 1, h = s[a];
        if (!h)
          throw new RangeError("Invalid path: " + r);
        let c = new Ji(i, o, a > 0 ? s.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return ku.add(e);
}
const ku = new W({
  combine(n, e) {
    let t, i, r;
    for (; n || e; ) {
      if (!n || e && n.depth >= e.depth ? (r = e, e = e.next) : (r = n, n = n.next), t && t.mode == r.mode && !r.context && !t.context)
        continue;
      let s = new Ji(r.tags, r.mode, r.context);
      t ? t.next = s : i = s, t = s;
    }
    return i;
  }
});
class Ji {
  constructor(e, t, i, r) {
    this.tags = e, this.mode = t, this.context = i, this.next = r;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
Ji.empty = new Ji([], 2, null);
function Cu(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let s of n)
    if (!Array.isArray(s.tag))
      t[s.tag.id] = s.class;
    else
      for (let o of s.tag)
        t[o.id] = s.class;
  let { scope: i, all: r = null } = e || {};
  return {
    style: (s) => {
      let o = r;
      for (let l of s)
        for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
function v1(n, e) {
  let t = null;
  for (let i of n) {
    let r = i.style(e);
    r && (t = t ? t + " " + r : r);
  }
  return t;
}
function b1(n, e, t, i = 0, r = n.length) {
  let s = new x1(i, Array.isArray(e) ? e : [e], t);
  s.highlightRange(n.cursor(), i, r, "", s.highlighters), s.flush(r);
}
class x1 {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, r, s) {
    let { type: o, from: l, to: a } = e;
    if (l >= i || a <= t)
      return;
    o.isTop && (s = this.highlighters.filter((d) => !d.scope || d.scope(o)));
    let h = r, c = w1(e) || Ji.empty, f = v1(s, c.tags);
    if (f && (h && (h += " "), h += f, c.mode == 1 && (r += (r ? " " : "") + f)), this.startSpan(Math.max(t, l), h), c.opaque)
      return;
    let u = e.tree && e.tree.prop(W.mounted);
    if (u && u.overlay) {
      let d = e.node.enter(u.overlay[0].from + l, 1), p = this.highlighters.filter((g) => !g.scope || g.scope(u.tree.type)), m = e.firstChild();
      for (let g = 0, y = l; ; g++) {
        let v = g < u.overlay.length ? u.overlay[g] : null, w = v ? v.from + l : a, b = Math.max(t, y), x = Math.min(i, w);
        if (b < x && m)
          for (; e.from < x && (this.highlightRange(e, b, x, r, s), this.startSpan(Math.min(x, e.to), h), !(e.to >= w || !e.nextSibling())); )
            ;
        if (!v || w > i)
          break;
        y = v.to + l, y > t && (this.highlightRange(d.cursor(), Math.max(t, v.from + l), Math.min(i, y), "", p), this.startSpan(Math.min(i, y), h));
      }
      m && e.parent();
    } else if (e.firstChild()) {
      u && (r = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, r, s), this.startSpan(Math.min(i, e.to), h);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function w1(n) {
  let e = n.type.prop(ku);
  for (; e && e.context && !n.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const A = Le.define, Dn = A(), gt = A(), Qa = A(gt), Za = A(gt), yt = A(), _n = A(yt), hs = A(yt), Ye = A(), _t = A(Ye), je = A(), Je = A(), Po = A(), Si = A(Po), Tn = A(), O = {
  /**
  A comment.
  */
  comment: Dn,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: A(Dn),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: A(Dn),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: A(Dn),
  /**
  Any kind of identifier.
  */
  name: gt,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: A(gt),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: Qa,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: A(Qa),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: Za,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: A(Za),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: A(gt),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: A(gt),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: A(gt),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: A(gt),
  /**
  A literal value.
  */
  literal: yt,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: _n,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: A(_n),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: A(_n),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: A(_n),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: hs,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: A(hs),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: A(hs),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: A(yt),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: A(yt),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: A(yt),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: A(yt),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: A(yt),
  /**
  A language keyword.
  */
  keyword: je,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: A(je),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: A(je),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: A(je),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: A(je),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: A(je),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: A(je),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: A(je),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: A(je),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: A(je),
  /**
  An operator.
  */
  operator: Je,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: A(Je),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: A(Je),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: A(Je),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: A(Je),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: A(Je),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: A(Je),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: A(Je),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: A(Je),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: A(Je),
  /**
  Program or markup punctuation.
  */
  punctuation: Po,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: A(Po),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: Si,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: A(Si),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: A(Si),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: A(Si),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: A(Si),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Ye,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: _t,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: A(_t),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: A(_t),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: A(_t),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: A(_t),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: A(_t),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: A(_t),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: A(Ye),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: A(Ye),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: A(Ye),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: A(Ye),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: A(Ye),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: A(Ye),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: A(Ye),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: A(Ye),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: A(),
  /**
  Deleted text.
  */
  deleted: A(),
  /**
  Changed text.
  */
  changed: A(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: A(),
  /**
  Metadata or meta-instruction.
  */
  meta: Tn,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: A(Tn),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: A(Tn),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: A(Tn),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: Le.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: Le.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: Le.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: Le.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: Le.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: Le.defineModifier("special")
};
for (let n in O) {
  let e = O[n];
  e instanceof Le && (e.name = n);
}
Cu([
  { tag: O.link, class: "tok-link" },
  { tag: O.heading, class: "tok-heading" },
  { tag: O.emphasis, class: "tok-emphasis" },
  { tag: O.strong, class: "tok-strong" },
  { tag: O.keyword, class: "tok-keyword" },
  { tag: O.atom, class: "tok-atom" },
  { tag: O.bool, class: "tok-bool" },
  { tag: O.url, class: "tok-url" },
  { tag: O.labelName, class: "tok-labelName" },
  { tag: O.inserted, class: "tok-inserted" },
  { tag: O.deleted, class: "tok-deleted" },
  { tag: O.literal, class: "tok-literal" },
  { tag: O.string, class: "tok-string" },
  { tag: O.number, class: "tok-number" },
  { tag: [O.regexp, O.escape, O.special(O.string)], class: "tok-string2" },
  { tag: O.variableName, class: "tok-variableName" },
  { tag: O.local(O.variableName), class: "tok-variableName tok-local" },
  { tag: O.definition(O.variableName), class: "tok-variableName tok-definition" },
  { tag: O.special(O.variableName), class: "tok-variableName2" },
  { tag: O.definition(O.propertyName), class: "tok-propertyName tok-definition" },
  { tag: O.typeName, class: "tok-typeName" },
  { tag: O.namespace, class: "tok-namespace" },
  { tag: O.className, class: "tok-className" },
  { tag: O.macroName, class: "tok-macroName" },
  { tag: O.propertyName, class: "tok-propertyName" },
  { tag: O.operator, class: "tok-operator" },
  { tag: O.comment, class: "tok-comment" },
  { tag: O.meta, class: "tok-meta" },
  { tag: O.invalid, class: "tok-invalid" },
  { tag: O.punctuation, class: "tok-punctuation" }
]);
var cs;
const Ei = /* @__PURE__ */ new W(), S1 = /* @__PURE__ */ new W();
class et {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], r = "") {
    this.data = e, this.name = r, F.prototype.hasOwnProperty("tree") || Object.defineProperty(F.prototype, "tree", { get() {
      return ce(this);
    } }), this.parser = t, this.extension = [
      Ot.of(this),
      F.languageData.of((s, o, l) => {
        let a = $a(s, o, l), h = a.type.prop(Ei);
        if (!h)
          return [];
        let c = s.facet(h), f = a.type.prop(S1);
        if (f) {
          let u = a.resolve(o - a.from, l);
          for (let d of f)
            if (d.test(u, s)) {
              let p = s.facet(d.facet);
              return d.type == "replace" ? p : p.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return $a(e, t, i).type.prop(Ei) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(Ot);
    if (t?.data == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], r = (s, o) => {
      if (s.prop(Ei) == this.data) {
        i.push({ from: o, to: o + s.length });
        return;
      }
      let l = s.prop(W.mounted);
      if (l) {
        if (l.tree.prop(Ei) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + s.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (r(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < s.children.length; a++) {
        let h = s.children[a];
        h instanceof le && r(h, s.positions[a] + o);
      }
    };
    return r(ce(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
et.setState = /* @__PURE__ */ I.define();
function $a(n, e, t) {
  let i = n.facet(Ot), r = ce(n).topNode;
  if (!i || i.allowsNesting)
    for (let s = r; s; s = s.enter(e, t, Z.ExcludeBuffers | Z.EnterBracketed))
      s.type.isTop && (r = s);
  return r;
}
function ce(n) {
  let e = n.field(et.state, !1);
  return e ? e.tree : le.empty;
}
class k1 {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let ki = null;
class cr {
  constructor(e, t, i = [], r, s, o, l, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = r, this.treeLen = s, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new cr(e, t, [], le.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new k1(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != le.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let r = Date.now() + e;
        e = () => Date.now() > r;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let r = this.parse.advance();
        if (r)
          if (this.fragments = this.withoutTempSkipped(Ft.addTree(r, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = r, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Ft.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = ki;
    ki = this;
    try {
      return e();
    } finally {
      ki = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = eh(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: r, treeLen: s, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, u) => a.push({ fromA: h, toA: c, fromB: f, toB: u })), i = Ft.applyChanges(i, a), r = le.empty, s = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new cr(this.parser, t, i, r, s, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: r, to: s } = this.skipped[i];
      r < e.to && s > e.from && (this.fragments = eh(this.fragments, r, s), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends u1 {
      createParse(t, i, r) {
        let s = r[0].from, o = r[r.length - 1].to;
        return {
          parsedPos: s,
          advance() {
            let a = ki;
            if (a) {
              for (let h of r)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new le(Be.none, [], [], o - s);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return ki;
  }
}
function eh(n, e, t) {
  return Ft.applyChanges(n, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class ui {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new ui(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = cr.create(e.facet(Ot).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new ui(i);
  }
}
et.state = /* @__PURE__ */ ue.define({
  create: ui.init,
  update(n, e) {
    for (let t of e.effects)
      if (t.is(et.setState))
        return t.value;
    return e.startState.facet(Ot) != e.state.facet(Ot) ? ui.init(e.state) : n.apply(e);
  }
});
let Mu = (n) => {
  let e = setTimeout(
    () => n(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (Mu = (n) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(n, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const us = typeof navigator < "u" && (!((cs = navigator.scheduling) === null || cs === void 0) && cs.isInputPending) ? () => navigator.scheduling.isInputPending() : null, C1 = /* @__PURE__ */ $.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(et.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(et.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Mu(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: r } } = this.view, s = i.field(et.state);
    if (s.tree == s.context.tree && s.context.isDone(
      r + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !us ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = s.context.treeLen < r && i.doc.length > r + 1e3, a = s.context.work(() => us && us() || Date.now() > o, r + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: et.setState.of(new ui(s.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => xe(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Ot = /* @__PURE__ */ L.define({
  combine(n) {
    return n.length ? n[0] : null;
  },
  enables: (n) => [
    et.state,
    C1,
    P.contentAttributes.compute([n], (e) => {
      let t = e.facet(n);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
}), M1 = /* @__PURE__ */ L.define(), ml = /* @__PURE__ */ L.define({
  combine: (n) => {
    if (!n.length)
      return "  ";
    let e = n[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(n[0]));
    return e;
  }
});
function ur(n) {
  let e = n.facet(ml);
  return e.charCodeAt(0) == 9 ? n.tabSize * e.length : e.length;
}
function Yi(n, e) {
  let t = "", i = n.tabSize, r = n.facet(ml)[0];
  if (r == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    r = " ";
  }
  for (let s = 0; s < e; s++)
    t += r;
  return t;
}
function gl(n, e) {
  n instanceof F && (n = new Lr(n));
  for (let i of n.state.facet(M1)) {
    let r = i(n, e);
    if (r !== void 0)
      return r;
  }
  let t = ce(n.state);
  return t.length >= e ? O1(n, t, e) : null;
}
class Lr {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = ur(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: s } = this.options;
    return r != null && r >= i.from && r <= i.to ? s && r == e ? { text: "", from: e } : (t < 0 ? r < e : r <= e) ? { text: i.text.slice(r - i.from), from: r } : { text: i.text.slice(0, r - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: r } = this.lineAt(e, t);
    return i.slice(e - r, Math.min(i.length, e + 100 - r));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: r } = this.lineAt(e, t), s = this.countColumn(i, e - r), o = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
    return o > -1 && (s += o - this.countColumn(i, i.search(/\S|$/))), s;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return pi(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: r } = this.lineAt(e, t), s = this.options.overrideIndentation;
    if (s) {
      let o = s(r);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const A1 = /* @__PURE__ */ new W();
function O1(n, e, t) {
  let i = e.resolveStack(t), r = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (r != i.node) {
    let s = [];
    for (let o = r; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent)
      s.push(o);
    for (let o = s.length - 1; o >= 0; o--)
      i = { node: s[o], next: i };
  }
  return Au(i, n, t);
}
function Au(n, e, t) {
  for (let i = n; i; i = i.next) {
    let r = L1(i.node);
    if (r)
      return r(yl.create(e, t, i));
  }
  return 0;
}
function E1(n) {
  return n.pos == n.options.simulateBreak && n.options.simulateDoubleBreak;
}
function L1(n) {
  let e = n.type.prop(A1);
  if (e)
    return e;
  let t = n.firstChild, i;
  if (t && (i = t.type.prop(W.closedBy))) {
    let r = n.lastChild, s = r && i.indexOf(r.name) > -1;
    return (o) => T1(o, !0, 1, void 0, s && !E1(o) ? r.from : void 0);
  }
  return n.parent == null ? P1 : null;
}
function P1() {
  return 0;
}
class yl extends Lr {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new yl(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (D1(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return Au(this.context.next, this.base, this.pos);
  }
}
function D1(n, e) {
  for (let t = e; t; t = t.parent)
    if (n == t)
      return !0;
  return !1;
}
function _1(n) {
  let e = n.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let r = n.options.simulateBreak, s = n.state.doc.lineAt(t.from), o = r == null || r <= s.from ? s.to : Math.min(s.to, r);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= o)
        return null;
      let h = /^ */.exec(s.text.slice(t.to - s.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    l = a.to;
  }
}
function T1(n, e, t, i, r) {
  let s = n.textAfter, o = s.match(/^\s*/)[0].length, l = i && s.slice(o, o + i.length) == i || r == n.pos + o, a = _1(n);
  return a ? l ? n.column(a.from) : n.column(a.to) : n.baseIndent + (l ? 0 : n.unit * t);
}
const B1 = 200;
function R1() {
  return F.transactionFilter.of((n) => {
    if (!n.docChanged || !n.isUserEvent("input.type") && !n.isUserEvent("input.complete"))
      return n;
    let e = n.startState.languageDataAt("indentOnInput", n.startState.selection.main.head);
    if (!e.length)
      return n;
    let t = n.newDoc, { head: i } = n.newSelection.main, r = t.lineAt(i);
    if (i > r.from + B1)
      return n;
    let s = t.sliceString(r.from, i);
    if (!e.some((h) => h.test(s)))
      return n;
    let { state: o } = n, l = -1, a = [];
    for (let { head: h } of o.selection.ranges) {
      let c = o.doc.lineAt(h);
      if (c.from == l)
        continue;
      l = c.from;
      let f = gl(o, c.from);
      if (f == null)
        continue;
      let u = /^\s*/.exec(c.text)[0], d = Yi(o, f);
      u != d && a.push({ from: c.from, to: c.from + u.length, insert: d });
    }
    return a.length ? [n, { changes: a, sequential: !0 }] : n;
  });
}
const I1 = /* @__PURE__ */ L.define(), N1 = /* @__PURE__ */ new W();
function H1(n, e, t) {
  let i = ce(n);
  if (i.length < t)
    return null;
  let r = i.resolveStack(t, 1), s = null;
  for (let o = r; o; o = o.next) {
    let l = o.node;
    if (l.to <= t || l.from > t)
      continue;
    if (s && l.from < e)
      break;
    let a = l.type.prop(N1);
    if (a && (l.to < i.length - 50 || i.length == n.doc.length || !W1(l))) {
      let h = a(l, n);
      h && h.from <= t && h.from >= e && h.to > t && (s = h);
    }
  }
  return s;
}
function W1(n) {
  let e = n.lastChild;
  return e && e.to == n.to && e.type.isError;
}
function fr(n, e, t) {
  for (let i of n.facet(I1)) {
    let r = i(n, e, t);
    if (r)
      return r;
  }
  return H1(n, e, t);
}
function Ou(n, e) {
  let t = e.mapPos(n.from, 1), i = e.mapPos(n.to, -1);
  return t >= i ? void 0 : { from: t, to: i };
}
const Pr = /* @__PURE__ */ I.define({ map: Ou }), cn = /* @__PURE__ */ I.define({ map: Ou });
function Eu(n) {
  let e = [];
  for (let { head: t } of n.state.selection.ranges)
    e.some((i) => i.from <= t && i.to >= t) || e.push(n.lineBlockAt(t));
  return e;
}
const Ut = /* @__PURE__ */ ue.define({
  create() {
    return R.none;
  },
  update(n, e) {
    e.isUserEvent("delete") && e.changes.iterChangedRanges((t, i) => n = th(n, t, i)), n = n.map(e.changes);
    for (let t of e.effects)
      if (t.is(Pr) && !F1(n, t.value.from, t.value.to)) {
        let { preparePlaceholder: i } = e.state.facet(Du), r = i ? R.replace({ widget: new j1(i(e.state, t.value)) }) : ih;
        n = n.update({ add: [r.range(t.value.from, t.value.to)] });
      } else t.is(cn) && (n = n.update({
        filter: (i, r) => t.value.from != i || t.value.to != r,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
    return e.selection && (n = th(n, e.selection.main.head)), n;
  },
  provide: (n) => P.decorations.from(n),
  toJSON(n, e) {
    let t = [];
    return n.between(0, e.doc.length, (i, r) => {
      t.push(i, r);
    }), t;
  },
  fromJSON(n) {
    if (!Array.isArray(n) || n.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let e = [];
    for (let t = 0; t < n.length; ) {
      let i = n[t++], r = n[t++];
      if (typeof i != "number" || typeof r != "number")
        throw new RangeError("Invalid JSON for fold state");
      e.push(ih.range(i, r));
    }
    return R.set(e, !0);
  }
});
function th(n, e, t = e) {
  let i = !1;
  return n.between(e, t, (r, s) => {
    r < t && s > e && (i = !0);
  }), i ? n.update({
    filterFrom: e,
    filterTo: t,
    filter: (r, s) => r >= t || s <= e
  }) : n;
}
function dr(n, e, t) {
  var i;
  let r = null;
  return (i = n.field(Ut, !1)) === null || i === void 0 || i.between(e, t, (s, o) => {
    (!r || r.from > s) && (r = { from: s, to: o });
  }), r;
}
function F1(n, e, t) {
  let i = !1;
  return n.between(e, e, (r, s) => {
    r == e && s == t && (i = !0);
  }), i;
}
function Lu(n, e) {
  return n.field(Ut, !1) ? e : e.concat(I.appendConfig.of(_u()));
}
const V1 = (n) => {
  for (let e of Eu(n)) {
    let t = fr(n.state, e.from, e.to);
    if (t)
      return n.dispatch({ effects: Lu(n.state, [Pr.of(t), Pu(n, t)]) }), !0;
  }
  return !1;
}, q1 = (n) => {
  if (!n.state.field(Ut, !1))
    return !1;
  let e = [];
  for (let t of Eu(n)) {
    let i = dr(n.state, t.from, t.to);
    i && e.push(cn.of(i), Pu(n, i, !1));
  }
  return e.length && n.dispatch({ effects: e }), e.length > 0;
};
function Pu(n, e, t = !0) {
  let i = n.state.doc.lineAt(e.from).number, r = n.state.doc.lineAt(e.to).number;
  return P.announce.of(`${n.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${i} ${n.state.phrase("to")} ${r}.`);
}
const z1 = (n) => {
  let { state: e } = n, t = [];
  for (let i = 0; i < e.doc.length; ) {
    let r = n.lineBlockAt(i), s = fr(e, r.from, r.to);
    s && t.push(Pr.of(s)), i = (s ? n.lineBlockAt(s.to) : r).to + 1;
  }
  return t.length && n.dispatch({ effects: Lu(n.state, t) }), !!t.length;
}, K1 = (n) => {
  let e = n.state.field(Ut, !1);
  if (!e || !e.size)
    return !1;
  let t = [];
  return e.between(0, n.state.doc.length, (i, r) => {
    t.push(cn.of({ from: i, to: r }));
  }), n.dispatch({ effects: t }), !0;
}, U1 = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: V1 },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: q1 },
  { key: "Ctrl-Alt-[", run: z1 },
  { key: "Ctrl-Alt-]", run: K1 }
], G1 = {
  placeholderDOM: null,
  preparePlaceholder: null,
  placeholderText: "…"
}, Du = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, G1);
  }
});
function _u(n) {
  return [Ut, X1];
}
function Tu(n, e) {
  let { state: t } = n, i = t.facet(Du), r = (o) => {
    let l = n.lineBlockAt(n.posAtDOM(o.target)), a = dr(n.state, l.from, l.to);
    a && n.dispatch({ effects: cn.of(a) }), o.preventDefault();
  };
  if (i.placeholderDOM)
    return i.placeholderDOM(n, r, e);
  let s = document.createElement("span");
  return s.textContent = i.placeholderText, s.setAttribute("aria-label", t.phrase("folded code")), s.title = t.phrase("unfold"), s.className = "cm-foldPlaceholder", s.onclick = r, s;
}
const ih = /* @__PURE__ */ R.replace({ widget: /* @__PURE__ */ new class extends mt {
  toDOM(n) {
    return Tu(n, null);
  }
}() });
class j1 extends mt {
  constructor(e) {
    super(), this.value = e;
  }
  eq(e) {
    return this.value == e.value;
  }
  toDOM(e) {
    return Tu(e, this.value);
  }
}
const J1 = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {},
  foldingChanged: () => !1
};
class fs extends dt {
  constructor(e, t) {
    super(), this.config = e, this.open = t;
  }
  eq(e) {
    return this.config == e.config && this.open == e.open;
  }
  toDOM(e) {
    if (this.config.markerDOM)
      return this.config.markerDOM(this.open);
    let t = document.createElement("span");
    return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
  }
}
function Y1(n = {}) {
  let e = { ...J1, ...n }, t = new fs(e, !0), i = new fs(e, !1), r = $.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(Ot) != o.state.facet(Ot) || o.startState.field(Ut, !1) != o.state.field(Ut, !1) || ce(o.startState) != ce(o.state) || e.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let l = new ut();
      for (let a of o.viewportLineBlocks) {
        let h = dr(o.state, a.from, a.to) ? i : fr(o.state, a.from, a.to) ? t : null;
        h && l.add(a.from, a.from, h);
      }
      return l.finish();
    }
  }), { domEventHandlers: s } = e;
  return [
    r,
    j0({
      class: "cm-foldGutter",
      markers(o) {
        var l;
        return ((l = o.plugin(r)) === null || l === void 0 ? void 0 : l.markers) || N.empty;
      },
      initialSpacer() {
        return new fs(e, !1);
      },
      domEventHandlers: {
        ...s,
        click: (o, l, a) => {
          if (s.click && s.click(o, l, a))
            return !0;
          let h = dr(o.state, l.from, l.to);
          if (h)
            return o.dispatch({ effects: cn.of(h) }), !0;
          let c = fr(o.state, l.from, l.to);
          return c ? (o.dispatch({ effects: Pr.of(c) }), !0) : !1;
        }
      }
    }),
    _u()
  ];
}
const X1 = /* @__PURE__ */ P.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class Dr {
  constructor(e, t) {
    this.specs = e;
    let i;
    function r(l) {
      let a = kt.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
    }
    const s = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0, o = t.scope;
    this.scope = o instanceof et ? (l) => l.prop(Ei) == o.data : o ? (l) => l == o : void 0, this.style = Cu(e.map((l) => ({
      tag: l.tag,
      class: l.class || r(Object.assign({}, l, { tag: null }))
    })), {
      all: s
    }).style, this.module = i ? new kt(i) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new Dr(e, t || {});
  }
}
const Do = /* @__PURE__ */ L.define(), Bu = /* @__PURE__ */ L.define({
  combine(n) {
    return n.length ? [n[0]] : null;
  }
});
function ds(n) {
  let e = n.facet(Do);
  return e.length ? e : n.facet(Bu);
}
function Q1(n, e) {
  let t = [$1], i;
  return n instanceof Dr && (n.module && t.push(P.styleModule.of(n.module)), i = n.themeType), e?.fallback ? t.push(Bu.of(n)) : i ? t.push(Do.computeN([P.darkTheme], (r) => r.facet(P.darkTheme) == (i == "dark") ? [n] : [])) : t.push(Do.of(n)), t;
}
class Z1 {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = ce(e.state), this.decorations = this.buildDeco(e, ds(e.state)), this.decoratedTo = e.viewport.to;
  }
  update(e) {
    let t = ce(e.state), i = ds(e.state), r = i != ds(e.startState), { viewport: s } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
    t.length < s.to && !r && t.type == this.tree.type && o >= s.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = s.to);
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return R.none;
    let i = new ut();
    for (let { from: r, to: s } of e.visibleRanges)
      b1(this.tree, t, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = R.mark({ class: a })));
      }, r, s);
    return i.finish();
  }
}
const $1 = /* @__PURE__ */ jt.high(/* @__PURE__ */ $.fromClass(Z1, {
  decorations: (n) => n.decorations
})), ey = /* @__PURE__ */ Dr.define([
  {
    tag: O.meta,
    color: "#404740"
  },
  {
    tag: O.link,
    textDecoration: "underline"
  },
  {
    tag: O.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: O.emphasis,
    fontStyle: "italic"
  },
  {
    tag: O.strong,
    fontWeight: "bold"
  },
  {
    tag: O.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: O.keyword,
    color: "#708"
  },
  {
    tag: [O.atom, O.bool, O.url, O.contentSeparator, O.labelName],
    color: "#219"
  },
  {
    tag: [O.literal, O.inserted],
    color: "#164"
  },
  {
    tag: [O.string, O.deleted],
    color: "#a11"
  },
  {
    tag: [O.regexp, O.escape, /* @__PURE__ */ O.special(O.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ O.definition(O.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ O.local(O.variableName),
    color: "#30a"
  },
  {
    tag: [O.typeName, O.namespace],
    color: "#085"
  },
  {
    tag: O.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ O.special(O.variableName), O.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ O.definition(O.propertyName),
    color: "#00c"
  },
  {
    tag: O.comment,
    color: "#940"
  },
  {
    tag: O.invalid,
    color: "#f00"
  }
]), ty = /* @__PURE__ */ P.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Ru = 1e4, Iu = "()[]{}", Nu = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, {
      afterCursor: !0,
      brackets: Iu,
      maxScanDistance: Ru,
      renderMatch: ry
    });
  }
}), iy = /* @__PURE__ */ R.mark({ class: "cm-matchingBracket" }), ny = /* @__PURE__ */ R.mark({ class: "cm-nonmatchingBracket" });
function ry(n) {
  let e = [], t = n.matched ? iy : ny;
  return e.push(t.range(n.start.from, n.start.to)), n.end && e.push(t.range(n.end.from, n.end.to)), e;
}
function nh(n) {
  let e = [], t = n.facet(Nu);
  for (let i of n.selection.ranges) {
    if (!i.empty)
      continue;
    let r = tt(n, i.head, -1, t) || i.head > 0 && tt(n, i.head - 1, 1, t) || t.afterCursor && (tt(n, i.head, 1, t) || i.head < n.doc.length && tt(n, i.head + 1, -1, t));
    r && (e = e.concat(t.renderMatch(r, n)));
  }
  return R.set(e, !0);
}
const sy = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.paused = !1, this.decorations = nh(n.state);
  }
  update(n) {
    (n.docChanged || n.selectionSet || this.paused) && (n.view.composing ? (this.decorations = this.decorations.map(n.changes), this.paused = !0) : (this.decorations = nh(n.state), this.paused = !1));
  }
}, {
  decorations: (n) => n.decorations
}), oy = [
  sy,
  ty
];
function ly(n = {}) {
  return [Nu.of(n), oy];
}
const ay = /* @__PURE__ */ new W();
function _o(n, e, t) {
  let i = n.prop(e < 0 ? W.openedBy : W.closedBy);
  if (i)
    return i;
  if (n.name.length == 1) {
    let r = t.indexOf(n.name);
    if (r > -1 && r % 2 == (e < 0 ? 1 : 0))
      return [t[r + e]];
  }
  return null;
}
function To(n) {
  let e = n.type.prop(ay);
  return e ? e(n.node) : n;
}
function tt(n, e, t, i = {}) {
  let r = i.maxScanDistance || Ru, s = i.brackets || Iu, o = ce(n), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = _o(a.type, t, s);
    if (h && a.from < a.to) {
      let c = To(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return hy(n, e, t, a, c, h, s);
    }
  }
  return cy(n, e, t, o, l.type, r, s);
}
function hy(n, e, t, i, r, s, o) {
  let l = i.parent, a = { from: r.from, to: r.to }, h = 0, c = l?.cursor();
  if (c && (t < 0 ? c.childBefore(i.from) : c.childAfter(i.to)))
    do
      if (t < 0 ? c.to <= i.from : c.from >= i.to) {
        if (h == 0 && s.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = To(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (_o(c.type, t, o))
          h++;
        else if (_o(c.type, -t, o)) {
          if (h == 0) {
            let f = To(c);
            return {
              start: a,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: a, matched: !1 };
}
function cy(n, e, t, i, r, s, o) {
  let l = t < 0 ? n.sliceDoc(e - 1, e) : n.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = n.doc.iterRange(e, t > 0 ? n.doc.length : 0), f = 0;
  for (let u = 0; !c.next().done && u <= s; ) {
    let d = c.value;
    t < 0 && (u += d.length);
    let p = e + u * t;
    for (let m = t > 0 ? 0 : d.length - 1, g = t > 0 ? d.length : -1; m != g; m += t) {
      let y = o.indexOf(d[m]);
      if (!(y < 0 || i.resolveInner(p + m, 1).type != r))
        if (y % 2 == 0 == t > 0)
          f++;
        else {
          if (f == 1)
            return { start: h, end: { from: p + m, to: p + m + 1 }, matched: y >> 1 == a >> 1 };
          f--;
        }
    }
    t > 0 && (u += d.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const uy = /* @__PURE__ */ Object.create(null), rh = [Be.none], sh = [], oh = /* @__PURE__ */ Object.create(null), fy = /* @__PURE__ */ Object.create(null);
for (let [n, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  fy[n] = /* @__PURE__ */ dy(uy, e);
function ps(n, e) {
  sh.indexOf(n) > -1 || (sh.push(n), console.warn(e));
}
function dy(n, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let c = n[h] || O[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : ps(h, `Modifier ${h} used at start of tag`) : a.length ? ps(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : ps(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), r = i + " " + t.map((l) => l.id), s = oh[r];
  if (s)
    return s.id;
  let o = oh[r] = Be.define({
    id: rh.length,
    name: i,
    props: [y1({ [i]: t })]
  });
  return rh.push(o), o.id;
}
U.RTL, U.LTR;
const py = (n) => {
  let { state: e } = n, t = e.doc.lineAt(e.selection.main.from), i = bl(n.state, t.from);
  return i.line ? my(n) : i.block ? yy(n) : !1;
};
function vl(n, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let r = n(e, t);
    return r ? (i(t.update(r)), !0) : !1;
  };
}
const my = /* @__PURE__ */ vl(
  xy,
  0
  /* CommentOption.Toggle */
), gy = /* @__PURE__ */ vl(
  Hu,
  0
  /* CommentOption.Toggle */
), yy = /* @__PURE__ */ vl(
  (n, e) => Hu(n, e, by(e)),
  0
  /* CommentOption.Toggle */
);
function bl(n, e) {
  let t = n.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const Ci = 50;
function vy(n, { open: e, close: t }, i, r) {
  let s = n.sliceDoc(i - Ci, i), o = n.sliceDoc(r, r + Ci), l = /\s*$/.exec(s)[0].length, a = /^\s*/.exec(o)[0].length, h = s.length - l;
  if (s.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: r + a, margin: a && 1 }
    };
  let c, f;
  r - i <= 2 * Ci ? c = f = n.sliceDoc(i, r) : (c = n.sliceDoc(i, i + Ci), f = n.sliceDoc(r - Ci, r));
  let u = /^\s*/.exec(c)[0].length, d = /\s*$/.exec(f)[0].length, p = f.length - d - t.length;
  return c.slice(u, u + e.length) == e && f.slice(p, p + t.length) == t ? {
    open: {
      pos: i + u + e.length,
      margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: r - d - t.length,
      margin: /\s/.test(f.charAt(p - 1)) ? 1 : 0
    }
  } : null;
}
function by(n) {
  let e = [];
  for (let t of n.selection.ranges) {
    let i = n.doc.lineAt(t.from), r = t.to <= i.to ? i : n.doc.lineAt(t.to);
    r.from > i.from && r.from == t.to && (r = t.to == i.to + 1 ? i : n.doc.lineAt(t.to - 1));
    let s = e.length - 1;
    s >= 0 && e[s].to > i.from ? e[s].to = r.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: r.to });
  }
  return e;
}
function Hu(n, e, t = e.selection.ranges) {
  let i = t.map((s) => bl(e, s.from).block);
  if (!i.every((s) => s))
    return null;
  let r = t.map((s, o) => vy(e, i[o], s.from, s.to));
  if (n != 2 && !r.every((s) => s))
    return { changes: e.changes(t.map((s, o) => r[o] ? [] : [{ from: s.from, insert: i[o].open + " " }, { from: s.to, insert: " " + i[o].close }])) };
  if (n != 1 && r.some((s) => s)) {
    let s = [];
    for (let o = 0, l; o < r.length; o++)
      if (l = r[o]) {
        let a = i[o], { open: h, close: c } = l;
        s.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + a.close.length });
      }
    return { changes: s };
  }
  return null;
}
function xy(n, e, t = e.selection.ranges) {
  let i = [], r = -1;
  e: for (let { from: s, to: o } of t) {
    let l = i.length, a = 1e9, h;
    for (let c = s; c <= o; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = bl(e, f.from).line, !h))
        continue e;
      if (f.from > r && (s == o || o > f.from)) {
        r = f.from;
        let u = /^\s*/.exec(f.text)[0].length, d = u == f.length, p = f.text.slice(u, u + h.length) == h ? u : -1;
        u < f.text.length && u < a && (a = u), i.push({ line: f, comment: p, token: h, indent: u, empty: d, single: !1 });
      }
      c = f.to + 1;
    }
    if (a < 1e9)
      for (let c = l; c < i.length; c++)
        i[c].indent < i[c].line.text.length && (i[c].indent = a);
    i.length == l + 1 && (i[l].single = !0);
  }
  if (n != 2 && i.some((s) => s.comment < 0 && (!s.empty || s.single))) {
    let s = [];
    for (let { line: l, token: a, indent: h, empty: c, single: f } of i)
      (f || !c) && s.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(s);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (n != 1 && i.some((s) => s.comment >= 0)) {
    let s = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let h = o.from + l, c = h + a.length;
        o.text[c - o.from] == " " && c++, s.push({ from: h, to: c });
      }
    return { changes: s };
  }
  return null;
}
const Bo = /* @__PURE__ */ pt.define(), wy = /* @__PURE__ */ pt.define(), Sy = /* @__PURE__ */ L.define(), Wu = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, r) => e(i, r) || t(i, r)
    });
  }
}), Fu = /* @__PURE__ */ ue.define({
  create() {
    return it.empty;
  },
  update(n, e) {
    let t = e.state.facet(Wu), i = e.annotation(Bo);
    if (i) {
      let a = we.fromTransaction(e, i.selection), h = i.side, c = h == 0 ? n.undone : n.done;
      return a ? c = pr(c, c.length, t.minDepth, a) : c = zu(c, e.startState.selection), new it(h == 0 ? i.rest : c, h == 0 ? c : i.rest);
    }
    let r = e.annotation(wy);
    if ((r == "full" || r == "before") && (n = n.isolate()), e.annotation(te.addToHistory) === !1)
      return e.changes.empty ? n : n.addMapping(e.changes.desc);
    let s = we.fromTransaction(e), o = e.annotation(te.time), l = e.annotation(te.userEvent);
    return s ? n = n.addChanges(s, o, l, t, e) : e.selection && (n = n.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (r == "full" || r == "after") && (n = n.isolate()), n;
  },
  toJSON(n) {
    return { done: n.done.map((e) => e.toJSON()), undone: n.undone.map((e) => e.toJSON()) };
  },
  fromJSON(n) {
    return new it(n.done.map(we.fromJSON), n.undone.map(we.fromJSON));
  }
});
function ky(n = {}) {
  return [
    Fu,
    Wu.of(n),
    P.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? Vu : e.inputType == "historyRedo" ? Ro : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function _r(n, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let r = t.field(Fu, !1);
    if (!r)
      return !1;
    let s = r.pop(n, t, e);
    return s ? (i(s), !0) : !1;
  };
}
const Vu = /* @__PURE__ */ _r(0, !1), Ro = /* @__PURE__ */ _r(1, !1), Cy = /* @__PURE__ */ _r(0, !0), My = /* @__PURE__ */ _r(1, !0);
class we {
  constructor(e, t, i, r, s) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = r, this.selectionsAfter = s;
  }
  setSelAfter(e) {
    return new we(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((r) => r.toJSON())
    };
  }
  static fromJSON(e) {
    return new we(e.changes && ee.fromJSON(e.changes), [], e.mapped && nt.fromJSON(e.mapped), e.startSelection && C.fromJSON(e.startSelection), e.selectionsAfter.map(C.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = De;
    for (let r of e.startState.facet(Sy)) {
      let s = r(e);
      s.length && (i = i.concat(s));
    }
    return !i.length && e.changes.empty ? null : new we(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, De);
  }
  static selection(e) {
    return new we(void 0, De, void 0, void 0, e);
  }
}
function pr(n, e, t, i) {
  let r = e + 1 > t + 20 ? e - t - 1 : 0, s = n.slice(r, e);
  return s.push(i), s;
}
function Ay(n, e) {
  let t = [], i = !1;
  return n.iterChangedRanges((r, s) => t.push(r, s)), e.iterChangedRanges((r, s, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (i = !0);
    }
  }), i;
}
function Oy(n, e) {
  return n.ranges.length == e.ranges.length && n.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function qu(n, e) {
  return n.length ? e.length ? n.concat(e) : n : e;
}
const De = [], Ey = 200;
function zu(n, e) {
  if (n.length) {
    let t = n[n.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - Ey));
    return i.length && i[i.length - 1].eq(e) ? n : (i.push(e), pr(n, n.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [we.selection([e])];
}
function Ly(n) {
  let e = n[n.length - 1], t = n.slice();
  return t[n.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function ms(n, e) {
  if (!n.length)
    return n;
  let t = n.length, i = De;
  for (; t; ) {
    let r = Py(n[t - 1], e, i);
    if (r.changes && !r.changes.empty || r.effects.length) {
      let s = n.slice(0, t);
      return s[t - 1] = r, s;
    } else
      e = r.mapped, t--, i = r.selectionsAfter;
  }
  return i.length ? [we.selection(i)] : De;
}
function Py(n, e, t) {
  let i = qu(n.selectionsAfter.length ? n.selectionsAfter.map((l) => l.map(e)) : De, t);
  if (!n.changes)
    return we.selection(i);
  let r = n.changes.map(e), s = e.mapDesc(n.changes, !0), o = n.mapped ? n.mapped.composeDesc(s) : s;
  return new we(r, I.mapEffects(n.effects, e), o, n.startSelection.map(s), i);
}
const Dy = /^(input\.type|delete)($|\.)/;
class it {
  constructor(e, t, i = 0, r = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = r;
  }
  isolate() {
    return this.prevTime ? new it(this.done, this.undone) : this;
  }
  addChanges(e, t, i, r, s) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!i || Dy.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < r.newGroupDelay && r.joinToEvent(s, Ay(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = pr(o, o.length - 1, r.minDepth, new we(e.changes.compose(l.changes), qu(I.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, De)) : o = pr(o, o.length, r.minDepth, e), new it(o, De, t, i);
  }
  addSelection(e, t, i, r) {
    let s = this.done.length ? this.done[this.done.length - 1].selectionsAfter : De;
    return s.length > 0 && t - this.prevTime < r && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Oy(s[s.length - 1], e) ? this : new it(zu(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new it(ms(this.done, e), ms(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let r = e == 0 ? this.done : this.undone;
    if (r.length == 0)
      return null;
    let s = r[r.length - 1], o = s.selectionsAfter[0] || (s.startSelection ? s.startSelection.map(s.changes.invertedDesc, 1) : t.selection);
    if (i && s.selectionsAfter.length)
      return t.update({
        selection: s.selectionsAfter[s.selectionsAfter.length - 1],
        annotations: Bo.of({ side: e, rest: Ly(r), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (s.changes) {
      let l = r.length == 1 ? De : r.slice(0, r.length - 1);
      return s.mapped && (l = ms(l, s.mapped)), t.update({
        changes: s.changes,
        selection: s.startSelection,
        effects: s.effects,
        annotations: Bo.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
it.empty = /* @__PURE__ */ new it(De, De);
const _y = [
  { key: "Mod-z", run: Vu, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: Ro, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: Ro, preventDefault: !0 },
  { key: "Mod-u", run: Cy, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: My, preventDefault: !0 }
];
function mi(n, e) {
  return C.create(n.ranges.map(e), n.mainIndex);
}
function qe(n, e) {
  return n.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function ze({ state: n, dispatch: e }, t) {
  let i = mi(n.selection, t);
  return i.eq(n.selection, !0) ? !1 : (e(qe(n, i)), !0);
}
function Tr(n, e) {
  return C.cursor(e ? n.to : n.from);
}
function Ku(n, e) {
  return ze(n, (t) => t.empty ? n.moveByChar(t, e) : Tr(t, e));
}
function fe(n) {
  return n.textDirectionAt(n.state.selection.main.head) == U.LTR;
}
const Uu = (n) => Ku(n, !fe(n)), Gu = (n) => Ku(n, fe(n));
function ju(n, e) {
  return ze(n, (t) => t.empty ? n.moveByGroup(t, e) : Tr(t, e));
}
const Ty = (n) => ju(n, !fe(n)), By = (n) => ju(n, fe(n));
function Ry(n, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(n.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Br(n, e, t) {
  let i = ce(n).resolveInner(e.head), r = t ? W.closedBy : W.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    Ry(n, h, r) ? i = h : a = t ? h.to : h.from;
  }
  let s = i.type.prop(r), o, l;
  return s && (o = t ? tt(n, i.from, 1) : tt(n, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, C.cursor(l, t ? -1 : 1);
}
const Iy = (n) => ze(n, (e) => Br(n.state, e, !fe(n))), Ny = (n) => ze(n, (e) => Br(n.state, e, fe(n)));
function Ju(n, e) {
  return ze(n, (t) => {
    if (!t.empty)
      return Tr(t, e);
    let i = n.moveVertically(t, e);
    return i.head != t.head ? i : n.moveToLineBoundary(t, e);
  });
}
const Yu = (n) => Ju(n, !1), Xu = (n) => Ju(n, !0);
function Qu(n) {
  let e = n.scrollDOM.clientHeight < n.scrollDOM.scrollHeight - 2, t = 0, i = 0, r;
  if (e) {
    for (let s of n.state.facet(P.scrollMargins)) {
      let o = s(n);
      o?.top && (t = Math.max(o?.top, t)), o?.bottom && (i = Math.max(o?.bottom, i));
    }
    r = n.scrollDOM.clientHeight - t - i;
  } else
    r = (n.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(n.defaultLineHeight, r - 5)
  };
}
function Zu(n, e) {
  let t = Qu(n), { state: i } = n, r = mi(i.selection, (o) => o.empty ? n.moveVertically(o, e, t.height) : Tr(o, e));
  if (r.eq(i.selection))
    return !1;
  let s;
  if (t.selfScroll) {
    let o = n.coordsAtPos(i.selection.main.head), l = n.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (s = P.scrollIntoView(r.main.head, { y: "start", yMargin: o.top - a }));
  }
  return n.dispatch(qe(i, r), { effects: s }), !0;
}
const lh = (n) => Zu(n, !1), Io = (n) => Zu(n, !0);
function Pt(n, e, t) {
  let i = n.lineBlockAt(e.head), r = n.moveToLineBoundary(e, t);
  if (r.head == e.head && r.head != (t ? i.to : i.from) && (r = n.moveToLineBoundary(e, t, !1)), !t && r.head == i.from && i.length) {
    let s = /^\s*/.exec(n.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    s && e.head != i.from + s && (r = C.cursor(i.from + s));
  }
  return r;
}
const Hy = (n) => ze(n, (e) => Pt(n, e, !0)), Wy = (n) => ze(n, (e) => Pt(n, e, !1)), Fy = (n) => ze(n, (e) => Pt(n, e, !fe(n))), Vy = (n) => ze(n, (e) => Pt(n, e, fe(n))), qy = (n) => ze(n, (e) => C.cursor(n.lineBlockAt(e.head).from, 1)), zy = (n) => ze(n, (e) => C.cursor(n.lineBlockAt(e.head).to, -1));
function Ky(n, e, t) {
  let i = !1, r = mi(n.selection, (s) => {
    let o = tt(n, s.head, -1) || tt(n, s.head, 1) || s.head > 0 && tt(n, s.head - 1, 1) || s.head < n.doc.length && tt(n, s.head + 1, -1);
    if (!o || !o.end)
      return s;
    i = !0;
    let l = o.start.from == s.head ? o.end.to : o.end.from;
    return C.cursor(l);
  });
  return i ? (e(qe(n, r)), !0) : !1;
}
const Uy = ({ state: n, dispatch: e }) => Ky(n, e);
function Ne(n, e) {
  let t = mi(n.state.selection, (i) => {
    let r = e(i);
    return C.range(i.anchor, r.head, r.goalColumn, r.bidiLevel || void 0);
  });
  return t.eq(n.state.selection) ? !1 : (n.dispatch(qe(n.state, t)), !0);
}
function $u(n, e) {
  return Ne(n, (t) => n.moveByChar(t, e));
}
const ef = (n) => $u(n, !fe(n)), tf = (n) => $u(n, fe(n));
function nf(n, e) {
  return Ne(n, (t) => n.moveByGroup(t, e));
}
const Gy = (n) => nf(n, !fe(n)), jy = (n) => nf(n, fe(n)), Jy = (n) => Ne(n, (e) => Br(n.state, e, !fe(n))), Yy = (n) => Ne(n, (e) => Br(n.state, e, fe(n)));
function rf(n, e) {
  return Ne(n, (t) => n.moveVertically(t, e));
}
const sf = (n) => rf(n, !1), of = (n) => rf(n, !0);
function lf(n, e) {
  return Ne(n, (t) => n.moveVertically(t, e, Qu(n).height));
}
const ah = (n) => lf(n, !1), hh = (n) => lf(n, !0), Xy = (n) => Ne(n, (e) => Pt(n, e, !0)), Qy = (n) => Ne(n, (e) => Pt(n, e, !1)), Zy = (n) => Ne(n, (e) => Pt(n, e, !fe(n))), $y = (n) => Ne(n, (e) => Pt(n, e, fe(n))), e2 = (n) => Ne(n, (e) => C.cursor(n.lineBlockAt(e.head).from)), t2 = (n) => Ne(n, (e) => C.cursor(n.lineBlockAt(e.head).to)), ch = ({ state: n, dispatch: e }) => (e(qe(n, { anchor: 0 })), !0), uh = ({ state: n, dispatch: e }) => (e(qe(n, { anchor: n.doc.length })), !0), fh = ({ state: n, dispatch: e }) => (e(qe(n, { anchor: n.selection.main.anchor, head: 0 })), !0), dh = ({ state: n, dispatch: e }) => (e(qe(n, { anchor: n.selection.main.anchor, head: n.doc.length })), !0), i2 = ({ state: n, dispatch: e }) => (e(n.update({ selection: { anchor: 0, head: n.doc.length }, userEvent: "select" })), !0), n2 = ({ state: n, dispatch: e }) => {
  let t = Rr(n).map(({ from: i, to: r }) => C.range(i, Math.min(r + 1, n.doc.length)));
  return e(n.update({ selection: C.create(t), userEvent: "select" })), !0;
}, r2 = ({ state: n, dispatch: e }) => {
  let t = mi(n.selection, (i) => {
    let r = ce(n), s = r.resolveStack(i.from, 1);
    if (i.empty) {
      let o = r.resolveStack(i.from, -1);
      o.node.from >= s.node.from && o.node.to <= s.node.to && (s = o);
    }
    for (let o = s; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next)
        return C.range(l.to, l.from);
    }
    return i;
  });
  return t.eq(n.selection) ? !1 : (e(qe(n, t)), !0);
};
function af(n, e) {
  let { state: t } = n, i = t.selection, r = t.selection.ranges.slice();
  for (let s of t.selection.ranges) {
    let o = t.doc.lineAt(s.head);
    if (e ? o.to < n.state.doc.length : o.from > 0)
      for (let l = s; ; ) {
        let a = n.moveVertically(l, e);
        if (a.head < o.from || a.head > o.to) {
          r.some((h) => h.head == a.head) || r.push(a);
          break;
        } else {
          if (a.head == l.head)
            break;
          l = a;
        }
      }
  }
  return r.length == i.ranges.length ? !1 : (n.dispatch(qe(t, C.create(r, r.length - 1))), !0);
}
const s2 = (n) => af(n, !1), o2 = (n) => af(n, !0), l2 = ({ state: n, dispatch: e }) => {
  let t = n.selection, i = null;
  return t.ranges.length > 1 ? i = C.create([t.main]) : t.main.empty || (i = C.create([C.cursor(t.main.head)])), i ? (e(qe(n, i)), !0) : !1;
};
function un(n, e) {
  if (n.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = n, r = i.changeByRange((s) => {
    let { from: o, to: l } = s;
    if (o == l) {
      let a = e(s);
      a < o ? (t = "delete.backward", a = Bn(n, a, !1)) : a > o && (t = "delete.forward", a = Bn(n, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = Bn(n, o, !1), l = Bn(n, l, !0);
    return o == l ? { range: s } : { changes: { from: o, to: l }, range: C.cursor(o, o < s.head ? -1 : 1) };
  });
  return r.changes.empty ? !1 : (n.dispatch(i.update(r, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? P.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function Bn(n, e, t) {
  if (n instanceof P)
    for (let i of n.state.facet(P.atomicRanges).map((r) => r(n)))
      i.between(e, e, (r, s) => {
        r < e && s > e && (e = t ? s : r);
      });
  return e;
}
const hf = (n, e, t) => un(n, (i) => {
  let r = i.from, { state: s } = n, o = s.doc.lineAt(r), l, a;
  if (t && !e && r > o.from && r < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, r - o.from))) {
    if (l[l.length - 1] == "	")
      return r - 1;
    let h = pi(l, s.tabSize), c = h % ur(s) || ur(s);
    for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++)
      r--;
    a = r;
  } else
    a = ne(o.text, r - o.from, e, e) + o.from, a == r && o.number != (e ? s.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, r - o.from)) && (a = ne(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), No = (n) => hf(n, !1, !0), cf = (n) => hf(n, !0, !1), uf = (n, e) => un(n, (t) => {
  let i = t.head, { state: r } = n, s = r.doc.lineAt(i), o = r.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (e ? s.to : s.from)) {
      i == t.head && s.number != (e ? r.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = ne(s.text, i - s.from, e) + s.from, h = s.text.slice(Math.min(i, a) - s.from, Math.max(i, a) - s.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || i != t.head) && (l = c), i = a;
  }
  return i;
}), ff = (n) => uf(n, !1), a2 = (n) => uf(n, !0), h2 = (n) => un(n, (e) => {
  let t = n.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), c2 = (n) => un(n, (e) => {
  let t = n.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), u2 = (n) => un(n, (e) => {
  let t = n.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(n.state.doc.length, e.head + 1);
}), f2 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: V.of(["", ""]) },
    range: C.cursor(i.from)
  }));
  return e(n.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, d2 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = n.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == n.doc.length)
      return { range: i };
    let r = i.from, s = n.doc.lineAt(r), o = r == s.from ? r - 1 : ne(s.text, r - s.from, !1) + s.from, l = r == s.to ? r + 1 : ne(s.text, r - s.from, !0) + s.from;
    return {
      changes: { from: o, to: l, insert: n.doc.slice(r, l).append(n.doc.slice(o, r)) },
      range: C.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(n.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Rr(n) {
  let e = [], t = -1;
  for (let i of n.selection.ranges) {
    let r = n.doc.lineAt(i.from), s = n.doc.lineAt(i.to);
    if (!i.empty && i.to == s.from && (s = n.doc.lineAt(i.to - 1)), t >= r.number) {
      let o = e[e.length - 1];
      o.to = s.to, o.ranges.push(i);
    } else
      e.push({ from: r.from, to: s.to, ranges: [i] });
    t = s.number + 1;
  }
  return e;
}
function df(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [], r = [];
  for (let s of Rr(n)) {
    if (t ? s.to == n.doc.length : s.from == 0)
      continue;
    let o = n.doc.lineAt(t ? s.to + 1 : s.from - 1), l = o.length + 1;
    if (t) {
      i.push({ from: s.to, to: o.to }, { from: s.from, insert: o.text + n.lineBreak });
      for (let a of s.ranges)
        r.push(C.range(Math.min(n.doc.length, a.anchor + l), Math.min(n.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: s.from }, { from: s.to, insert: n.lineBreak + o.text });
      for (let a of s.ranges)
        r.push(C.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (e(n.update({
    changes: i,
    scrollIntoView: !0,
    selection: C.create(r, n.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const p2 = ({ state: n, dispatch: e }) => df(n, e, !1), m2 = ({ state: n, dispatch: e }) => df(n, e, !0);
function pf(n, e, t) {
  if (n.readOnly)
    return !1;
  let i = [];
  for (let s of Rr(n))
    t ? i.push({ from: s.from, insert: n.doc.slice(s.from, s.to) + n.lineBreak }) : i.push({ from: s.to, insert: n.lineBreak + n.doc.slice(s.from, s.to) });
  let r = n.changes(i);
  return e(n.update({
    changes: r,
    selection: n.selection.map(r, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const g2 = ({ state: n, dispatch: e }) => pf(n, e, !1), y2 = ({ state: n, dispatch: e }) => pf(n, e, !0), v2 = (n) => {
  if (n.state.readOnly)
    return !1;
  let { state: e } = n, t = e.changes(Rr(e).map(({ from: r, to: s }) => (r > 0 ? r-- : s < e.doc.length && s++, { from: r, to: s }))), i = mi(e.selection, (r) => {
    let s;
    if (n.lineWrapping) {
      let o = n.lineBlockAt(r.head), l = n.coordsAtPos(r.head, r.assoc || 1);
      l && (s = o.bottom + n.documentTop - l.bottom + n.defaultLineHeight / 2);
    }
    return n.moveVertically(r, !0, s);
  }).map(t);
  return n.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function b2(n, e) {
  if (/\(\)|\[\]|\{\}/.test(n.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = ce(n).resolveInner(e), i = t.childBefore(e), r = t.childAfter(e), s;
  return i && r && i.to <= e && r.from >= e && (s = i.type.prop(W.closedBy)) && s.indexOf(r.name) > -1 && n.doc.lineAt(i.to).from == n.doc.lineAt(r.from).from && !/\S/.test(n.sliceDoc(i.to, r.from)) ? { from: i.to, to: r.from } : null;
}
const ph = /* @__PURE__ */ mf(!1), x2 = /* @__PURE__ */ mf(!0);
function mf(n) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((r) => {
      let { from: s, to: o } = r, l = e.doc.lineAt(s), a = !n && s == o && b2(e, s);
      n && (s = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new Lr(e, { simulateBreak: s, simulateDoubleBreak: !!a }), c = gl(h, s);
      for (c == null && (c = pi(/^\s*/.exec(e.doc.lineAt(s).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: s, to: o } = a : s > l.from && s < l.from + 100 && !/\S/.test(l.text.slice(0, s)) && (s = l.from);
      let f = ["", Yi(e, c)];
      return a && f.push(Yi(e, h.lineIndent(l.from, -1))), {
        changes: { from: s, to: o, insert: V.of(f) },
        range: C.cursor(s + 1 + f[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function xl(n, e) {
  let t = -1;
  return n.changeByRange((i) => {
    let r = [];
    for (let o = i.from; o <= i.to; ) {
      let l = n.doc.lineAt(o);
      l.number > t && (i.empty || i.to > l.from) && (e(l, r, i), t = l.number), o = l.to + 1;
    }
    let s = n.changes(r);
    return {
      changes: r,
      range: C.range(s.mapPos(i.anchor, 1), s.mapPos(i.head, 1))
    };
  });
}
const w2 = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new Lr(n, { overrideIndentation: (s) => {
    let o = t[s];
    return o ?? -1;
  } }), r = xl(n, (s, o, l) => {
    let a = gl(i, s.from);
    if (a == null)
      return;
    /\S/.test(s.text) || (a = 0);
    let h = /^\s*/.exec(s.text)[0], c = Yi(n, a);
    (h != c || l.from < s.from + h.length) && (t[s.from] = a, o.push({ from: s.from, to: s.from + h.length, insert: c }));
  });
  return r.changes.empty || e(n.update(r, { userEvent: "indent" })), !0;
}, S2 = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(xl(n, (t, i) => {
  i.push({ from: t.from, insert: n.facet(ml) });
}), { userEvent: "input.indent" })), !0), k2 = ({ state: n, dispatch: e }) => n.readOnly ? !1 : (e(n.update(xl(n, (t, i) => {
  let r = /^\s*/.exec(t.text)[0];
  if (!r)
    return;
  let s = pi(r, n.tabSize), o = 0, l = Yi(n, Math.max(0, s - ur(n)));
  for (; o < r.length && o < l.length && r.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + r.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), C2 = (n) => (n.setTabFocusMode(), !0), M2 = [
  { key: "Ctrl-b", run: Uu, shift: ef, preventDefault: !0 },
  { key: "Ctrl-f", run: Gu, shift: tf },
  { key: "Ctrl-p", run: Yu, shift: sf },
  { key: "Ctrl-n", run: Xu, shift: of },
  { key: "Ctrl-a", run: qy, shift: e2 },
  { key: "Ctrl-e", run: zy, shift: t2 },
  { key: "Ctrl-d", run: cf },
  { key: "Ctrl-h", run: No },
  { key: "Ctrl-k", run: h2 },
  { key: "Ctrl-Alt-h", run: ff },
  { key: "Ctrl-o", run: f2 },
  { key: "Ctrl-t", run: d2 },
  { key: "Ctrl-v", run: Io }
], A2 = /* @__PURE__ */ [
  { key: "ArrowLeft", run: Uu, shift: ef, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: Ty, shift: Gy, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: Fy, shift: Zy, preventDefault: !0 },
  { key: "ArrowRight", run: Gu, shift: tf, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: By, shift: jy, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: Vy, shift: $y, preventDefault: !0 },
  { key: "ArrowUp", run: Yu, shift: sf, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: ch, shift: fh },
  { mac: "Ctrl-ArrowUp", run: lh, shift: ah },
  { key: "ArrowDown", run: Xu, shift: of, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: uh, shift: dh },
  { mac: "Ctrl-ArrowDown", run: Io, shift: hh },
  { key: "PageUp", run: lh, shift: ah },
  { key: "PageDown", run: Io, shift: hh },
  { key: "Home", run: Wy, shift: Qy, preventDefault: !0 },
  { key: "Mod-Home", run: ch, shift: fh },
  { key: "End", run: Hy, shift: Xy, preventDefault: !0 },
  { key: "Mod-End", run: uh, shift: dh },
  { key: "Enter", run: ph, shift: ph },
  { key: "Mod-a", run: i2 },
  { key: "Backspace", run: No, shift: No, preventDefault: !0 },
  { key: "Delete", run: cf, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: ff, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: a2, preventDefault: !0 },
  { mac: "Mod-Backspace", run: c2, preventDefault: !0 },
  { mac: "Mod-Delete", run: u2, preventDefault: !0 }
].concat(/* @__PURE__ */ M2.map((n) => ({ mac: n.key, run: n.run, shift: n.shift }))), O2 = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: Iy, shift: Jy },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Ny, shift: Yy },
  { key: "Alt-ArrowUp", run: p2 },
  { key: "Shift-Alt-ArrowUp", run: g2 },
  { key: "Alt-ArrowDown", run: m2 },
  { key: "Shift-Alt-ArrowDown", run: y2 },
  { key: "Mod-Alt-ArrowUp", run: s2 },
  { key: "Mod-Alt-ArrowDown", run: o2 },
  { key: "Escape", run: l2 },
  { key: "Mod-Enter", run: x2 },
  { key: "Alt-l", mac: "Ctrl-l", run: n2 },
  { key: "Mod-i", run: r2, preventDefault: !0 },
  { key: "Mod-[", run: k2 },
  { key: "Mod-]", run: S2 },
  { key: "Mod-Alt-\\", run: w2 },
  { key: "Shift-Mod-k", run: v2 },
  { key: "Shift-Mod-\\", run: Uy },
  { key: "Mod-/", run: py },
  { key: "Alt-A", run: gy },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: C2 }
].concat(A2), mh = typeof String.prototype.normalize == "function" ? (n) => n.normalize("NFKD") : (n) => n;
class fi {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(e, t, i = 0, r = e.length, s, o) {
    this.test = o, this.value = { from: 0, to: 0 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(i, r), this.bufferStart = i, this.normalize = s ? (l) => s(mh(l)) : mh, this.query = this.normalize(t);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return ye(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let e = this.peek();
      if (e < 0)
        return this.done = !0, this;
      let t = Go(e), i = this.bufferStart + this.bufferPos;
      this.bufferPos += Qe(e);
      let r = this.normalize(t);
      if (r.length)
        for (let s = 0, o = i; ; s++) {
          let l = r.charCodeAt(s), a = this.match(l, o, this.bufferPos + this.bufferStart);
          if (s == r.length - 1) {
            if (a)
              return this.value = a, this;
            break;
          }
          o == i && s < t.length && t.charCodeAt(s) == l && o++;
        }
    }
  }
  match(e, t, i) {
    let r = null;
    for (let s = 0; s < this.matches.length; s += 2) {
      let o = this.matches[s], l = !1;
      this.query.charCodeAt(o) == e && (o == this.query.length - 1 ? r = { from: this.matches[s + 1], to: i } : (this.matches[s]++, l = !0)), l || (this.matches.splice(s, 2), s -= 2);
    }
    return this.query.charCodeAt(0) == e && (this.query.length == 1 ? r = { from: t, to: i } : this.matches.push(1, t)), r && this.test && !this.test(r.from, r.to, this.buffer, this.bufferStart) && (r = null), r;
  }
}
typeof Symbol < "u" && (fi.prototype[Symbol.iterator] = function() {
  return this;
});
const gf = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec("") }, wl = "gm" + (/x/.unicode == null ? "" : "u");
class yf {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(e, t, i, r = 0, s = e.length) {
    if (this.text = e, this.to = s, this.curLine = "", this.done = !1, this.value = gf, /\\[sWDnr]|\n|\r|\[\^/.test(t))
      return new vf(e, t, i, r, s);
    this.re = new RegExp(t, wl + (i?.ignoreCase ? "i" : "")), this.test = i?.test, this.iter = e.iter();
    let o = e.lineAt(r);
    this.curLineStart = o.from, this.matchPos = mr(e, r), this.getLine(this.curLineStart);
  }
  getLine(e) {
    this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let e = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = e;
      let t = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (t) {
        let i = this.curLineStart + t.index, r = i + t[0].length;
        if (this.matchPos = mr(this.text, r + (i == r ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < r || i > this.value.to) && (!this.test || this.test(i, r, t)))
          return this.value = { from: i, to: r, match: t }, this;
        e = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), e = 0;
      else
        return this.done = !0, this;
    }
  }
}
const gs = /* @__PURE__ */ new WeakMap();
class si {
  constructor(e, t) {
    this.from = e, this.text = t;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(e, t, i) {
    let r = gs.get(e);
    if (!r || r.from >= i || r.to <= t) {
      let l = new si(t, e.sliceString(t, i));
      return gs.set(e, l), l;
    }
    if (r.from == t && r.to == i)
      return r;
    let { text: s, from: o } = r;
    return o > t && (s = e.sliceString(t, o) + s, o = t), r.to < i && (s += e.sliceString(r.to, i)), gs.set(e, new si(o, s)), new si(t, s.slice(t - o, i - o));
  }
}
class vf {
  constructor(e, t, i, r, s) {
    this.text = e, this.to = s, this.done = !1, this.value = gf, this.matchPos = mr(e, r), this.re = new RegExp(t, wl + (i?.ignoreCase ? "i" : "")), this.test = i?.test, this.flat = si.get(e, r, this.chunkEnd(
      r + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(e) {
    return e >= this.to ? this.to : this.text.lineAt(e).to;
  }
  next() {
    for (; ; ) {
      let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
      if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
        let i = this.flat.from + t.index, r = i + t[0].length;
        if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, r, t)))
          return this.value = { from: i, to: r, match: t }, this.matchPos = mr(this.text, r + (i == r ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = si.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (yf.prototype[Symbol.iterator] = vf.prototype[Symbol.iterator] = function() {
  return this;
});
function E2(n) {
  try {
    return new RegExp(n, wl), !0;
  } catch {
    return !1;
  }
}
function mr(n, e) {
  if (e >= n.length)
    return e;
  let t = n.lineAt(e), i;
  for (; e < t.to && (i = t.text.charCodeAt(e - t.from)) >= 56320 && i < 57344; )
    e++;
  return e;
}
const L2 = (n) => {
  let { state: e } = n, t = String(e.doc.lineAt(n.state.selection.main.head).number), { close: i, result: r } = z0(n, {
    label: e.phrase("Go to line"),
    input: { type: "text", name: "line", value: t },
    focus: !0,
    submitLabel: e.phrase("go")
  });
  return r.then((s) => {
    let o = s && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(s.elements.line.value);
    if (!o) {
      n.dispatch({ effects: i });
      return;
    }
    let l = e.doc.lineAt(e.selection.main.head), [, a, h, c, f] = o, u = c ? +c.slice(1) : 0, d = h ? +h : l.number;
    if (h && f) {
      let g = d / 100;
      a && (g = g * (a == "-" ? -1 : 1) + l.number / e.doc.lines), d = Math.round(e.doc.lines * g);
    } else h && a && (d = d * (a == "-" ? -1 : 1) + l.number);
    let p = e.doc.line(Math.max(1, Math.min(e.doc.lines, d))), m = C.cursor(p.from + Math.max(0, Math.min(u, p.length)));
    n.dispatch({
      effects: [i, P.scrollIntoView(m.from, { y: "center" })],
      selection: m
    });
  }), !0;
}, P2 = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !1
}, D2 = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, P2, {
      highlightWordAroundCursor: (e, t) => e || t,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function _2(n) {
  return [N2, I2];
}
const T2 = /* @__PURE__ */ R.mark({ class: "cm-selectionMatch" }), B2 = /* @__PURE__ */ R.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function gh(n, e, t, i) {
  return (t == 0 || n(e.sliceDoc(t - 1, t)) != Y.Word) && (i == e.doc.length || n(e.sliceDoc(i, i + 1)) != Y.Word);
}
function R2(n, e, t, i) {
  return n(e.sliceDoc(t, t + 1)) == Y.Word && n(e.sliceDoc(i - 1, i)) == Y.Word;
}
const I2 = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.decorations = this.getDeco(n);
  }
  update(n) {
    (n.selectionSet || n.docChanged || n.viewportChanged) && (this.decorations = this.getDeco(n.view));
  }
  getDeco(n) {
    let e = n.state.facet(D2), { state: t } = n, i = t.selection;
    if (i.ranges.length > 1)
      return R.none;
    let r = i.main, s, o = null;
    if (r.empty) {
      if (!e.highlightWordAroundCursor)
        return R.none;
      let a = t.wordAt(r.head);
      if (!a)
        return R.none;
      o = t.charCategorizer(r.head), s = t.sliceDoc(a.from, a.to);
    } else {
      let a = r.to - r.from;
      if (a < e.minSelectionLength || a > 200)
        return R.none;
      if (e.wholeWords) {
        if (s = t.sliceDoc(r.from, r.to), o = t.charCategorizer(r.head), !(gh(o, t, r.from, r.to) && R2(o, t, r.from, r.to)))
          return R.none;
      } else if (s = t.sliceDoc(r.from, r.to), !s)
        return R.none;
    }
    let l = [];
    for (let a of n.visibleRanges) {
      let h = new fi(t.doc, s, a.from, a.to);
      for (; !h.next().done; ) {
        let { from: c, to: f } = h.value;
        if ((!o || gh(o, t, c, f)) && (r.empty && c <= r.from && f >= r.to ? l.push(B2.range(c, f)) : (c >= r.to || f <= r.from) && l.push(T2.range(c, f)), l.length > e.maxMatches))
          return R.none;
      }
    }
    return R.set(l);
  }
}, {
  decorations: (n) => n.decorations
}), N2 = /* @__PURE__ */ P.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), H2 = ({ state: n, dispatch: e }) => {
  let { selection: t } = n, i = C.create(t.ranges.map((r) => n.wordAt(r.head) || C.cursor(r.head)), t.mainIndex);
  return i.eq(t) ? !1 : (e(n.update({ selection: i })), !0);
};
function W2(n, e) {
  let { main: t, ranges: i } = n.selection, r = n.wordAt(t.head), s = r && r.from == t.from && r.to == t.to;
  for (let o = !1, l = new fi(n.doc, e, i[i.length - 1].to); ; )
    if (l.next(), l.done) {
      if (o)
        return null;
      l = new fi(n.doc, e, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
    } else {
      if (o && i.some((a) => a.from == l.value.from))
        continue;
      if (s) {
        let a = n.wordAt(l.value.from);
        if (!a || a.from != l.value.from || a.to != l.value.to)
          continue;
      }
      return l.value;
    }
}
const F2 = ({ state: n, dispatch: e }) => {
  let { ranges: t } = n.selection;
  if (t.some((s) => s.from === s.to))
    return H2({ state: n, dispatch: e });
  let i = n.sliceDoc(t[0].from, t[0].to);
  if (n.selection.ranges.some((s) => n.sliceDoc(s.from, s.to) != i))
    return !1;
  let r = W2(n, i);
  return r ? (e(n.update({
    selection: n.selection.addRange(C.range(r.from, r.to), !1),
    effects: P.scrollIntoView(r.to)
  })), !0) : !1;
}, gi = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, {
      top: !1,
      caseSensitive: !1,
      literal: !1,
      regexp: !1,
      wholeWord: !1,
      createPanel: (e) => new ev(e),
      scrollToMatch: (e) => P.scrollIntoView(e)
    });
  }
});
class bf {
  /**
  Create a query object.
  */
  constructor(e) {
    this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || E2(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
  }
  /**
  @internal
  */
  unquote(e) {
    return this.literal ? e : e.replace(/\\([nrt\\])/g, (t, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(e) {
    return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new G2(this) : new z2(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(e, t = 0, i) {
    let r = e.doc ? e : F.create({ doc: e });
    return i == null && (i = r.doc.length), this.regexp ? Qt(this, r, t, i) : Xt(this, r, t, i);
  }
}
class xf {
  constructor(e) {
    this.spec = e;
  }
}
function V2(n, e, t) {
  return (i, r, s, o) => {
    if (t && !t(i, r, s, o))
      return !1;
    let l = i >= o && r <= o + s.length ? s.slice(i - o, r - o) : e.doc.sliceString(i, r);
    return n(l, e, i, r);
  };
}
function Xt(n, e, t, i) {
  let r;
  return n.wholeWord && (r = q2(e.doc, e.charCategorizer(e.selection.main.head))), n.test && (r = V2(n.test, e, r)), new fi(e.doc, n.unquoted, t, i, n.caseSensitive ? void 0 : (s) => s.toLowerCase(), r);
}
function q2(n, e) {
  return (t, i, r, s) => ((s > t || s + r.length < i) && (s = Math.max(0, t - 2), r = n.sliceString(s, Math.min(n.length, i + 2))), (e(gr(r, t - s)) != Y.Word || e(yr(r, t - s)) != Y.Word) && (e(yr(r, i - s)) != Y.Word || e(gr(r, i - s)) != Y.Word));
}
class z2 extends xf {
  constructor(e) {
    super(e);
  }
  nextMatch(e, t, i) {
    let r = Xt(this.spec, e, i, e.doc.length).nextOverlapping();
    if (r.done) {
      let s = Math.min(e.doc.length, t + this.spec.unquoted.length);
      r = Xt(this.spec, e, 0, s).nextOverlapping();
    }
    return r.done || r.value.from == t && r.value.to == i ? null : r.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(e, t, i) {
    for (let r = i; ; ) {
      let s = Math.max(t, r - 1e4 - this.spec.unquoted.length), o = Xt(this.spec, e, s, r), l = null;
      for (; !o.nextOverlapping().done; )
        l = o.value;
      if (l)
        return l;
      if (s == t)
        return null;
      r -= 1e4;
    }
  }
  prevMatch(e, t, i) {
    let r = this.prevMatchInRange(e, 0, t);
    return r || (r = this.prevMatchInRange(e, Math.max(0, i - this.spec.unquoted.length), e.doc.length)), r && (r.from != t || r.to != i) ? r : null;
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(e, t) {
    let i = Xt(this.spec, e, 0, e.doc.length), r = [];
    for (; !i.next().done; ) {
      if (r.length >= t)
        return null;
      r.push(i.value);
    }
    return r;
  }
  highlight(e, t, i, r) {
    let s = Xt(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, e.doc.length));
    for (; !s.next().done; )
      r(s.value.from, s.value.to);
  }
}
function K2(n, e, t) {
  return (i, r, s) => (!t || t(i, r, s)) && n(s[0], e, i, r);
}
function Qt(n, e, t, i) {
  let r;
  return n.wholeWord && (r = U2(e.charCategorizer(e.selection.main.head))), n.test && (r = K2(n.test, e, r)), new yf(e.doc, n.search, { ignoreCase: !n.caseSensitive, test: r }, t, i);
}
function gr(n, e) {
  return n.slice(ne(n, e, !1), e);
}
function yr(n, e) {
  return n.slice(e, ne(n, e));
}
function U2(n) {
  return (e, t, i) => !i[0].length || (n(gr(i.input, i.index)) != Y.Word || n(yr(i.input, i.index)) != Y.Word) && (n(yr(i.input, i.index + i[0].length)) != Y.Word || n(gr(i.input, i.index + i[0].length)) != Y.Word);
}
class G2 extends xf {
  nextMatch(e, t, i) {
    let r = Qt(this.spec, e, i, e.doc.length).next();
    return r.done && (r = Qt(this.spec, e, 0, t).next()), r.done ? null : r.value;
  }
  prevMatchInRange(e, t, i) {
    for (let r = 1; ; r++) {
      let s = Math.max(
        t,
        i - r * 1e4
        /* FindPrev.ChunkSize */
      ), o = Qt(this.spec, e, s, i), l = null;
      for (; !o.next().done; )
        l = o.value;
      if (l && (s == t || l.from > s + 10))
        return l;
      if (s == t)
        return null;
    }
  }
  prevMatch(e, t, i) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, i) => {
      if (i == "&")
        return e.match[0];
      if (i == "$")
        return "$";
      for (let r = i.length; r > 0; r--) {
        let s = +i.slice(0, r);
        if (s > 0 && s < e.match.length)
          return e.match[s] + i.slice(r);
      }
      return t;
    });
  }
  matchAll(e, t) {
    let i = Qt(this.spec, e, 0, e.doc.length), r = [];
    for (; !i.next().done; ) {
      if (r.length >= t)
        return null;
      r.push(i.value);
    }
    return r;
  }
  highlight(e, t, i, r) {
    let s = Qt(this.spec, e, Math.max(
      0,
      t - 250
      /* RegExp.HighlightMargin */
    ), Math.min(i + 250, e.doc.length));
    for (; !s.next().done; )
      r(s.value.from, s.value.to);
  }
}
const Xi = /* @__PURE__ */ I.define(), Sl = /* @__PURE__ */ I.define(), wt = /* @__PURE__ */ ue.define({
  create(n) {
    return new ys(Ho(n).create(), null);
  },
  update(n, e) {
    for (let t of e.effects)
      t.is(Xi) ? n = new ys(t.value.create(), n.panel) : t.is(Sl) && (n = new ys(n.query, t.value ? kl : null));
    return n;
  },
  provide: (n) => Gi.from(n, (e) => e.panel)
});
class ys {
  constructor(e, t) {
    this.query = e, this.panel = t;
  }
}
const j2 = /* @__PURE__ */ R.mark({ class: "cm-searchMatch" }), J2 = /* @__PURE__ */ R.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), Y2 = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.decorations = this.highlight(n.state.field(wt));
  }
  update(n) {
    let e = n.state.field(wt);
    (e != n.startState.field(wt) || n.docChanged || n.selectionSet || n.viewportChanged) && (this.decorations = this.highlight(e));
  }
  highlight({ query: n, panel: e }) {
    if (!e || !n.spec.valid)
      return R.none;
    let { view: t } = this, i = new ut();
    for (let r = 0, s = t.visibleRanges, o = s.length; r < o; r++) {
      let { from: l, to: a } = s[r];
      for (; r < o - 1 && a > s[r + 1].from - 2 * 250; )
        a = s[++r].to;
      n.highlight(t.state, l, a, (h, c) => {
        let f = t.state.selection.ranges.some((u) => u.from == h && u.to == c);
        i.add(h, c, f ? J2 : j2);
      });
    }
    return i.finish();
  }
}, {
  decorations: (n) => n.decorations
});
function fn(n) {
  return (e) => {
    let t = e.state.field(wt, !1);
    return t && t.query.spec.valid ? n(e, t) : kf(e);
  };
}
const vr = /* @__PURE__ */ fn((n, { query: e }) => {
  let { to: t } = n.state.selection.main, i = e.nextMatch(n.state, t, t);
  if (!i)
    return !1;
  let r = C.single(i.from, i.to), s = n.state.facet(gi);
  return n.dispatch({
    selection: r,
    effects: [Cl(n, i), s.scrollToMatch(r.main, n)],
    userEvent: "select.search"
  }), Sf(n), !0;
}), br = /* @__PURE__ */ fn((n, { query: e }) => {
  let { state: t } = n, { from: i } = t.selection.main, r = e.prevMatch(t, i, i);
  if (!r)
    return !1;
  let s = C.single(r.from, r.to), o = n.state.facet(gi);
  return n.dispatch({
    selection: s,
    effects: [Cl(n, r), o.scrollToMatch(s.main, n)],
    userEvent: "select.search"
  }), Sf(n), !0;
}), X2 = /* @__PURE__ */ fn((n, { query: e }) => {
  let t = e.matchAll(n.state, 1e3);
  return !t || !t.length ? !1 : (n.dispatch({
    selection: C.create(t.map((i) => C.range(i.from, i.to))),
    userEvent: "select.search.matches"
  }), !0);
}), Q2 = ({ state: n, dispatch: e }) => {
  let t = n.selection;
  if (t.ranges.length > 1 || t.main.empty)
    return !1;
  let { from: i, to: r } = t.main, s = [], o = 0;
  for (let l = new fi(n.doc, n.sliceDoc(i, r)); !l.next().done; ) {
    if (s.length > 1e3)
      return !1;
    l.value.from == i && (o = s.length), s.push(C.range(l.value.from, l.value.to));
  }
  return e(n.update({
    selection: C.create(s, o),
    userEvent: "select.search.matches"
  })), !0;
}, yh = /* @__PURE__ */ fn((n, { query: e }) => {
  let { state: t } = n, { from: i, to: r } = t.selection.main;
  if (t.readOnly)
    return !1;
  let s = e.nextMatch(t, i, i);
  if (!s)
    return !1;
  let o = s, l = [], a, h, c = [];
  o.from == i && o.to == r && (h = t.toText(e.getReplacement(o)), l.push({ from: o.from, to: o.to, insert: h }), o = e.nextMatch(t, o.from, o.to), c.push(P.announce.of(t.phrase("replaced match on line $", t.doc.lineAt(i).number) + ".")));
  let f = n.state.changes(l);
  return o && (a = C.single(o.from, o.to).map(f), c.push(Cl(n, o)), c.push(t.facet(gi).scrollToMatch(a.main, n))), n.dispatch({
    changes: f,
    selection: a,
    effects: c,
    userEvent: "input.replace"
  }), !0;
}), Z2 = /* @__PURE__ */ fn((n, { query: e }) => {
  if (n.state.readOnly)
    return !1;
  let t = e.matchAll(n.state, 1e9).map((r) => {
    let { from: s, to: o } = r;
    return { from: s, to: o, insert: e.getReplacement(r) };
  });
  if (!t.length)
    return !1;
  let i = n.state.phrase("replaced $ matches", t.length) + ".";
  return n.dispatch({
    changes: t,
    effects: P.announce.of(i),
    userEvent: "input.replace.all"
  }), !0;
});
function kl(n) {
  return n.state.facet(gi).createPanel(n);
}
function Ho(n, e) {
  var t, i, r, s, o;
  let l = n.selection.main, a = l.empty || l.to > l.from + 100 ? "" : n.sliceDoc(l.from, l.to);
  if (e && !a)
    return e;
  let h = n.facet(gi);
  return new bf({
    search: ((t = e?.literal) !== null && t !== void 0 ? t : h.literal) ? a : a.replace(/\n/g, "\\n"),
    caseSensitive: (i = e?.caseSensitive) !== null && i !== void 0 ? i : h.caseSensitive,
    literal: (r = e?.literal) !== null && r !== void 0 ? r : h.literal,
    regexp: (s = e?.regexp) !== null && s !== void 0 ? s : h.regexp,
    wholeWord: (o = e?.wholeWord) !== null && o !== void 0 ? o : h.wholeWord
  });
}
function wf(n) {
  let e = ul(n, kl);
  return e && e.dom.querySelector("[main-field]");
}
function Sf(n) {
  let e = wf(n);
  e && e == n.root.activeElement && e.select();
}
const kf = (n) => {
  let e = n.state.field(wt, !1);
  if (e && e.panel) {
    let t = wf(n);
    if (t && t != n.root.activeElement) {
      let i = Ho(n.state, e.query.spec);
      i.valid && n.dispatch({ effects: Xi.of(i) }), t.focus(), t.select();
    }
  } else
    n.dispatch({ effects: [
      Sl.of(!0),
      e ? Xi.of(Ho(n.state, e.query.spec)) : I.appendConfig.of(iv)
    ] });
  return !0;
}, Cf = (n) => {
  let e = n.state.field(wt, !1);
  if (!e || !e.panel)
    return !1;
  let t = ul(n, kl);
  return t && t.dom.contains(n.root.activeElement) && n.focus(), n.dispatch({ effects: Sl.of(!1) }), !0;
}, $2 = [
  { key: "Mod-f", run: kf, scope: "editor search-panel" },
  { key: "F3", run: vr, shift: br, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: vr, shift: br, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: Cf, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: Q2 },
  { key: "Mod-Alt-g", run: L2 },
  { key: "Mod-d", run: F2, preventDefault: !0 }
];
class ev {
  constructor(e) {
    this.view = e;
    let t = this.query = e.state.field(wt).query.spec;
    this.commit = this.commit.bind(this), this.searchField = z("input", {
      value: t.search,
      placeholder: Ce(e, "Find"),
      "aria-label": Ce(e, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = z("input", {
      value: t.replace,
      placeholder: Ce(e, "Replace"),
      "aria-label": Ce(e, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = z("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: t.caseSensitive,
      onchange: this.commit
    }), this.reField = z("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: t.regexp,
      onchange: this.commit
    }), this.wordField = z("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: t.wholeWord,
      onchange: this.commit
    });
    function i(r, s, o) {
      return z("button", { class: "cm-button", name: r, onclick: s, type: "button" }, o);
    }
    this.dom = z("div", { onkeydown: (r) => this.keydown(r), class: "cm-search" }, [
      this.searchField,
      i("next", () => vr(e), [Ce(e, "next")]),
      i("prev", () => br(e), [Ce(e, "previous")]),
      i("select", () => X2(e), [Ce(e, "all")]),
      z("label", null, [this.caseField, Ce(e, "match case")]),
      z("label", null, [this.reField, Ce(e, "regexp")]),
      z("label", null, [this.wordField, Ce(e, "by word")]),
      ...e.state.readOnly ? [] : [
        z("br"),
        this.replaceField,
        i("replace", () => yh(e), [Ce(e, "replace")]),
        i("replaceAll", () => Z2(e), [Ce(e, "replace all")])
      ],
      z("button", {
        name: "close",
        onclick: () => Cf(e),
        "aria-label": Ce(e, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let e = new bf({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: Xi.of(e) }));
  }
  keydown(e) {
    t0(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? br : vr)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), yh(this.view));
  }
  update(e) {
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(Xi) && !i.value.eq(this.query) && this.setQuery(i.value);
  }
  setQuery(e) {
    this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(gi).top;
  }
}
function Ce(n, e) {
  return n.state.phrase(e);
}
const Rn = 30, In = /[\s\.,:;?!]/;
function Cl(n, { from: e, to: t }) {
  let i = n.state.doc.lineAt(e), r = n.state.doc.lineAt(t).to, s = Math.max(i.from, e - Rn), o = Math.min(r, t + Rn), l = n.state.sliceDoc(s, o);
  if (s != i.from) {
    for (let a = 0; a < Rn; a++)
      if (!In.test(l[a + 1]) && In.test(l[a])) {
        l = l.slice(a);
        break;
      }
  }
  if (o != r) {
    for (let a = l.length - 1; a > l.length - Rn; a--)
      if (!In.test(l[a - 1]) && In.test(l[a])) {
        l = l.slice(0, a);
        break;
      }
  }
  return P.announce.of(`${n.state.phrase("current match")}. ${l} ${n.state.phrase("on line")} ${i.number}.`);
}
const tv = /* @__PURE__ */ P.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), iv = [
  wt,
  /* @__PURE__ */ jt.low(Y2),
  tv
];
class Mf {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(e, t, i, r) {
    this.state = e, this.pos = t, this.explicit = i, this.view = r, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(e) {
    let t = ce(this.state).resolveInner(this.pos, -1);
    for (; t && e.indexOf(t.name) < 0; )
      t = t.parent;
    return t ? {
      from: t.from,
      to: this.pos,
      text: this.state.sliceDoc(t.from, this.pos),
      type: t.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(e) {
    let t = this.state.doc.lineAt(this.pos), i = Math.max(t.from, this.pos - 250), r = t.text.slice(i - t.from, this.pos - t.from), s = r.search(Af(e, !1));
    return s < 0 ? null : { from: i + s, to: this.pos, text: r.slice(s) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(e, t, i) {
    e == "abort" && this.abortListeners && (this.abortListeners.push(t), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function vh(n) {
  let e = Object.keys(n).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function nv(n) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: r } of n) {
    e[r[0]] = !0;
    for (let s = 1; s < r.length; s++)
      t[r[s]] = !0;
  }
  let i = vh(e) + vh(t) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function rv(n) {
  let e = n.map((r) => typeof r == "string" ? { label: r } : r), [t, i] = e.every((r) => /^\w+$/.test(r.label)) ? [/\w*$/, /\w+$/] : nv(e);
  return (r) => {
    let s = r.matchBefore(i);
    return s || r.explicit ? { from: s ? s.from : r.pos, options: e, validFor: t } : null;
  };
}
class bh {
  constructor(e, t, i, r) {
    this.completion = e, this.source = t, this.match = i, this.score = r;
  }
}
function Vt(n) {
  return n.selection.main.from;
}
function Af(n, e) {
  var t;
  let { source: i } = n, r = e && i[0] != "^", s = i[i.length - 1] != "$";
  return !r && !s ? n : new RegExp(`${r ? "^" : ""}(?:${i})${s ? "$" : ""}`, (t = n.flags) !== null && t !== void 0 ? t : n.ignoreCase ? "i" : "");
}
const Of = /* @__PURE__ */ pt.define();
function sv(n, e, t, i) {
  let { main: r } = n.selection, s = t - r.from, o = i - r.from;
  return {
    ...n.changeByRange((l) => {
      if (l != r && t != i && n.sliceDoc(l.from + s, l.from + o) != n.sliceDoc(t, i))
        return { range: l };
      let a = n.toText(e);
      return {
        changes: { from: l.from + s, to: i == r.from ? l.to : l.from + o, insert: a },
        range: C.cursor(l.from + s + a.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const xh = /* @__PURE__ */ new WeakMap();
function ov(n) {
  if (!Array.isArray(n))
    return n;
  let e = xh.get(n);
  return e || xh.set(n, e = rv(n)), e;
}
const xr = /* @__PURE__ */ I.define(), Qi = /* @__PURE__ */ I.define();
class lv {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let i = ye(e, t), r = Qe(i);
      this.chars.push(i);
      let s = e.slice(t, t + r), o = s.toUpperCase();
      this.folded.push(ye(o == s ? s.toLowerCase() : o, 0)), t += r;
    }
    this.astral = e.length != this.chars.length;
  }
  ret(e, t) {
    return this.score = e, this.matched = t, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(e) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (e.length < this.pattern.length)
      return null;
    let { chars: t, folded: i, any: r, precise: s, byWord: o } = this;
    if (t.length == 1) {
      let v = ye(e, 0), w = Qe(v), b = w == e.length ? 0 : -100;
      if (v != t[0]) if (v == i[0])
        b += -200;
      else
        return null;
      return this.ret(b, [0, w]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let v = 0, w = Math.min(e.length, 200); v < w && h < a; ) {
        let b = ye(e, v);
        (b == t[h] || b == i[h]) && (r[h++] = v), v += Qe(b);
      }
      if (h < a)
        return null;
    }
    let c = 0, f = 0, u = !1, d = 0, p = -1, m = -1, g = /[a-z]/.test(e), y = !0;
    for (let v = 0, w = Math.min(e.length, 200), b = 0; v < w && f < a; ) {
      let x = ye(e, v);
      l < 0 && (c < a && x == t[c] && (s[c++] = v), d < a && (x == t[d] || x == i[d] ? (d == 0 && (p = v), m = v + 1, d++) : d = 0));
      let k, S = x < 255 ? x >= 48 && x <= 57 || x >= 97 && x <= 122 ? 2 : x >= 65 && x <= 90 ? 1 : 0 : (k = Go(x)) != k.toLowerCase() ? 1 : k != k.toUpperCase() ? 2 : 0;
      (!v || S == 1 && g || b == 0 && S != 0) && (t[f] == x || i[f] == x && (u = !0) ? o[f++] = v : o.length && (y = !1)), b = S, v += Qe(x);
    }
    return f == a && o[0] == 0 && y ? this.result(-100 + (u ? -200 : 0), o, e) : d == a && p == 0 ? this.ret(-200 - e.length + (m == e.length ? 0 : -100), [0, m]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : d == a ? this.ret(-900 - e.length, [p, m]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (y ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((r[0] ? -700 : 0) + -200 + -1100, r, e);
  }
  result(e, t, i) {
    let r = [], s = 0;
    for (let o of t) {
      let l = o + (this.astral ? Qe(ye(i, o)) : 1);
      s && r[s - 1] == o ? r[s - 1] = l : (r[s++] = o, r[s++] = l);
    }
    return this.ret(e - i.length, r);
  }
}
class av {
  constructor(e) {
    this.pattern = e, this.matched = [], this.score = 0, this.folded = e.toLowerCase();
  }
  match(e) {
    if (e.length < this.pattern.length)
      return null;
    let t = e.slice(0, this.pattern.length), i = t == this.pattern ? 0 : t.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, t.length], this.score = i + (e.length == this.pattern.length ? 0 : -100), this);
  }
}
const ie = /* @__PURE__ */ L.define({
  combine(n) {
    return rt(n, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: hv,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (i) => wh(e(i), t(i)),
      optionClass: (e, t) => (i) => wh(e(i), t(i)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function wh(n, e) {
  return n ? e ? n + " " + e : n : e;
}
function hv(n, e, t, i, r, s) {
  let o = n.textDirection == U.RTL, l = o, a = !1, h = "top", c, f, u = e.left - r.left, d = r.right - e.right, p = i.right - i.left, m = i.bottom - i.top;
  if (l && u < Math.min(p, d) ? l = !1 : !l && d < Math.min(p, u) && (l = !0), p <= (l ? u : d))
    c = Math.max(r.top, Math.min(t.top, r.bottom - m)) - e.top, f = Math.min(400, l ? u : d);
  else {
    a = !0, f = Math.min(
      400,
      (o ? e.right : r.right - e.left) - 30
      /* Info.Margin */
    );
    let v = r.bottom - e.bottom;
    v >= m || v > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let g = (e.bottom - e.top) / s.offsetHeight, y = (e.right - e.left) / s.offsetWidth;
  return {
    style: `${h}: ${c / g}px; max-width: ${f / y}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
const Ml = /* @__PURE__ */ I.define();
function cv(n) {
  let e = n.addToOptions.slice();
  return n.icons && e.push({
    render(t) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), t.type && i.classList.add(...t.type.split(/\s+/g).map((r) => "cm-completionIcon-" + r)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), e.push({
    render(t, i, r, s) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let l = t.displayLabel || t.label, a = 0;
      for (let h = 0; h < s.length; ) {
        let c = s[h++], f = s[h++];
        c > a && o.appendChild(document.createTextNode(l.slice(a, c)));
        let u = o.appendChild(document.createElement("span"));
        u.appendChild(document.createTextNode(l.slice(c, f))), u.className = "cm-completionMatchedText", a = f;
      }
      return a < l.length && o.appendChild(document.createTextNode(l.slice(a))), o;
    },
    position: 50
  }, {
    render(t) {
      if (!t.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = t.detail, i;
    },
    position: 80
  }), e.sort((t, i) => t.position - i.position).map((t) => t.render);
}
function vs(n, e, t) {
  if (n <= t)
    return { from: 0, to: n };
  if (e < 0 && (e = 0), e <= n >> 1) {
    let r = Math.floor(e / t);
    return { from: r * t, to: (r + 1) * t };
  }
  let i = Math.floor((n - e) / t);
  return { from: n - (i + 1) * t, to: n - i * t };
}
class uv {
  constructor(e, t, i) {
    this.view = e, this.stateField = t, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let r = e.state.field(t), { options: s, selected: o } = r.open, l = e.state.facet(ie);
    this.optionContent = cv(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = vs(s.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: h } = e.state.field(t).open;
      for (let c = a.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
      if (a.target == this.list) {
        let c = this.list.classList.contains("cm-completionListIncompleteTop") && a.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && a.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
        c != null && (e.dispatch({ effects: Ml.of(c) }), a.preventDefault());
      }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(ie).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: Qi.of(null) });
    }), this.showOptions(s, r.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(e, t) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(e, t, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(e) {
    var t;
    let i = e.state.field(this.stateField), r = e.startState.field(this.stateField);
    if (this.updateTooltipClass(e.state), i != r) {
      let { options: s, selected: o, disabled: l } = i.open;
      (!r.open || r.open.options != s) && (this.range = vs(s.length, o, e.state.facet(ie).maxRenderedOptions), this.showOptions(s, i.id)), this.updateSel(), l != ((t = r.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
    }
  }
  updateTooltipClass(e) {
    let t = this.tooltipClass(e);
    if (t != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of t.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = t;
    }
  }
  positioned(e) {
    this.space = e, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let e = this.view.state.field(this.stateField), t = e.open;
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = vs(t.options.length, t.selected, this.view.state.facet(ie).maxRenderedOptions), this.showOptions(t.options, e.id));
    let i = this.updateSelectedOption(t.selected);
    if (i) {
      this.destroyInfo();
      let { completion: r } = t.options[t.selected], { info: s } = r;
      if (!s)
        return;
      let o = typeof s == "string" ? document.createTextNode(s) : s(r);
      if (!o)
        return;
      "then" in o ? o.then((l) => {
        l && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(l, r);
      }).catch((l) => xe(this.view.state, l, "completion info")) : (this.addInfoPane(o, r), i.setAttribute("aria-describedby", this.info.id));
    }
  }
  addInfoPane(e, t) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", i.id = "cm-completionInfo-" + Math.floor(Math.random() * 65535).toString(16), e.nodeType != null)
      i.appendChild(e), this.infoDestroy = null;
    else {
      let { dom: r, destroy: s } = e;
      i.appendChild(r), this.infoDestroy = s || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(e) {
    let t = null;
    for (let i = this.list.firstChild, r = this.range.from; i; i = i.nextSibling, r++)
      i.nodeName != "LI" || !i.id ? r-- : r == e ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), t = i) : i.hasAttribute("aria-selected") && (i.removeAttribute("aria-selected"), i.removeAttribute("aria-describedby"));
    return t && dv(this.list, t), t;
  }
  measureInfo() {
    let e = this.dom.querySelector("[aria-selected]");
    if (!e || !this.info)
      return null;
    let t = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), r = e.getBoundingClientRect(), s = this.space;
    if (!s) {
      let o = this.dom.ownerDocument.documentElement;
      s = { left: 0, top: 0, right: o.clientWidth, bottom: o.clientHeight };
    }
    return r.top > Math.min(s.bottom, t.bottom) - 10 || r.bottom < Math.max(s.top, t.top) + 10 ? null : this.view.state.facet(ie).positionInfo(this.view, t, r, i, s, this.dom);
  }
  placeInfo(e) {
    this.info && (e ? (e.style && (this.info.style.cssText = e.style), this.info.className = "cm-tooltip cm-completionInfo " + (e.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(e, t, i) {
    const r = document.createElement("ul");
    r.id = t, r.setAttribute("role", "listbox"), r.setAttribute("aria-expanded", "true"), r.setAttribute("aria-label", this.view.state.phrase("Completions")), r.addEventListener("mousedown", (o) => {
      o.target == r && o.preventDefault();
    });
    let s = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: l, match: a } = e[o], { section: h } = l;
      if (h) {
        let u = typeof h == "string" ? h : h.name;
        if (u != s && (o > i.from || i.from == 0))
          if (s = u, typeof h != "string" && h.header)
            r.appendChild(h.header(h));
          else {
            let d = r.appendChild(document.createElement("completion-section"));
            d.textContent = u;
          }
      }
      const c = r.appendChild(document.createElement("li"));
      c.id = t + "-" + o, c.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (c.className = f);
      for (let u of this.optionContent) {
        let d = u(l, this.view.state, this.view, a);
        d && c.appendChild(d);
      }
    }
    return i.from && r.classList.add("cm-completionListIncompleteTop"), i.to < e.length && r.classList.add("cm-completionListIncompleteBottom"), r;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function fv(n, e) {
  return (t) => new uv(t, n, e);
}
function dv(n, e) {
  let t = n.getBoundingClientRect(), i = e.getBoundingClientRect(), r = t.height / n.offsetHeight;
  i.top < t.top ? n.scrollTop -= (t.top - i.top) / r : i.bottom > t.bottom && (n.scrollTop += (i.bottom - t.bottom) / r);
}
function Sh(n) {
  return (n.boost || 0) * 100 + (n.apply ? 10 : 0) + (n.info ? 5 : 0) + (n.type ? 1 : 0);
}
function pv(n, e) {
  let t = [], i = null, r = null, s = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      i || (i = []);
      let u = typeof f == "string" ? f : f.name;
      i.some((d) => d.name == u) || i.push(typeof f == "string" ? { name: u } : f);
    }
  }, o = e.facet(ie);
  for (let c of n)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let u of c.result.options)
          s(new bh(u, c.source, f ? f(u) : [], 1e9 - t.length));
      else {
        let u = e.sliceDoc(c.from, c.to), d, p = o.filterStrict ? new av(u) : new lv(u);
        for (let m of c.result.options)
          if (d = p.match(m.label)) {
            let g = m.displayLabel ? f ? f(m, d.matched) : [] : d.matched, y = d.score + (m.boost || 0);
            if (s(new bh(m, c.source, g, y)), typeof m.section == "object" && m.section.rank === "dynamic") {
              let { name: v } = m.section;
              r || (r = /* @__PURE__ */ Object.create(null)), r[v] = Math.max(y, r[v] || -1e9);
            }
          }
      }
    }
  if (i) {
    let c = /* @__PURE__ */ Object.create(null), f = 0, u = (d, p) => (d.rank === "dynamic" && p.rank === "dynamic" ? r[p.name] - r[d.name] : 0) || (typeof d.rank == "number" ? d.rank : 1e9) - (typeof p.rank == "number" ? p.rank : 1e9) || (d.name < p.name ? -1 : 1);
    for (let d of i.sort(u))
      f -= 1e5, c[d.name] = f;
    for (let d of t) {
      let { section: p } = d.completion;
      p && (d.score += c[typeof p == "string" ? p : p.name]);
    }
  }
  let l = [], a = null, h = o.compareCompletions;
  for (let c of t.sort((f, u) => u.score - f.score || h(f.completion, u.completion))) {
    let f = c.completion;
    !a || a.label != f.label || a.detail != f.detail || a.type != null && f.type != null && a.type != f.type || a.apply != f.apply || a.boost != f.boost ? l.push(c) : Sh(c.completion) > Sh(a) && (l[l.length - 1] = c), a = c.completion;
  }
  return l;
}
class ei {
  constructor(e, t, i, r, s, o) {
    this.options = e, this.attrs = t, this.tooltip = i, this.timestamp = r, this.selected = s, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new ei(this.options, kh(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, i, r, s, o) {
    if (r && !o && e.some((h) => h.isPending))
      return r.setDisabled();
    let l = pv(e, t);
    if (!l.length)
      return r && e.some((h) => h.isPending) ? r.setDisabled() : null;
    let a = t.facet(ie).selectOnOpen ? 0 : -1;
    if (r && r.selected != a && r.selected != -1) {
      let h = r.options[r.selected].completion;
      for (let c = 0; c < l.length; c++)
        if (l[c].completion == h) {
          a = c;
          break;
        }
    }
    return new ei(l, kh(i, a), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: xv,
      above: s.aboveCursor
    }, r ? r.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new ei(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new ei(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class wr {
  constructor(e, t, i) {
    this.active = e, this.id = t, this.open = i;
  }
  static start() {
    return new wr(vv, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, i = t.facet(ie), s = (i.override || t.languageDataAt("autocomplete", Vt(t)).map(ov)).map((a) => (this.active.find((c) => c.source == a) || new _e(
      a,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, i));
    s.length == this.active.length && s.every((a, h) => a == this.active[h]) && (s = this.active);
    let o = this.open, l = e.effects.some((a) => a.is(Al));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || s.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !mv(s, this.active) || l ? o = ei.build(s, t, this.id, o, i, l) : o && o.disabled && !s.some((a) => a.isPending) && (o = null), !o && s.every((a) => !a.isPending) && s.some((a) => a.hasResult()) && (s = s.map((a) => a.hasResult() ? new _e(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(Ml) && (o = o && o.setSelected(a.value, this.id));
    return s == this.active && o == this.open ? this : new wr(s, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? gv : yv;
  }
}
function mv(n, e) {
  if (n == e)
    return !0;
  for (let t = 0, i = 0; ; ) {
    for (; t < n.length && !n[t].hasResult(); )
      t++;
    for (; i < e.length && !e[i].hasResult(); )
      i++;
    let r = t == n.length, s = i == e.length;
    if (r || s)
      return r == s;
    if (n[t++].result != e[i++].result)
      return !1;
  }
}
const gv = {
  "aria-autocomplete": "list"
}, yv = {};
function kh(n, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": n
  };
  return e > -1 && (t["aria-activedescendant"] = n + "-" + e), t;
}
const vv = [];
function Ef(n, e) {
  if (n.isUserEvent("input.complete")) {
    let i = n.annotation(Of);
    if (i && e.activateOnCompletion(i))
      return 12;
  }
  let t = n.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : n.isUserEvent("delete.backward") ? 2 : n.selection ? 8 : n.docChanged ? 16 : 0;
}
class _e {
  constructor(e, t, i = !1) {
    this.source = e, this.state = t, this.explicit = i;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(e, t) {
    let i = Ef(e, t), r = this;
    (i & 8 || i & 16 && this.touches(e)) && (r = new _e(
      r.source,
      0
      /* State.Inactive */
    )), i & 4 && r.state == 0 && (r = new _e(
      this.source,
      1
      /* State.Pending */
    )), r = r.updateFor(e, i);
    for (let s of e.effects)
      if (s.is(xr))
        r = new _e(r.source, 1, s.value);
      else if (s.is(Qi))
        r = new _e(
          r.source,
          0
          /* State.Inactive */
        );
      else if (s.is(Al))
        for (let o of s.value)
          o.source == r.source && (r = o);
    return r;
  }
  updateFor(e, t) {
    return this.map(e.changes);
  }
  map(e) {
    return this;
  }
  touches(e) {
    return e.changes.touchesRange(Vt(e.state));
  }
}
class oi extends _e {
  constructor(e, t, i, r, s, o) {
    super(e, 3, t), this.limit = i, this.result = r, this.from = s, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(e, t) {
    var i;
    if (!(t & 3))
      return this.map(e.changes);
    let r = this.result;
    r.map && !e.changes.empty && (r = r.map(r, e.changes));
    let s = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = Vt(e.state);
    if (l > o || !r || t & 2 && (Vt(e.startState) == this.from || l < this.limit))
      return new _e(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return bv(r.validFor, e.state, s, o) ? new oi(this.source, this.explicit, a, r, s, o) : r.update && (r = r.update(r, s, o, new Mf(e.state, l, !1))) ? new oi(this.source, this.explicit, a, r, r.from, (i = r.to) !== null && i !== void 0 ? i : Vt(e.state)) : new _e(this.source, 1, this.explicit);
  }
  map(e) {
    return e.empty ? this : (this.result.map ? this.result.map(this.result, e) : this.result) ? new oi(this.source, this.explicit, e.mapPos(this.limit), this.result, e.mapPos(this.from), e.mapPos(this.to, 1)) : new _e(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function bv(n, e, t, i) {
  if (!n)
    return !1;
  let r = e.sliceDoc(t, i);
  return typeof n == "function" ? n(r, t, i, e) : Af(n, !0).test(r);
}
const Al = /* @__PURE__ */ I.define({
  map(n, e) {
    return n.map((t) => t.map(e));
  }
}), ve = /* @__PURE__ */ ue.define({
  create() {
    return wr.start();
  },
  update(n, e) {
    return n.update(e);
  },
  provide: (n) => [
    cl.from(n, (e) => e.tooltip),
    P.contentAttributes.from(n, (e) => e.attrs)
  ]
});
function Ol(n, e) {
  const t = e.completion.apply || e.completion.label;
  let i = n.state.field(ve).active.find((r) => r.source == e.source);
  return i instanceof oi ? (typeof t == "string" ? n.dispatch({
    ...sv(n.state, t, i.from, i.to),
    annotations: Of.of(e.completion)
  }) : t(n, e.completion, i.from, i.to), !0) : !1;
}
const xv = /* @__PURE__ */ fv(ve, Ol);
function Nn(n, e = "option") {
  return (t) => {
    let i = t.state.field(ve, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < t.state.facet(ie).interactionDelay)
      return !1;
    let r = 1, s;
    e == "page" && (s = pu(t, i.open.tooltip)) && (r = Math.max(2, Math.floor(s.dom.offsetHeight / s.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, l = i.open.selected > -1 ? i.open.selected + r * (n ? 1 : -1) : n ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: Ml.of(l) }), !0;
  };
}
const wv = (n) => {
  let e = n.state.field(ve, !1);
  return n.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < n.state.facet(ie).interactionDelay ? !1 : Ol(n, e.open.options[e.open.selected]);
}, bs = (n) => n.state.field(ve, !1) ? (n.dispatch({ effects: xr.of(!0) }), !0) : !1, Sv = (n) => {
  let e = n.state.field(ve, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (n.dispatch({ effects: Qi.of(null) }), !0);
};
class kv {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const Cv = 50, Mv = 1e3, Av = /* @__PURE__ */ $.fromClass(class {
  constructor(n) {
    this.view = n, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of n.state.field(ve).active)
      e.isPending && this.startQuery(e);
  }
  update(n) {
    let e = n.state.field(ve), t = n.state.facet(ie);
    if (!n.selectionSet && !n.docChanged && n.startState.field(ve) == e)
      return;
    let i = n.transactions.some((s) => {
      let o = Ef(s, t);
      return o & 8 || (s.selection || s.docChanged) && !(o & 3);
    });
    for (let s = 0; s < this.running.length; s++) {
      let o = this.running[s];
      if (i || o.context.abortOnDocChange && n.docChanged || o.updates.length + n.transactions.length > Cv && Date.now() - o.time > Mv) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            xe(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(s--, 1);
      } else
        o.updates.push(...n.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), n.transactions.some((s) => s.effects.some((o) => o.is(xr))) && (this.pendingStart = !0);
    let r = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((s) => s.isPending && !this.running.some((o) => o.active.source == s.source)) ? setTimeout(() => this.startUpdate(), r) : -1, this.composing != 0)
      for (let s of n.transactions)
        s.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && s.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: n } = this.view, e = n.field(ve);
    for (let t of e.active)
      t.isPending && !this.running.some((i) => i.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(ie).updateSyncTime));
  }
  startQuery(n) {
    let { state: e } = this.view, t = Vt(e), i = new Mf(e, t, n.explicit, this.view), r = new kv(n, i);
    this.running.push(r), Promise.resolve(n.source(i)).then((s) => {
      r.context.aborted || (r.done = s || null, this.scheduleAccept());
    }, (s) => {
      this.view.dispatch({ effects: Qi.of(null) }), xe(this.view.state, s);
    });
  }
  scheduleAccept() {
    this.running.every((n) => n.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(ie).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var n;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(ie), i = this.view.state.field(ve);
    for (let r = 0; r < this.running.length; r++) {
      let s = this.running[r];
      if (s.done === void 0)
        continue;
      if (this.running.splice(r--, 1), s.done) {
        let l = Vt(s.updates.length ? s.updates[0].startState : this.view.state), a = Math.min(l, s.done.from + (s.active.explicit ? 0 : 1)), h = new oi(s.active.source, s.active.explicit, a, s.done, s.done.from, (n = s.done.to) !== null && n !== void 0 ? n : l);
        for (let c of s.updates)
          h = h.update(c, t);
        if (h.hasResult()) {
          e.push(h);
          continue;
        }
      }
      let o = i.active.find((l) => l.source == s.active.source);
      if (o && o.isPending)
        if (s.done == null) {
          let l = new _e(
            s.active.source,
            0
            /* State.Inactive */
          );
          for (let a of s.updates)
            l = l.update(a, t);
          l.isPending || e.push(l);
        } else
          this.startQuery(o);
    }
    (e.length || i.open && i.open.disabled) && this.view.dispatch({ effects: Al.of(e) });
  }
}, {
  eventHandlers: {
    blur(n) {
      let e = this.view.state.field(ve, !1);
      if (e && e.tooltip && this.view.state.facet(ie).closeOnBlur) {
        let t = e.open && pu(this.view, e.open.tooltip);
        (!t || !t.dom.contains(n.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: Qi.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: xr.of(!1) }), 20), this.composing = 0;
    }
  }
}), Ov = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), Ev = /* @__PURE__ */ jt.highest(/* @__PURE__ */ P.domEventHandlers({
  keydown(n, e) {
    let t = e.state.field(ve, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || n.key.length > 1 || n.ctrlKey && !(Ov && n.altKey) || n.metaKey)
      return !1;
    let i = t.open.options[t.open.selected], r = t.active.find((o) => o.source == i.source), s = i.completion.commitCharacters || r.result.commitCharacters;
    return s && s.indexOf(n.key) > -1 && Ol(e, i), !1;
  }
})), Lv = /* @__PURE__ */ P.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
}), Zi = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, Wt = /* @__PURE__ */ I.define({
  map(n, e) {
    let t = e.mapPos(n, -1, me.TrackAfter);
    return t ?? void 0;
  }
}), El = /* @__PURE__ */ new class extends St {
}();
El.startSide = 1;
El.endSide = -1;
const Lf = /* @__PURE__ */ ue.define({
  create() {
    return N.empty;
  },
  update(n, e) {
    if (n = n.map(e.changes), e.selection) {
      let t = e.state.doc.lineAt(e.selection.main.head);
      n = n.update({ filter: (i) => i >= t.from && i <= t.to });
    }
    for (let t of e.effects)
      t.is(Wt) && (n = n.update({ add: [El.range(t.value, t.value + 1)] }));
    return n;
  }
});
function Pv() {
  return [_v, Lf];
}
const xs = "()[]{}<>«»»«［］｛｝";
function Pf(n) {
  for (let e = 0; e < xs.length; e += 2)
    if (xs.charCodeAt(e) == n)
      return xs.charAt(e + 1);
  return Go(n < 128 ? n : n + 1);
}
function Df(n, e) {
  return n.languageDataAt("closeBrackets", e)[0] || Zi;
}
const Dv = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), _v = /* @__PURE__ */ P.inputHandler.of((n, e, t, i) => {
  if ((Dv ? n.composing : n.compositionStarted) || n.state.readOnly)
    return !1;
  let r = n.state.selection.main;
  if (i.length > 2 || i.length == 2 && Qe(ye(i, 0)) == 1 || e != r.from || t != r.to)
    return !1;
  let s = Rv(n.state, i);
  return s ? (n.dispatch(s), !0) : !1;
}), Tv = ({ state: n, dispatch: e }) => {
  if (n.readOnly)
    return !1;
  let i = Df(n, n.selection.main.head).brackets || Zi.brackets, r = null, s = n.changeByRange((o) => {
    if (o.empty) {
      let l = Iv(n.doc, o.head);
      for (let a of i)
        if (a == l && Ir(n.doc, o.head) == Pf(ye(a, 0)))
          return {
            changes: { from: o.head - a.length, to: o.head + a.length },
            range: C.cursor(o.head - a.length)
          };
    }
    return { range: r = o };
  });
  return r || e(n.update(s, { scrollIntoView: !0, userEvent: "delete.backward" })), !r;
}, Bv = [
  { key: "Backspace", run: Tv }
];
function Rv(n, e) {
  let t = Df(n, n.selection.main.head), i = t.brackets || Zi.brackets;
  for (let r of i) {
    let s = Pf(ye(r, 0));
    if (e == r)
      return s == r ? Wv(n, r, i.indexOf(r + r + r) > -1, t) : Nv(n, r, s, t.before || Zi.before);
    if (e == s && _f(n, n.selection.main.from))
      return Hv(n, r, s);
  }
  return null;
}
function _f(n, e) {
  let t = !1;
  return n.field(Lf).between(0, n.doc.length, (i) => {
    i == e && (t = !0);
  }), t;
}
function Ir(n, e) {
  let t = n.sliceString(e, e + 2);
  return t.slice(0, Qe(ye(t, 0)));
}
function Iv(n, e) {
  let t = n.sliceString(e - 2, e);
  return Qe(ye(t, 0)) == t.length ? t : t.slice(1);
}
function Nv(n, e, t, i) {
  let r = null, s = n.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: e, from: o.from }, { insert: t, from: o.to }],
        effects: Wt.of(o.to + e.length),
        range: C.range(o.anchor + e.length, o.head + e.length)
      };
    let l = Ir(n.doc, o.head);
    return !l || /\s/.test(l) || i.indexOf(l) > -1 ? {
      changes: { insert: e + t, from: o.head },
      effects: Wt.of(o.head + e.length),
      range: C.cursor(o.head + e.length)
    } : { range: r = o };
  });
  return r ? null : n.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Hv(n, e, t) {
  let i = null, r = n.changeByRange((s) => s.empty && Ir(n.doc, s.head) == t ? {
    changes: { from: s.head, to: s.head + t.length, insert: t },
    range: C.cursor(s.head + t.length)
  } : i = { range: s });
  return i ? null : n.update(r, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Wv(n, e, t, i) {
  let r = i.stringPrefixes || Zi.stringPrefixes, s = null, o = n.changeByRange((l) => {
    if (!l.empty)
      return {
        changes: [{ insert: e, from: l.from }, { insert: e, from: l.to }],
        effects: Wt.of(l.to + e.length),
        range: C.range(l.anchor + e.length, l.head + e.length)
      };
    let a = l.head, h = Ir(n.doc, a), c;
    if (h == e) {
      if (Ch(n, a))
        return {
          changes: { insert: e + e, from: a },
          effects: Wt.of(a + e.length),
          range: C.cursor(a + e.length)
        };
      if (_f(n, a)) {
        let u = t && n.sliceDoc(a, a + e.length * 3) == e + e + e ? e + e + e : e;
        return {
          changes: { from: a, to: a + u.length, insert: u },
          range: C.cursor(a + u.length)
        };
      }
    } else {
      if (t && n.sliceDoc(a - 2 * e.length, a) == e + e && (c = Mh(n, a - 2 * e.length, r)) > -1 && Ch(n, c))
        return {
          changes: { insert: e + e + e + e, from: a },
          effects: Wt.of(a + e.length),
          range: C.cursor(a + e.length)
        };
      if (n.charCategorizer(a)(h) != Y.Word && Mh(n, a, r) > -1 && !Fv(n, a, e, r))
        return {
          changes: { insert: e + e, from: a },
          effects: Wt.of(a + e.length),
          range: C.cursor(a + e.length)
        };
    }
    return { range: s = l };
  });
  return s ? null : n.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Ch(n, e) {
  let t = ce(n).resolveInner(e + 1);
  return t.parent && t.from == e;
}
function Fv(n, e, t, i) {
  let r = ce(n).resolveInner(e, -1), s = i.reduce((o, l) => Math.max(o, l.length), 0);
  for (let o = 0; o < 5; o++) {
    let l = n.sliceDoc(r.from, Math.min(r.to, r.from + t.length + s)), a = l.indexOf(t);
    if (!a || a > -1 && i.indexOf(l.slice(0, a)) > -1) {
      let c = r.firstChild;
      for (; c && c.from == r.from && c.to - c.from > t.length + a; ) {
        if (n.sliceDoc(c.to - t.length, c.to) == t)
          return !1;
        c = c.firstChild;
      }
      return !0;
    }
    let h = r.to == e && r.parent;
    if (!h)
      break;
    r = h;
  }
  return !1;
}
function Mh(n, e, t) {
  let i = n.charCategorizer(e);
  if (i(n.sliceDoc(e - 1, e)) != Y.Word)
    return e;
  for (let r of t) {
    let s = e - r.length;
    if (n.sliceDoc(s, e) == r && i(n.sliceDoc(s - 1, s)) != Y.Word)
      return s;
  }
  return -1;
}
function Vv(n = {}) {
  return [
    Ev,
    ve,
    ie.of(n),
    Av,
    qv,
    Lv
  ];
}
const Tf = [
  { key: "Ctrl-Space", run: bs },
  { mac: "Alt-`", run: bs },
  { mac: "Alt-i", run: bs },
  { key: "Escape", run: Sv },
  { key: "ArrowDown", run: /* @__PURE__ */ Nn(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ Nn(!1) },
  { key: "PageDown", run: /* @__PURE__ */ Nn(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ Nn(!1, "page") },
  { key: "Enter", run: wv }
], qv = /* @__PURE__ */ jt.highest(/* @__PURE__ */ al.computeN([ie], (n) => n.facet(ie).defaultKeymap ? [Tf] : []));
class Ah {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.diagnostic = i;
  }
}
class It {
  constructor(e, t, i) {
    this.diagnostics = e, this.panel = t, this.selected = i;
  }
  static init(e, t, i) {
    let r = i.facet($i).markerFilter;
    r && (e = r(e, i));
    let s = e.slice().sort((d, p) => d.from - p.from || d.to - p.to), o = new ut(), l = [], a = 0, h = i.doc.iter(), c = 0, f = i.doc.length;
    for (let d = 0; ; ) {
      let p = d == s.length ? null : s[d];
      if (!p && !l.length)
        break;
      let m, g;
      if (l.length)
        m = a, g = l.reduce((w, b) => Math.min(w, b.to), p && p.from > m ? p.from : 1e8);
      else {
        if (m = p.from, m > f)
          break;
        g = p.to, l.push(p), d++;
      }
      for (; d < s.length; ) {
        let w = s[d];
        if (w.from == m && (w.to > w.from || w.to == m))
          l.push(w), d++, g = Math.min(w.to, g);
        else {
          g = Math.min(w.from, g);
          break;
        }
      }
      g = Math.min(g, f);
      let y = !1;
      if (l.some((w) => w.from == m && (w.to == g || g == f)) && (y = m == g, !y && g - m < 10)) {
        let w = m - (c + h.value.length);
        w > 0 && (h.next(w), c = m);
        for (let b = m; ; ) {
          if (b >= g) {
            y = !0;
            break;
          }
          if (!h.lineBreak && c + h.value.length > b)
            break;
          b = c + h.value.length, c += h.value.length, h.next();
        }
      }
      let v = tb(l);
      if (y)
        o.add(m, m, R.widget({
          widget: new Qv(v),
          diagnostics: l.slice()
        }));
      else {
        let w = l.reduce((b, x) => x.markClass ? b + " " + x.markClass : b, "");
        o.add(m, g, R.mark({
          class: "cm-lintRange cm-lintRange-" + v + w,
          diagnostics: l.slice(),
          inclusiveEnd: l.some((b) => b.to > g)
        }));
      }
      if (a = g, a == f)
        break;
      for (let w = 0; w < l.length; w++)
        l[w].to <= a && l.splice(w--, 1);
    }
    let u = o.finish();
    return new It(u, t, Et(u));
  }
}
function Et(n, e = null, t = 0) {
  let i = null;
  return n.between(t, 1e9, (r, s, { spec: o }) => {
    if (!(e && o.diagnostics.indexOf(e) < 0))
      if (!i)
        i = new Ah(r, s, e || o.diagnostics[0]);
      else {
        if (o.diagnostics.indexOf(i.diagnostic) < 0)
          return !1;
        i = new Ah(i.from, s, i.diagnostic);
      }
  }), i;
}
function zv(n, e) {
  let t = e.pos, i = e.end || t, r = n.state.facet($i).hideOn(n, t, i);
  if (r != null)
    return r;
  let s = n.startState.doc.lineAt(e.pos);
  return !!(n.effects.some((o) => o.is(Bf)) || n.changes.touchesRange(s.from, Math.max(s.to, i)));
}
function Kv(n, e) {
  return n.field(Ae, !1) ? e : e.concat(I.appendConfig.of(ib));
}
const Bf = /* @__PURE__ */ I.define(), Ll = /* @__PURE__ */ I.define(), Rf = /* @__PURE__ */ I.define(), Ae = /* @__PURE__ */ ue.define({
  create() {
    return new It(R.none, null, null);
  },
  update(n, e) {
    if (e.docChanged && n.diagnostics.size) {
      let t = n.diagnostics.map(e.changes), i = null, r = n.panel;
      if (n.selected) {
        let s = e.changes.mapPos(n.selected.from, 1);
        i = Et(t, n.selected.diagnostic, s) || Et(t, null, s);
      }
      !t.size && r && e.state.facet($i).autoPanel && (r = null), n = new It(t, r, i);
    }
    for (let t of e.effects)
      if (t.is(Bf)) {
        let i = e.state.facet($i).autoPanel ? t.value.length ? en.open : null : n.panel;
        n = It.init(t.value, i, e.state);
      } else t.is(Ll) ? n = new It(n.diagnostics, t.value ? en.open : null, n.selected) : t.is(Rf) && (n = new It(n.diagnostics, n.panel, t.value));
    return n;
  },
  provide: (n) => [
    Gi.from(n, (e) => e.panel),
    P.decorations.from(n, (e) => e.diagnostics)
  ]
}), Uv = /* @__PURE__ */ R.mark({ class: "cm-lintRange cm-lintRange-active" });
function Gv(n, e, t) {
  let { diagnostics: i } = n.state.field(Ae), r, s = -1, o = -1;
  i.between(e - (t < 0 ? 1 : 0), e + (t > 0 ? 1 : 0), (a, h, { spec: c }) => {
    if (e >= a && e <= h && (a == h || (e > a || t > 0) && (e < h || t < 0)))
      return r = c.diagnostics, s = a, o = h, !1;
  });
  let l = n.state.facet($i).tooltipFilter;
  return r && l && (r = l(r, n.state)), r ? {
    pos: s,
    end: o,
    above: n.state.doc.lineAt(s).to < o,
    create() {
      return { dom: jv(n, r) };
    }
  } : null;
}
function jv(n, e) {
  return z("ul", { class: "cm-tooltip-lint" }, e.map((t) => Nf(n, t, !1)));
}
const Jv = (n) => {
  let e = n.state.field(Ae, !1);
  (!e || !e.panel) && n.dispatch({ effects: Kv(n.state, [Ll.of(!0)]) });
  let t = ul(n, en.open);
  return t && t.dom.querySelector(".cm-panel-lint ul").focus(), !0;
}, Oh = (n) => {
  let e = n.state.field(Ae, !1);
  return !e || !e.panel ? !1 : (n.dispatch({ effects: Ll.of(!1) }), !0);
}, Yv = (n) => {
  let e = n.state.field(Ae, !1);
  if (!e)
    return !1;
  let t = n.state.selection.main, i = Et(e.diagnostics, null, t.to + 1);
  return !i && (i = Et(e.diagnostics, null, 0), !i || i.from == t.from && i.to == t.to) ? !1 : (n.dispatch({ selection: { anchor: i.from, head: i.to }, scrollIntoView: !0 }), !0);
}, Xv = [
  { key: "Mod-Shift-m", run: Jv, preventDefault: !0 },
  { key: "F8", run: Yv }
], $i = /* @__PURE__ */ L.define({
  combine(n) {
    return {
      sources: n.map((e) => e.source).filter((e) => e != null),
      ...rt(n.map((e) => e.config), {
        delay: 750,
        markerFilter: null,
        tooltipFilter: null,
        needsRefresh: null,
        hideOn: () => null
      }, {
        delay: Math.max,
        markerFilter: Eh,
        tooltipFilter: Eh,
        needsRefresh: (e, t) => e ? t ? (i) => e(i) || t(i) : e : t,
        hideOn: (e, t) => e ? t ? (i, r, s) => e(i, r, s) || t(i, r, s) : e : t,
        autoPanel: (e, t) => e || t
      })
    };
  }
});
function Eh(n, e) {
  return n ? e ? (t, i) => e(n(t, i), i) : n : e;
}
function If(n) {
  let e = [];
  if (n)
    e: for (let { name: t } of n) {
      for (let i = 0; i < t.length; i++) {
        let r = t[i];
        if (/[a-zA-Z]/.test(r) && !e.some((s) => s.toLowerCase() == r.toLowerCase())) {
          e.push(r);
          continue e;
        }
      }
      e.push("");
    }
  return e;
}
function Nf(n, e, t) {
  var i;
  let r = t ? If(e.actions) : [];
  return z("li", { class: "cm-diagnostic cm-diagnostic-" + e.severity }, z("span", { class: "cm-diagnosticText" }, e.renderMessage ? e.renderMessage(n) : e.message), (i = e.actions) === null || i === void 0 ? void 0 : i.map((s, o) => {
    let l = !1, a = (d) => {
      if (d.preventDefault(), l)
        return;
      l = !0;
      let p = Et(n.state.field(Ae).diagnostics, e);
      p && s.apply(n, p.from, p.to);
    }, { name: h } = s, c = r[o] ? h.indexOf(r[o]) : -1, f = c < 0 ? h : [
      h.slice(0, c),
      z("u", h.slice(c, c + 1)),
      h.slice(c + 1)
    ], u = s.markClass ? " " + s.markClass : "";
    return z("button", {
      type: "button",
      class: "cm-diagnosticAction" + u,
      onclick: a,
      onmousedown: a,
      "aria-label": ` Action: ${h}${c < 0 ? "" : ` (access key "${r[o]})"`}.`
    }, f);
  }), e.source && z("div", { class: "cm-diagnosticSource" }, e.source));
}
class Qv extends mt {
  constructor(e) {
    super(), this.sev = e;
  }
  eq(e) {
    return e.sev == this.sev;
  }
  toDOM() {
    return z("span", { class: "cm-lintPoint cm-lintPoint-" + this.sev });
  }
}
class Lh {
  constructor(e, t) {
    this.diagnostic = t, this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16), this.dom = Nf(e, t, !0), this.dom.id = this.id, this.dom.setAttribute("role", "option");
  }
}
class en {
  constructor(e) {
    this.view = e, this.items = [];
    let t = (r) => {
      if (!(r.ctrlKey || r.altKey || r.metaKey)) {
        if (r.keyCode == 27)
          Oh(this.view), this.view.focus();
        else if (r.keyCode == 38 || r.keyCode == 33)
          this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
        else if (r.keyCode == 40 || r.keyCode == 34)
          this.moveSelection((this.selectedIndex + 1) % this.items.length);
        else if (r.keyCode == 36)
          this.moveSelection(0);
        else if (r.keyCode == 35)
          this.moveSelection(this.items.length - 1);
        else if (r.keyCode == 13)
          this.view.focus();
        else if (r.keyCode >= 65 && r.keyCode <= 90 && this.selectedIndex >= 0) {
          let { diagnostic: s } = this.items[this.selectedIndex], o = If(s.actions);
          for (let l = 0; l < o.length; l++)
            if (o[l].toUpperCase().charCodeAt(0) == r.keyCode) {
              let a = Et(this.view.state.field(Ae).diagnostics, s);
              a && s.actions[l].apply(e, a.from, a.to);
            }
        } else
          return;
        r.preventDefault();
      }
    }, i = (r) => {
      for (let s = 0; s < this.items.length; s++)
        this.items[s].dom.contains(r.target) && this.moveSelection(s);
    };
    this.list = z("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown: t,
      onclick: i
    }), this.dom = z("div", { class: "cm-panel-lint" }, this.list, z("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => Oh(this.view)
    }, "×")), this.update();
  }
  get selectedIndex() {
    let e = this.view.state.field(Ae).selected;
    if (!e)
      return -1;
    for (let t = 0; t < this.items.length; t++)
      if (this.items[t].diagnostic == e.diagnostic)
        return t;
    return -1;
  }
  update() {
    let { diagnostics: e, selected: t } = this.view.state.field(Ae), i = 0, r = !1, s = null, o = /* @__PURE__ */ new Set();
    for (e.between(0, this.view.state.doc.length, (l, a, { spec: h }) => {
      for (let c of h.diagnostics) {
        if (o.has(c))
          continue;
        o.add(c);
        let f = -1, u;
        for (let d = i; d < this.items.length; d++)
          if (this.items[d].diagnostic == c) {
            f = d;
            break;
          }
        f < 0 ? (u = new Lh(this.view, c), this.items.splice(i, 0, u), r = !0) : (u = this.items[f], f > i && (this.items.splice(i, f - i), r = !0)), t && u.diagnostic == t.diagnostic ? u.dom.hasAttribute("aria-selected") || (u.dom.setAttribute("aria-selected", "true"), s = u) : u.dom.hasAttribute("aria-selected") && u.dom.removeAttribute("aria-selected"), i++;
      }
    }); i < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0); )
      r = !0, this.items.pop();
    this.items.length == 0 && (this.items.push(new Lh(this.view, {
      from: -1,
      to: -1,
      severity: "info",
      message: this.view.state.phrase("No diagnostics")
    })), r = !0), s ? (this.list.setAttribute("aria-activedescendant", s.id), this.view.requestMeasure({
      key: this,
      read: () => ({ sel: s.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
      write: ({ sel: l, panel: a }) => {
        let h = a.height / this.list.offsetHeight;
        l.top < a.top ? this.list.scrollTop -= (a.top - l.top) / h : l.bottom > a.bottom && (this.list.scrollTop += (l.bottom - a.bottom) / h);
      }
    })) : this.selectedIndex < 0 && this.list.removeAttribute("aria-activedescendant"), r && this.sync();
  }
  sync() {
    let e = this.list.firstChild;
    function t() {
      let i = e;
      e = i.nextSibling, i.remove();
    }
    for (let i of this.items)
      if (i.dom.parentNode == this.list) {
        for (; e != i.dom; )
          t();
        e = i.dom.nextSibling;
      } else
        this.list.insertBefore(i.dom, e);
    for (; e; )
      t();
  }
  moveSelection(e) {
    if (this.selectedIndex < 0)
      return;
    let t = this.view.state.field(Ae), i = Et(t.diagnostics, this.items[e].diagnostic);
    i && this.view.dispatch({
      selection: { anchor: i.from, head: i.to },
      scrollIntoView: !0,
      effects: Rf.of(i)
    });
  }
  static open(e) {
    return new en(e);
  }
}
function Zv(n, e = 'viewBox="0 0 40 40"') {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(n)}</svg>')`;
}
function Hn(n) {
  return Zv(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${n}" fill="none" stroke-width=".7"/>`, 'width="6" height="3"');
}
const $v = /* @__PURE__ */ P.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: /* @__PURE__ */ Hn("#d11") },
  ".cm-lintRange-warning": { backgroundImage: /* @__PURE__ */ Hn("orange") },
  ".cm-lintRange-info": { backgroundImage: /* @__PURE__ */ Hn("#999") },
  ".cm-lintRange-hint": { backgroundImage: /* @__PURE__ */ Hn("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  },
  "&dark .cm-lintRange-active": { backgroundColor: "#86714a80" },
  "&dark .cm-panel.cm-panel-lint ul": {
    "& [aria-selected]": {
      backgroundColor: "#2e343e"
    }
  }
});
function eb(n) {
  return n == "error" ? 4 : n == "warning" ? 3 : n == "info" ? 2 : 1;
}
function tb(n) {
  let e = "hint", t = 1;
  for (let i of n) {
    let r = eb(i.severity);
    r > t && (t = r, e = i.severity);
  }
  return e;
}
const ib = [
  Ae,
  /* @__PURE__ */ P.decorations.compute([Ae], (n) => {
    let { selected: e, panel: t } = n.field(Ae);
    return !e || !t || e.from == e.to ? R.none : R.set([
      Uv.range(e.from, e.to)
    ]);
  }),
  /* @__PURE__ */ V0(Gv, { hideOn: zv }),
  $v
], nb = [
  e1(),
  n1(),
  v0(),
  ky(),
  Y1(),
  l0(),
  f0(),
  F.allowMultipleSelections.of(!0),
  R1(),
  Q1(ey, { fallback: !0 }),
  ly(),
  Pv(),
  Vv(),
  P0(),
  T0(),
  C0(),
  _2(),
  al.of([
    ...Bv,
    ...O2,
    ...$2,
    ..._y,
    ...U1,
    ...Tf,
    ...Xv
  ])
];
class Ph {
  /**
   * @param {HTMLElement} parentElement 
   * @param {string} initialContent 
   * @param {Function} onChangeCallback 
   */
  constructor(e, t = "", i = null) {
    this.onChange = i;
    const r = F.create({
      doc: t,
      extensions: [
        nb,
        // Lắng nghe sự thay đổi của document
        P.updateListener.of((s) => {
          s.docChanged && this.onChange && this.onChange(s.state.doc.toString());
        })
      ]
    });
    this.view = new P({
      state: r,
      parent: e
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
  setContent(e) {
    const t = this.view.state.update({
      changes: { from: 0, to: this.view.state.doc.length, insert: e }
    });
    this.view.dispatch(t);
  }
  /**
   * Focus vào editor
   */
  focus() {
    this.view.focus();
  }
}
class rb {
  /**
   * @param {HTMLElement} parentElement 
   */
  constructor(e) {
    this.parentElement = e, this.generator = new Jp();
  }
  /**
   * Renders SVG preview from Typst template and JSON Data.
   * @param {string} template 
   * @param {Object} data 
   */
  async renderPreview(e, t = {}) {
    try {
      this.generator.loadBlueprint({ typstTemplate: e });
      const i = await this.generator.generateSVG(t);
      this.parentElement.innerHTML = i, this.parentElement.querySelectorAll("svg").forEach((s) => {
        s.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)", s.style.marginBottom = "20px", s.style.backgroundColor = "#fff";
      });
    } catch (i) {
      console.error("MasaxTypst: Preview Render Error:", i), this.parentElement.innerHTML = `
                <div style="color: #721c24; background-color: #f8d7da; padding: 1rem; border: 1px solid #f5c6cb; border-radius: 4px; font-family: sans-serif;">
                    <strong>Error rendering preview:</strong><br/>
                    <pre style="white-space: pre-wrap; margin-top: 10px;">${i.message}</pre>
                </div>
            `;
    }
  }
}
class lb {
  /**
   * @param {HTMLElement} containerElement 
   * @param {Object} options Options: { initialTemplate, initialData }
   */
  constructor(e, t = {}) {
    this.container = e, this.data = t.initialData || {}, this.template = t.initialTemplate || `#set page(width: "a4", height: "a4")

= Hello World
`, this._setupDOM(), this._setupConsole(), this.preview = new rb(this.previewContainer);
    let i;
    const r = JSON.stringify(this.data, null, 2);
    this.jsonEditor = new Ph(this.jsonEditorContainer, r, (o) => {
      clearTimeout(i), i = setTimeout(() => {
        try {
          this.data = JSON.parse(o), this.preview.renderPreview(this.template, this.data);
        } catch (l) {
          console.error("MasaxTypst: Invalid JSON format", l.message);
        }
      }, 500);
    });
    let s;
    this.typstEditor = new Ph(this.typstEditorContainer, this.template, (o) => {
      this.template = o, clearTimeout(s), s = setTimeout(() => {
        this.preview.renderPreview(o, this.data);
      }, 500);
    }), this.preview.renderPreview(this.template, this.data);
  }
  _setupConsole() {
    const e = console.log, t = console.warn, i = console.error, r = console.info, s = (o, l) => {
      const a = document.createElement("div");
      a.style.padding = "4px 8px", a.style.borderBottom = "1px solid #ddd", a.style.fontFamily = "monospace", a.style.fontSize = "12px", a.style.wordBreak = "break-all", o === "error" ? (a.style.color = "#721c24", a.style.backgroundColor = "#f8d7da") : o === "warn" ? (a.style.color = "#856404", a.style.backgroundColor = "#fff3cd") : o === "info" ? (a.style.color = "#004085", a.style.backgroundColor = "#cce5ff") : a.style.color = "#333";
      const h = (c) => {
        if (typeof c == "object")
          try {
            return JSON.stringify(c);
          } catch {
            return Object.prototype.toString.call(c);
          }
        return String(c);
      };
      a.textContent = `[${o.toUpperCase()}] ` + Array.from(l).map(h).join(" "), this.consoleContainer.appendChild(a), this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight;
    };
    console.log = (...o) => {
      e.apply(console, o), s("log", o);
    }, console.warn = (...o) => {
      t.apply(console, o), s("warn", o);
    }, console.error = (...o) => {
      i.apply(console, o), s("error", o);
    }, console.info = (...o) => {
      r.apply(console, o), s("info", o);
    };
  }
  _setupDOM() {
    this.container.style.display = "flex", this.container.style.width = "100%", this.container.style.height = "100vh", this.container.style.fontFamily = "system-ui, -apple-system, sans-serif", this.container.style.overflow = "hidden", this.leftPane = document.createElement("div"), this.leftPane.style.flex = "1", this.leftPane.style.display = "flex", this.leftPane.style.flexDirection = "column", this.leftPane.style.borderRight = "1px solid #ddd", this.typstEditorContainer = document.createElement("div"), this.typstEditorContainer.style.flex = "1", this.typstEditorContainer.style.overflow = "auto", this.typstEditorContainer.style.borderBottom = "1px solid #ddd", this.typstEditorContainer.style.position = "relative";
    const e = document.createElement("div");
    e.textContent = "Typst Code", e.style.padding = "4px 8px", e.style.background = "#f8f9fa", e.style.fontSize = "12px", e.style.fontWeight = "bold", e.style.borderBottom = "1px solid #ddd", e.style.position = "sticky", e.style.top = "0", e.style.zIndex = "10", this.typstEditorContainer.appendChild(e), this.jsonEditorContainer = document.createElement("div"), this.jsonEditorContainer.style.flex = "1", this.jsonEditorContainer.style.overflow = "auto", this.jsonEditorContainer.style.position = "relative";
    const t = document.createElement("div");
    t.textContent = "JSON Data", t.style.padding = "4px 8px", t.style.background = "#f8f9fa", t.style.fontSize = "12px", t.style.fontWeight = "bold", t.style.borderBottom = "1px solid #ddd", t.style.position = "sticky", t.style.top = "0", t.style.zIndex = "10", this.jsonEditorContainer.appendChild(t), this.leftPane.appendChild(this.typstEditorContainer), this.leftPane.appendChild(this.jsonEditorContainer), this.rightPane = document.createElement("div"), this.rightPane.style.flex = "1", this.rightPane.style.display = "flex", this.rightPane.style.flexDirection = "column", this.previewContainerWrapper = document.createElement("div"), this.previewContainerWrapper.style.flex = "2", this.previewContainerWrapper.style.overflow = "auto", this.previewContainerWrapper.style.backgroundColor = "#f5f5f5", this.previewContainerWrapper.style.borderBottom = "1px solid #ddd", this.previewContainer = document.createElement("div"), this.previewContainer.style.padding = "40px 20px", this.previewContainer.style.display = "flex", this.previewContainer.style.flexDirection = "column", this.previewContainer.style.alignItems = "center", this.previewContainerWrapper.appendChild(this.previewContainer), this.consoleContainer = document.createElement("div"), this.consoleContainer.style.flex = "1", this.consoleContainer.style.overflow = "auto", this.consoleContainer.style.backgroundColor = "#fafafa", this.consoleContainer.style.position = "relative";
    const i = document.createElement("div");
    i.textContent = "Console Realtime", i.style.padding = "4px 8px", i.style.background = "#e9ecef", i.style.fontSize = "12px", i.style.fontWeight = "bold", i.style.borderBottom = "1px solid #ddd", i.style.position = "sticky", i.style.top = "0", this.consoleContainer.appendChild(i), this.rightPane.appendChild(this.previewContainerWrapper), this.rightPane.appendChild(this.consoleContainer), this.container.appendChild(this.leftPane), this.container.appendChild(this.rightPane);
  }
  /**
   * Update data JSON and re-render
   * @param {Object} newData 
   */
  updateData(e) {
    this.data = e, this.jsonEditor.setContent(JSON.stringify(this.data, null, 2)), this.preview.renderPreview(this.typstEditor.getContent(), this.data);
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
  loadBlueprint(e) {
    e.typstTemplate && (this.template = e.typstTemplate, this.typstEditor.setContent(this.template)), e.data ? this.updateData(e.data) : this.preview.renderPreview(this.template, this.data);
  }
}
export {
  Jp as MasaxTypstPDF,
  lb as MasaxWorkspace,
  Vp as TemplateResolver,
  Ph as TypstEditor,
  rb as TypstPreview,
  jl as defaultResolver,
  Jh as initCompiler
};

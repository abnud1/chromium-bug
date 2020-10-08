try {
  self["workbox:window:5.1.2"] && _();
} catch (t) {}
function t(t, s) {
  return new Promise((i) => {
    const e = new MessageChannel();
    (e.port1.onmessage = (t) => {
      i(t.data);
    }),
      t.postMessage(s, [e.port2]);
  });
}
try {
  self["workbox:core:5.1.2"] && _();
} catch (t) {}
class s {
  constructor() {
    this.promise = new Promise((t, s) => {
      (this.resolve = t), (this.reject = s);
    });
  }
}
function i(t, s) {
  const { href: i } = location;
  return new URL(t, i).href === new URL(s, i).href;
}
class e {
  constructor(t, s) {
    (this.type = t), Object.assign(this, s);
  }
}
class h extends class {
  constructor() {
    this.t = new Map();
  }
  addEventListener(t, s) {
    this.s(t).add(s);
  }
  removeEventListener(t, s) {
    this.s(t).delete(s);
  }
  dispatchEvent(t) {
    t.target = this;
    const s = this.s(t.type);
    for (const i of s) i(t);
  }
  s(t) {
    return this.t.has(t) || this.t.set(t, new Set()), this.t.get(t);
  }
} {
  constructor(t, h = {}) {
    super(),
      (this.i = {}),
      (this.h = 0),
      (this.o = new s()),
      (this.g = new s()),
      (this.l = new s()),
      (this.u = 0),
      (this.v = new Set()),
      (this.m = () => {
        const t = this.p,
          s = t.installing;
        this.h > 0 ||
        !i(s.scriptURL, this.S) ||
        performance.now() > this.u + 6e4
          ? ((this.L = s), t.removeEventListener("updatefound", this.m))
          : ((this._ = s), this.v.add(s), this.o.resolve(s)),
          ++this.h,
          s.addEventListener("statechange", this.P);
      }),
      (this.P = (t) => {
        const s = this.p,
          i = t.target,
          { state: h } = i,
          n = i === this.L,
          a = n ? "external" : "",
          r = { sw: i, originalEvent: t };
        !n && this.W && (r.isUpdate = !0),
          this.dispatchEvent(new e(a + h, r)),
          "installed" === h
            ? (this.B = self.setTimeout(() => {
                "installed" === h &&
                  s.waiting === i &&
                  this.dispatchEvent(new e(a + "waiting", r));
              }, 200))
            : "activating" === h &&
              (clearTimeout(this.B), n || this.g.resolve(i));
      }),
      (this.C = (t) => {
        const s = this._;
        s === navigator.serviceWorker.controller &&
          (this.dispatchEvent(
            new e("controlling", { sw: s, originalEvent: t, isUpdate: this.W })
          ),
          this.l.resolve(s));
      }),
      (this.R = async (t) => {
        const { data: s, source: i } = t;
        await this.getSW(),
          this.v.has(i) &&
            this.dispatchEvent(
              new e("message", { data: s, sw: i, originalEvent: t })
            );
      }),
      (this.S = t),
      (this.i = h),
      navigator.serviceWorker.addEventListener("message", this.R);
  }
  async register({ immediate: t = !1 } = {}) {
    t ||
      "complete" === document.readyState ||
      (await new Promise((t) => window.addEventListener("load", t))),
      (this.W = Boolean(navigator.serviceWorker.controller)),
      (this.U = this.M()),
      (this.p = await this.T()),
      this.U &&
        ((this._ = this.U),
        this.g.resolve(this.U),
        this.l.resolve(this.U),
        this.U.addEventListener("statechange", this.P, { once: !0 }));
    const s = this.p.waiting;
    return (
      s &&
        i(s.scriptURL, this.S) &&
        ((this._ = s),
        Promise.resolve()
          .then(() => {
            this.dispatchEvent(
              new e("waiting", { sw: s, wasWaitingBeforeRegister: !0 })
            );
          })
          .then(() => {})),
      this._ && (this.o.resolve(this._), this.v.add(this._)),
      this.p.addEventListener("updatefound", this.m),
      navigator.serviceWorker.addEventListener("controllerchange", this.C, {
        once: !0,
      }),
      this.p
    );
  }
  async update() {
    this.p && (await this.p.update());
  }
  get active() {
    return this.g.promise;
  }
  get controlling() {
    return this.l.promise;
  }
  async getSW() {
    return void 0 !== this._ ? this._ : this.o.promise;
  }
  async messageSW(s) {
    return t(await this.getSW(), s);
  }
  M() {
    const t = navigator.serviceWorker.controller;
    return t && i(t.scriptURL, this.S) ? t : void 0;
  }
  async T() {
    try {
      const t = await navigator.serviceWorker.register(this.S, this.i);
      return (this.u = performance.now()), t;
    } catch (t) {
      throw t;
    }
  }
}
export { h as Workbox, t as messageSW };
//# sourceMappingURL=workbox-window.prod.mjs.map

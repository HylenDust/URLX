let e = !1;
e = "undefined" == typeof window || "undefined" == typeof document, e && console.warn();
let t = () => {
    if (e) throw new Error("You are using Node.js, this function does not work in Node.js! Sorry!")
};
const r = (e, t, r = !0) => {
    if (!r) return;
    let n = "Missing parameter";
    throw e && (n += " of type " + e), t && (n = `Parameter ${t} ${e?`(${e})`:""} required.`), new Error(n)
};
export let count = (e = r("array", "array")) => e.reduce(((e, t) => (e[t] = (e[t] || 0) + 1, e)), {});
export let arrayDiff = (e = r("array", "array 1"), t = r("array", "array 2")) => {
    for (var n = [], o = [], a = 0; a < e.length; a++) n[e[a]] = !0;
    for (a = 0; a < t.length; a++) n[t[a]] ? delete n[t[a]] : n[t[a]] = !0;
    for (var i in n) o.push(i);
    return o
};
export let diff = function(e = r("string", "Text 1"), t = r("string", "Text 2")) {
    for (var n = [], o = undefined, a = 0; a < e.length; a++) e[a] != t[a] && o == undefined && (o = [a]), o != undefined && e[a] == t[a] && (o.push(a), n.push(o), o = undefined);
    return o != undefined && (o.push(a), n.push(o)), n
};
export let remove = (e = r("array", "array"), t = r(undefined, "item")) => "string" == typeof e ? e.replace(t, "") : "object" == typeof e ? (e[`${t}`] = undefined, e = _$.clone(e, (e => e !== undefined))) : (e.indexOf(t) > -1 && e.splice(e.indexOf(t), 1), e);
export let spliceArrayBuffer = (e = r("ArrayBuffer"), t = r("number"), n = r("number"), o = !1) => {
    var a = o ? -1 : 1;
    o && ([t, n] = [n, t]), t = Math.floor(t), n = Math.floor(n) + a;
    for (var i = t, l = 0; i != n; i += a) l = 256 * l + e[i];
    return l
};
export let flatten = (e = r("array", "array"), t = 1) => {
    var n = e;
    return _$.each(t, (() => {
        n = [].concat.apply([], e)
    })), n
};
export let nFlatten = (e = r("array", "array")) => e.reduce((function(e, t) {
    return e.concat(Array.isArray(t) ? flatten(t) : t)
}), []);
export let contains = (e = r("array"), t = r("string")) => e.includes(t);
export let shuffleArray = (e = r("array")) => e.sort((() => Math.random() - .5));
export let splice = (e = r("array", "array"), t = r("number", "index"), n = 0, o) => {
    let a = Array.from(arguments);
    return a.shift(), "string" == typeof e ? e.split("").splice(...a).join("") : e.splice(...a)
};
export let unionArrays = (e = r("array", "array1"), t = r("array", "array2")) => {
    for (var n = {}, o = e.length - 1; o >= 0; --o) n[e[o]] = e[o];
    for (o = t.length - 1; o >= 0; --o) n[t[o]] = t[o];
    var a = [];
    for (var i in n) n.hasOwnProperty(i) && a.push(n[i]);
    return a
};
export let averageBy = (e = r("array", "array"), t = r("function", "callback")) => e.map("function" == typeof t ? t : e => e[t]).reduce(((e, t) => e + t), 0) / e.length;
export let uniqueArray = (e = r("array", "array")) => [...new Set(e)];
export let each = (e = r("Array|Number|String", "array"), t = r("function", "callback")) => {
    e = "number" == typeof e ? _$.range(1, e) : "string" == typeof e ? e.split("") : e;
    for (let r = 0; r < e.length; r++) t(e[r], r, e)
};
export let rgbToHex = (e = r("string", "RGB color")) => {
    let t = e.indexOf(",") > -1 ? "," : " ",
        n = (+(e = e.substr(4).split(")")[0].split(t))[0]).toString(16),
        o = (+e[1]).toString(16),
        a = (+e[2]).toString(16);
    return 1 === n.length && (n = "0" + n), 1 === o.length && (o = "0" + o), 1 === a.length && (a = "0" + a), "#" + n + o + a
};
export let hexToRGB = (e = r("string", "hex color")) => {
    if ((e.length - 1 != 6 && e.length - 1 != 8 && e.length - 1 != 4 && e.length - 1 != 3 || !e.startsWith("#")) && (6 !== e.length && 8 !== e.length && 4 !== e.length && 3 !== e.length || e.startsWith("#"))) throw new Error("Invalid hex");
    let t = !1,
        n = e.slice(e.startsWith("#") ? 1 : 0);
    return 3 === n.length ? n = [...n].map((e => e + e)).join("") : 8 === n.length && (t = !0), n = parseInt(n, 16), "rgb" + (t ? "a" : "") + "(" + (n >>> (t ? 24 : 16)) + ", " + ((n & (t ? 16711680 : 65280)) >>> (t ? 16 : 8)) + ", " + ((n & (t ? 65280 : 255)) >>> (t ? 8 : 0)) + (t ? ", " + (255 & n) : "") + ")"
};
export let blendColors = (e = r("string", "color 1"), t = r("string", "color 2"), n = 50) => {
    const o = (e, t, r) => e + r / 100 * (t - e),
        a = parseInt(`${e[1]}${e[2]}`, 16),
        i = parseInt(`${e[3]}${e[4]}`, 16),
        l = parseInt(`${e[5]}${e[6]}`, 16),
        s = parseInt(`${t[1]}${t[2]}`, 16),
        c = parseInt(`${t[3]}${t[4]}`, 16),
        u = parseInt(`${t[5]}${t[6]}`, 16);
    return ((e, t, r) => {
        let n = e.toString(16),
            o = t.toString(16),
            a = r.toString(16);
        for (; n.length < 2;) n = `0${n}`;
        for (; o.length < 2;) o = `0${o}`;
        for (; a.length < 2;) a = `0${a}`;
        return `#${n}${o}${a}`
    })(Math.round(o(a, s, n)), Math.round(o(i, c, n)), Math.round(o(l, u, n)))
};
export let randomColor = () => `#${Math.floor(16777215*Math.random()).toString(16)}`;
export let lightenColor = (e = r("string", "hex color"), t = r("number", "amount")) => {
    var n = !1;
    "#" == e[0] && (e = e.slice(1), n = !0);
    var o = parseInt(e, 16),
        a = (o >> 16) + t;
    a > 255 ? a = 255 : a < 0 && (a = 0);
    var i = (o >> 8 & 255) + t;
    i > 255 ? i = 255 : i < 0 && (i = 0);
    var l = (255 & o) + t;
    return l > 255 ? l = 255 : l < 0 && (l = 0), (n ? "#" : "") + (l | i << 8 | a << 16).toString(16)
};
export let lightOrDark = (e = r("string", "hex or RGB color")) => {
    var t, n, o, a;
    return e.match(/^rgb/) ? (t = (e = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/))[1], n = e[2], o = e[3]) : (t = (e = +("0x" + e.slice(1).replace(e.length < 5 && /./g, "$&$&"))) >> 16, n = e >> 8 & 255, o = 255 & e), (a = Math.sqrt(t * t * .299 + n * n * .587 + o * o * .114)) > 127.5 ? {
        lightOrDark: "light",
        hsp: a
    } : {
        lightOrDark: "dark",
        hsp: a
    }
};
export let dayName = (e = new Date, t = "en-US") => e.toLocaleDateString(t, {
    weekday: "long"
});
export let formatMilliseconds = (e = r("number", "milliseconds")) => {
    (e = "string" == typeof e ? +e : e) < 0 && (e = -e);
    const t = {
        century: Math.floor(e / 11448e8),
        year: Math.floor(e / 22896e6) % 50,
        day: Math.floor(e / 864e5) % 365,
        hour: Math.floor(e / 36e5) % 24,
        minute: Math.floor(e / 6e4) % 60,
        second: Math.floor(e / 1e3) % 60,
        millisecond: Math.floor(e) % 1e3
    };
    return Object.entries(t).filter((e => 0 !== e[1])).map((([e, t]) => `${t} ${e}${1!==t?"s":""}`)).join(", ")
};
export let addMinutesToDate = (e = r("date", "date or date string"), t = r("number", "minutes")) => {
    const n = new Date(e);
    return n.setTime(n.getTime() + 6e4 * t), n.toISOString().split(".")[0].replace("T", " ")
};
export let isDateValid = (...e) => (r("any", "date arguments", ![...e].length), !Number.isNaN(new Date(...e).valueOf()));
export let addDaysToDate = (e = r("date", "date or date string"), t = r("number", "days")) => {
    const n = new Date(e);
    return n.setDate(n.getDate() + t), n.toISOString().split("T")[0]
};
export let ripple = (e = r("element", "element")) => {
    t();
    const n = 3 * (+e.getAttribute("data-time") || 1e3),
        o = e.getAttribute("data-color") || "currentColor",
        a = e.getAttribute("data-opacity") || ".3",
        i = e.getAttribute("data-event") || "click";
    e.style.overflow = "hidden", e.style.position = "relative", e.addEventListener(i, (t => {
        var r = document.createElement("DIV");
        r.style.position = "absolute", r.style.background = `${o}`, r.style.borderRadius = "50%";
        var i, l = e.getBoundingClientRect();
        i = l.width > l.height ? 3 * l.width : 3 * l.height, r.style.pointerEvents = "none", r.style.height = `${i}px`, r.style.width = `${i}px`, r.style.transform = "translate(-50%, -50%) scale(0)", r.style.top = t.pageY - (l.top + window.scrollY) + "px", r.style.left = t.pageX - (l.left + window.scrollX) + "px", r.style.transition = `opacity ${n}ms ease, transform ${n}ms ease`, r.removeAttribute("data-ripple"), r.style.opacity = a, e.appendChild(r), setTimeout((() => {
            r.style.transform = "translate(-50%, -50%) scale(1)", r.style.opacity = "0", setTimeout((() => {
                r.remove()
            }), n)
        }), 1)
    }))
};
export function elementReady(e = r("string", "query selector"), n = document.documentElement) {
    return t(), new Promise(((t, r) => {
        const o = n.querySelector(e);
        o && t(o), new MutationObserver(((r, o) => {
            Array.from(n.querySelectorAll(e)).forEach((e => {
                t(e), o.disconnect()
            }))
        })).observe(n, {
            childList: !0,
            subtree: !0
        })
    }))
}
export let elementContains = (e = r("HTMLElement", "parent"), n = r("HTMLElement", "child")) => (t(), e !== n && e.contains(n));
export let parents = (e = r("element")) => (t(), [... function*(e) {
    for (; e = e.parentNode;) yield e
}(e)]);
export let getImages = (e = document.documentElement, r = !1) => {
    t();
    const n = [...e.getElementsByTagName("img")].map((e => e.getAttribute("src")));
    return r ? n : [...new Set(n)]
};
export let renderElement = ({
    type: e,
    props: n = {}
} = r("object", "options"), o = r("HTMLElement", "container")) => {
    t();
    const a = !e,
        i = a ? document.createTextNode("") : document.createElement(e),
        l = e => e.startsWith("on");
    Object.keys(n).forEach((e => {
        (e => !l(e) && "children" !== e)(e) && (i[e] = n[e]), !a && l(e) && i.addEventListener(e.toLowerCase().slice(2), n[e])
    })), !a && n.children && n.children.length && n.children.forEach((e => renderElement(e, i))), o.appendChild(i)
};
export function create(e = "div", ...t) {
    i();
    let r = e.match(/^[a-z0-9]+/i),
        n = e.match(/#([a-z]+[a-z0-9-]*)/gi),
        o = e.match(/\.([a-z]+[a-z0-9-]*)/gi),
        a = e.match(/\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi),
        i = r ? r[0] : "div";
    if (n && n.length > 1) throw new Error("only 1 ID is allowed");
    const l = document.createElement(i);
    if (n && (l.id = n[0].replace("#", "")), o) {
        const e = o.join(" ").replace(/\./g, "");
        l.setAttribute("class", e)
    }
    return a && a.forEach((e => {
        e = e.slice(0, -1).slice(1);
        let [t, r] = e.split("=");
        r && (r = r.replace(/^['"](.*)['"]$/, "$1")), l.setAttribute(t, r || "")
    })), t.forEach((e => {
        "string" == typeof e || "number" == typeof e ? l.appendChild(document.createTextNode(e)) : e.nodeType === document.ELEMENT_NODE && l.appendChild(e)
    })), l
}
export let context = () => {
    t();
    var e = document.createElement("UL");
    e.id = "contextMenu", document.body.appendChild(e);
    let r = document.createElement("STYLE");
    r.innerHTML = "#contextMenu {\n       pointer-events: none;\n       padding: 0;\n       opacity: 0;\n       transition: opacity .3s ease;\n       position: fixed;\n       padding-top: 3px;\n       padding-bottom: 3px;\n       max-height: 200px;\n       overflow-y: scroll;\n       overflow-x: hidden;\n       list-style: none;\n       z-index: 10000;\n       background: white;\n       color: #333;\n       font-family: sans-serif;\n       border-radius: 5px;\n       box-shadow: 2px 2px 5px #0004;\n       width: fit-content;\n       min-width: 50px;\n       max-width: 150px;\n     }\n     #contextMenu li {\n       transition: background-color .3s ease;\n       display: block;\n       min-width: 150px;\n       margin: 0;\n       padding: 10px;\n     }\n     #contextMenu li:hover {\n       background-color: #ddd;\n       cursor: pointer;\n     }\n     ", document.body.appendChild(r);
    var n = document.querySelectorAll("[contextmenu]");
    for (let t = 0; t < n.length; t++) window.addEventListener("contextmenu", (t => {
        let r;
        e.style.pointerEvents = "auto";
        try {
            r = document.querySelectorAll(`#${t.target.closest("[contextmenu]").getAttribute("contextmenu")} menuitem`), t.preventDefault()
        } catch (t) {
            return !0
        }
        e.innerHTML = "";
        for (let t = 0; t < r.length; t++) {
            const n = r[t],
                o = document.createElement("li");
            o.setAttribute("onclick", n.getAttribute("onclick")), o.addEventListener("click", (() => {
                e.style.opacity = 0, e.style.pointerEvents = "none"
            })), o.textContent = n.getAttribute("label"), e.innerHTML += o.outerHTML
        }
        console.log(e.innerHTML), e.style.top = `${t.clientY}px`, e.style.left = `${t.clientX}px`, e.style.opacity = 1
    }));
    var o = 0;
    setInterval((() => {
        if ((o += 100) > 3e3) return e.style.opacity = 0, e.style.pointerEvents = "none", void(o = 0)
    }), 100), _$.addEventListeners(e, ["mousemove", "click", "scroll"], (() => {
        o = 0
    })), _$.onOutsideClick(e, (() => {
        e.style.opacity = 0, e.style.pointerEvents = "none"
    }))
};
export let inView = (e = r("HTMLElement", "element")) => {
    t();
    for (var n = e.offsetTop, o = e.offsetLeft, a = e.offsetWidth, i = e.offsetHeight; e.offsetParent;) n += (e = e.offsetParent).offsetTop, o += e.offsetLeft;
    return n >= window.pageYOffset && o >= window.pageXOffset && n + i <= window.pageYOffset + window.innerHeight && o + a <= window.pageXOffset + window.innerWidth
};
export let inPartialView = (e = r("HTMLElement", "element")) => {
    t();
    for (var n = e.offsetTop, o = e.offsetLeft, a = e.offsetWidth, i = e.offsetHeight; e.offsetParent;) n += (e = e.offsetParent).offsetTop, o += e.offsetLeft;
    return n < window.pageYOffset + window.innerHeight && o < window.pageXOffset + window.innerWidth && n + i > window.pageYOffset && o + a > window.pageXOffset
};
export let replaceText = (e = r("HTMLElement", "element"), n = r("function", "callback")) => {
    t(), _$.each(_$.textNodes(e), (e => {
        e.textContent = n(e.textContent)
    }))
};
export let textNodes = (e = r("HTMLElement", "element")) => (t(), [...e.childNodes].filter((e => e.nodeType === Node.TEXT_NODE && "" !== e.nodeValue.trim())));
export let querySelector = (e = r("HTMLElement", "element")) => {
    t();
    var n = "";
    return function o(e) {
        if (e.getAttribute("id") && 1 === document.querySelectorAll(`#${e.getAttribute("id")}`).length) return n = (n = (n = n.replace(/^/, " #" + e.getAttribute("id"))).replace(/\s/, "")).replace(/\s/g, " > ");
        if (document.body === e) return n = (n = (n = n.replace(/^/, " body")).replace(/\s/, "")).replace(/\s/g, " > ");
        if (e.getAttribute("class")) {
            var t = ".";
            t = (t = (t += e.getAttribute("class")).replace(/\s/g, ".")).replace(/^/g, " ");
            var r = "",
                a = e.parentNode.children;
            if (a.length < 2) return;
            for (var i = [], l = 0; l < a.length; l++) e.getAttribute("class") == a[l].getAttribute("class") && i.push(a[l]);
            if (i.length > 1)
                for (var s = 0; s < i.length; s++)
                    if (e === i[s]) {
                        r = ":nth-of-type(" + ++s + ")";
                        break
                    } n = n.replace(/^/, t + r)
        } else {
            var c = e.nodeName;
            c = c.toLowerCase();
            var u = "";
            if ((a = e.parentNode.children).length > 2) {
                var p = [];
                for (l = 0; l < a.length; l++) e.nodeName == a[l].nodeName && p.push(a[l]);
                if (p.length > 1)
                    for (s = 0; s < p.length; s++)
                        if (e === p[s]) {
                            u = ":nth-of-type(" + ++s + ")";
                            break
                        }
            }
            n = n.replace(/^/, " " + c + u)
        }
        if (!e.parentNode) return n = (n = n.replace(/\s/g, " > ")).replace(/\s/, "");
        o(e.parentNode)
    }(e), n
};
export let removeComments = (e = r("HTMLElement", "HTMLElement")) => {
    t();
    const n = "string" == typeof e;
    e = n ? _$.parseHTML(e) : e.cloneNode(!0);
    for (const t of [...e.querySelectorAll("*"), e])
        for (const e of t.childNodes) e instanceof Comment && t.removeChild(e);
    return n ? e.outerHTML : e
};
export let parseHTML = (e = r("string", "html string"), n = "text/html") => {
    t();
    return (new DOMParser).parseFromString(e, n)
};
export let drag = (e = r("String|Element", "drag handle"), n = r("String|Element", "drag target")) => {
    t();
    let o = null,
        a = 0,
        i = 0;

    function l(e) {
        e.preventDefault(), e.stopPropagation(), o = n, o.style.position = "absolute";
        let t = o.getBoundingClientRect();
        "mousedown" == e.type ? (a = e.clientX - t.left, i = e.clientY - t.top, window.addEventListener("mousemove", s, !0)) : "touchstart" == e.type && (a = e.targetTouches[0].clientX - t.left, i = e.targetTouches[0].clientY - t.top, window.addEventListener("touchmove", s, !0))
    }

    function s(e) {
        e.preventDefault(), e.stopPropagation(), null != o && ("mousemove" == e.type ? (o.style.left = e.clientX - a + "px", o.style.top = e.clientY - i + "px") : "touchmove" == e.type && (o.style.left = e.targetTouches[0].clientX - a + "px", o.style.top = e.targetTouches[0].clientY - i + "px"))
    }
    e = "string" == typeof e ? document.querySelector(e) : e, n = "string" == typeof n ? document.querySelector(n) : n, e.addEventListener("mousedown", l, !0), e.addEventListener("touchstart", l, !0), document.onmouseup = function(e) {
        o && (o = null, window.removeEventListener("mousemove", s, !0), window.removeEventListener("touchmove", s, !0))
    }
};
export let addEventListeners = (e = r("HTMLElement", "element"), n = r("array", "events"), o = {}, a = !1, i = !1) => {
    if (t(), !(n instanceof Array)) throw 'addMultipleListeners: please supply an array of eventstrings (like ["click","mouseover"])';
    for (var l = function(e) {
            o.apply(this, i && i instanceof Array ? i : [])
        }, s = 0; s < n.length; s += 1) e.addEventListener(n[s], l, a)
};
export let sortTable = (e = r("HTMLTableElement", "table element"), n = undefined) => {
    t();
    var o = function(e, t) {
        return n ? n(e.children[t], e, t) : e.children[t].innerText || e.children[t].textContent
    };
    Array.prototype.slice.call(e.querySelectorAll("th")).forEach((function(e) {
        e.addEventListener("click", (function() {
            for (var t, r, n = e.parentNode;
                "TABLE" != n.tagName.toUpperCase();) n = n.parentNode;
            Array.prototype.slice.call(n.querySelectorAll("tr:nth-child(n+2)")).sort((t = Array.prototype.slice.call(e.parentNode.children).indexOf(e), r = this.asc = !this.asc, function(e, n) {
                return a = o(r ? e : n, t), i = o(r ? n : e, t), "" === a || "" === i || isNaN(a) || isNaN(i) ? a.toString().localeCompare(i) : a - i;
                var a, i
            })).forEach((function(e) {
                n.appendChild(e)
            }))
        }))
    }))
};
export let sortTableBy = (e = r("HTMLTableElement", "<th> element"), n = !0) => {
    t();
    for (var o, a, i = function(e, t) {
            return e.children[t].innerText || e.children[t].textContent
        }, l = e.parentNode;
        "TABLE" != l.tagName.toUpperCase();) l = l.parentNode;
    Array.prototype.slice.call(l.querySelectorAll("tr:nth-child(n+2)")).sort((o = Array.prototype.slice.call(e.parentNode.children).indexOf(e), a = n, function(e, t) {
        return r = i(a ? e : t, o), n = i(a ? t : e, o), "" === r || "" === n || isNaN(r) || isNaN(n) ? r.toString().localeCompare(n) : r - n;
        var r, n
    })).forEach((function(e) {
        l.appendChild(e)
    }))
};
export let addStyles = (e = r("HTMLElement", "element"), n = r("Object", "styles")) => (t(), Object.assign(e.style, n));
export let createElement = (e = r("String", "HTML element string")) => {
    t();
    const n = document.createElement("div");
    return n.innerHTML = e, n.firstElementChild
};
export let compStyle = (e = r("HTMLElement", "element"), n = r("String", "CSS property string")) => (t(), window.getComputedStyle(e).getPropertyValue(n));
export let elementSiblings = (e = r("HTMLElement", "element")) => (t(), [...e.parentElement.children].filter((t => t != e)));
export let disableRightClick = (e = r("HTMLElement", "element")) => (t(), e.oncontextmenu = !1);
export let inlineCSS = (e = r("HTMLElement", "element")) => {
    t();
    var n, o = getComputedStyle(e, null);
    for (n = 0; n < o.length; n++) {
        var a = o[n] + "";
        e.style[a] = o[a]
    }
};
export let attributes = (e = r("HTMLElement", "element")) => {
    t();
    for (var n, o = [], a = 0, i = e.attributes, l = i.length; a < l; a++) n = i[a], o.push({
        name: n.nodeName,
        value: n.nodeValue
    });
    return o
};
export let observeMutations = (e = r("HTMLElement", "element"), n = r("function", "callback"), o = {}) => {
    t();
    const a = new MutationObserver((e => e.forEach((e => n(e)))));
    return a.observe(e, Object.assign({
        childList: !0,
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
        subtree: !0
    }, o)), a
};
export let tilt = (e = r("HTMLElement", "element"), n = r("number", "x"), o = r("number", "y"), a = 500, i = 30) => {
    t(), e.style.transform = `perspective(${a}px) scale(1.1) rotateX(${-1*i*((o-e.clientHeight/2)/e.clientHeight)}deg) rotateY(${i*((n-e.clientWidth/2)/e.clientWidth)}deg)`
};
export let fullScreen = (e = r("HTMLElement", "element")) => (t(), e.requestFullScreen || e.mozRequestFullScreen || e.webkitRequestFullScreen() || new Error("Fullscreen failed"));
export let replaceSelection = (e = r("string", "replacement text")) => {
    var n, o;
    if (t(), window.getSelection) {
        if ((n = window.getSelection()).rangeCount) {
            (o = n.getRangeAt(0)).deleteContents();
            let t = document.createElement("span");
            t.insertAdjacentHTML("beforeend", e), o.insertNode(t)
        }
    } else document.selection && document.selection.createRange && (console.warn("You are using IE < 9, you are evil. Falling back to text not HTML."), (o = document.selection.createRange()).text = e.replace(/<[^>]*>/g, ""))
};
export let waitUntil = async (e = r("function", "condition"), t = Infinity) => new Promise((async (r, n) => {
    let o = Date.now();
    for (; !e();) {
        if (Date.now() - o >= t) return void n(e());
        await new Promise((e => requestAnimationFrame(e)))
    }
    return r(e()), e()
}));
export let onOutsideClick = (e = r("HTMLElement", "element"), n = r("function", "callback")) => (t(), new Promise(((t, r) => {
    document.addEventListener("click", (r => {
        e.contains(r.target) || (n(), t())
    }))
})));
export let onScrollStop = (e = window, n = r("function", "callback"), o = 150) => {
    let a;
    return t(), new Promise(((t, r) => {
        e.addEventListener("scroll", (e => {
            clearTimeout(a), a = setTimeout((() => {
                n(e), t(e)
            }), o)
        }), !1)
    }))
};
export let hub = () => ({
    hub: Object.create(null),
    emit(e, t) {
        (this.hub[e] || []).forEach((e => e(t)))
    },
    on(e, t) {
        this.hub[e] || (this.hub[e] = []), this.hub[e].push(t)
    },
    off(e, t) {
        const r = (this.hub[e] || []).findIndex((e => e === t));
        r > -1 && this.hub[e].splice(r, 1), 0 === this.hub[e].length && delete this.hub[e]
    }
});
export let dispatch = (e = r("object", "event properties"), t = r("string", "type"), n = window) => {
    let o = new Event(t);
    for (let t in e) o[t] = e[t];
    n.dispatchEvent(o)
};
export let juxt = (...e) => (...t) => [...e].map((e => [...t].map(e)));
export let sleep = (e = r("number", "milliseconds")) => new Promise((t => setTimeout(t, e)));
export let limitArgs = (e = r("function", "function"), t = r("number", "arguments")) => (...r) => e(...r.slice(0, t));
export let fastestFunction = (e, t = 1e3) => {
    const r = e.map((e => {
        const r = performance.now();
        for (let r = 0; r < t; r++) e();
        return performance.now() - r
    }));
    return r.indexOf(Math.min(...r))
};
export let spread = (e = r("function")) => t => {
    e.apply(globalThis, t)
};
export let memoize = (e = r("function")) => {
    let t = {};
    return function() {
        let r = JSON.stringify(Array.from(arguments)),
            n = Array.from(arguments);
        return t[r] || (t[r] = e(...n)), t[r]
    }
};
export let composeFunction = (...e) => t => (r("functions", "function list", ![...e].length), e.reduceRight(((e, t) => t(e)), t));
export let curryFunction = (e = r("function"), t = e.length, ...n) => t <= n.length ? e(...n) : _$.curryFunction.bind(null, e, t, ...n);
export let isAsync = (e = r("function")) => "[object AsyncFunction]" === Object.prototype.toString.call(e);
export let timeFunction = (e = r("function"), t = "_$ function timer") => {
    let n = performance.now();
    return console.time(t), e(), console.timeEnd(t), {
        "function": e,
        time: performance.now() - n
    }
};
export let throttle = (e = r("function"), t = r("number", "wait"), n = {}) => {
    var o, a, i, l = null,
        s = 0;
    n || (n = {});
    var c = function() {
        s = !1 === n.leading ? 0 : Date.now(), l = null, i = e.apply(o, a), l || (o = a = null)
    };
    return function() {
        var r = Date.now();
        s || !1 !== n.leading || (s = r);
        var u = t - (r - s);
        return o = this, a = arguments, u <= 0 || u > t ? (l && (clearTimeout(l), l = null), s = r, i = e.apply(o, a), l || (o = a = null)) : l || !1 === n.trailing || (l = setTimeout(c, u)), i
    }
};
export let debounce = (e = r("function"), t = r("number", "wait"), n = !1) => {
    var o;
    return function() {
        var r = this,
            a = arguments,
            i = n && !o;
        clearTimeout(o), o = setTimeout((function() {
            o = null, n || e.apply(r, a)
        }), t), i && e.apply(r, a)
    }
};
export let runAsync = (e = r("function")) => {
    const t = new Worker(URL.createObjectURL(new Blob([`postMessage((${e})());`]), {
        type: "application/javascript; charset=utf-8"
    }));
    return new Promise(((e, r) => {
        t.onmessage = ({
            data: r
        }) => {
            e(r), t.terminate()
        }, t.onerror = e => {
            r(e), t.terminate()
        }
    }))
};
export let flattenObj = (e = r("object", "object")) => e !== Object(e) || Array.isArray(e) ? {} : Object.assign({}, ... function t(e) {
    return [].concat.apply([], Object.entries(e).map((([e, r]) => r && "object" == typeof r && Object.keys(r).some((e => r.hasOwnProperty(e))) && !Array.isArray(r) ? t(r) : {
        [e]: r
    })))
}(e));
export let clone = (e = r("object", "Object to clone"), t, n) => {
    var o = Object.create;
    if ("function" != typeof o && (o = function(e) {
            function t() {}
            return t.prototype = e, new t
        }), null === e || "object" != typeof e) return e;
    if ("function" == typeof e.clone) return e.clone(!0);
    if (e instanceof Date) return new Date(e.getTime());
    if (e instanceof RegExp) return new RegExp(e);
    if (e.nodeType && "function" == typeof e.cloneNode) return e.cloneNode(!0);
    t === undefined && (t = [], n = []);
    var a = t.length;
    for (l = 0; l < a; l++)
        if (e === t[l]) return n[l];
    if ("[object Array]" == Object.prototype.toString.call(e)) {
        var i = e.slice();
        t.push(e), n.push(i);
        for (var l = i.length; l--;) i[l] = clone(i[l], t, n);
        return i
    }
    var s = Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__;
    s || (s = e.constructor.prototype);
    var c = o(s);
    for (var u in t.push(e), n.push(c), e) c[u] = clone(e[u], t, n);
    return c
};
export let listen = (e = r("object"), t = (() => null), n = (() => null)) => new Proxy(e, {
    set: function(e, r, n) {
        return t(r, n), e[r] = n, e[r]
    },
    get: function(t, r, o) {
        return n(r, o), e[r]
    }
});
export let merge = function a(e = r("object", "object 1"), t = r("object", "object 2")) {
    for (var n in t)
        if (!(n in Object.prototype)) try {
            t[n].constructor == Object ? e[n] = a(e[n], t[n]) : e[n] = t[n]
        } catch (o) {
            e[n] = t[n]
        }
    return e
};
export let mapObjectKeys = (e = r("object"), t = r("function", "callback")) => Array.isArray(e) ? e.map((e => _$.mapObjectKeys(e, t))) : "object" == typeof e ? Object.keys(e).reduce(((r, n) => {
    const o = t(n),
        a = e[n];
    return r[o] = null !== a && "object" == typeof a ? _$.mapObjectKeys(a, t) : a, r
}), {}) : e;
export let mapObjectValues = (e = r("object", "object"), t = r("function", "callback")) => (Object.keys(e).map((function(r, n) {
    e[r] = t(e[r], n)
})), e);
export let formToObject = (e = r("HTMLFormElement", "the form")) => (t(), Array.from(new FormData(e)).reduce(((e, [t, r]) => ({
    ...e,
    [t]: r
}))));
export let sortObj = (e = r("object", "object")) => Object.keys(e).sort().reduce((function(t, r) {
    return t[r] = e[r], t
}), {});
export let gcd = (...e) => {
    return e[0] instanceof Array ? t(e[0]) : t([...e]);

    function t(e) {
        let r = Math.min(...e);
        if (r == Math.max(...e)) return r;
        for (let t in e) e[t] > r && (e[t] = e[t] - r);
        return t(e)
    }
};
export let round = (e = r("number"), t = 1) => Math.round(e / t) * t;
export let equals = (e = r("any", "a"), t = r("any", "b")) => {
    if (e === t) return !0;
    if ("RegExp" === _$.typeOf(e) && "RegExp" === _$.typeOf(t)) return String(e) === String(t);
    if (e instanceof Date && t instanceof Date) return e.getTime() === t.getTime();
    if (!e || !t || "object" != typeof e && "object" != typeof t) return e === t;
    if (e.prototype !== t.prototype) return !1;
    let n = Object.keys(e);
    return n.length === Object.keys(t).length && n.every((r => equals(e[r], t[r])))
};
export let isPrime = (e = r("number", "number")) => {
    const t = Math.floor(Math.sqrt(e));
    for (let r = 2; r <= t; r++)
        if (e % r == 0) return !1;
    return e >= 2
};
export let factorial = (e = r("number")) => e < 0 ? (() => {
    throw new TypeError("Negative numbers are not allowed!")
})() : e <= 1 ? 1 : e * factorial(e - 1);
export let luhnCheck = (e = r("String|Number")) => {
    let t = (e + "").split("").reverse().map((e => parseInt(e))),
        n = t.splice(0, 1)[0],
        o = t.reduce(((e, t, r) => r % 2 != 0 ? e + t : e + 2 * t % 9 || 9), 0);
    return o += n, o % 10 == 0
};
export let animate = (e = r("Number", "start"), t = r("Number", "end"), n = r("number", "duration"), o = r("function", "callback"), a = 20, i = (e => e)) => {
    var l = e,
        s = Date.now();
    let c = setInterval((() => {
        l = i((Date.now() - s) / n) * (t - e) + e, o(l, i((Date.now() - s) / n))
    }), a);
    setTimeout((() => {
        clearInterval(c), o(t, 1)
    }), n)
};
export let range = (e = r("number", "start"), t = 0) => (e > t && ([e, t] = [t, e]), Array(t - e + 1).fill().map(((t, r) => e + r)));
export let uuid = (e = Math.random()) => {
    function t(t) {
        var r = (e.toString(16) + "000000000").substr(2, 8);
        return t ? "-" + r.substr(0, 4) + "-" + r.substr(4, 4) : r
    }
    return "string" == typeof e && (e = n.hashString(e) / 1e16), t() + t(!0) + t(!0) + t()
};
export let primesTo = (e = r("number", "number")) => {
    let t = Array.from({
            length: e - 1
        }).map(((e, t) => t + 2)),
        n = Math.floor(Math.sqrt(e));
    return Array.from({
        length: n - 1
    }).map(((e, t) => t + 2)).forEach((e => t = t.filter((t => t % e != 0 || t === e)))), t
};
export let random = (e = r("number", "max"), t = r("number", "min"), n = !0, o = Math.random()) => {
    t > e && ([t, e] = [e, t]);
    var a = o * (e - t + 1) + t;
    return n && (a = Math.round(a)), a
};
export let seedRandom = (e = r("number", "seed")) => {
    var t = e += 1831565813;
    return t = Math.imul(t ^ t >>> 15, 1 | t), (((t ^= t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t >>> 14) >>> 0) / 4294967296
};
export let formatNumber = (e = r("number", "number")) => e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
export let ease = {
    linear: (e = r("number", "percentage")) => e,
    easeInSine: (e = r("number", "percentage")) => 1 - Math.cos(e * Math.PI / 2),
    easeOutSine: (e = r("number", "percentage")) => Math.sin(e * Math.PI / 2),
    easeInOutSine: (e = r("number", "percentage")) => -(Math.cos(Math.PI * e) - 1) / 2,
    easeInQuad: (e = r("number", "percentage")) => e * e,
    easeOutQuad: (e = r("number", "percentage")) => e * (2 - e),
    easeInOutQuad: (e = r("number", "percentage")) => e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1,
    easeInCubic: (e = r("number", "percentage")) => e * e * e,
    easeOutCubic: (e = r("number", "percentage")) => --e * e * e + 1,
    easeInOutCubic: (e = r("number", "percentage")) => e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
    easeInQuart: (e = r("number", "percentage")) => e * e * e * e,
    easeOutQuart: (e = r("number", "percentage")) => 1 - --e * e * e * e,
    easeInOutQuart: (e = r("number", "percentage")) => e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e,
    easeInQuint: (e = r("number", "percentage")) => e * e * e * e * e,
    easeOutQuint: (e = r("number", "percentage")) => 1 + --e * e * e * e * e,
    easeInOutQuint: (e = r("number", "percentage")) => e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e,
    easeInExpo: (e = r("number", "percentage")) => 0 === e ? 0 : Math.pow(2, 10 * e - 10),
    easeOutExpo: (e = r("number", "percentage")) => 1 === e ? 1 : 1 - Math.pow(2, -10 * e),
    easeInOutExpo: (e = r("number", "percentage")) => 0 === e ? 0 : 1 === e ? 1 : e < .5 ? Math.pow(2, 20 * e - 10) / 2 : (2 - Math.pow(2, -20 * e + 10)) / 2,
    easeInCirc: (e = r("number", "percentage")) => 1 - Math.sqrt(1 - e * e),
    easeOutCirc: (e = r("number", "percentage")) => Math.sqrt(1 - (e - 1) * (e - 1)),
    easeInOutCirc: (e = r("number", "percentage")) => e < .5 ? 1 - Math.sqrt(1 - 4 * e * e) / 2 : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2,
    easeInBack: (e = r("number", "percentage")) => 2.70158 * e * e * e - 1.70158 * e * e,
    easeOutBack: (e = r("number", "percentage")) => 1 + 2.70158 * Math.pow(e - 1, 3) + c1 * Math.pow(e - 1, 2),
    easeInOutBack: e => {
        const t = 2.5949095;
        return e < .5 ? 4 * e * e * (2 * (t + 1) * e - t) / 2 : (Math.pow(2 * e - 2, 2) * ((t + 1) * (2 * e - 2) + t) + 2) / 2
    },
    easeInElastic: (e = r("number", "percentage")) => 0 === e ? 0 : 1 === e ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((10 * e - 10.75) * (2 * Math.PI) / 3),
    easeOutElastic: (e = r("number", "percentage")) => 0 === e ? 0 : 1 === e ? 1 : Math.pow(2, -10 * e) * Math.sin((10 * e - .75) * (2 * Math.PI) / 3) + 1,
    easeInOutElastic: (e = r("number", "percentage")) => 0 === e ? 0 : 1 === e ? 1 : e < .5 ? -Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * (2 * Math.PI) / 4.5) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * (2 * Math.PI) / 4.5) / 2 + 1,
    easeInBounce: (e = r("number", "percentage")) => 1 - ease.easeOutBounce(1 - e),
    easeOutBounce: (e = r("number", "percentage")) => {
        const t = 7.5625,
            n = 2.75;
        return e < 1 / n ? t * e * e : e < 2 / n ? t * (e -= 1.5 / n) * e + .75 : e < 2.5 / n ? t * (e -= 2.25 / n) * e + .9375 : t * (e -= 2.625 / n) * e + .984375
    },
    easeInOutBounce: (e = r("number", "percentage")) => e < .5 ? (1 - ease.easeOutBounce(1 - 2 * e)) / 2 : (1 + ease.easeOutBounce(2 * e - 1)) / 2
};
export let jaroDistance = function(e, t) {
    if (!e || !t) return 0;
    e = e.trim().toUpperCase(), t = t.trim().toUpperCase();
    for (var r = e.length, n = t.length, o = [], a = [], i = Math.floor(Math.max(r, n) / 2) - 1, l = Math.min(r, n), s = 0, c = n - 1, u = 0; u < r; u++)
        for (var p = u + i <= c ? u + i : c, d = u >= i ? u - i : 0; d <= p; d++)
            if (1 !== a[d] && e[d] === t[u]) {
                o[d] = 1, a[u] = 1, s++;
                break
            } if (0 === s) return 0;
    var m = 0,
        g = 0;
    for (u = 0; u < r; u++)
        if (1 === o[u]) {
            for (d = m; d < n; d++)
                if (1 === a[d]) {
                    m = d + 1;
                    break
                } e[u] !== t[d] && g++
        } g = Math.floor(g / 2);
    var f = 0,
        h = {
            A: "E",
            A: "I",
            A: "O",
            A: "U",
            B: "V",
            E: "I",
            E: "O",
            E: "U",
            I: "O",
            I: "U",
            O: "U",
            I: "Y",
            E: "Y",
            C: "G",
            E: "F",
            W: "U",
            W: "V",
            X: "K",
            S: "Z",
            X: "S",
            Q: "C",
            U: "V",
            M: "N",
            L: "I",
            Q: "O",
            P: "R",
            I: "J",
            2: "Z",
            5: "S",
            8: "B",
            1: "I",
            1: "L",
            0: "O",
            0: "Q",
            C: "K",
            G: "J",
            E: " ",
            Y: " ",
            S: " "
        };
    if (l > s)
        for (u = 0; u < r; u++)
            if (!o[u])
                for (d = 0; d < n; d++)
                    if (!a[d] && h[e[u]] === t[d]) {
                        f += 3, a[d] = 2;
                        break
                    } var y = f / 10 + s,
        b = y / r + y / n + (s - g) / s;
    if ((b /= 3) > .7) {
        d = l >= 4 ? 4 : l;
        for (u = 0; u < d && e[u] === t[u]; u++);
        u && (b += .1 * u * (1 - b)), l > 4 && s > u + 1 && 2 * s >= l + u && (b += (s - u - 1) / (r * n - 2 * u + 2) * (1 - b))
    }
    return b
};
export let prefixCSS = (e = r("string", "property")) => {
    t();
    const n = e.charAt(0).toUpperCase() + e.slice(1),
        o = ["", "webkit", "moz", "ms", "o"],
        a = o.findIndex((t => "undefined" != typeof document.body.style[t ? t + n : e]));
    return -1 !== a ? 0 === a ? e : o[a] + n : null
};
export let parseCookie = (e = r("string", "cookie string")) => e.split(";").map((e => e.split("="))).reduce(((e, t) => (e[decodeURIComponent(t[0].trim())] = decodeURIComponent(t[1].trim()), e)), {});
export let hash = (e = r("string", "input string")) => (t(), crypto.subtle.digest("SHA-256", new TextEncoder("utf-8").encode(e)).then((e => {
    let t = [],
        r = new DataView(e);
    for (let e = 0; e < r.byteLength; e += 4) t.push(("00000000" + r.getUint32(e).toString(16)).slice(-8));
    return t.join("")
})));
export let forTemplateLiteral = (e = r("array", "array"), t = r("function", "callback")) => e.map(((e, r) => t(e, r))).join``;
export let mapString = (e = r("string", "string"), t = r("function", "callback")) => Array.prototype.map.call(e, t).join("");
export let deburr = (e = r("string", "string")) => e.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export let removeTags = (e = r("string", "html string")) => e.replace(/<[^>]*>/g, "");
export let speak = (e = r("string", "text"), t = "en", n = 1, o = 1, a = 1, i = 1) => {
    var l = new SpeechSynthesisUtterance,
        s = window.speechSynthesis.getVoices();
    let c = s.filter((e => e["default"]));
    l.voice = o ? "number" == typeof o ? s[o] : o : c, l.volume = n, l.rate = i, l.pitch = a, l.text = e, l.lang = t, speechSynthesis.speak(l)
};
export let widows = (e = r("string", "text")) => {
    for (var t = e.split(" "), n = "", o = 0; o <= t.length - 1; o++) n += t[o], o == t.length - 2 ? n += "&nbsp;" : n += " ";
    return n
};
export let unCamelCase = function(e = r("string", "string")) {
    return e.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3").replace(/^./, (function(e) {
        return e.toUpperCase()
    }))
};
export let camelCase = (e = r("string", "string")) => e.replace(/(?:^\w|[A-Z]|\b\w)/g, (function(e, t) {
    return 0 === t ? e.toLowerCase() : e.toUpperCase()
})).replace(/\s+/g, "");
export let scrambleString = (e = r("string")) => {
    for (var t = e.split(""), n = t.length - 1; n > 0; n--) {
        var o = Math.floor(Math.random() * (n + 1)),
            a = t[n];
        t[n] = t[o], t[o] = a
    }
    return t.join("")
};
export let hashString = (e = r("string"), t = 0) => {
    let n = 3735928559 ^ t,
        o = 1103547991 ^ t;
    for (let t, r = 0; r < e.length; r++) t = e.charCodeAt(r), n = Math.imul(n ^ t, 2654435761), o = Math.imul(o ^ t, 1597334677);
    return n = Math.imul(n ^ n >>> 16, 2246822507) ^ Math.imul(o ^ o >>> 13, 3266489909), o = Math.imul(o ^ o >>> 16, 2246822507) ^ Math.imul(n ^ n >>> 13, 3266489909), 4294967296 * (2097151 & o) + (n >>> 0)
};
export let editDistance = (e = r("string", "string 1"), t = r("string", "string 2")) => {
    if (0 == e.length) return t.length;
    if (0 == t.length) return e.length;
    var n, o, a = [];
    for (n = 0; n <= t.length; n++) a[n] = [n];
    for (o = 0; o <= e.length; o++) a[0][o] = o;
    for (n = 1; n <= t.length; n++)
        for (o = 1; o <= e.length; o++) t.charAt(n - 1) == e.charAt(o - 1) ? a[n][o] = a[n - 1][o - 1] : a[n][o] = Math.min(a[n - 1][o - 1] + 1, Math.min(a[n][o - 1] + 1, a[n - 1][o] + 1));
    return a[t.length][e.length]
};
export let byteSize = (e = r("string", "string")) => new Blob([e]).size;
export let replaceMultiple = (e = r("string", "text"), t = r("object", "replace key pairs")) => {
    var n = new RegExp(Object.keys(t).join("|"), "gi");
    return e = e.replace(n, (function(e) {
        return mapObj[e]
    }))
};
export let urlQuery = (e = r("string", "query"), t = window.location.href) => {
    e = e.replace(/[\[\]]/g, "\\$&");
    var n = new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);
    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
};
export let sanitize = (e = r("string", "input html"), n = undefined, o = undefined) => {
    t();
    n = n || ["I", "P", "B", "BODY", "HTML", "DEL", "INS", "STRONG", "SMALL", "A", "IMG", "CITE", "FIGCAPTION", "ASIDE", "ARTICLE", "SUMMARY", "DETAILS", "NAV", "TD", "TH", "TABLE", "THEAD", "TBODY", "NAV", "SPAN", "BR", "CODE", "PRE", "BLOCKQUOTE", "EM", "HR", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "MAIN", "HEADER", "FOOTER", "SELECT", "COL", "AREA", "ADDRESS", "ABBR", "BDI", "BDO"];
    o = (o = o || [{
        attribute: "src",
        tags: "*",
        regex: /^(?:https|http|\/\/):/
    }, {
        attribute: "href",
        tags: "*",
        regex: /^(?:https|http|\/\/):/
    }, {
        attribute: "width",
        tags: "*",
        regex: /^[0-9]+$/
    }, {
        attribute: "height",
        tags: "*",
        regex: /^[0-9]+$/
    }, {
        attribute: "id",
        tags: "*",
        regex: /^[a-zA-Z]+$/
    }, {
        attribute: "class",
        tags: "*",
        regex: /^[a-zA-Z ]+$/
    }, {
        attribute: "value",
        tags: ["INPUT", "TEXTAREA"],
        regex: /^.+$/
    }, {
        attribute: "checked",
        tags: ["INPUT"],
        regex: /^(?:true|false)+$/
    }, {
        attribute: "placeholder",
        tags: ["INPUT", "TEXTAREA"],
        regex: /^.+$/
    }, {
        attribute: "alt",
        tags: ["IMG", "AREA", "INPUT"],
        regex: /^[0-9a-zA-Z]+$/
    }, {
        attribute: "autofocus",
        tags: ["INPUT"],
        regex: /^(?:true|false)+$/
    }, {
        attribute: "for",
        tags: ["LABEL", "OUTPUT"],
        regex: /^[a-zA-Z0-9]+$/
    }]).map((e => {
        if ("string" == typeof e) return {
            attribute: e,
            tags: "*",
            regex: /^.+$/
        };
        let t = e;
        return e.hasOwnProperty("tags") || (t.tags = "*"), e.hasOwnProperty("regex") || (t.regex = /^.+$/), t
    }));
    var a = (new DOMParser).parseFromString(e, "text/html"),
        i = a.querySelectorAll("*");
    for (let e = 0; e < i.length; e++) {
        const t = i[e];
        let r = s(t);
        for (let e = 0; e < r.length; e++) {
            l(t, r[e]) || t.removeAttribute(r[e])
        }
        n.includes(t.tagName) || t.remove()
    }
    return a.documentElement.innerHTML;

    function l(e, t) {
        return o.filter((r => r.attribute === t && ("*" === r.tags || r.tags.includes(e.tagName)) && r.regex.test(e.getAttribute(t)))).length > 0
    }

    function s(e) {
        for (var t = 0, r = e.attributes, n = r.length, o = []; t < n; t++) o.push(r[t].nodeName);
        return o
    }
};
export let markdownToHTML = (e = r("string", "input")) => {
    var t = /\\([\\\|`*_{}\[\]()#+\-~])/g,
        n = /\n *&gt; *([^]*?)(?=(\n|$){2})/g,
        o = /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g,
        a = /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g,
        i = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/,
        l = /.*\n/g,
        s = /\||(.*?[^\\])\|/g;

    function c(t, r) {
        e = e.replace(t, r)
    }

    function u(e, t) {
        return "<" + e + ">" + t + "</" + e + ">"
    }

    function p(e) {
        return e.replace(a, (function(e, t, r, n, o, a, i, l, s, c) {
            return t + u(n ? s ? "strong" : "em" : o ? s ? "s" : "sub" : a ? "sup" : i ? "small" : l ? "big" : "code", p(c))
        }))
    }

    function d(e) {
        return e.replace(t, "$1")
    }
    var m = [],
        g = 0;
    return e = "\n" + e + "\n", c(/</g, "&lt;"), c(/>/g, "&gt;"), c(/\t|\r|\uf8ff/g, "  "), e = function f(e) {
        return e.replace(n, (function(e, t) {
            return u("blockquote", f(p(t.replace(/^ *&gt; */gm, ""))))
        }))
    }(e), c(/^([*\-=_] *){3,}$/gm, "<hr/>"), e = function h(e) {
        return e.replace(o, (function(e, t, r, n, o, a) {
            var i = u("li", p(a.split(RegExp("\n ?" + t + "(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +", "g")).map(h).join("</li><li>")));
            return "\n" + (r ? '<ol start="' + (n ? r + '">' : parseInt(r, 36) - 9 + '" style="list-style-type:' + (o ? "low" : "upp") + 'er-alpha">') + i + "</ol>" : u("ul", i))
        }))
    }(e), c(/<\/(ol|ul)>\n\n<\1>/g, ""), c(/\n((```|~~~).*\n?([^]*?)\n?\2|(( {4}.*?\n)+))/g, (function(e, t, r, n, o) {
        return m[--g] = u("pre", u("code", n || o.replace(/^ {4}/gm, ""))), g + ""
    })), c(/((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g, (function(e, t, r, n, o, a, i) {
        return m[--g] = i || (r ? o ? '<img src="' + _$.escapeHTML(o) + '" alt="' + _$.escapeHTML(n) + '"/>' : t : /^https?:\/\//g.test(o) ? '<a href="' + _$.escapeHTML(o) + '">' + d(p(n)) + "</a>" : t), g + ""
    })), c(/\n(( *\|.*?\| *\n)+)/g, (function(e, t) {
        var r = t.match(i)[1];
        return "\n" + u("table", t.replace(l, (function(e, t) {
            return e == r ? "" : u("tr", e.replace(s, (function(e, n, o) {
                return o ? u(r && !t ? "th" : "td", d(p(n || ""))) : ""
            })))
        })))
    })), c(/(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g, (function(e, t, r, n) {
        return t + u("h" + r.length, d(p(n)))
    })), c(/(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g, (function(e, t) {
        return u("p", d(p(t)))
    })), c(/-\d+\uf8ff/g, (function(e) {
        return m[parseInt(e)]
    })), e.trim()
};
export let syllables = (e = r("string", "word")) => {
    var t = 0;
    (e = e.toLowerCase()).length > 3 && "some" == e.substring(0, 4) && (e = e.replace("some", ""), t++);
    var n = (e = (e = e.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, "")).replace(/^y/, "")).match(/[aeiouy]{1,2}/g);
    if (console.log(n), n) return n.length + t
};
export let titleCase = (e = r("string", "string")) => e.toLowerCase().split(" ").map(((e, t) => ["at", "by", "for", "in", "of", "off", "on", "out", "to", "up", "as", "if", "but", "per", "via", "for", "and", "nor", "but", "or", "yet", "so", "the", "a", "an"].includes(e) && 0 != t ? e : String.fromCodePoint(e.codePointAt(0)).toUpperCase() + e.slice(e.codePointAt(0) > 65535 ? 2 : 1))).join(" ");
export let capitalize = (e = r("string", "string")) => String.fromCodePoint(e.codePointAt(0)).toUpperCase() + e.slice(e.codePointAt(0) > 65535 ? 2 : 1);
export let replaceBetween = (e = r("string", "string"), t = r("number", "start"), n = r("number", "end"), o = r("string", "replace with")) => e.substring(0, t) + o + e.substring(n);
export let escapeHTML = (e = r("string")) => e.replace(/[&<>'"]/g, (e => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
} [e] || e)));
export let unescapeHTML = (e = r("string")) => e.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g, (e => ({
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&#39;": "'",
    "&quot;": '"'
} [e] || e)));
export let previousPage = () => (t(), document.referrer || window.location.href);
export let tag = (e = (e => e), t = (e => e)) => (r, ...n) => {
    let o = [];
    n.push("");
    for (let a = 0; a < r.length; a++) o.push(t(r[a]), e(n[a]));
    return o.join("")
};
export let resize = async (e = r("string", "html"), n, o) => {
    t(), e = e.replace(/^(?:http|https)\:\/\//, "");
    let a = new Image;
    a.src = await _$.imageToData("https://cors.explosionscratc.repl.co/" + e), await new Promise((e => a.onload = e));
    let i = document.createElement("canvas"),
        l = i.getContext("2d");
    return i.width = n < 1 || !n ? a.width : n, i.height = o < 1 || !n ? a.height : o, l.drawImage(a, 0, 0, i.width, i.height), i.toDataURL(0, 0, i.width, i.height)
};
export let htmlToImage = (e = r("string", "html string"), {
    x: n = 0,
    y: o = 0,
    width: a = 300,
    height: i = 400
} = {}) => {
    t();
    let l = document.createElement("canvas");
    l.width = a, l.height = i;
    var s = l.getContext("2d");
    return new Promise((t => {
        var r = function(e) {
            var t = document.implementation.createHTMLDocument("");
            return t.write(e), t.documentElement.setAttribute("xmlns", t.documentElement.namespaceURI), e = (new XMLSerializer).serializeToString(t.body)
        }(e);
        r = r.replace(/\#/g, "%23");
        var c = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${i}"><foreignObject width="100%" height="100%">${r}</foreignObject></svg>`,
            u = new Image;
        u.onload = function() {
            s.drawImage(u, n, o, a, i), t(l.toDataURL())
        }, u.src = c
    }))
};
export let race = (e = r("function"), t = r("number", "timeout"), n = undefined) => Promise.race(["function" == typeof e ? e() : e, new Promise(((e, r) => setTimeout((() => n || r(new Error("Promise timed out (Bijou.js _$.race function)"))), t)))]);
export let typeOf = (e = r("any", "any"), t = !0) => t ? Object.prototype.toString.call(e).split(" ")[1].replace(/]$/, "").toLowerCase() : Object.prototype.toString.call(e).split(" ")[1].replace(/]$/, "");
export let injectCSS = (e = r("string", "css")) => {
    t();
    let n = document.createElement("style");
    return n.setAttribute("type", "text/css"), n.innerText = e, document.head.appendChild(n), n
};
export let mobileOrDesktop = () => (t(), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "mobile" : "desktop");
export let playSection = (e = r("HTMLMediaElement", "audio"), t = r("number", "start"), n = r("number", "stop")) => {
    let o = e.cloneNode(!0);
    o.currentTime = t, o.play(), o.int = setInterval((function() {
        o.currentTime > n && (o.pause(), clearInterval(o.int))
    }), 10)
};
export let formatHTML = (e = r("string", "html")) => {
    var t = "",
        n = "";
    return e.split(/>\s*</).forEach((function(e) {
        e.match(/^\/\w/) && (n = n.substring("\t".length)), t += n + "<" + e + ">\r\n", e.match(/^<?\w[^>]*[^\/]$/) && !e.startsWith("input") && (n += "\t")
    })), t.substring(1, t.length - 3)
};
export let getJSON = (e = r("string", "url"), n = (() => {})) => (t(), new Promise(((t, r) => {
    fetch(e).then((e => e.json())).then((e => {
        n(e), t(e)
    }))["catch"]((e => {
        throw r(e), new Error(e.stack)
    }))
})));
export let getHTML = (e = r("string", "url"), n = (() => {})) => (t(), new Promise(((t, r) => {
    fetch(e).then((e => e.text())).then((e => {
        n(_$.parseHTML(e)), t(_$.parseHTML(e))
    }))["catch"]((e => {
        throw r(e.stack), new Error(e.stack)
    }))
})));
export let preloadImage = (...e) => {
    r("string", "url arguments", ![...e].length);
    let t = [];
    for (var n = 0; n < e.length; n++) t[n] = new Image, t[n].src = e[n]
};
export let saveBlob = (e = r("blob", "blob"), n = "output.txt") => {
    t();
    var o = document.createElement("a");
    document.body.appendChild(o), o.style = "display: none";
    var a = window.URL.createObjectURL(e);
    o.href = a, o.download = n, o.click(), window.URL.revokeObjectURL(a)
};
export let requestInterval = function(e = r("function", "function"), n = r("number", "delay")) {
    t();
    var o = window.requestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60)
        },
        a = (new Date).getTime(),
        i = {};
    return i.value = o((function l() {
        i.value = o(l), (new Date).getTime() - a >= n && (e.call(), a = (new Date).getTime())
    })), i
};
export let loadScript = (e = r("string", "url"), n = (() => {}), o = {}, a = !1) => {
    if (t(), !a || !document.querySelector(`script[src="${e}"]`)) return new Promise(((t, r) => {
        var a = document.createElement("script");
        a.type = "text/javascript";
        let i = Object.keys(o);
        _$.each(i, (e => {
            a.setAttribute(e, o[e])
        })), a.readyState ? a.onreadystatechange = function() {
            "loaded" !== a.readyState && "complete" !== a.readyState || (a.onreadystatechange = null, n(), t())
        } : a.onload = function() {
            n(), t()
        }, a.src = e, document.getElementsByTagName("head")[0].appendChild(a)
    }))
};
export let imageToData = async (e = r("string", "url"), n = (() => {})) => (t(), new Promise((async (t, r) => {
    let o = await fetch(e).then((e => e.blob())),
        a = await new Promise((e => {
            let t = new FileReader;
            t.onload = () => e(t.result), t.readAsDataURL(o)
        }));
    n(a), t(a)
})));
export let cookies = {
    setItem: (e = r("string", "name"), n = r("string", "value"), o = 1e3) => {
        t();
        var a = "";
        if (o) {
            var i = new Date;
            i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3), a = "; expires=" + i.toUTCString()
        }
        document.cookie = e + "=" + (n || "") + a + "; path=/"
    },
    getItem: (e = r("string", "name")) => {
        t();
        for (var n = e + "=", o = document.cookie.split(";"), a = 0; a < o.length; a++) {
            for (var i = o[a];
                " " == i.charAt(0);) i = i.substring(1, i.length);
            if (0 === i.indexOf(n)) return i.substring(n.length, i.length)
        }
        return null
    },
    removeItem: (e = r("string", "name")) => {
        t(), document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    }
};
export let regex = {
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    name: /^(?:[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?(?:[a-zA-Z]{1,})?)/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    link: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/,
    strongPassword: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    moderatePassword: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
    ipv4: /^ (([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2}| 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3 } ([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5]) $ /,
    ipv6: /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
    ip: / ((^\s*((([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2} | 2[0 - 4][0 - 9] | 25[0 - 5]) \.) { 3}([0 - 9] | [1 - 9][0 - 9] | 1[0 - 9]{ 2 }| 2[0 - 4][0 - 9] | 25[0 - 5])) \s * $)| (^\s * ((([0 - 9A - Fa - f]{ 1, 4 }:) { 7 } ([0 - 9A - Fa - f]{ 1, 4 }|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 6 } (: [0 - 9A - Fa - f]{ 1, 4 }| ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 5 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 2 })|: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 })|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 4 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 3 })| ((: [0 - 9A - Fa - f]{ 1, 4 })?: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 3 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 4 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 2 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 2 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 5 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 3 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (([0 - 9A - Fa - f]{ 1, 4 }:) { 1 } (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 6 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 4 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))| (: (((: [0 - 9A - Fa - f]{ 1, 4 }) { 1, 7 })| ((: [0 - 9A - Fa - f]{ 1, 4 }) { 0, 5 }: ((25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d) (\.(25[0 - 5] | 2[0 - 4]\d | 1\d\d | [1 - 9] ?\d)) { 3 }))|:))) (%.+) ?\s * $)) /,
    socialSecurity: /^((?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|((?!219 09 9999|078 05 1120)(?!666|000|9\d{2})\d{3} (?!00)\d{2} (?!0{4})\d{4})|((?!219099999|078051120)(?!666|000|9\d{2})\d{3}(?!00)\d{2}(?!0{4})\d{4})$/,
    hex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    zipCode: /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/,
    simplePhone: /^\+?[\d\s]{3,}$/,
    visaCredit: /^4[0–9]{12}(?:[0–9]{3})?$/,
    expressCredit: /^3[47][0–9]{13}$/,
    mastercardCredit: /^(?:5[1–5][0–9]{2}|222[1–9]|22[3–9][0–9]|2[3–6][0–9]{2}|27[01][0–9]|2720)[0–9]{12}$/,
    discoverCredit: /^6(?:011|5[0–9]{2})[0–9]{12}$/
};
export let jsonToCsv = (e = r("array", "array"), t = r("number", "columns"), n = ",") => [t.join(n), ...e.map((e => t.reduce(((t, r) => `${t}${t.length?n:""}"${e[r]?e[r]:""}"`), "")))].join("\n");
export let arrayToCSV = (e = r("array", "array"), t = ",") => e.map((e => e.map((e => isNaN(e) ? `"${e.replace(/"/g,'""')}"` : e)).join(t))).join("\n");
export let notify = async (e = r("string", "text"), n = r("string", "body"), o = undefined) => {
    if (t(), !window.Notification) throw new Error("browser does not support notifications.");
    if ("granted" !== Notification.permission) Notification.requestPermission().then((function(t) {
        if ("granted" !== t) throw new Error("User blocked notifications");
        new Notification(e, {
            body: n,
            icon: o
        })
    }))["catch"]((function(e) {
        throw e
    }));
    else new Notification(e, {
        body: n,
        icon: o
    })
};
export let copy = (e = r("string", "string")) => {
    t();
    const n = document.createElement("textarea");
    n.value = e, n.setAttribute("readonly", ""), n.style.position = "absolute", n.style.left = "-9999px", document.body.appendChild(n);
    const o = document.getSelection().rangeCount > 0 && document.getSelection().getRangeAt(0);
    return n.select(), document.execCommand("copy"), document.body.removeChild(n), o && (document.getSelection().removeAllRanges(), document.getSelection().addRange(o)), e
};
export let browser = () => {
    t();
    var e = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
        r = "undefined" != typeof InstallTrigger,
        n = /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || "undefined" != typeof safari && window.safari.pushNotification).toString(),
        o = !!document.documentMode,
        a = !o && !!window.StyleMedia,
        i = !(!window.chrome || !window.chrome.webstore && !window.chrome.runtime),
        l = i && -1 != navigator.userAgent.indexOf("Edg"),
        s = (i || e) && !!window.CSS;
    return e ? "Opera" : r ? "Firefox" : n ? "Safari" : a ? "Edge" : o ? "Internet Explorer" : i ? "Chrome" : l ? "Edge Chromium" : s ? "Blink" : void 0
};
export let serializeForm = (e = r("HTMLFormElement", "form")) => (t(), Array.from(new FormData(e), (e => e.map(encodeURIComponent).join("="))).join("&"));
export let soundex = (e = r("string", "word")) => {
    var t = e.toLowerCase().split(""),
        n = t.shift(),
        o = {
            a: "",
            e: "",
            i: "",
            o: "",
            u: "",
            b: 1,
            f: 1,
            p: 1,
            v: 1,
            c: 2,
            g: 2,
            j: 2,
            k: 2,
            q: 2,
            s: 2,
            x: 2,
            z: 2,
            d: 3,
            t: 3,
            l: 4,
            m: 5,
            n: 5,
            r: 6
        };
    return (n + t.map((function(e, t, r) {
        return o[e]
    })).filter((function(e, t, r) {
        return 0 === t ? e !== o[n] : e !== r[t - 1]
    })).join("") + "000").slice(0, 4).toUpperCase()
};
export let prototype = (e = {
    overwrite: !0,
    tryCatch: !1
}) => {
    function t(t, r, n) {
        let o = n || t ? t.name : "noNameHehe124672463467432376453",
            a = e.overwrite !== undefined && !1 !== e.overwrite;
        r.prototype.hasOwnProperty(o) && !a || Object.defineProperty(r.prototype, o, {
            value: function(...r) {
                if (!0 !== (e["try"] || e.tryCatch || e["catch"] || e.catchErrors)) {
                    return t(this, ...r)
                }
                try {
                    return t(this, ...r)
                } catch (n) {
                    return n
                }
            }
        })
    }
    t(_$.addDaysToDate, Date, "addDays"), t(_$.addEventListeners, Element), t(_$.addMinutesToDate, Date, "addMinutes"), t(_$.addStyles, Element), t(_$.animate, Number), t(_$.arrayDiff, Array, "diff"), t(_$.arrayToCSV, Array, "toCSV"), t(_$.attributes, Element), t(_$.averageBy, Array), t(_$.blendColors, String), t(_$.byteSize, String), t(_$.camelCase, String), t(_$.capitalize, String), t(_$.clone, Object), t(_$.compStyle, Element), t(_$.composeFunction, Function, "compose"), t(_$.contains, Array), t(_$.copy, String), t(_$.count, Array), t(_$.create, String), t(_$.createElement, String), t(_$.curryFunction, Function, "curry"), t(_$.dayName, Date), t(_$.debounce, Function), t(_$.deburr, String), t(_$.disableRightClick, Element), t(_$.dispatch, Object), t(_$.drag, Element), t(_$.each, Array), t(_$.editDistance, String), t(_$.elementContains, Element, "contains"), t(_$.equals, Date), t(_$.equals, Object), t(_$.escapeHTML, String), t(_$.factorial, Number), t(_$.fastestFunction, Array), t(_$.flatten, Array), t(_$.flattenObj, Object, "flatten"), t(_$.forTemplateLiteral, Array), t(_$.formToObject, Element, "toObject"), t(_$.formatHTML, String), t(_$.formatNumber, Number), t(_$.fullScreen, Element), t(_$.gcd, Array), t(_$.hash, String), t(_$.hashString, String), t(_$.imageToData, String), t(_$.inPartialView, Element), t(_$.inView, Element), t(_$.inlineCSS, Element), t(_$.isAsync, Function), t(_$.isDateValid, Date, "valid"), t(_$.isPrime, Number), t(_$.jaroDistance, String), t(_$.juxt, Function), t(_$.lightOrDark, String), t(_$.lightenColor, String), t(_$.limitArgs, Function), t(_$.listen, Object), t(_$.luhnCheck, Number), t(_$.mapObjectKeys, Object, "mapKeys"), t(_$.mapObjectValues, Object, "map"), t(_$.mapString, String, "map"), t(_$.markDownToHTML, String), t(_$.memoize, Function), t(_$.merge, Object), t(_$.nFlatten, Array), t(_$.observeMutations, Element, "observe"), t(_$.onOutsideClick, Element), t(_$.onScrollStop, Element), t(_$.parents, Element), t(_$.parseHTML, String), t(_$.playSection, Element), t(_$.prefixCSS, String), t(_$.preloadImage, String), t(_$.primesTo, Number), t(_$.querySelector, Element, "genQuerySelector"), t(_$.random, Number), t(_$.range, Number), t(_$.remove, Array), t(_$.removeComments, String), t(_$.removeTags, String), t(_$.renderElement, Object), t(_$.replaceBetween, String), t(_$.replaceMultiple, Object), t(_$.replaceText, Element), t(_$.rgbToHex, String), t(_$.runAsync, Function), t(_$.sanitize, String), t(_$.saveBlob, Blob), t(_$.scrambleString, String, "scramble"), t(_$.seedRandom, String), t(_$.serializeForm, Element, "serialize"), t(_$.shuffleArray, Array, "shuffle"), t(_$.sortObj, Object, "sort"), t(_$.sortTable, Element, "sort"), t(_$.sortTableBy, Element), t(_$.speak, String), t(_$.splice, String), t(_$.spread, Function), t(_$.syllables, String), t(_$.textNodes, Element), t(_$.throttle, Function), t(_$.tilt, Element), t(_$.timeFunction, Function), t(_$.titleCase, String), t(_$.unCamelCase, String), t(_$.unescapeHTML, String), t(_$.unionArrays, Array, "union"), t(_$.uniqueArray, Array, "unique"), t(_$.urlQuery, String), t(_$.widows, String)
};
let n = {
    addDaysToDate,
    addEventListeners,
    addMinutesToDate,
    addStyles,
    animate,
    arrayDiff,
    arrayToCSV,
    attributes,
    averageBy,
    blendColors,
    browser,
    byteSize,
    camelCase,
    capitalize,
    clone,
    compStyle,
    composeFunction,
    contains,
    context,
    cookies,
    copy,
    count,
    create,
    createElement,
    curryFunction,
    dayName,
    debounce,
    deburr,
    diff,
    disableRightClick,
    dispatch,
    drag,
    each,
    ease,
    editDistance,
    elementContains,
    elementReady,
    elementSiblings,
    equals,
    escapeHTML,
    factorial,
    fastestFunction,
    flatten,
    flattenObj,
    forTemplateLiteral,
    formToObject,
    formatHTML,
    formatMilliseconds,
    formatNumber,
    fullScreen,
    gcd,
    getHTML,
    getImages,
    getJSON,
    hash,
    hashString,
    hexToRGB,
    htmlToImage,
    hub,
    imageToData,
    inPartialView,
    inView,
    injectCSS,
    inlineCSS,
    isAsync,
    isDateValid,
    isPrime,
    jaroDistance,
    jsonToCsv,
    juxt,
    lightOrDark,
    lightenColor,
    limitArgs,
    listen,
    loadScript,
    luhnCheck,
    mapObjectKeys,
    mapObjectValues,
    mapString,
    markdownToHTML,
    memoize,
    merge,
    mobileOrDesktop,
    nFlatten,
    notify,
    observeMutations,
    onOutsideClick,
    onScrollStop,
    parents,
    parseCookie,
    parseHTML,
    playSection,
    prefixCSS,
    preloadImage,
    previousPage,
    primesTo,
    prototype,
    querySelector,
    race,
    random,
    randomColor,
    range,
    regex,
    remove,
    removeComments,
    removeTags,
    renderElement,
    replaceBetween,
    replaceMultiple,
    replaceSelection,
    replaceText,
    requestInterval,
    resize,
    rgbToHex,
    ripple,
    runAsync,
    sanitize,
    saveBlob,
    scrambleString,
    seedRandom,
    serializeForm,
    shuffleArray,
    sleep,
    sortObj,
    sortTable,
    sortTableBy,
    soundex,
    speak,
    splice,
    spliceArrayBuffer,
    spread,
    syllables,
    tag,
    textNodes,
    throttle,
    tilt,
    timeFunction,
    titleCase,
    typeOf,
    unCamelCase,
    unescapeHTML,
    unionArrays,
    uniqueArray,
    urlQuery,
    uuid,
    waitUntil,
    widows
};
n = sortObj(n);
export default n;
e || (window._$ = n);
export const _$ = n;
if (e) try {
    module.exports = n
} catch (o) {
    console.error(o)
}

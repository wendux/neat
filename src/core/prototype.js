/**
 * Created by du on 16/9/28.
 */
import {$} from "./core.js"
export var prototype = {
        ready: function (callback) {
            if (/complete|loaded|interactive/.test(document.readyState)
                && document.body) {
                callback($)
            }
            else {
                this.on('DOMContentLoaded', function () {
                    callback($)
                }, false)
            }
            return this
        },

        each(callback){
            this.every(function (el, idx) {
                return callback.call(el, el, idx) !== false
            })
            return this;
        },

        on(evt, selector, fun){
            if ($.isString(selector)) {
                this.each(e => {
                    var funProxy;
                    $(e).on(evt, funProxy = ()=> {
                        var t = event.target;
                        $(t).attr("_", "_");
                        $(selector, e).each(el=> {
                            if (el == t || $("[_=_]", el).indexOf(t) != -1) {
                                $(t).removeAttr("_");
                                fun.call(el, window.event);
                            }
                        })
                        //委托事件存根,解绑时会用
                        e._cb = e._cb || [];
                        e._cb.push({
                            n: evt + selector,
                            f: fun,
                            cb: funProxy
                        })
                    });
                })

            } else {
                this.each(e => {
                    e.addEventListener(evt, selector);
                })
            }
            return this;
        },

        off(event, selector, callback){
            if ($.isString(selector)) {
                this.each(e => {
                    if (e._cb) {
                        //反向遍历删除元素
                        for (var i = e._cb.length - 1; i > -1; --i) {
                            var _stub = e._cb[i];
                            if (_stub.n == event + selector && _stub.f == callback) {
                                e._cb.splice(i, 1);
                                $(e).off(event, _stub.cb)
                            }
                        }
                    }
                })
            } else {
                this.each(e => {
                    e.removeEventListener(event, selector);
                })
            }
            return this;
        },

        eq(index){
            return $(this[index])
        },
        first(){
            return $(this[0]);
        },

        last(){
            return $(this[this.length - 1]);
        },
        add(o){
            var t = this.slice(0);
            t.push.apply(t, $(o));
            $._b = this
            return $(t);
        },

        parents(selector){
            var n = $(selector);
            var t = [];
            this.each(function (e) {
                e = $(e).parent()
                for (; e.length > 0;) {
                    if (n.indexOf(e[0]) > -1) {
                        t.push(e[0])
                        break;
                    }
                    e = e.parent();
                }
            })
            $._b=this;
            return $(t);
        },

        text(s, type){
            type = type || "textContent";
            if (s) {
                type = this.each(e=> {
                    e[type] = s;
                })
            } else {
                type = this[0] ? this[0][type] : "";
            }
            return type;
        },

        html(s){
            return this.text(s, "innerHTML");
        },

        children(){
            var t = [];
            this.each(e=> {
                t.push.apply(t, e.childNodes);
            });
            return $(t.filter(e=> {
                return e.nodeType == 1
            }));
        },

        css(mix, value){
            var t = {};
            if (value) {
                t[mix] = value
            } else if ($.isObject(mix)) {
                t = mix;
            }

            if (JSON.stringify(t) != "{}") {
                //$.autoFix.forEach(e=> {
                //    t[e] = t[e] && parseFloat(t[e]) + "px";
                //})
                return this.each(e=> {
                    $.extend(e.style, t);
                })
            } else {
                return this[0] && getComputedStyle(this[0])[mix];
            }
        },

        hide(){
            return this.each(e=> {
                if($(e).css("display")!="none") {
                    $(e).attr("od", $(e).css("display")).css("display", "none");
                }
            })
        },

        show(){
            return this.each(e=> {
                $(e).css("display", $(e).attr("od"));
            })
        },

        attr(name, value){

            if (value != undefined) {
                return this.each(e=> {
                    if (name == "value") {
                        e.value = value
                    } else {
                        e.setAttribute(name, value)
                    }
                })
            } else {
                return this[0] && this[0].getAttribute(name) || "";
            }
        },

        val(value){
            if (!value) {
                return this[0] ? this[0].value : "";
            } else {
                return this.attr("value", value)
            }
        },

        removeAttr(name){
            return this.each(e=> {
                e.removeAttribute(name)
            })
        },

        hasClass(cls) {
            var first = this[0]
            if (!(first && first.className)) return false;
            return !!first.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        addClass(cls) {
            return this.each(f => {
                if (!$(f).hasClass(cls)) {
                    f.className += " " + cls
                }
            })
        },

        removeClass(cls) {
            return this.each(f => {
                if ($(f).hasClass(cls)) {
                    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                    f.className = f.className.replace(reg, ' ');
                }
            })
        },

        find(selector){
            var t = []
            this.each(e=> {
                var list = e.querySelectorAll(selector)
                list && t.push.apply(t, list)
            })
            return $(t)
        },
        end  () {
            return this._b;
        },

        append(content){
            return this.each((e, index)=> {
                if (index > 0
                    && ($.isObject(content) || $.trim(content)[0] != '<')) {
                    return false;
                }
                $(content).each(x=> {
                    e.appendChild(x);
                })
            })

        },

        appendTo(s){
            $(s).eq(0).append(this);
            return this;
        },

        before(ref){
            var t = $(ref);
            return this.each(e=> {
                t.parent()[0].insertBefore(e, t[0])
            })
        },

        remove(){
            return this.each(e=> {
                $(e).parent()[0].removeChild(e);
            })
        },

        trigger(event){
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            return this.each((e)=> {
                e.dispatchEvent(evt)
            })
        },

        animate(styles, speed){
            speed = speed || 500
            return $.Deferred((d)=> {
                var start = {};
                for (var k in styles) {
                    start[k] = parseFloat(this.css(k))
                }
                $.animate(speed, styles, (t)=> {
                    for (var i in styles) {
                        this.css(i, start[i] + t / speed * (styles[i] - start[i]))
                    }
                    if (t == speed) {
                        d.resolve(this)
                    }
                })
            }).promise();
        }
    }

    ;
["parentElement", "previousElementSibling", "nextElementSibling"]
    .forEach(e=> {
        var i = !e.lastIndexOf("par") ? 6 : 4;
        prototype[e.substr(0, i)] = function () {
            var t = [];
            this.each(ele=> {
                if (ele[e]) {
                    t.push(ele[e]);
                }
            })
            return $(t);
        }
    })

;
["click", "tap", "longTap", "singleTap", "doubleTap", "swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown"]
    .forEach(e=> {
        prototype[e] = function (cb) {
            if (!cb) {
                this.trigger(e)
            } else {
                this.on(e, cb);
            }
            return this;
        }
    })

;
["map", "filter"].forEach(e=> {
    prototype[e] = function () {
        return $([][e].apply(this, arguments))
    }
})


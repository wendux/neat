/**
 * Created by du on 16/9/28.
 */
import {Touch} from "./touch"

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
            return callback(el, idx) !== false
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
                            fun.call(el);
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
                // if(TouchEvents.indexOf(evt)!=-1){
                //     if(!e.__) {
                //         var touch = new Touch($(e), evt);
                //         touch.start();
                //         e.__=1;
                //     }
                // }
                e.addEventListener(evt, selector);
            })
        }
        return this;
    },

    off(event, selector, callback){
        if ($.isString(selector)) {
            this.each(e => {
                if (e._cb) {
                    //遍历数组过程中要删除元素,故反向遍历
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
        return $(this[index]);
    },

    last(){
        return $(this.pop());
    },

    add(o){
        [].push.apply(this, $(o));
        return this;
    },

    text(s, type){
        type = type || "textContent";
        if (s) {
            type = this.each(e=> {
                e[type] = s;
            })
        } else {
            type = this[0][type];
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
        return $($.unique(t).filter(e=> {
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
            var s = ["height", "width", "fontSize", "top", "left", "right", "bottom"]
            s.forEach(e=> {
                t[e] = t[e] && parseFloat(t[e]) + "px";
            })
            return this.each(e=> {
                $.extend(e.style, t);
            })
        } else {
            return this[0] && getComputedStyle(this[0])[mix];
        }
    },

    hide(){
        return this.each(e=> {
            $(e).attr("od", $(e).css("display")).css("display", "none");
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
                e.setAttribute(name, value)
            })
        } else {
            return this[0] && this[0].getAttribute(name);
        }
    },

    removeAttr(name){
        return this.each(e=> {
            e.removeAttribute(name)
        })
    },

    hasClass(cls) {
        return !!this[0].className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
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
        return $(selector, this[0]);
    },

    append(content){
        var to = $(content);
        return this.each(e=> {
            to.each(x=> {
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
            t.parent()[0].insertBefore(e, t[0]);
        })
    },

    remove(){
        this.each(e=> {
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
                    d.resolve()
                }
            })
        }).promise();
    }
}

var t = ["parentElement", "previousSibling", "nextSibling"]
t.forEach(e=> {
    var i = !e.lastIndexOf("par") ? 6 : 4;
    prototype[e.substr(0, i)] = function () {
        var t = [];
        this.each(ele=> {
            t.push(ele[e]);
        })
        return $($.unique(t));
    }
});

//注册touch事件便捷函数
// var TouchEvents= ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap'];
// TouchEvents.forEach(function (eventName) {
//     prototype[eventName] = function () {
//         return this.on(eventName, arguments[0])
//     }
// });
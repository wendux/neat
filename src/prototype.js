/**
 * Created by du on 16/9/28.
 */

export var prototype = {

    each(callback){
        this.forEach(callback);
        return this;
    },

    on(event, callback){
        this.each(e => {
            e.addEventListener(event, callback, false);
        })
        return this;

    },

    off(event, callback){
        this.each(e => {
            e.removeEventListener(event, callback, false);
        })
        return this;
    },

    tap(callback){
        return this.on("touchend", callback);
    },

    tap(callback){
        return this.on("touchend", callback);
    },

    eq(index){
        return $(this[index]);
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
            this.each(e=> {
                $.extend(e.style, t);
            })
            return this;
        } else {
            return this[0] && this[0].style[mix];
        }
    },

    attr(name, value){
        if (value != undefined) {
            this.each(e=> {
                e.setAttribute(name, value)
            })
            return this;
        } else {
            return this[0] && this[0].getAttribute(name);
        }
    },

    removeAttr(name){
        this.each(e=> {
            e.removeAttribute(name)
        })
        return this;
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
        this.each(f => {
            if ($(f).hasClass(cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                f.className = f.className.replace(reg, ' ');
            }
        })
        return this;
    },

    find(selector){
        return $(selector, this[0]);
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
})
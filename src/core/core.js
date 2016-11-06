/**
 * Created by du on 16/9/28.
 */
import {method} from "./statics"
import {prototype} from "./prototype"

function parseDom(arg) {
    if ($.isObject(arg)) return arg;
    arg = $.trim(arg);
    if (arg[0] != "<") {
        return document.createElement(arg);
    }
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;
}

var neat = function (selector, context) {
    Array.call(this);
    context = context || document
    var t = [];
    if (selector) {
        if ($.isFunction(selector)) {
            return $(document).ready(selector);
        } else if ($.isString(selector)) {
            selector = $.trim(selector);
            if (selector[0] != "<") {
                t = $(context).find(selector)
                return t
            } else {
                t = parseDom(selector);
            }
        } else if ($.isObject(selector)
            //window also has length prop.
            && selector != window
            && selector.length !== undefined) {
            //ArrayLike object
            t = selector;
        } else {
            //一般对象
            t = [selector];
        }
        //$._b指向上一个结果集

    }
    if (t[0] == document||t[0]== window){
        $._b =null;
    }else {
        this._b = $._b;
        $._b = this;
    }
    [].push.apply(this, $.unique(t));

};

export function $(selector, context) {
    return new neat(selector, context);
}

$.fn = neat.prototype = Object.create(Array.prototype);
method.extend($, method);
$.extend($.fn, prototype);




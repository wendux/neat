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
    var t = [];
    context = context || document;
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
            && selector != window
            && selector.length !== undefined) {
            t = selector;
        } else {
            t = [selector];
        }
        [].push.apply(this, $.unique(t));
    }
};

export function $(selector, context) {
    return new neat(selector, context);
}

$.fn = neat.prototype = Object.create(Array.prototype);
method.extend($, method);
$.extend($.fn, prototype);




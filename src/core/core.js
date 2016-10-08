/**
 * Created by du on 16/9/28.
 */
import {method} from "./statics"
import {prototype} from "./prototype"

function parseDom(arg) {
    if($.isObject(arg)) return arg;
    arg= $.trim(arg);
    if(arg[0]!="<"){
        return document.createElement(arg);
    }
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes;
}

var neat = function (selector, context) {
    Array.call(this);
    var t;
    context=context||document;
    if($.isFunction(selector)){
      return $(document).ready(selector);
    }else if ($.isString(selector)) {
        selector=$.trim(selector);
        if(selector[0]!="<") {
            t = context.querySelectorAll(selector)
        }else{
            t = parseDom(selector);
        }
    } else if (selector instanceof Array) {
        t = selector;
    } else {
        t = [selector];
    }
    [].push.apply(this, t);

};

export function $(selector, context) {
    return new neat(selector, context);
}

$.fn = $.prototype = neat.prototype = Object.create(Array.prototype);
method.extend($, method);
$.extend($.fn, prototype);



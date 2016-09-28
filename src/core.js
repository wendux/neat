/**
 * Created by du on 16/9/28.
 */
import {method} from "./statics"
import {prototype} from "./prototype"
var _dQuery = function (selector, context = document) {
    Array.call(this);
    var t;
    if (typeof selector === "string") {
        t = context.querySelectorAll(selector)
    } else if (selector instanceof Array) {
        t = selector;
    } else {
        t = [selector];
    }
    [].push.apply(this, t);

};

export function $(selector, context) {
    return new _dQuery(selector, context);
}
$.fn = $.prototype = _dQuery.prototype = Object.create(Array.prototype);
method.extend($, method);
$.extend($.fn, prototype);



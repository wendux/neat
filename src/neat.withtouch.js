/**
 * Created by du on 16/9/28.
 */
import {$} from "./core/core"
import {Touch} from "./core/touch"
var events= ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap', 'drag'];
events.forEach(function (eventName) {
    $.fn[eventName] = function () {
        var touch = new Touch($(this), eventName,arguments[1]);
        touch.start();
        return this.on(eventName, arguments[0])
    }
});
window.$=window.neat=$
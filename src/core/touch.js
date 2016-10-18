/**
 * Created by liux on 2016/10/17.
 */
import {$} from "./core.js"
var doubleTap ={}, singleTimer, longTapTimer;
var TapD = 7, SwipeD = 10, DoubleTapDelay = 300, LongTapDelay = 500, TapTimeout = 1000, TouchTimeout = 2000;
function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}
$(function () {
    var el, startTime, endTime, startX, startY, endX, endY;

    function Range() {
        return Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
    }

    function touchType() {
        var delay = endTime - startTime,
            range = Range();
        clearTimeout(longTapTimer);
        if (delay > TouchTimeout)return;//按住的时间超过2s取消所有事件
        if (range > SwipeD) {
            el.trigger('swipe');
            el.trigger('swipe' + swipeDirection(startX, endX, startY, endY));
            return
        } else if (range < TapD && delay < TapTimeout) {//按住超过1s取消所有tap类型的事件
            el.trigger('tap');
            if(delay < DoubleTapDelay){
                if(el[0] === doubleTap.el && (Date.now()-doubleTap.startT) < 300){
                    doubleTap = {};
                    el.trigger('doubleTap');
                    clearTimeout(singleTimer);
                }else {
                    doubleTap.el = el[0];
                    doubleTap.startT = startTime;
                    singleTimer = setTimeout(function () {
                        el.trigger('singleTap')
                    },DoubleTapDelay);
                }
            }
        }
    }

    $(document)
        .on('touchstart', function (e) {
            el = $(event.target);
            startTime = Date.now();
            startX = endX = e.touches[0].pageX;
            startY = endY = e.touches[0].pageY;
            longTapTimer = setTimeout(function () {
                if (Range() < TapD) el.trigger('longTap')
            }, LongTapDelay);
        })
        .on('touchmove', function (e) {
            if (!el || e.target !== el[0])return;
            endX = e.touches[0].pageX;
            endY = e.touches[0].pageY;
        })
        .on('touchend', function (e) {
            if (!el || e.target !== el[0])return;
            endTime = Date.now();
            touchType();
        })
        .on('touchcancel', function () {
            if (!el || e.target !== el[0])return;
            clearTimeout(longTapTimer)
        });
})

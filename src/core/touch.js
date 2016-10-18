/**
 * Created by du on 16/9/29.
 */
import {$} from "./core.js"
export var Touch = function (target,event) {
    this.target = target;
    this.e = event;
    this.options=$.extend({x: 100, y: 50,t:800}, $.options)
};
function _getEvent (e) {
    var touchs=e.changedTouches;
    if (touchs){
        e= e.touchs[0];
    }
    else {
        e= e.targetTouches[0]
    }
    return e;
}
Touch.prototype.start = function () {
    var self = this;
    self.target.on("touchstart", function (event) {
        var temp = _getEvent(event);
        self.ts = {x: temp.pageX, y: temp.pageY, d: new Date}
    });
    self.target.on("touchmove", function (event) {
        var temp = _getEvent(event);
        self.tm = {x: temp.pageX, y: temp.pageY};
        //drag事件是个鸡肋,不支持
        //if (self.e == "drag") {
        //    $(event.target).trigger(self.e, self.tm);
        //}
    });
    self.target.on("touchend", function () {
        if (!self.tm) {
            self.tm = self.ts
        }
        self.te = {x: self.tm.x - self.ts.x, y: self.tm.y - self.ts.y, d: (new Date - self.ts.d)};
        self.tm = undefined;
        self.factory()
    })
};
Touch.prototype.factory = function () {
    var x = Math.abs(this.te.x);
    var y = Math.abs(this.te.y);
    var t = this.te.d;
    var s ;
    if (x < 5 && y < 5) {
        if (t < 300) {
            s = "tap"
        } else {
            s = "longTap"
        }
    }
    else if (x > this.options.x && y < this.options.y ) {
        if (t < this.options.t) {
            if (this.te.x > 0) {
                s = "swipeRight"
            } else {
                s = "swipeLeft"
            }
        } else {
            s = "swipe"
        }

    } else if (x < this.options.x && y > this.options.y) {
        if (t < this.options.t) {
            if (this.te.y > 0) {
                s = "swipeDown"
            } else {
                s = "swipeUp"
            }
        } else {
            s = "swipe"
        }
    }else if(x>this.options.x&&y>this.options.y){
        if (t < this.options.t) {
            if (this.options.x < this.options.y){
                if (this.te.y > 0) {
                    s = "swipeDown"
                } else {
                    s = "swipeUp"
                }
            }
            else {
                if (this.te.x > 0) {
                    s = "swipeRight"
                } else {
                    s = "swipeLeft"
                }
            }
        }else{
            s = "swipe"
        }
    }
    $(event.target).trigger(s);
}



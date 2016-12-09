/**
 * Created by du on 16/9/28.
 */
//静态方法
import {deferred} from "./deferred"
import {ajax} from "./adjax"
import {$} from "./core"
export var method = {
    extend(target, ob){
        for (var i in ob) {
            Object.hasOwnProperty()
            target[i] = ob[i];
        }
        return target;
    },

    //要支持dom数组
    unique(arrayLike){
        if (!arrayLike.length) return arrayLike;
        var res = [arrayLike[0]];
        for (var i = 1; i < arrayLike.length; i++) {
            if (res.indexOf(arrayLike[i]) < 0) {
                res.push(arrayLike[i]);
            }
        }
        return res;
    },
    trim(s){
        return s.replace(/(^\s*)|(\s*$)/g, '')
    },
    animate(speed, argvs, callback){
        if (speed < 30) speed = 30;
        var f = callback || argvs
        var _run = requestAnimationFrame;
        if (!callback) {
            argvs = undefined
        }
        function proxy() {
            var c = new Date - start;
            if (c >= speed) {
                f(speed, argvs);
                return;
            }
            f(c, argvs);
            _run(proxy);
        }

        var start = new Date;
        _run(proxy)
    },
    jsonp(url, callback) {
        var tag = "neatJsonp";
        if (!$[tag]) {
            $[tag] = 1;
        }
        var cbName = tag + $[tag]
        window[cbName] = callback;
        $(document.createElement('script'))
            .attr("src", url + cbName)
            .on("load", function (e) {
                $(this).remove()
                delete window[cbName];
            })
            .appendTo("body")
        ++$[tag]
    },
    qs(e){
        return qs[e];
    },
    //autoFix:["height", "width", "fontSize", "top", "left", "right", "bottom"],
    Deferred: deferred
}
var qs = [];
var a = decodeURI(location.search.substr(1)).split('&');
for (var b = 0; b < a.length; ++b) {
    var temp = a[b].split('=');
    qs[temp[0]] = temp[1] ? temp[1] : null;
}
var testFuns = ["Object", "Function", "String"]
testFuns.forEach(e=> {
    method["is" + e] = (o)=> {
        return (typeof o) === e.toLowerCase();
    }
})
method.extend(method, ajax)

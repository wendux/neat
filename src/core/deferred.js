/**
 * Created by du on 16/9/28.
 */
import {$} from "./core"
function Deferred(task) {
    var _callback = [[], [], []];
    var _state = 0;
    var _then = (tag, ...callback)=> {
        for (var i = 0; i < callback.length; ++i) {
            if (_state == 1) return;
            if (callback[i]) {
                _callback[i].push(callback[i])
                callback[i].tag = tag
            }
        }
        return promise;
    }
    var promise = {
        then(){
            var t = [0];
            return _then.apply(null, t.concat(t.slice.call(arguments)))
        },
        done(success){
            return _then(1, success);
        },
        fail(fail){
            return _then(1, null, fail);
        },
        always(fun){
            return _then(1, fun, fun);
        }
    }

    $.extend(this, {
        resolve(value){
            var t = value;
            _callback[0].every(fun=> {
                if (_state == 1) return false;
                value = fun.call(this, value);
                value = fun.tag ? t : value;
                return true;
            })
        },
        reject(error){
            _state = 1;
            _callback[1].forEach(fun=> {
                fun.call(this, error);
            })
        },
        promise(){
            return promise;
        }
    })
    task(this);
}
//在所有异步执行后回调
$.all = function () {
    var args = arguments;
    var result = [];
    var count = args.length;
    return $.Deferred(function (d) {
        for (var i = 0; i < args.length; ++i) {
            +function (i) {
                var o = args[i];
                //不是Deferred对象则直接执行
                if (!o.promise) {
                    o.call(d);
                    if (--count == 0) {
                        d.resolve(result);
                    }
                } else {
                    o.promise().done(function (data) {
                        result[i] = data;
                        if (--count == 0) {
                            d.resolve(result);
                        }
                    }).fail(function (err) {
                        d.reject(err);
                    });
                }
            }(i);
        }
    }).promise();
};

export function deferred(task) {
    return new Deferred(task);
}

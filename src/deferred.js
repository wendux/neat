/**
 * Created by du on 16/9/28.
 */

 function _Deferred(task) {
    var _callback = [[], [], []];
    var state = 1;
    var _then=(tag,...callback)=> {
        for (var i = 0; i < callback.length; ++i) {
            callback[i] && _callback[i].push(callback[i])
            callback[i].tag = tag
        }
        return promise;
    }
    var promise = {
        then(){
            var t=[0];
            return _then.apply(null, t.concat(t.slice.call(arguments)))
        },
        done(success){
            return _then(1,success);
        },
        fail(fail){
            return _then(1,null, fail);
        },
        always(fun){
            return _then(1,fun, fun);
        }
    }
    $.extend(this, {
        resolve(value){
            state = 1;
            var t=value;
            for (let fun of _callback[0]) {
                value = state && fun(value, this);
                value=fun.tag?t:value;
            }
        },
        reject(error){
            state = 0;
            for (let fun of _callback[1]) {
                value = fun(error, this);
            }
        },
        notify(progress){

        },
        promise(){
            return promise;
        }
    })
    task(this);
}

export function Deferred(task){
    return new _Deferred(task);
}

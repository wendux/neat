/**
 * Created by du on 16/9/28.
 */

 function Deferred(task) {
    var _callback = [[], [], []];
    var _state = 0;
    var _then=(tag,...callback)=> {
        for (var i = 0; i < callback.length; ++i) {
            if(_state==1) return;
            if(callback[i]) {
                _callback[i].push(callback[i])
                callback[i].tag = tag
            }
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
            var t=value;
            for (let fun of _callback[0]) {
                if(_state==1) return;
                value = fun.call(this,value);
                value=fun.tag?t:value;
            }
        },
        reject(error){
            _state=1;
            for (let fun of _callback[1]) {
                fun.call(this,error);
            }
        },
        promise(){
            return promise;
        }
    })
    task(this);
}

export function deferred(task){
    return new Deferred(task);
}

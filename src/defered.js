/**
 * Created by du on 16/9/28.
 */

export function defered(task) {
    var _callback = [[], [], []];
    var state = 1;
    var promise = {
        then(...callback){
            for (var i = 0; i < callback.length; ++i) {
                callback[i] && _callback[i].push(callback[i])
            }
            return this;
        },
        done(success){
            return this.then(success);
        },
        fail(fail){
            return this.then(null, fail);
        },
        always(fun){
            return this.then(fun, fun);
        }
    }
    $.extend(this, {
        resolve(value){
            state = 1;
            for (let fun of _callback[0]) {
                value = state && fun(value, this);
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
    task();
    return this;
}

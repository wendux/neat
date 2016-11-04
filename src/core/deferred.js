/**
 * Created by du on 16/9/28.
 */
import {$} from "./core"
function Deferred(task) {
    var callbacks = [[], [], [],[]];
    //promise标准有三种状态,pending(0),fulfilled(1),rejected(2)
    //Neat为了提供优雅的错误处理,对promise进行了扩展,增加了第四种状态,
    //异常态throwed(3),代表当前链有抛出异常,处于异常状态。这会触发所有
    // 异常回调。默认为pending态
    var promiseState = 0;
    var saveCallbacks =function() {
        var argv=arguments
        for (var i = 0; i < argv.length; ++i) {
            //if (_state ) return;
            if (argv[i]) {
                callbacks[i].push(argv[i])
            }
        }
        return promise;
    }
    var promise = {
        //接收三个参数,分别是成功回调、失败回调、异常回调
        then(){
            var newDeferred= $.Deferred();
            var argv=[].slice.call(arguments)
            var successCallback=argv[0];
            //var newPromise=newDeferred.promise();
            argv[0]=(result)=>{
                    var ret = successCallback(result)
                    if (ret instanceof Deferred) {
                        ret = ret.promise()
                    }
                    if ($.isObject(ret) && ret._npt) {
                        ret.done((data)=> {
                                newDeferred.resolve(data)
                            })
                            .fail((e)=> {
                                newDeferred.reject(e)
                            })
                    } else {
                        newDeferred.resolve(ret)
                    }
            }

            //pass reject and exception
            //argv[1]=(e)=>{
            //    arguments[1]&&arguments[1](e)
            //    newDeferred.notify(e,2,true) ;
            //
            //}
            //
            //argv[2]=(e)=>{
            //    arguments[2]&&arguments[2](e)
            //    newDeferred.notify(e,3,true) ;
            //}

            //pass reject and exception
            [1,2,3].forEach((state)=>{
                argv[state]=(data)=>{
                    arguments[state]&&arguments[state](data)
                    newDeferred.emit(data,state+1,this,true) ;
                }
            })

           saveCallbacks.apply(null,argv)
           return newDeferred.promise();
        },
        done(success){
            return saveCallbacks(success);
        },
        fail(fail){
            return saveCallbacks(null, fail);
        },
        always(fun){
            return saveCallbacks(fun, fun);
        },
        catch(fun){
            callbacks[2].push(fun);
            return this
        },
        progress(fun){
           callbacks[3].push(fun)
           return this
        },
        //promise对象的标签,
        _npt:1
    }
    //noChange为true则不改变promiseState,默认为false
    var safeCall=function(state,value,context,noChange){
        //若 promiseState不为pending态(0),则终止
        if(promiseState) return;
        context=context||promise;
        try {
            callbacks[state-1].forEach(fun=> {
                fun.call(context,value);
            })
        }catch(e){
            if (!callbacks[2].length&&state==3)
                throw e;
            callbacks[2].forEach(fun=>{
                fun.call(context,e);
            })
        }
        noChange||state<4&&(promiseState=state)
    }
    $.extend(this, {
        resolve(value,context){
            safeCall(1,value,context)
        },
        reject(error,context){
            safeCall(2,error,context)
        },
        notify(progress,context){
           safeCall(4,progress,context)
        },
        emit(data,state,context,changeState){
           safeCall(state,data,context,!changeState)
        },
        promise(){
            return promise;
        }
    })

    setTimeout(()=>{task&&task(this)},0)
}
//在所有异步执行后回调,参数是Deferred/promise对象列表
$.all = function () {
    var args = arguments;
    var result = [];
    var count = args.length;
    return $.Deferred(function (d) {
        for (var i = 0; i < args.length; ++i) {
            +function (i) {
                var o = args[i];
                    //确保o为promise对象
                    if(o.promise){
                        o= o.promise();
                    }
                    o.done(function (data) {
                        result[i] = data;
                        if (--count == 0) {
                            d.resolve(result);
                        }
                    }).fail(function (err) {
                        d.reject(err);
                    });
            }(i);
        }
    }).promise();
};

export function deferred(task) {
    return new Deferred(task);
}

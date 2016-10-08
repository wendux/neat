/**
 * Created by du on 16/9/28.
 */
//静态方法
import {deferred} from "./deferred"
import {ajax} from "./adjax"
export var method = {
    extend(target, ob){
        for (var i in ob) {
            target[i] = ob[i];
        }
        return target;
    },
    unique(arrayLike){
        arrayLike.sort();
        var res = [arrayLike[0]];
        for (var i = 1; i < arrayLike.length; i++) {
            if (arrayLike[i] !== res[res.length - 1]) {
                res.push(arrayLike[i]);
            }
        }
        return res;
    },
    trim(s){
       return s.replace(/(^\s*)|(\s*$)/g,'')
    },
    animate(speed,argvs,callback){
        if(speed<30) speed=30;
        var f=callback||argvs
        var _run=requestAnimationFrame;
        argvs=callback||undefined;
        function proxy(){
            var c=new Date-start;
            if(c>=speed) { f(speed,argvs); return;}
            f(c,argvs);
            _run(proxy);
        }
        var start=new Date;
        _run(proxy)
    },

    Deferred: deferred
}
var testFuns=["Object","Function","String"]
testFuns.forEach(e=>{
    method["is"+e]=(o)=>{
        return (typeof o) === e.toLowerCase();
    }
})
method.extend(method,ajax)

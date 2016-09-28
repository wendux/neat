/**
 * Created by du on 16/9/28.
 */
//静态方法
import {defered} from "./defered"
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
    isObject(o){
        return typeof o === "object"
    },
    isString(s){
        return typeof s === "string"
    },
    Deferred: defered
}
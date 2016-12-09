/**
 * Created by du on 16/9/28.
 */
import {$} from "./core"
import {deferred} from "./deferred"
function formatParams(data) {
    var arr = [];
    var _encode = encodeURIComponent;
    for (var name in data) {
        arr.push(_encode(name) + "=" +_encode(data[name]));
    }
    return arr.join("&");
}
export var ajax = {
    ajax(url = "", data, options) {
        var xhr;
        var promise = deferred((defer)=> {
            options = $.extend({type: "GET"}, options);
            var params = formatParams(data);
            xhr = new XMLHttpRequest();
            //已废弃,通过$.ajax().xhr.onxx直接设置
            //处理用户提供的额外的回调,如onprogress,onabort
            //for (var callback in options) {
            //    if (callback.indexOf("on") == 0) {
            //        xhr[callback] = options[callback]
            //    }
            //}
            xhr.onreadystatechange =()=> {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        defer.resolve(xhr.responseText,xhr);
                    } else {
                        defer.reject(status,xhr);
                    }
                }
            }
            xhr.onprogress=(event)=>{
                defer.notify(event,xhr)
            }

            if (options.type.toUpperCase() == "GET") {
                xhr.open("GET", url + "?" + params, true);
            } else {
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            for (var k in options.header) {
                xhr.setRequestHeader(k, options.header[k])
            }
            xhr.send(params[0] ? params : null);
        }).promise();
        promise.xhr = xhr;
        return promise;
    },
    get(url, data){
        return this.ajax(url, data);
    },
    post(url, data){
        return this.ajax(url, data, {type: "POST"});
    }
}


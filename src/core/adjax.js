/**
 * Created by du on 16/9/28.
 */

import {deferred} from "./deferred"
function formatParams(data) {
    var arr = [];
    var _encode = encodeURIComponent;
    for (var name in data) {
        arr.push(_encode(name) + "=" + _encode(data[name]));
    }
    return arr;
}
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
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
            //处理用户提供的额外的回调,如onprogress,onabort
            for (var callback in options) {
                if (callback.indexOf("on") == 0) {
                    xhr[callback] = options[callback]
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        defer.resolve(xhr.responseText);
                    } else {
                        defer.reject(xhr);
                    }
                }
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
        //{"accept", "application/json, text/javascript, */*; q=0.01"}
        return this.ajax(url, data);
    },
    post(url, data){
        return this.ajax(url, data, {type: "POST"});
    }
}


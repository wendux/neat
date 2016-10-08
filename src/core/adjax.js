/**
 * Created by du on 16/9/28.
 */

import {deferred} from "./deferred"
function formatParams(data) {
    var arr = [];
    var _encode=encodeURIComponent;
    for (var name in data) {
        arr.push(_encode(name) + "=" + _encode(data[name]));
    }
    return arr;
}
export var ajax = {
    ajax(url="",data,options) {
       return deferred((defer)=>{
            options = $.extend({type:"GET",dataType:"json"},options);
            var params = formatParams(data);
            var xhr = new XMLHttpRequest();
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
            xhr.send(params[0]?params:null);
        }).promise();
    },
    get(url,data){
      return this.ajax(url,data);
    },
    post(url,data){
        return this.ajax(url,data,{type:"POST"});
    }
}
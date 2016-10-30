/**
 * Created by du on 16/9/30.
 */
+function ($) {
    'use strict';
    //扩展字符串原型
    $.extend(String.prototype, {
        format: function () {
            var args = [].slice.call(arguments);
            var count = 0;
            return this.replace(/%s/g, function (s, i) {
                return args[count++];
            });
        },
        trim: function () {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        },
        empty: function () {
            return this.trim() === "";
        }
    });

    //解析query string
    $.log = console.log.bind(console);
    var qs = [];
    var s = decodeURI(location.search.substr(1));
    var a = s.split('&');
    for (var b = 0; b < a.length; ++b) {
        var temp = a[b].split('=');
        qs[temp[0]] = temp[1] ? temp[1] : null;
    }

    //扩展静态方法 qs为获取query参数名取值
    $.qs = function (e) {
        return qs[e];
    };

    //扩展neat原型
    $.extend($.fn, {
        fadeOut: function (speed) {
            var s=this;
            return s.animate({opacity: 0}, speed || 800)
                .done(function(){
                    s.hide();
                });
        },
        fadeIn: function (speed) {
            return this.show().animate({opacity: 1}, speed || 800);
        }
    });

}(neat);
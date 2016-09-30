/**
 * Created by du on 16/9/30.
 */
+function ($) {
    'use strict';
    //扩展字符串原型
    $.extend(String.prototype, {
        format: function format() {
            var args = Array.prototype.slice.call(arguments);
            var count = 0;
            return this.replace(/%s/g, function (s, i) {
                return args[count++];
            });
        },
        trim: function trim() {
            return this.replace(/(^\s*)|(\s*$)/g, '');
        },
        empty: function empty() {
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

    //在所有异步执行后回调
    $.all = function () {
        var args = arguments;
        var result = [];
        var count = args.length;
        return $.Deferred(function (d) {
            for (var i = 0; i < args.length; ++i) {
                +function (i) {
                    var o = args[i];
                    console.log(o)
                    //不是Deferred对象
                    if (!o.promise) {
                        o.call(d);
                        if (--count == 0) {
                            d.resolve(result);
                        }
                    } else {
                        o.promise().done(function (data) {
                            result[i] = data;
                            if (--count == 0) {
                                d.resolve(result);
                            }
                        }).fail(function (err) {
                            d.reject(err);
                        });
                    }
                }(i);
            }
        }).promise();
    };

    //扩展neat原型
    $.extend($.fn, {
        fadeOut: function fadeOut(speed) {
            return this.animate({opacity: 0}, speed || 800);
        },
        fadeIn: function fadeIn(speed) {
            return this.animate({opacity: 1}, speed || 800);
        }
    });

}(neat);
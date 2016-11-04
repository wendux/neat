/**
 * Created by du on 16/9/30.
 */
+function ($) {
    'use strict';
    //扩展字符串原型
    //$.extend(String.prototype, {
    //    format: function () {
    //        var args = [].slice.call(arguments);
    //        var count = 0;
    //        return this.replace(/%s/g, function (s, i) {
    //            return args[count++];
    //        });
    //    },
    //    trim: function () {
    //        return this.replace(/(^\s*)|(\s*$)/g, '');
    //    },
    //    empty: function () {
    //        return this.trim() === "";
    //    }
    //});

    $.log = console.log.bind(console);

    //扩展neat原型
    $.extend($.fn, {
        fadeOut: function (speed) {
            var s = this;
            s.animate({opacity: 0}, speed || 800)
                .done(function () {
                    s.hide();
                });
            return s;
        },
        fadeIn: function (speed) {
            this.show().animate({opacity: 1}, speed || 800);
            return this;
        },
        //包括通过css伪类选择器添加的内容
        allText:function(){
            var el=this[0]
            var _text=function (pe){
                return  getComputedStyle(el,pe)
                    .getPropertyValue('content').replace(/"/g,"")
            }
            return el&&_text(":before")+$(this).text()+_text(":after")
        }
    });

    //example/plugin.html中有使用示例
    $.jsonp = function (url, callback) {
        var tag = "neatJsonp";
        if (!$[tag]) {
            $[tag] = 1;
        }
        var cbName = tag + $[tag]
        window[cbName] = callback;
        $(document.createElement('script'))
            .attr("src", url + cbName)
            .on("load", function (e) {
                $(this).remove()
                delete window[cbName];
            })
            .appendTo("body")
        ++$[tag]
    }

}(neat);
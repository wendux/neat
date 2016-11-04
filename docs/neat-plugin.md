# 插件

Neat提供了良好的扩展性，你可以添加任何自定意功能，为了能够使用jQuery现有的插件（有大量优秀的插件），Neat插件接口兼容jQuery。Neat插件本质上是对Neat对象的扩展，有两种扩展方式：

- 对neat对象扩展静态方法；不依赖于dom，不支持链式调用，常用于全局工具函数。
- 对neat原型进行扩展；可以操作neat结果集，支持链式调用，常用于操作dom.

## 扩展静态方法



我们先来看第一种扩展，下面为neat 扩展一个log方法，作为日志工具：

```javascript
$.log=console.log.bind(console)
> $.log("hi")
> hi
//和jQuery类似，$为neat别名
> neat.log("hi") 
> hi
```

这个例子很简单，下面我们看一下neat.plugin.util里面使用工具 $.jsonp的实现，*JSONP*即JSON with Padding，主要用于跨域交换数据，如果你还不知道其原理，请先自行了解一下或移步 [JSONP工作原理是什么?](https://www.zhihu.com/question/19966531) 。然后，我们再来看一下源码：

```javascript
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
//使用，这里jsonp.php可以是其它域的uri
$.jsonp("jsonp.php?callback=",function(data){
   console.log(data);
})
```

实现很简单，tag用于生成一个回调的编号，保存在neat的静态属性neatJsonp当中，每次调用后，其值都会加1，jsonp的原理是，将用户回调函数作为一个属性挂在window对象上，属性名为“neatJsonp”+当前回调编号（保证唯一性），这样也就变成了全局函数。然后动态创建一个script标签，将生成的函数名称追加到url之后， 然后在设置为script标签的src，如果是第一次调用，则src的值为 “jsonp.php?callback=neatJsonp1”，此时neatJsonp1（即window.neatJsonp1）为用户传入的回调，服务器通过callback参数就知道了我们回调函数的名称，一旦script加载成功，服务端返回的脚本中便会有neatJsonp1(data)这样调用，于是neatJson1函数便被调用，data即我们需要需要从其它域获取的数据，这样就实现了跨域数据交换。

回到代码，neat在设置完src属性后，监听 script标签的load事件，一旦加载完成（回调会先被执行）就移除script标签，同时删除neatJsonp1函数。可以看出，$.jsonp相当一个全局函数，你完全可以自定义一个函数实现这个功能，之所以要作为neat的静态方法，是在向使用者暗示了该函数内部实现上使用了neat方法，依赖于neat， 所以才可以叫它neat插件。如果你要给neat扩展多个静态方法，你可以这么做:

```javascript
$.extend($,{
  method1:function(){},
  method2:function(){}
})
```

neat推荐这种优雅的写法。

## 扩展原型方法

当你需要操作neat结果集或要支持链式调用时，那么可以扩展neat prototype[原型]，为了简洁并且和 jQuery兼容，neat为原型也定义了个别名变量 fn，即：$.fn==neat.prototype， 但是注意，**neat.prototype并不等于$.prototype**。下面我们看一下neat.plugin.util里面fadeOut和fadeIn的实现，功能是渐隐渐现当前结果集所有元素，由于需要操作结果集，我们需要对neat原型进行扩展，贴出代码：

```javascript

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
        this.show()
        .animate({opacity: 1}, speed || 800);
        return this;
    }
});
```

实现逻辑很简单，需要说明的是**原型扩展函数里的this均指向当前neat对象（结果集），如果需要支持链式操作，返回值必须是this（即当前的neat对象）**，这是标准的流程。这样一来，就可以在代码中这么调用了：

```javascript
//500毫秒内将所有div隐藏。
$("div").fadeOut(500).find("a")
```

当然，你可以使用animate函数实现各种狂拽炫酷吊炸天的动画，这里只是抛砖引玉。

## Neat patch

jQuery社区有这大量优秀的插件，Neat插件方式和jQuery兼容，其中大多数插件都可以不做修改或只做简单修改就可以移植到neat上来，那么在什么情况下需要修改？需要怎样修改？首先，我们得确定插件中使用的jQuery方法，如果使用的jQuery方法neat中都有实现，并接口一致，功能一致，那么事情就很简单了(大多数属于这一种)，jQuery插件一般的写法是这样：

```javascript
(function($){
  //具体逻辑
})(jQuery)
```

我们有两钟方法让它兼容neat。第一种: 将jQuery改为neat; 第二种：将neat赋给jQuery。第二种方法的前提是，你的项目不会引入jQuery，当然，如果你选择了neat，通常也就代表着放弃了jQuery。

如果jQuery插件内部使用到了neat不支持的方法，那么该怎么办？我们推荐 Neat patch 方案，简单来说就是给  neat打补丁，通过扩展neat方式实现插件依赖的方法。比如，有一个jQuery插件，内部依赖了 jQuery的 on、off、one三个方法，因为on、 off方法neat 已经实现，并且功能和借口于一致，那么我们需要在引入该插件之前给neat扩展一个one方法就行，patch代码如下：

```
$.fn.one=function(callback){
    $(this).on("click",function f(){
        callback()
        $(this).off("click",f)
    })
}
```

这样就可以了。或许你会说，这只是一个简单补丁，如果插件依赖过多的 neat为实现的函数怎么办？不用担心，一般插件都是作为一个独立的功能但原，对jQuery的依赖通长不大，很多时候就是创建dom、监听事件，以及简单的选择器，neat对核心的api基本都支持，通畅只需要简单的patch即可使用，如果真的有某个插件使用了大量neat没有的方法或不支持的特性，那么请放弃，至少，比较知名的插件中很少有。还有一个问题，即时只需要少量的patch, 可是我还是个菜鸟，写不了怎么办？当然，一个方法是取扣jQuery 的源码，但是我们不建议你这么做，因为你都说了是菜鸟，再让你去看jQuery源码，尼玛，这是故意的吗😂。开个玩笑😄，我们言归正传，我们的期望是在github上维护一个 patch库，希望大家能够将常用的patch push上去，众人拾柴火焰高么，如果你愿意请将你的patch放在patch目录下，大家会感恩你的付出，命名格式为xx.patch.neat.js 其中 xx为插件名称。如果您这是某些jQuery函数的neat实现版本，请将你的代码复制在funs.patch.neat.js。您在决定自己实现patch之前，可以先去patch目录下找找有没有现成的。这是传送门 [Neat patch ](https://github.com/wendux/Neat/tree/master/patch) 。


Neat是一个追求极致简洁 、优雅、高效 ，只为现代浏览器（支持es5+）的 javascript 库。
 ##Neat特点
1. 小：不到4k（min+gzip）。
2. 全：支持:Dom操作,Touch event,Ajax,动画,Promise/Deferred;兼容大多数jQuery api
3. 专：只为现代浏览器设计,移动端优先.
4. 雅：实现上极致简洁优雅，采用众多‘黑科技’。
5. 活：支持插件;可以与vue无缝融合。

##项目说明:
- Neat是继承自数组,所以neat对象可以使用所有原生数组的属性及方法,您完全可以把neat对象当成数组传递给其它函数
- Neat更加简洁,优雅,高效,总共8k左右(服务器启用gzip后仅3.4k).正是由于这一点,您再也不用纠结到项目到底是使用mvc还是dom操作框架了,有了neat之后,答案是:鱼于熊掌可以兼得.推荐使用neat+vue组合.

##neat使用说明:
1. 为了符合jQuery开发者习惯,neat对象别名依然是$,如果$占用,请使用命名空间或直接使用neat调用(而非美元符),一般来说,如果您使用了neat则不必再使用jquery或zepto,如果您非要这么做,额,我猜不透你的心思~.2.neat支持:Dom操作,Touch event,Ajax,动画,Promise/Deferred;
2. Neat支持插件,扩展方式请参考 neat.plugin.utils.js(兼容jquery扩展方式)4.neat支持的touch事件有: 应项目作者要求，添加事件部分自述： 'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap', 'singleTap', 'doubleTap' tap:第一时间触发，不会有延时 doubleTap: 在300ms内单击两次触发，如果有注册tap，tap也会触发 singleTap: 单击后等待300ms没有再次单击，再触发。（在同一个dom上需要，同时绑定单击和双击的时候使用） longTap：长按500ms后触发 swipe：滑动10px以上距离触发，不论什么方向 为了解决tap的300ms延迟引入singleTap事件，因为大多数情况下我们使用的是tap事件，为了保证tap立即执行， 并且解决双击事件与单击事件在同一个元素上绑定的情况，在此情况下使用singleTap，singleTap会等待300ms如果没有， 双击事件才触发。 注意: 如果在事件对象的父级上阻止了原生事件的冒泡，则touch事件不能触发。（见examples/touch.html）

##和jQuery对比
Neat很多方面都是借鉴了jQuery思想，为了使jQuery 使用者平滑过渡并同时向jQuery致敬，Neat大多数接口兼容jQuery，包括美元符$。但是，Neat本身的定位并不是做移动端的jQuery，事实上，jQuery 3.0也是专门针对现代浏览器的，Neat和jQuery的区别主要有一下几点：
1. neat的dom操作和选择器是jQuery的一个子集，包括了核心的api. 去除了很多不常用的api.
2. neat支持touch事件,可以和vue完美结合。
3. neat底层实现更高效，优雅； 一来是neat没有兼容性包袱，二来是neat实现上使用了一些“黑科技”,使得代码实现极其巧妙简洁。
4.neat支持es5的浏览器，这在移动端没什么问题，如果您要开发pc端网站，并且要支持ie9以下的浏览器，neat并不合适。

##和zepto对比
- 更轻：本人曾经也是使用zepto,但踩的坑的太多,一气之下,索性自己写个.这也是neat的缘起.zepto对jquery的兼容还是比较多的(有些本人觉得完全没必要),当然这也是zepto起初的定位--移动端的jQuery,由于neat非常小而且效率高,所以可以完全不用但心它的对网站带来的效率变慢和流量过大的问题,当然，neat最大的特点是:简洁,优雅,高效,虽然zepto已经很小(最新版本1.2也要29k),但neat追求的是极致,并且做到了!
- 更灵活：neat可与vue无缝集成，vue本质上只是一个view层，缺少数据层如ajax,和touch事件，如果在您的vue项目中引入neat, 不用任何额外配置，您可以直接用v-on指令绑定neat touch事件，并且可以使用neat的ajax方便获取数据,当然能做的远不止这些,您可以慢慢发掘。
- Neat实现了一个完整的promise/deffered，您可以方便的执行各种异步任务。

##和React／angular相比
没有可比性，neat本质上提供的是dom操作和一个promise工具，React是一个view层，引入虚拟dom的概念，而neat是直接对dom进行操作，优点是灵活，但缺点是性能，所以neat不适合做大型SPA,也不适合和React一起用，angular 是一个mvvc框架，数据驱动，本身比较重，如果用了angular就尽量遵守它那一套吧。

##和vue

vue核心也是一个view层，不包括数据获取和touch事件，neat正好弥补了这两个，当然，vue2.0也引入了虚拟dom的概念，所以neat在配合vue使用时不建议过多的使用dom操作，getter方法却十分有用，比如text(),attr()，vue实例中有一个dom的引用$el，有些时候你可以通过neat实现一些vue实现起来比较麻烦的事，比如获取动态获取html属性，事件代理等。

##项目结构:
- src下为源代码文件
- dist下为打包后的release文件,如果您只是想使用neat,请直接拷贝dist下需要的文件到您的项目,具体文件说明如下:
 1. neat.min.js,neat的release文件，可以直接引入到您的网页。
 2. neat.plugin.util.js 是neat的一个插件示例。
- examples下为示例.

##修改源码&Rebuild
 1. 确定您已安装了node
 2. 安装webpack ``` npm install webpack -g ```
 3. 进入到源码目录安装依赖（仅首次需要）``` npm install```
 4. 打包 ```webpack```

##Bug report
duwen32767@163.com;
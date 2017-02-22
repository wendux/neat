# Neat项目说明

**Neat npm插件已发布，commonJs下可以安装使用：npm install neat-js**

Neat是一个追求极致简洁 、优雅、高效 ，只为现代浏览器（支持es5+）、移动端优先的 Javascript 库。

Github 地址: [https://github.com/wendux/neat](https://github.com/wendux/neat) 。

Neat 官网地址：[Neat.js官网](http://neat.dtworkroom.com) 


## Neat 简介

Neat [ni:t] adj. 灵巧的， 整洁的，干净的。 Neat用jQuery 10%的代码量实现了其80%的功能，GZIP后不足4K，兼容大多数jQuery Api。Neat支持实现了ES5的浏览器, 完全支持移动端(IOS、Android)浏览器， 秉持移动端优先原则 , 支持Touch事件，同时桌面浏览器支持IE9+。Neat核心由 事件处理、AJAX、DOM操作、动画、Promise/Deferred五大模块组成, 并兼容jQuery插件系统, 大多数jQuery插件可以无修改或只需少量修改就可以移植到Neat上， 有着极强的扩展性。 小巧、灵活、高效、优雅是Neat的主要特点, 你完全可以将Neat和Vue等库结合使用。随着你对Neat的深入了解，我相信你会喜欢上它的。 Enjoy it !

## Neat主要特点

1. 小：不到4k（min+gzip）。
2. 全：支持: Dom操作、Touch event、Ajax、动画、Promise/Deferred。 兼容大多数jQuery api
3. 专：只为现代浏览器设计，移动端优先，更轻量。
4. 雅：实现上追求极致优雅，采用众多“黑科技”。
5. 活：支持插件;可以与众多框架融合。

注：

- Neat是继承自数组,所以neat对象可以使用所有原生数组的属性及方法,您完全可以把neat对象当成数组传递给其它函数
- Neat 在gzip后仅3.7k。正是由于这一点，您再也不用纠结到项目到底是使用mvc还是dom操作框架了,有了neat之后，答案是:鱼于熊掌可以兼得.推荐使用neat+vue组合.

## 和jQuery对比
Neat借鉴了很多jQuery优秀的思想，为了使jQuery 使用者平滑过渡到neat，并同时向jQuery致敬，Neat大多数接口兼容jQuery，包括我们习惯并喜欢的$符。但是，Neat本身的定位并不是做移动端的jQuery，事实上，jQuery 3.0也是专门针对现代浏览器的，Neat和jQuery的区别主要有以下几点：
1. Neat的dom操作和选择器是jQuery的一个子集，包括了核心的api. 去除了很多不常用的api。
2. Neat支持touch事件。
3. Neat底层实现更高效，优雅； 一来是neat没有兼容性包袱，二来是neat实现上使用了一些“黑科技”,使得代码实现极其巧妙简洁。
4. Neat支持es5的浏览器，这在移动端没什么问题，如果您要开发pc端网站，并且要支持ie9以下的浏览器，Neat并不合适。

更详细的对比

## 和zepto对比
- 更轻：本人曾经也是使用zepto，但踩的坑的太多，一气之下，索性自己写个。这也是neat的缘起。zepto对jquery的兼容还是比较多的(有些本人觉得完全没必要)，当然这也是zepto起初的定位--移动端的jQuery。由于neat非常小而且效率高，所以可以完全不用但心它的对网站带来的效率变慢和流量过大的问题。当然，neat最大的特点是：简洁、优雅、高效。虽然zepto已经很小（最新版本1.2也要29k），但neat追求的是极致，并且做到了!
- Neat ajax支持加载进度、链式调用、统一的异常捕获。
- Neat实现了一个完整的promise/deffered，您可以方便的执行各种异步任务。

## 和React、angular相比
这个问题可以参见jQuery与两者的对比，详情可以谷歌。简单来说，React只是一个view层，引入虚拟dom的概念，而neat是直接对dom进行操作，优点是灵活，但缺点是性能，neat同时包含了数据层（ajax），并支持promise，当然，react可以服务端渲染，也有很多配套的数据组件。angular 是一个mvvc框架，数据驱动，本身比较重，如果用了angular就尽量遵守它那一套吧。

## 和vue

vue核心也是一个view层，不包括数据获取和touch事件，neat正好弥补了这两个，当然，vue2.0也引入了虚拟dom的概念，所以neat在配合vue使用时不建议过多的使用dom操作，getter方法却十分有用，比如text(),attr()，vue实例中有一个dom的引用$el，有些时候你可以通过neat实现一些vue实现起来比较麻烦的事，比如动态获取html属性、实现事件代理等。

## 项目结构:
- src下为源代码文件
- dist下为打包后的release文件,如果您只是想使用neat,请直接拷贝dist下需要的文件到您的项目,具体文件说明如下:
  1. neat.min.js,neat的release文件，可以直接引入到您的网页。
  2. neat.plugin.util.js 是neat的一个插件示例。
- examples下为示例.
- docs下为文档

## 如何使用

您有两种方式可以使用neat:

1. 引入neat.min.js文件,直接使用

2. node环境下使用方式如下：

   1. 安装neat npm插件

   ```javascript
   npm install neat-js 
   ```

   2. 引入neat模块

   ```javascript
   var $= require("neat-js")
   $(function(){
       console.log($("li"))
   })
   ```

## 修改源码&Rebuild

 1. 确定您已安装了node
 2. 安装webpack ``` npm install webpack -g ```
 3. 进入到源码目录安装依赖（仅首次需要）``` npm install```
 4. 打包 ```webpack```

## Bug report
您可以在github上创建一个issue,或者直接email: duwen32767@163.com， Thanks！
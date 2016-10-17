**项目说明:**

neat是一个追求极致简洁 ，高效， 优雅，只为移动端的 javascript dom操作库 —

**neat特点:**

1.兼容jquery大多数常用api,但实现上更加高效.

2.专门为移动端设计,去除浏览器兼容代码.

3.neat是继承自数组,所以neat对象可以使用所有原生数组的属性及方法,您完全可以把neat对象当成数组传递给其它函数

4.neat更加简洁,优雅,高效,总共8k左右(服务器启用gzip后仅3.4k).正是由于这一点,您再也不用纠结到项目到底是
使用mvc还是dom操作框架了,有了neat之后,答案是:鱼于熊掌可以兼得.推荐使用neat+vue组合.

**neat使用说明:**

1.为了符合jquery开发者习惯,neat对象别名依然是$,如果$占用,请使用命名空间或直接使用neat调用(而非美元符),
一般来说,如果您使用了neat则不必使用jquery或zepto,如果您非要这么做,额,我猜不透你的心思~.

2.neat支持:Dom操作,Touch event,Ajax,动画,Promise/Deferred;

3.neat支持插件,扩展方式请参考 neat.plugin.utils.js(兼容jquery扩展方式)

4.neat支持的touch事件有:
 'swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap', 'longTap'
 注意:touch️事件的捕获时间间隔,和捕获距离用户可以通过 neat.options配置。具体参考后面文档。

**和zepto对比**

曾经也是使用zepto,但踩的坑的太多,一气之下,索性自己写个.这也是neat的缘起.
zepto对jquery的兼容还是比较多的(有些本人觉得完全没必要),当然这也是zepto起初的定位--移动端的jquery,而neat的定位是以最
优最精简的代码实现移动端dom操作,由于neat非常小而且效率高,所以可以完全不用但心它的对网站带来的效率变慢和流量过大的问题,所以您可以方便的集成到angular,vue等mvc库中.
当然neat最大的特点是:
简洁,优雅,高效,虽然zepto已经很小(最新版本1.2也要29k),但neat追求的是极致,并且做到了!

**项目结构:**

src下为源代码文件,dist下为打包后的release文件,如果您只是想使用neat,请直接拷贝dist下需要的文件到您的项目,具体文件说明如下:

1.neat.min.js,neat压缩后的release文件.
2.neat.plugin.util.js 是neat的一个插件示例,如果您需要扩展neat,可以参考该文件实现.

如果你想修改源代码来定制neat,您需要在修改完成后,重新构建一下.构建方式如下:

1.进neat目录 **npm install**
注:此步骤为安装构建工具依赖,仅在首次构建时需要,neat使用了部分不会引入多余的pollyfill的es6特性,构建过程会使用babel转译并压缩。

2.**webpack 或 npm run build**

dist 下为最终生成文件
examples下为示例,您可打开浏览器控制台动态输入neat代码,进行交互式验证,探索

**文档**

我听见了,有人说文档,neat支持jquery多数api,但又有部分不同,等过段事件会整理一套详细的文档和教程.
现在就要使用的话,直接按照jquery风格写代码吧.具体示例见example.

**bug report**

duwen32767@163.com;



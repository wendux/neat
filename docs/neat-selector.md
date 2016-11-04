# Neat 选择器
Neat选择器兼容css选择器语法，由于neat不需要兼容pc端古老的浏览器，和jQuery使用的sizzle引擎相比，Neat底层是调用浏览器原生Api querySelector*，所以会更高效、简单。但是neat不支持jQuery中的自定义选择器和扩展选择器(如jQuery中的 :first、:last选择器)。作者认为css选择器已经足够强大，并且类似jQuery的一些扩展选择器也可以用其它方式达到相同目的。再者，使用自定义选择器和扩展选择器则必须先对选择器进行解析，这种代价是得不尝失的，当然，如果牺牲一点效率可以换来更多的益处也是值得商榷的，然而事实并非如此，仔细想想，很多时候我们连css的选择器也使用不完，既然neat是针对现代浏览器，那么，还是愉快的使用浏览器原生接口吧！

## neat(selector，[context])
**注: neat别名为$，所有使用neat的地方都可以用$代替**
- selector 选择器
- context 上下文对象，支持所有neat选择器
- 返回 neat 结果集［可当成数组］

## 选择器示例
假设我们有如下html文档：

```javascript
<html>
  <head lang="zh-cmn-Hans">
  <meta charset="UTF-8">
  <meta name="renderer" content="webkit">
  <script src="../dist/neat.min.js"></script>
  <title>测试</title>
  </head>
  <body>
    <nav>
      <ul id="nav">
        <li><a>首页</a></li>
        <li><a>教程</a></li>
        <li><a>论坛</a></li>
      </ul>
    </nav>
    <section class="box">我是区块1 </section>
    <section class="box">
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </section>
    <input name="name" placeholder="input your name" value="xx"/>
    <input name="email" type="email" placeholder="input your email"/>
  </body>
</html>
```


打开浏览器控制台：

```javascript
//id选择器
> $("#nav")
结果 [ul#nav]

//类选择期
> $(".box")
结果 [section.box, section.box]

//标签选择器
> $("input")
结果 [input, input]

//属性选择器
> $("input[name=name]").val()
结果: "xx"

//后代选择器
> $("nav ul li")
结果：[li, li, li]

//联合选择器
> $("#nav,.box,input")
结果：[ul#nav, section.box, section.box, input, input]

//指定上下文选择器
> var nav=$("section").last()
> $("li",nav)
结果：[li, li]
```

## 其它形式的selector
selector不仅仅可以是css选择器，也可是一个neat对象、一个原生的dom对象、NodeList、或者一个dom数组，neat都会将它转化为正确的neat对象：

```javascript
//选择器是dom对象
$(document)
//是NodeList
$(document.querySelectorAll(".list"))
//是dom数组
$([document.getElementById("id1"),document.getElementById("id2")])
//是neat对象
$($("body"))
// 甚至可以是空(一个空的neat对象，可以调用add添加元素)
$()
```
还有一种情况是在动态创建dom时，selector为标准的html标签，调用方式如:
```javascript
$('<div>click me</div>').click(function(){
  alert($(this).text())
}).appendTo("body")
```
如果动态创建的为单个元素，可以用简写形式(标签不用闭合)：
```javascript
$("<div>").text("hi").appendTo("body")
$("<img>").attr("src","./neat.png").appendTo("body")
```
## Context
context为元素查找的起始根节点，如果没指定context，则默认从document开始查找dom。很多时候，指定context不仅可以提高查找效率，而且也可以去除其它不期望的元素的干。Context本身可以是任何合法的neat选择器,但一般情况下最好指定一个dom或neat对象，如果是css选择器，则没什么意义，因为neat会先从根节点开始查找css选择器指定的元素，然后再以这些元素为根分别再查找，示例如下：
```javascript
//以id为nav的元素为根，查找之下所有的li
注：下面写法仅作示例，不推荐使用
> $("li","#nav")
结果：[li, li, li]
即：
 <li><a>首页</a></li>
 <li><a>教程</a></li>
 <li><a>论坛</a></li>
等同于$("#nav li")［推荐写法］或$("#nav").find("li")
```
一般情况下，正确的使用姿势应该是这样：
```javascript
//假设有一个容器id为container,我们要在它的字节点里进行多次查找
var container=$("#container")
//查找container下所有section节点
$("section",container)
//查找container下所有拥有类名box的节点
$(".box",container)
```
## 总结
综上所述，neat的选择器已经很强大了，使用方法也和jQuery进行了兼容，当然，jQuery除了支持css选择器以外还支持扩展选择器和自定义选择器。但是，大多数情况下，neat也可以用其它方式实现相同的功能，如jQuery的扩展选择器 :first, 可以使用neat first函数实现:
```javascript
jQuery("ul li:first").text()
等同于
neat("ul li").first().text()
```
至于jQuery自定义选择器，如果您使用过jQuery，现在，请您闭上眼睛，仔细想想，您使用过jQuery自定义选择器的场景是什么？相信大多人基本都没有使用过，这也是neat没有计划支持自定义选择器的主要原因。
> 注：对于jQuery自定义选择器，我很久之前写了一个jQuery样式选择器插件，主要功能是根据css样式特征选取元素，比如选出所有border-color为#eee的元素（然后统一改成其它颜色）。该插件支持所有css属性，并支持and、or多条件选择，功能是很强大的，如果您有兴趣，可以留言或email我哦。





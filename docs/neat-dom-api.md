# Dom操作及链式调用
总体来说，Neat dom api相比jQuery，删除了一些不常用，冗余的方法，是jQuery的一个子集。我们先来说明亮概念：

**链式调用** : 一个可调用对象（通常是函数）的返回值是一个新的对象时，继续在原调用链上调用新对象的方法，这就是链式调用，如：
```javascript
$("li")
.click(function(){})
.last().hide()
```
上例中 $("li") 返回一个包含所有li的neat对象，然后再对每一个li绑定click事件，然后再将最后一个li隐藏。

**元素集、结果集**: 由于neat对象本质上是一个包含若干元素的集合，后文中提到的元素集（或结果集），则默认等同于neat对象。 如果一个neat对象的元素集为空，则称其为**空neat对象**，空neat对象本质上可以理解为一个空的数组获一个继承自数组但没有元素的空对象。结果集的元素数量可以用length属性来获取: `` $(selector).length`` 之所以可以这么做，本质的原因是neat继承自数组。同理，你也可以用数组下标取出任意一个原始的 dom对象如：
```javascript
//取出第二个li的dom对象
$("li")[1] 
```
**注：Neat结果集会去重**

因为大多数dom操作都支持链式调用，我们统一来讲。neat支持的api列表如下：
```javascript
1.each()
2.eq()
3.last()
4.add()
5.text()
6.html()
7.children()
8.css()
9.attr()
10.show()
11.hide()
12.val()
13.removeAttr()
14.hasClass()
15.addClass()
16.removeClass()
17.find()
18.append()
19.appendTo()
20.before()
21.remove
22.parent()
23.parents()
24.prev()
25.next()
26.first() 
27.end()
28.map()
29.filter()

```

假设有如下html文档，以下示例皆基于此文档
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
## each(callback)
- 功能：遍历neat结果集
- callback（elem,index）; 回调函数，elem为当前遍历到的元素，index为当前元素的索引
- 返回值:neat

```javascript
$("nav li").each(function(ele,index){
 console.log($(el).text(),index)
})
结果:
首页 0
教程 1
论坛 2
```
## eq(index)
- 功能：获取当前结果集第index个元素
- 返回值:存在则返回指定元素，**否则返回空neat对象**

```javascript
> $("nav li").eq(0).text()
结果:  "首页"
> $("nav li").eq(100)
结果:空neat对象
```

## first()、last()
- 功能：获取当前结果集第一个／最后一个元素
- 返回值:结果集不为空时，则返回第一个/最后一个元素，**否则返回空neat对象**

```javascript
> $("li").first().text()
结果:  "首页"
> $("li").last().text()
结果:  2
> $("xx").first()
结果：空neat对象
```

## add(selector)
- 功能：当前结果集添加元素
- selector： 为合法的 [neat选择器](neat-selector) 。
- 返回值:返回合并后的结果集

```javascript
> $("body").add("ul")
结果:  [body, ul#nav, ul]

> $("body").add("nav")
结果: [body, nav]
```
## text([str])、html([str])、 val([str])
- 功能：设置或读取元素text／html／value（表单）
- str：str存在时，为setter，设置当前结果集所有元素的text/html/value为str，不存在时为getter，若结果集有多个元素，则读取第一个元素的text/html/value
- 返回值:读取到的内容,若没有内容返回空字符串

```javascript
> $("#nav li").text()
结果: "首页"

> $("#nav li").html()
结果: "<a>首页</a>"

> $("#nav li").html("<a>setter</a>")
结果(此处为dom树中的内容): 
 <li><a>setter</a></li>
 <li><a>setter</a></li>
 <li><a>setter</a></li>
```

## css(mix,[value])
- 功能：设置或读取元素css属性示例如下

```javascript
有三种调用方式

> $("body").css("background")
结果: "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
注：当只有一个参数，并且参数是css属性时，则为getter方法。

> $("body").css("background","#777")
结果: 返回[body]并同时设置背景色为#777；

> $("body").css({background,"white",fontSize:20})
结果: 返回[body],并同时设置背景色为白色，字体为20像素；
```
注：对于第三种调用方式，所有属性名称应采用camelCase, fontSize可以不用带单位"px"。 **css方法获取的结果为为浏览器最终渲染后的结果**，如上面第一个示例。

## attr(key,[value])
- 功能：设置或读取元素属性
- key为属性名；value为属性值
- 返回值：当只有key时，则为getter，若存在名为key的属性，返回其属性值，若不存在，返回空字符串；如果value参数不为空，则为setter，设置 key属性值为value，并返回当前元素集。

```javascript
> $("body").attr("s-t",9)
> $("body").attr("s-t")
结果: "9"
```

注：
1.  **由于html不区分大小写，所以属性名也不区分大小写**
2.  **属性值设置或返回的类型都会转化为字符串，这是由于html属性中无法保存javascript对象所致。**

## removeAttr(key)
- 功能：移除属性key
- 返回值：当前元素集

```javascript
$("input").removeAttr("disabled")
```


## show()、hide()
- 功能：显示／隐藏元素集所有元素
- 返回值：当前元素集

```javascript
> $("li").hide()
隐藏所有li
```
**show用于显示hide方法隐藏的元素！下面的例子是不行的：**

```javascript
<div style="display:none">xx</div>
>$("div").show() //错误，div不会显示
```

## hasClass(className)

- 功能：判断当前元素集的第一个元素是否有某个css 类
- 返回值：有则返回ture，没有则返回false

## addClass(className)
- 功能：给当前元素集每一个元素添加css类名
- 返回值：当前元素集

```javascript
> $("body").addClass("gray")
结果: [body.gray]
```
注：类名不用带"."

## removeClass(className)
- 功能：移除className类名
- 返回值：当前元素集

```javascript
> $("body").removeClass("gray")
结果: [body] 
```
## find(selector)
- selector 为[neat选择器](#neat-selector)。
- 功能：以当前结果集的**每一个**元素为根节点去查找selector指定的元素
- 返回值：查找到元素的结果集.

```javascript
> $("section").last().find("li")
结果(dom树):
  <li>1</li>
  <li>2</li>
```
## append(mix)
- mix 为合法的html字符串、选择器（包括dom/neat对象）
- 功能：若mix为html字符串时，则为当前结果集中每个元素添加html到标签内的最后面；若mix是选择器，则只将选择器匹配的第一个元素添加到当前结果集第一个元素标签内的最后面
- 返回值：当前结果集.

```javascript
> $("section").append("<span>I am new element</span>")
结果(dom树):
 <section class="box">
  我是区块1
  <span>I am new element</span>
 </section>
 <section class="box">
      <ul>
        <li>1</li>
        <li>2</li>
      </ul> 
   <span>I am new element</span>
 </section>
```
如果mix为当前页面上的某个元素，那么append的功能相当于**移动元素**，我们看下面例子：

```javascript
假设文档为：
 <div>
  <div id="p"></div>
  <i>hi</i>
 <div>
> $("#p").append("i")
结果：
 <div>
  <div id="p"> <i>hi</i></div>
 <div>
```
**本质原因是：浏览器限制一个dom元素只能添加给一个父元素。下面的appendTo、before也是一样的。**
## appendTo(selector)
- selector为neat选择器
- 功能：将当前元素集所有元素添加到selector选择器匹配的第一个元素标签的尾部。
- 返回值：当前元素集

```javascript
> $("<span>1</span><i>2</i>").appendTo("section")
结果(dom树):
 <section class="box">
  我是区块1
  <span>1</span>
  <i>2</i>
 </section>
```
## before(selector)
- selector为neat选择器
- 功能：将当前元素集所有元素添加到selector选择器匹配的第一个元素标签的前面（同级）。
- 返回值：当前元素集

```javascript
> $("<span>hi</span>").before("section")
结果：返回 [span]，dom树变为：
 <span>1</span>
 <section class="box">
  我是区块1
 </section>
```
## remove()
- 功能：将当前元素集所有元素从dom树中移除
- 返回值：移除的元素集

```javascript
> $("input").remove()
结果：将input移除并返回 [input, input]
```
## parent()

- 功能：获取当前元素集所有元素的直接父元素，
- 返回值：父元素集合

```javascript
> $("ul").parent()
结果：[nav, section.box]
```
## parents(selector)

- 功能：获取当前元素集所有元素中第一个匹配selector的父元素，
- 返回值：父元素集合

```javascript
> $("li").parents("section")
结果：[section.box]
```

## children()

- 功能：获取当前元素集所有元素的直接子元素，
- 返回值：子元素集合

```java
> $("head,section").children()
结果：[meta, meta, script, title, ul]
```
## prev()

- 功能：获取当前元素集所有元素的前一个同级元素，
- 返回值：结果集

```javascript
> $("input").first().prev()
结果：[section.box] (第二个section)
```
## next()

- 功能：获取当前元素集所有元素的后一个同级元素，
- 返回值：结果集

```java
> $("section").last().next()
结果：[input] 
即：<input name="email" type="email" placeholder="input your email" value="xx@gmail.com"/>
```

## end()

- 功能：调用链结果集回退一次。
- 返回值：上一次的结果集

```java
> $("section").find("li").end()
结果：[section.box, section.box]
```

注：$("section")为调用链上第一个结果集，然后又查找其子元素中的li,此时结果集为[li, li]，然后调用end回退一次，则为之前$("section")的结果集

## map(callback)

- 功能，同数组map方法，对当前集合所有元素进行映射后的集合。可参考 [Array map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 。
- callbackele,indexele):回调函数，遍历当前结果集过程中的回调；ele: dom元素，index当前的缩影
- 返回值，映射后的neat结果集

下面我们实现一个查找所有ul第一个li的例子：

```javascript
var t=$("ul").map(function(e,b){
 return $(e).find("li").first()[0]
})
> t.first().text()
> "首页"
> t.last().text()
> "1"
```

## filter(callback[, thisArg])

- 功能，同数组filter方法，使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新的neat 结果集。可参考 [Array filter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 。
- callback(element, index, array): 用来测试数组的每个元素的函数。调用时使用参数 。返回true表示保留该元素（通过测试），false则不保留。
- thisArg，可选。执行 callback 时的用于this的值。

示例：返回所有text为"教程"的li

```javascript
> $("li").filter(function(e){
  if($(e).text()=="教程")
  return true;
  })
 .text()
> "教程"
```
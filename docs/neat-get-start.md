# 开始使用

首先将neat.min.js文件引入到您的页面，下载地址是：[github/neat](https://github.com/wendux/Neat/blob/master/dist/neat.min.js) 。

Neat提供jQuery兼容的api，如果你之前使用过jQuery ,  那么你可以很容易上手。和jQuery的异同请移步[Neat vs jQuery 、Zepto](#Neat-vs-jQuery-vs-Zepto) ，下面是Neat大致功能展示：

### DOM操作&链式调用

```javascript
$("body ul").addClass("ulStyle")
.find("li")
.click(function(e){
  console.log($(e).text())
})
.parent()
.first()
.css("color","white")
```

上面代码的意思是：给body下所有的ul添加一个css类名“ulStyle”，然后再找到ul下所有的li，给所有的li添加单击事件，然后找到这些li的所有直接父节点，然后再给第一个父节点设置css color属性的值为“white”。 当然，这只是想向你展示了Neat的特性－链式调用，以及dom操作，详细的内容请移步 [Neat dom操作及链式调用](#Dom操作及链式调用)。

### 事件处理

```javascript
//监听按钮的单击事件
$("#submit").click(function(){
  alert("正在提交")
})

//事件委托，监听ul下所有li的click事件
$("ul").on("click","li",function(){
  console.log(this)
})

//移动端touch事件
$("#div")
.swipeLeft(function(){
  //do something
})
.swipeRight(function(){
  //do something
})
.longTap(function(){
  //do something
})
```

Neat对事件的支持很全，详请轻移步 [Neat事件处理](#neat-event) 。



### 动画

```javascript
$("#show")
.animate({fontSize:100},1000)
.done(function(){
  console.log("animate end")
})
```

Neat支持动画，和jQuery不同的是，Neat对动画进行了更宽泛的抽象，你会发现，Neat的动画在很多时候用起来比jQuery要方便。详情请移步 [Neat 动画](#neat-animate) 。

## ajax

```javascript
//获取数据并处理，回调可任意组合
$.get("./get_info")
.done(function(data){
  // handle data
})
.fail(function(data){
  //handle error
})
.always(function(mix){
  //do something
})
.progress(function(e){
  //show progress
})
.catch(function(e){
  //catch exception
})

//提交数据
$.post("/post_info",{
  name:"neat",
  age:1,
  sex:"😅"
})
.done(function(d){
  console.log("submit succeed!")
})
.fail(function(status){
  console.log("😔 something wrong!",status)
})

```

Neat的ajax处理流程是非常优雅，上面的代码几乎是自解释的，在此便不废话了。当然，这是neat ajax 功能的一部分，随着你对neat的进一步了解，相信你会发现更多的惊喜，关于neat ajax详细的内容请移步 [Neat Ajax](#neat-ajax) 。

## promise

```javascript
//顺序执行多个网络请求
$.get("x1")
.then(function(data){
 return $.get("x2",data)
})
.then(function(data){
 return $.get("x3",data)
})
.done(function(data){
  // handle the final data.
})

//多个异步请求结束后执行回调
$.all($.get("x1"),$.get("x1"),$.get("x1"))
.done(function(data){
  //handle data
})
```
 上面第一个例子是顺序处理多个网络请求的示例，后一次请求依赖前一次请求的结果。 第二个示例是当三个异步任务都执行结束后再执行某个操作。可见Neat在处理异步任务方面非常方便、优雅。当然，neat对异步任务的处理能力远不止于此，你可以结合neat deferred对象自定义各种异步任务，详情请移步 [Neat promise/deferred](#neat-promise-deferred) 。



可以看到Neat 以我们习惯的方式（jQuery）方式来写继续代码，如果你喜欢，就继续深入的了解它吧!



下一篇：[选择器](#neat-selector) 。


# 事件处理

Neat事件处理和jQuery相似，主要提供on,off 两个核心方法，以及一些便捷的绑定函数。
## on(event,[cb,selector])

- event: 事件名称，包括浏览器提供的标准的事件和 [neat touch事件](#neat-touch)。
- cb(event): 监听回调，event为当前全局事件对象。

on用于绑定事件，简单的例子如下:
```javascript
$(document.body).on("click",function(){
  alert($(this).text())
})
```

事件回调函数cb的回调函数中的this指向dom对象，如果你用es6箭头函数作为回调，**由于箭头函数没有上下文，所以此时this将是调用声明的上下文，而不在指向dom，所以此时只有ele为dom元素**。



**事件代理**

假设有一个列表ul，里面有若干li：

```javascript
<ul>
<li>1</li>
<li>2</li>
<li>...</li>
<ul>
```
我们要监听所有li的click事件，如果为每个li分别绑定click事件，这很不优雅！尤其当回调是一个匿名函数时，浏览器将创建大量闭包，一旦列表很大(比如一个无穷无尽的下拉刷新列表)，将会引起较大的性能和内存消耗。还有，对于动态插入的li，我们必须得动态的进行绑定click。此时事件代理便华丽登场！事件代理的思想是只绑定父元素，然后指定要代理的子元素，一旦子元素触发绑定的事件，子元素本身并不处理，而是将事件冒泡到父元素，由父元素中统一处理，如下：

```javascript
$("ul").on("click","li",function(e){
  alert($(this).text())
})
```
如上所示，我们绑定了父元素ul，然后通过选择器指定子元素“li”,之后，一旦li触发单击事件后便会触发回调，此时this和ele为触发click的li，这样即使有新的动态插入的li，也不用再去单独绑定。
# off(event,[cb,selector])
事件解绑
```javascript
function onClick(e){console.log(this)}
//绑定click事件
$('#id').on("click",onClick);
//解绑
$('#id').off("click",onClick);
//绑定代理
$('ul').on("click","li",onClick);
//解绑代理
$('ul').off("click","li",onClick);
```
下面实现一个只触发一次的事件回调：
```javascript
function onClick(e){
  alert($(this).text())
  //解绑事件
  $(this).off("click",onClick)
}
$(document.body).on("click",onClick)
```
# 快捷函数
Neat提供了一些与事件同名的快捷函数方便事件绑定，这些函数有click、tap、longTap、singleTap、doubleTap、swipe、swipeLeft、swipeRight、swipeUp、swipeDown。以click为例：
```javascript
$("#id").click(function(){})
```
其它事件同理。
## ready()
当 DOM树已经加载，但资源（如图片、外部样式表等）可能还未加载完成，此时会触发 ready 事件，这可以使我们不用等待所有资源下载完毕后才去操作dom，因为一旦浏览器dom树构建完成，dom节点就可以正确获取的到，所以我们的代码一般都始于ready回调中。实际上，neat在底层是直接监听的DOMContentLoaded事件，如果事件触发则调用回调，如果DOMContentLoaded已经触发过了，neat 则直接触发回调，用法如下：
```javascript
$(document).ready(function(){
  //place your code here
})
```
neat也提供了简写形式：
```javascript
$(function(){
  //place your code here
})
```
也可以在不同的地方设置多个ready回调，如果你需要在所有资源都加载完毕后调用，请绑定window.load事件，如下：
```javascript
$(window).on("load",function(){
  //place your code
})
```
## 深入Neat底层
- neat在实现 on**事件代理的上下文绑定**时，使用了一些黑科技，使得实现非常简洁优雅。**事件代理的上下文绑定**具体是什么呢？如上面示例：我们在ul上代理li的click事件时，回调中的this一直是我们指定的代理子对象，也就是li, 如果是li本身触发了单击事件，这没什么大不了，可是如果是li的子元素呢，而我们绑定的是ul,那么此时如何将li（而不是li的子元素）与this对应起来？
- 由于事件可以解绑，也就是说在每一次事件绑定时，都得将事件名称、代理选择器、回调函数保存起来，以备解绑之用，那么问题来了，这些信息保存在哪？如果绑定到一个全局的存储区，试想，如果一个元素同时绑定了好几个事件，某个时刻这个元素被动态移除了，那么存储的事件绑定信息将得不到释放，这将会造成内存泄漏；那如果在remove方法之前遍历一下全局存储区，然后再将该元素所有事件信息全部删除呢？这样做会有两个问题：
  1. 遍历会增加开销，这个与Neat要达到的目标完全相悖。
  2. 移除时机难以确定；如果我们在neat的remove方法中做这件事，而用户的所有移除操作都是通过neat的 remove方法来做，那问题不大，但如果没有调用neat的remove方法而是手动使用其它库或直接调用dom的api移除的呢？这很糟糕！据笔者所知，好几个知名库都没考虑到这个问题，也许是作者疏忽了。

**Neat使用了优雅的方式解决了这些问题，所以您无需担心移除元素时会因未解绑事件而导致内存泄漏。如果您有更深的兴趣，请移步 [github Neat](https://github.com/wendux/Neat).**
# Touch 事件

Neat对touch事件的支持集成在了内核中，Neat支持的touch事件有：'swipe'、 'swipeLeft'、'swipeRight'、'swipeUp'、'swipeDown'、 'tap'、 'longTap'、'singleTap'、 'doubleTap'。

如果你的页面中已经引入的neat，要监听body的tap事件，你可以这么做：

```javascript
$("body").tap(function(){
  console.log(this)
})
```

你也可以使用on来绑定：

```javascript
$("body").on("tap",function(){
  console.log(this)
})
```

你甚至也可以这么做：

```javascript
$("body")[0].addEventListener("tap",function(){
  console.log(this)
})
```

只要引入neat，所有tap事件都可以像原生事件一样监听。

下面是touch事件的说明：

tap:第一时间触发，不会有延时。

doubleTap: 在300ms内单击两次触发，如果有注册tap，tap也会触发。

singleTap: 单击后等待300ms没有再次单击，再触发。（在同一个dom上需要，同时绑定单击和双击的时候使用）

longTap：长按500ms后触发 

swipe：滑动10px以上距离触发，不论什么方向 

注：为了解决tap的300ms延迟引入singleTap事件，因为大多数情况下我们使用的是tap事件，为了保证tap立即执行， 并且解决双击事件与单击事件在同一个元素上绑定的情况，在此情况下使用singleTap，singleTap会等待300ms，如果300ms内又有一次触碰事件， 双击事件才触发，否则触发singleTap。 

**注意: 如果在事件对象的父级上阻止了原生事件的冒泡，则touch事件不能触发。** 如下：

```javascript
document.querySelector("body")
  .addEventListener('touchstart',function () {
  	//阻止原生事件冒泡则不能触发事件，
    // event.stopPropagation();
    // 用qq浏览器和微信自带浏览器的注意，
    // x5内核经改造阻止默认事件，则等同阻止冒泡，
    // 有些插件会默认阻止浏览器默认事件，如iScroll
  })
})
```

示例请参考源码：[examples/touch.html](https://github.com/wendux/Neat/examples/touch.html)


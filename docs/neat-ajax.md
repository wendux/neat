# AJAX

与Zepto相比，由于Neat是移动端优先的，对dom操作进行了弱化同时，但对网络和异步支持进行了增强（当然， jQuery也不错，Neat也是借鉴了jQuery)。而网络主要就是ajax，Neat对ajax支持非常强大与灵活，和zepto不同的是，Neat  ajax是建立在Neat的promise/deferred之上（如果你还不了解，先不用着急，后续会有介绍），这会使编码变的非常愉快，Neat在ajax 支持上秒杀zepto, 下面我们看一个输出当前页面源码的简单的例子：
```javascript
function log(data){
  console.log(data);
}
$.get("").done(log)
```
搞定，简单吧，我们也可以用post方法：
```javascript
$.post("").done(log)
```
正如其名所示，两者唯一的区别就是http请求的method不同，前者是"GET"，后者是"POST"。其实 $.get、$.post 只是便捷方法，它们内部都调用了$.ajax方法，当然也可以直接调用$.ajax，下面是调用$.ajax实现get请求的例子:
```javascript
$.ajax("",{},{type: "get"})
 .done(log)
```
下面我们来详细探索一下neat ajax的全部功能：
## $.ajax(url,[data],[options])
- url：请求资源的url地址，为空字符串时则为当前页面
- data：请求的参数，类型为对象。
- options: 请求的可选配置，**注：$.get和$.post没有此参数**。
- 返回值：一个扩展后的promise对象（后续会有专门介绍）

我们先来看一个带参数的请求：

```javascript

$.ajax("",{name:"Davin",age:"18"},{type: "get"})
 .done(log)
//实际的请求链接会自动添加："?name=Davin&age=18"
```
如果type是post，则参数会在http  header中发送。
## 成功回调

### done(callback)

- 功能：设置ajax请求成功后回调

- callback(data): data 为请求到的数据，此时回调函数上下文this 为当前的XMLHttprequest对象。

**注：所有ajax 请求回调的上下文对象都为当前请求的原始XMLHttprequest对象，下面将不再做特殊说明。**

我们可以为一个ajax添加多个完成回调：
```javascript
$.ajax("")
 .done(log)
 .done(function(d){
  alert(d)
  //会输出xhr对象
  log(this)
  })
```
neat会将请求到的数据分别传递到每个成功回调当中，你可以进行多种处理，但有时我们需要对数据进行链式处理，即：第一步处理后的数据，传递给第二个函数，以此类推，这时我们可以使用then方法：

### then(...callbacks)

callbacks为回调列表，分别为成功回调、失败回调、异常回调，then是promise中非常强大的一个方法，可以顺序执行异步任务，是异步任务同步化的重要接口，详细介绍我们放到后面promise/deferred章节中，在此只做简单示例，有个概念即可：

```javascript
$.ajax("")
 .then(function(data){
  return data.substr(0,20)
 })
 .then(function(d){
  console.log(d)
  //handle the data
 })
```
上面示例中我们将返回的内容先截取20个字符，然后再输出。可见，采取这种方式，你可以清晰的组织自己的处理代码。

## 失败处理
如果网络请求发生错误，如断网，或服务器没有找到请求的资源，我们可以在fail中处理错误：

### fail(callback)

- callback(status):  status为失败时的http 状态码：

```javascript
$.ajax("xxx")
 .done(log)
 .fail(function(status){
   console.log(status)
  })
//会输出404，服务器上当前文件夹没有名为xxx的文件
```
如果请求成功，则调用done；如果失败，则会调用fail，此时neat会将失败时的 [http 状态码](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81) 传给fail，也可以使用this, 即xhr对象，可以通过它获取更多的信息。fail回调和done一样，也可以指定多个。

## 异常处理

Neat提供了优雅的异常处理机制：如果监听链，即处理逻辑链条，也就是你传递的done、fail回调中发生异常时，可以统一捕获并处理：

### catch(callback)

- callback(error): error为异常对象。

```javascript
$.ajax("")
 .done(function(data){
   //我们故意触发一个异常
   xxx
 })
 .done(function(data){
   console.log(data) //1
 })
 .catch(function(e){
   console.log(e)
 })
 执行后会输出：
 ReferenceError: xxx is not defined(…)
```

注：一旦异常发生，未执行的回调都会终止，所以上面1处代码不会执行，如果catch函数中再抛出异常，neat 会将异常抛出，将不再自动处理，这也就意味着后续的catch回调将中断，同时浏览器控制台会输出错误报告，这样则不会影响调试。

有些时候，无论网络任务是否成功，我们都希望在结束时执行某个回调，此时可以使用always：

## always(callback)

- callback(data):  成功时data为请求到的数据，失败时为http请求的状态码（和fail相同）



```javascript
$.ajax("xxx")
 .always(function(mix){
   console.log(mix)
  })
```
如果请求成功，mix为请求到的数据，如果失败，则为失败时的 xhr。一般情况下，使用的姿势会是这样：

```javascript
//记录请求次数
var reqTimes=0
$.ajax("xxx")
 .done(handler)
 .fail(handler)
 .always(function(d){
   ++reqTimes
  })
```
**注：为了让异常处理分离，如果调用链中触发了未捕获的异常，always不会被调用。也就是上面代码中done或fail的回调中如果抛出异常，always不会被调用。请在catch中处理异常。**

现在思考一个问题，如果要用 ajax请求一个比较大的文件，请求过程可能会比较耗时，为了给用户提供一个友好的反馈，需要提供一个加载进度条，此时progress将非常方便：

## progress(callback)

- 功能：用于监听当前请求的进度
- callback(ProgressEvent)： Progress Event的介绍请移步 [w3.org progress-event](https://www.w3.org/TR/progress-events/) .下面是一个输出加载进度的简单示例。

```javascript
$.get("bigfile.json")
.done(handler)
.progress(function(pe){
  if(pe.lengthComputable) {
   console.log(pe.loaded/pe.total＊100+"％");
  }
})
```

其中bigfile.json为当前路径下的一个大文件，在请求的过程中控制台会输出不同时段的进度，你可以提供一个进度条进行展示。当然，这只是一个简单使用示例，对其详细的介绍将在后面promise章节中。

一般业务，上面的工具已经足矣应对大部分场景，但是总有时候，我们需要更多的功能。neat提供了最大的灵活性，可以让你控制 http请求头

## options
此参数只有$.ajax方法有，$.get 、$.post并没有提供，如果需要设置options，请直接调用$.ajax。
**options主要有两部分构成: type、header**
- type：值为"get"或"post"，用于设置http请求的方法。
- header ：http请求头字段，是一个对象，可以通过此参数自定义任意合法的http请求头字段，详细的请求头字段列表请移步 [w3 Http request fileds](https://www.w3.org/Protocols/HTTP/HTRQ_Headers.html)  

下面我们看一个例子：

```javascript
$.ajax("", {}, { 
  type: "post",  
  header: {      
  "accept":"application/xml, text/javascript, */*;"    
  }
}).done(function (d){
    log("done ")
})
浏览器的request header中accept字段设置为:
"application/xml, text/javascript, */*;"
```


## 返回值
$.get、 $.post、 $.ajax返回值都是一个扩展后的promise对象，包含done、 fail、 then 、always、catch五个方法。同时包含一个当前请求的XMLHttpRequest 对象xhr，你可以通过xhr取得更详细的信息或进行其它操作，如：

```javascript
var ajax=$.ajax("")
ajax.done(log).fail(log)
//终止请求
ajax.xhr.abort()
//获取请求url
ajax.xhr.responseURL
```
我们也可以通过xhr对象添加一些其它事件回调：

所有XMLHttpRequest对象支持的回调（名称以on开头），各个浏览器支持可能有差别，下面是chrome支持的。
onabort
onerror
onload
onloadend
onloadstart
onprogress
onreadystatechange
ontimeout

```javascript
ajax.xhr.onabort=function(){
  //do something on abort
}
```

您可以提供任意一个回调。**注意，不要设置onreadystatechange、onprogress回调，因为neat ajax底层会设置这两个回调，会将你设置的回调覆盖掉.**

## 总结

综上所述，相信你已经看到了，neat的ajax不仅强大，而且灵活。 用过zepto的相信已经对neat心动了。和Zepto相比，neat在控制http请求和处理回调上非常灵活。 Neat 抛弃了jQuery ajax的全局设置及钩子，鸡肋，弃之。当然，neat的数据获取和异步处理的强大远不止于此，本文中还有很多没涉及到的点。先挖两个坑如下题：

1. 如果有好几个网络请求，每一步的请求都依赖于前一步的结果，用ajax怎么做？
2. 如果要在多个网络请求都完成之后再做一些事，应该怎么做？

所有的答案都在promise章节。沐浴焚香更衣后出门向后就是了😄。



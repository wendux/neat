# Promise/Deferred
Neat对promise提供了良好的支持，可以帮你优雅、方便的处理异步任务。如果你还不了解promise的概念，别着急，不用百度，先往下看。我们来回忆一下neat中ajax的调用流程：

```javascript
function handler(data){
  console.log(data)
}
$.get(url)
.done(handler)
.fail(handler)
.always(handler)
```
我们在介绍ajax时说过，neat的ajax是建立在promise之上的，而这种链式调用方式的背后正是promise。试想如果没有promise上面这段代码会是什么样子，如果不愿意想，可以直接去看看zepto的ajax调用方式 😤 。言归正传，neat的这种调用方式看起来简单清晰，感觉像是把一个异步任务，使用同步的思维来处理了，下面这个例子可能更能说明问题：
```javascript
//假设parseData、map、为耗时操作，
//在此均为一个异步任务！
$.get(url)
.then(function(data){
 return parseData(data)
})
.then(function(data){
   return map(data)
})
.then(function(data){
 save(data)
})
.failed(function(e){
 log("请求失败"，e)
})
.catch(function(e){
  handleError(e)
})
```
我们先从网络取些数据，然后需要先对数据进行解析，然后将解析好的数据转换成我们需要的数据结构，最后再将转换后的数据保存。如果这些步骤中任意一个出错，则抛出异常，在catch中统一处理，如果网络请求失败，则简单的打出 log。试想一下如果没有promise，这段代码会变成什么样？因为每一步的结果都依赖上一步的结果，所以最终的形式肯定是回调套回调，这就是著名的 **callback hell**（回调地狱）。网上有个段子：曾经有个小偷潜入某神秘机构，偷出机密代码的最后一页，打开一看 😂：
```                               });
                             });
                        });
                   });
              });
         });
    });
});
```
相信现在你对 promise应该已经有了感性的认识了，Promise是一种设计模式，同时也有一些标准规范，neat是通过promise、deferred两个对象实现的。下面我们先介绍deferred对象，一个deferred对象通常代表一个异步的任务：
## deferred对象
Neat的promise实现是在标准的 [Promises/A+ 规范](https://promisesaplus.com/) 之上做了扩充，我们将Promise功能分成了两部分，代表移步任务的deferred和代表监听链的promise对象，  Promises A+ 规范中规定一个promise对象有三种状态：**pending(默认)、resolved(完成)、rejected(失败)**；默认状态可以转变为完成态或失败态，一旦转化为完成态，则代表任务成功，执行所有成功回调，转化为rejected则代表任务失败，执行所有失败回调。完成态和失败态之间不能相互转化。而**neat 为了提供统一的异常处理，添加了一种状态：throwed，即异常态**。异常状态不能和其它状态发生转化，并且异常处理链中如果再发生异常，为了不影响调试，neat不会再捕获。neat deferred对象有五个函数：

- resolve(data,[context])
- reject(data,[context])
- notify(progress)
- emit(data,state,[context])
- promise()

其中resolve、reject的作用是设置当前promise 状态分别为resolved和rejected，并同时传递数据给promise监听链。第二个可选参数context是用于指定promise回调执行的上下文环境。notify为通知任务进度的函数，不会改变状态，每调用一次notify,  监听链中的所有progress回调就会执行。emit方法是一个彩蛋，我们后面再讲 😄。promise 方法返回一个promise对象，用于设置监听链，在讲promise之前我们先看看如何创建一个 deferred对象：

## $.Deferred(task)
- 功能：创建一个deferred对象
- 参数：task(d), task是一个异步任务(函数），d为当前的deferred对象。

我们先来看一个例子：

```javascript
//模拟一个异步任务，假设会耗时2s
function task(d){
 setTimeout(function(){
  d.resolve("我是异步任务执行的结果")
 },2000)
}
//创建一个deferred对象
var deferred=$.Deferred(task)
```
万事具备，只欠东风，现在异步任务已经初始化完成，我们需要的就是监听任务执行的状态，这时候就需要promise了，promise允许我们设置各个状态的回调，我们先来完成上面的例子：
```javascript
deferred.promise().done(function(data){
 console.log(data)
})
//执行上述代码后，2s后会在控制台输出：
"我是异步任务执行的结果"
```
好了，下面我们来揭开promise的面纱：
## promise对象
promise对象有6个方法，参数都是回调函数，返回值也都是一个新promise对象，这也是promise支持链式调用的原因。
- then(success,[fail],[catch])
- done(success)
- fail(fail)
- always(handler)
- progress(progress)
- catch(error)

then接受三个参数，第一个是成功回调，第二个是失败回调，第三个是异常回调，其中成功回调是必须有，后两个为可选参数。Promise A+规范只要求实现then方法，而neat为了使编码更方便，对其进行了扩充，实现了6个方法，注：大多数库都会实现这6个中的多个或全部，但至少得实现then方法，具体功能如下
- then传递的回调的返回值会被作为参数传递给回调链上的下一个then的处理函数.
- done函数传递的回调只会在任务执行成功时回调，并且不会返回数据，所有done回调收到的数据都是原始的异步任务的执行结果，也就是说，每个done回调接收的数据都是同一份。
- fail传递的回调函数会在异步任务失败时调用，也就是deferred调用reject函数时，回调的参数是reject 指定的数据.
- always指定的回调方法无论是在异步任务失败还是成功时都会调用，参数为调用reject或resolve时指定的数据。
- progress指定的回调会在异步任务调用notify后被执行。参数由notify指定。
- catch 传递的回调只有在**监听链**上的所有函数执行过程中抛出异常时会被调用，一旦抛出异常，除所有catch回调会被调用外，所有其它类型的调用链都会立即终止。这里的监听链指deferred对象调用reject或 resolve之后触发的我们传递的成功、失败回调。

下面是一个简单的示例，主要为了说明问题：

```javascript
//模拟一个异步任务，假设会耗时2s
function task(d){
 setTimeout(function(){
  //d.resolve("我是异步任务执行的结果")
  d.reject("糟糕，出错了")
 },2000)
}

function log(data){
console.log(data)
}
//创建一个deferred对象
$.Deferred(task).promise()
.done(function(data){
  log(data)
 //随便输点什么，故意引发一个语法错误,比如“xxx”
 // xxx
})
.done(function(){
 log(data, done2)
})
.fail(function(data){
 log(data)
})
.catch(function(e){
log(e)
})
```
你可以放开里面的注释查看执行情况。

介绍到这里，现在停下来，想想neat的ajax实现应该是什么样子的？相信你心中已经有了答案，如果有兴趣，可以参照[Neat ajax 源码](https://github.com/wendux/Neat/blob/master/src/core/adjax.js)。下面我们试想这么一个场景：我们在页面加载时要向三个网络接口请求数据，需要在所有数据都请求成功后再进行下一步动作，这三个请求没有依赖关系，想想应该怎么做？使用neat，你可以非常方便的处理这种情况：

## $.all(…[deferred,promise])
 顾名思义，功能是：当所有异步任务都执行完时触发回调。和jQuery的when类似，但两者又有些许不同。
- 参数： 一个deffered/promise列表，也就是异步任务的列表，此处也可以为promise对象。
- 返回值: promise对象

和上面一样，传递给all的所有任务都成功后，会触发done回调，如果有一个任务失败了，则会终止执行，同时触发fail回调，无论成功或失败都会触发always回调，监听链上如果发生异常，则调用catch回调，并终止其它调用链，示例如下：
```javascript
$.all(
  $.Deferred(function (deferred) {
      setTimeout(function () {
      console.log("我是第一个deferred,执行结果是dd");
      deferred.resolve("dd");
   }, 1000);
  }),
  $.Deferred(function (deferred) {
      setTimeout(function () {
      deferred.resolve("我是第二个deferred,执行结果是xx");
      //deferred.reject("糟糕，我是第二个异步任务，失败了")
    }, 3000);
   }))
.done(function (data) {
  console.log("好开心,所有任务都成功了,结果是:", data)
})
.done(function (data) {
  console.log("成功了,结果是:", data)
})
.fail(function (error) {
  console.log("不开心,有任务失败了,失败信息是:", error)
})
.fail(function () {
   console.log("fail!")
})
.always(function () {
 console.log("always")
})
```
您可以基于以上示例进行验证。

下面我们模拟一个进度示例，基于此例，你可以实现其它各种进度展示：

```javascript
var i = 0;
$.Deferred(function (deferred) {
  var t = setInterval(function (){
    deferred.notify(i);
    if (i++ == 100){
    clearInterval(t)
    deferred.resolve("加载完成")
  }
}, 25);
})
.promise()
.progress(function(progress){
  console.log(progress + "%")
}).done(function (d) {
  console.log(d)
})
```

你可以在控制台中查看执行结果。

### emit(data,state,[context])

- 功能：和 resolve、reject类似，emit会触发一种状态的回调，**但不会改变promise状态**。
- data：触发回调时传递的参数
- state:  指定的state, resolved(完成1)、rejected(失败2)、throwed(异常态4)
- context: 回调执行的上下文环境。

```javascript
deferred.emit("你好",1)
//这样所有的done方法都会被
```

emit在很多时候会非常有用，你甚至可以用它来实现一个事件队列。



## 总结

现在回过头来想一下 animate()、 ajax()，neat在内部都使用了deferred对象，所以我们才可以在外面方便的进行数据监听处理。
Neat在promise实现上也是相当优雅，这也是和zepto相比最大的优点。其实现在回过头来想想，neat本身功能是很强大的，但却能将源码做到那么小,无论是出于学习还是挖洞，neat的源码都是值得一看的。

本节相关测试代码请参加 [源码](https://github.com/wendux/Neat/) 目录 examples/promise-deferred.html。






# 动画
Neat和jQuery、 zepto相比，除了支持基本的dom css属性动画，neat对动画做了更进一步的抽象，使得neat动画可以使用的场景大大增多。

## DOM animate(style,speed)
- style: css **终态** 属性集；所谓终态是指：动画执行完后，css属性的值。有终态则必有始态，起始状态为动画开始执行时css的状态。

- speed: 动画执行的时长，默认500ms，为保证动画效果和速度，此值最小**不能少于30 ms**。

- 返回值：promise对象［仅done方法可用］，关于promise对象请移步 [Neat promise/deferred](#neat-promise-deferred)

下面实现一个在1s内让第一个ul隐藏的动画：

```javascript
$("ul").first()
.animate({opacity:0},1000)
```
我们是通过将opacity属性在1s内从当前值（浏览器默认为1）逐渐改为0，从而实现动画效果。但opacity为0只是元素不可见，但依然占据页面布局空间，我们的初衷是要将其隐藏掉，使它不占页面布局空间，那么，很自然的想法就是监听动画执行结束状态，在动画执行结束时设置其display属性为'none'，如下：
```javascript
$("ul").first()
.animate({opacity:0},1000)
.done(function(e){
//e为当前结果集
 e.css("display","none")
})
```
实现一个动画：500ms内让body字体变为50px的动画：

```javascript
$("body").animate({fontSize:50})
```
注意：所有的属性名用camelCase命名，fontSize不用带单位，neat会自动添加"px"（动画单位只支持px), 实际上，这和neat dom动画原理有关：计算出当前态style和传入的终态 style之间的差值，然后按照指定的speed分解为若干帧，依次设置；而计算差值时要去掉单位。

上面都是针对可以计算数值的属性有效，比如top、left、 fontSize等，而对混合属性或不可计算的属性无效，比如transform、backgroud等无效。还有我们无法干预每一帧动画的执行，jQuery的解决方案是animate增加一个可选参数，然后在这个可选参数中去设置一个帧回调，这样一来，就可以在帧回调中处理非数值属性的逻辑，比如动画执行到4/5时显示某个元素，或者去实现一个颜色渐变的算法。jQuery 这样做的前提条件是，所有的动画都是应用到当前结果集中的元素之上，这样真的好吗？我们来思考下面两个场景：
- 我们要在10s内让一个变量值匀速的从1加到1000。
- 我们要实现一个复杂动画，每一帧都会操作a元素的a属性，b元素的b属性，c元素的c属性 ......，也就是说，会操作多个元素的多个属性。

如果你使用过jQuery 或zepto，想一下，应该怎么用它们实现这两种效果。

其实你会发现，用jQuery和zepto实现上述功能很麻烦，本质原因是在于它们的设计上对动画抽象的缺陷所致－－动画是基于单一类型的dom，很显然，第一个场景和dom无关，第二个集合，操作的对象及响应的属性并不单一。下面我们看看neat如何做的：
## 动画抽象
Neat对动画的抽象进行了更深层次的抽象：任何对象在一段时间内状态连续性的改变，都称之为动画，对象可以是dom，也可以是变量。所以neat 提供了一个静态方法：
### $.animate(speed,[argv,callback])
- speed: 动画执行的速度
- argv: 动画执行过程中需要的参数，类型可以自己指定
- callback(time,[argv]): 动画执行过程中每一帧的回调，接受两个参数,分别是当前执行过的时间和指定的argv(如果没有指定则为undefined).

我们用neat实现10s内让一个变量值匀速的从1加到1000：
```javascript
var value=0;
$.animate(10000,function(time){
 value=time/10000*1000
 console.log(value)
})
```
这样一来，实现上述第二种场景也就很简单，具体则不冗述。

使用neat之所以很方便实现，本质上是因为，neat在对动画抽象时并非只局限于dom。 实现上，和dom操作相关的动画内部也是调用了$.animate。对于argv参数，主要是提供一个动画执行过程中临时变量的存放地，这么做的好处是避免在animate外部定义全局变量，这些数据应该是和具体的动画相关，动画执行完就要释放，如果定义在外部有两个缺点，一是不能及时释放，二是全局变量之间可能会产生覆盖干扰，举个例子: 一个复杂的动画执行过程要保存多个临时变量：

```javascript
//不使用argv的写法［不推荐］
var temp1=0
var temp2=2
var result;
$.animate(10000,function(time){
 var t=operate(temp1)
 result=t+temp2;
//更新temp1,temp2
 temp2=2*result
 temp1=t;
})
```
上面的代码即使animate执行结束，temp1、temp2也不会释！如果有第二个动画的中间变量名也命名为 temp1,那就有的玩了😂，因为动画是要在一段时间内连续执行多次的，两个动画反复读取修改同一个值，这将导致连个动画都不能得到预期结果。而neat的目标是追求极致优雅，怎会让这种事情发生，下面看看正确的姿势：


```javascript
//不使用argv的写法［不推荐］
var result;
$.animate(10000,{temp1:0,temp2:2}function(time,argv){
 var t=operate(argv.temp1)
 result=t+argv.temp2;
//更新temp1,temp2
 argv.temp2=2*result
 argv.temp1=t;
})
```
## 总结

综上所述，可以看出neat 动画简单、灵活、强大。这主要是因为neat 动画在抽象层次和设计思想上要优于jQuery、 zepto。作者使用neat实现了一个更复杂的 svg 匀减速的进度条动画，有兴趣的请移步  [github.neat.example.animate](https://github.com/wendux/Neat/blob/master/examples/animate.html) 。




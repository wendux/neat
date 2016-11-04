# 工具函数
由于ECMAScript5新增了很多api,对原生的对象（Object、数组、字符串等）进行了很多实用的特性扩充，并且看趋势，很多该有而一直没有的函数在ECMA新的版本中都有提案，事实上es6已经实现了很多，如：Object.assign、String.trim 、Array.include等等，总之，原生的支持会越来越多。 neat的工具函数相对于jQuery来说并不多但也有一些jQuery中没有但是确实很高频的。作者认为，jQuery 、 zepto中很多工具函数现在已经没必要了，举个例子：

```javascript
功能：检测某个元素是否在数组中
//jQuery写法
jQuery.inArray(value,array)
//我们完全可以这么检测:
array.indexOf(value)!=-1
//ES6直接可以这么写:
array.includes(value)
//还有诸如：
Object.create()、Object.assign()...
//这些方法直接使用是非常方便的。
```
下面我们看看neat的所有工具函数，工具函数都以静态方法提供。
##检测性函数
主要判断对象类型，有三个函数：
- $.isObject(ele)
- $.isString(ele)
- $.isFunction(ele)

```javascript
> $.isFunction("")
> false
> $.isFunction(console.log)
> true
> $.isObject(console)
> true
> $.isObject(console.log)
> false
> $.isString("")
> true
> $.isString(console)
> false
```
neat内部是使用了typeof运算符，拿 $.isString来说，其内部实现如下：
```javascript
$.isString=function(ele){
 return typeof ele==="string"
}
```
如果你需要更加精细准确的类型检测，比如判断某个对象实例是否属于某个类，neat并没有提供这样的方法，你需要自己实现。

## $.extend(src,obj)
功能：扩展src对象，返回值为扩展后的src对象

```javascript
var t={a:8}
> $.extend(t,{b:9})
> {a:8,b:9}
返回值和t相同
> $.extend({x:5},{x:6,y:7})
> {x: 6, y: 7}
x值会被覆盖
```
## $.unique(arrayLike)
- 功能：给数组或类数组对象去重，支持对象数组
- arrayLike: 数组或类数组对象
- 返回值：去重后的数组
  注：类数组对象为具有length属性并支持下表取值的对象，常见的如函数的arguments参数。此方法不改变原对象。

```javascript
var ar1=[1,2,2,3,6,6,7]
var arr2=[$("body")[0],$("body")[0]]
> $.unique(ar1)
> [1, 2, 3, 6, 7]
> $.unique(arr2)
> [body]
```

## $.trim(str)
- 功能: 去除字符串首尾的空字符
- 返回值: 去除后的字符串

```javascript
> $.trim("   neat is  great!  ")
> "neat is  great!"
```
最后一个工具函数，到目前为止neat独有的，很多时候我们要在js汇中解析url的queryString。使用字符串解析太麻烦，对此，neat专门提供了一个工具函数：
## $.qs(key)
- 功能：获取当前url queryString的指定参数值
- 返回值：如果存在该查询参数，则返回该参数对应值的字符串形式，如果不存在，则返回undefined

```javascript
假设当前页面链接如下：
http://neat.dtworkroom.com?name=Davin&age=18
> $.qs("name")
> "Davin"
> $.qs("age")
> "18"
> $.qs("sex")
> undefined
```
## 自定义工具函数扩展
```javascript
$.inArray=function(item,array){
 if(!array) return false;
 return array.indexOf(item)!=-1
}
```
 neat工具函数就这么多。作者认为大多数情况下够用了。再者，作为一个移动端优先的库，合适的子集是必要的。还有一点需要说明，就是静态方法并概念上并不等同于“工具”函数，虽然工具函数都是静态方法，neat的静态方法很多的比如$.ajax、 $.Deferred、 $.animate等，但它们并不等同于“工具函数”，当然这只是个叫法上的约定。








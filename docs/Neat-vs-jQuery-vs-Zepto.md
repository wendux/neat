# Neat vs jQuery vs Zepto
> Neat和jQuery有什么区别？如果实在对jQuery旧情难忘，移动端也有zepto啊，为什么要重复发明轮子？Neat使用和jQuery这么像，是不是扣的jQuery代码？我为什么不直接使用jQuery而要用Neat?想必很多人有这些疑问，本文将一一解答。

## 移动端的特殊性

移动端和PC端相比，主要有以下几个特点：

1. 屏幕小、网页结构简单。
2. 硬件配置较低，所以对页面性能要求高。
3. 流量珍贵。
4. 移动端支持touch事件
5. 兼容性问题小，移动端浏览器都是webkit内核(iOS和Android)，对H5、es5支持很好。

## jQuery的作用

PC端引入jQuery的主要原因有两个:

1. 处理浏览器的兼容性问题，提供统一接口。
2. DOM操作。PC页面一般比较复杂，jQuery提供了强大的选择器和DOM操作API用以方便的操作DOM树。

jQuery3.0虽然已经使用了很多es5特性，去除了一些旧的api，但重点还是DOM操作，也并非移动端优先，依然没有touch事件，依然存在一些pc浏览器的兼容代码，体积依然较大。详细请移步 [jQuery3.0 Upgrage Guide](https://jquery.com/upgrade-guide/3.0/#overview) . 当然还有一个去除了ajax的slim版本，至于这个，我们下面再说。

可以看到，jQuery的这两个优势，在移动端都会大打折扣。首先，移动端没有那么复杂的兼容问题；其次，移动端网页结构简单，DOM复杂度降低，这会使DOM操作复杂度也降低。另外还有两个问题：DOM操作非常低效，移动端性能是个大问题；其次，即使jQuery3.0 也有37k左右(gzip)，这对移动端来说，依然太大。综上所述，这也是为什么移动端提出 jQuery free的主要原因。所以，才有了Zepto，下面我们的主要对比对象将是Zepto。

无论是Zepto还是Neat，都提供了 **jQuery-compatible API**. 然后各有增删。不同的是两者的定位和实现。下面对Zepto和Neat进行一个详细的对比：

## Zepto

说Zepto是移动端的jQuery是不确切的，从Zepto将touch作为可选模块(并非集成在内核中)可见一斑，似乎还期望能被用于pc端（所以才没有把touch集成到内核？），这么一来更像是jQuery3.0的一个阉割版（功能、目标和jQuery定位差不多，但功能是jQuery的一个子集）。Zepto继承了jQuery的DOM操作，提供了一个 core，gzip之后9.7k(2016.11.3)，提供了可选的deferred、touch等模块。也就是说，Zepto的核心中并不支持touch事件和deferred，详情请参见其官网。正如上文所说：移动端应该最先弱化的是dom操作，首先应该被支持的是touch事件，而应该被增强的是ajax和异步任务处理。前两点很好理解，第三点怎么说？其实也就是两个方面：

1. 流量：移动端流量非常宝贵，一般的做法是将显示的模版(html)和样式(css), 先下载下来，然后再通过ajax动态拉数据，然后再填充页面。不同的操作，拉不同的数据，填不同的页面。而页面的展示模版只加载一次就行。
2. SPA应用较多：为了提高用户体验，提供流畅的操作体验，移动端SPA应用越来越多，而SPA应用的做法正如1中所述，在第一次加载时一般会将全部页面模版下载下来，而后续操作只用ajax去拉数据填充界面。

综上所述，一个移动端优先的框架，应该弱化dom操作、包含 touch事件、并提供良好的ajax接口和异步能力。我们以这三个标准看看zepto,  首先zepto对jQuery  dom操作做了少许弱化，但对于移动端来说还是太多，有些根本很少用到，也就是说包含了一些可能有用，但非必需的api，其实以我之见，既然zepto都提供了可选模块机制，就连touch事件都能放在可选模块中，这些“非必需”的api却放到了内核，本质上还是定位不清晰，该弱化的力度不够。 至于touch事件，Zepto提供了可选的touch模块，值得一提的是Zepto官网给出的实现中竟然支持pointer events (Windows Phone），当然，考虑的全面是首先要肯定的，但我认为没必要，就连qq都已放弃windows phone版本支持，我们这么用心，微软肯定会很感动，也许你会说只是多监听了几个事件，多不了几行代码，但是，Neat是移动端优先的，对于代码质量，即使一个字节，也要反复考究。最后一点，也是我最不喜欢的，就是zepto的ajax调用方式，我们看一下其官网示例：

```javascript

$.ajax({
  type: 'GET',
  url: '/projects',
  // data to be added to query string:
  data: { name: 'Zepto.js' },
  // type of data we are expecting in return:
  dataType: 'json',
  timeout: 300,
  context: $('body'),
  success: function(data){
    // Supposing this JSON payload was received:
    //   {"project": {"id": 42, "html": "<div>..." }}
    // append the HTML to context object.
    this.append(data.project.html)
  },
  error: function(xhr, type){
    alert('Ajax error!')
  }
})
```

真是醉了，如果你看过[Neat ajax](#neat-ajax)，相信你也会发出和我一样的感叹！这么多参数，错误处理和成功回调都在参数之内，并且没有进度和异常处理，而且回调函数只能传一个。这一点，Neat完爆Zepto，Neat的介绍是优雅、高效、简介，所以绝不能忍受写出这种代码，其实，zepto ajax之所以长成这样，是因为它内核中不包含deferred所致，这么重要的东西，说它不支持，又提供了可选模块，说支持，又不集成在内核，摇摆不定，真是无法可想。这里要说一点，即使你引入了zepto 的deferred模块，也无法与其内核中的ajax无缝集成，必须以ajax放在一个deferred中这种蹩脚的方式来融合，太不优雅了！下面我们已这些指标来看看Neat:

## Neat 让一切变的简单

1. dom操作：neat提供了一个核心的api集合，保留了常用的api，舍弃了很多作者作为一个移动端的库所不必的。
2. Neat内核支持touch事件。
3. 和Zepto相比，[Neat的ajax](#neat-ajax)让你爽到飞。
4. Neat内核支持[promise/deferred](#neat-promise-deferred), 再也不用担心异步任务处理了。
5. 也是最重要的一点，Neat内核在支持touch、promise/deferred的情况下，体积也只有3.7k (2016.11.3)，而zepto内核在没有这两个模块的情况下也有9.7k，主要原因有两个：一是定位不同，二是实现不同。Neat追求极致的优雅、高效、简洁。

### 插件的支持

无论是Zepto还是Neat，都希望能移植jQuery社区众多的优秀插件，但是由于两者api都是jQuery的一个子集，所以插件的移植都不会无缝移植。zepto官方并没有给出一个标准的指导方案，这样只能由插件开发者支持zepto或使用者手动进行修改。而Neat提出了Neat patch的概念，并计划维护一个patch库，这样不仅有了一个明确的指导，而且也可以依靠社区的力量，只是Neat是一个新人，无论是社区还是patch库都还需要一个成长的过程， Neat期待你的加入。

### 实现方式

Neat的目标是追求极致优雅、简介、高效。Neat在实现上对代码都是经过反复打磨的，并使用了众多黑科技（当然，你也可以认为是奇技淫巧 ),  千锤百炼、反复浓缩，才造就了Neat的小、全、专、雅、活（详情见项目介绍）。Neat兼容jQuery API ，但Neat绝不是jQuery的复制品，两者底层实现差异很大，之所以兼容jQuery，一是为了符合jQuery用户习惯，二是为了迁移jQuery的众多优秀的插件。当然，Neat 继承了jQuery的很多优秀思想，同时我在此向jQuery Foundation致敬。 由于neat 代码非常优雅简洁，很适合学习和阅读，欢迎大家去github clone，如果你觉得好，记得star哦 😄！贴出地址，欢迎斧正 [https://github.com/wendux/Neat](https://github.com/wendux/Neat) 。



**注： 以上观点，仅为作者本人观点、仁者见仁，智者见智，只是谈一下作者本人在使用过程中的一些感受，当然，也算是官方观点。如果你喜欢Neat，哈哈，少年好眼光👍**

*本文主要是和jQuery、Zepto对比，和React、vue的对比在[项目简介](#neat-project-readme)里有个大概，日后有机会再详细讨论*




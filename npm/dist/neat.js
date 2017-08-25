(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _core = __webpack_require__(1);
	
	__webpack_require__(6);
	
	//umd放开
	/**
	 * Created by du on 16/9/28.
	 */
	module.exports = _core.$;
	
	//min包放开
	//window.neat=window.$=$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.$ = $;
	
	var _statics = __webpack_require__(2);
	
	var _prototype = __webpack_require__(5);
	
	/**
	 * Created by du on 16/9/28.
	 */
	function parseDom(arg) {
	    if ($.isObject(arg)) return arg;
	    arg = $.trim(arg);
	    if (arg[0] != "<") {
	        return document.createElement(arg);
	    }
	    var objE = document.createElement("div");
	    objE.innerHTML = arg;
	    return objE.childNodes;
	}
	
	var neat = function neat(selector, context) {
	    Array.call(this);
	    context = context || document;
	    var t = [];
	    if (selector) {
	        if ($.isFunction(selector)) {
	            return $(document).ready(selector);
	        } else if ($.isString(selector)) {
	            selector = $.trim(selector);
	            if (selector[0] != "<") {
	                t = $(context).find(selector);
	                return t;
	            } else {
	                t = parseDom(selector);
	            }
	        } else if ($.isObject(selector)
	        //window also has length prop.
	        && selector != window && selector.length !== undefined) {
	            //ArrayLike object
	            t = selector;
	        } else {
	            //一般对象
	            t = [selector];
	        }
	    }
	    if (t[0] == document || t[0] == window) {
	        $._b = null;
	    } else {
	        this._b = $._b;
	        $._b = this;
	    }
	    [].push.apply(this, $.unique(t));
	};
	
	function $(selector, context) {
	    return new neat(selector, context);
	}
	
	$.fn = neat.prototype = Object.create(Array.prototype);
	_statics.method.extend($, _statics.method);
	$.extend($.fn, _prototype.prototype);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.method = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Created by du on 16/9/28.
	                                                                                                                                                                                                                                                                               */
	//静态方法
	
	
	var _deferred = __webpack_require__(3);
	
	var _adjax = __webpack_require__(4);
	
	var _core = __webpack_require__(1);
	
	var method = exports.method = {
	    extend: function extend(target, ob) {
	        for (var i in ob) {
	            Object.hasOwnProperty();
	            target[i] = ob[i];
	        }
	        return target;
	    },
	
	
	    //要支持dom数组
	    unique: function unique(arrayLike) {
	        if (!arrayLike.length) return arrayLike;
	        var res = [arrayLike[0]];
	        for (var i = 1; i < arrayLike.length; i++) {
	            if (res.indexOf(arrayLike[i]) < 0) {
	                res.push(arrayLike[i]);
	            }
	        }
	        return res;
	    },
	    trim: function trim(s) {
	        return s.replace(/(^\s*)|(\s*$)/g, '');
	    },
	    animate: function animate(speed, argvs, callback) {
	        if (speed < 30) speed = 30;
	        var f = callback || argvs;
	        var _run = requestAnimationFrame;
	        if (!callback) {
	            argvs = undefined;
	        }
	        function proxy() {
	            var c = new Date() - start;
	            if (c >= speed) {
	                f(speed, argvs);
	                return;
	            }
	            f(c, argvs);
	            _run(proxy);
	        }
	
	        var start = new Date();
	        _run(proxy);
	    },
	    jsonp: function jsonp(url, callback) {
	        var tag = "neatJsonp";
	        if (!_core.$[tag]) {
	            _core.$[tag] = 1;
	        }
	        var cbName = tag + _core.$[tag];
	        window[cbName] = callback;
	        (0, _core.$)(document.createElement('script')).attr("src", url + cbName).on("load", function (e) {
	            (0, _core.$)(this).remove();
	            delete window[cbName];
	        }).appendTo("body");
	        ++_core.$[tag];
	    },
	    qs: function qs(e) {
	        return _qs[e];
	    },
	
	    //autoFix:["height", "width", "fontSize", "top", "left", "right", "bottom"],
	    Deferred: _deferred.deferred
	};
	var _qs = [];
	var a = decodeURI(location.search.substr(1)).split('&');
	for (var b = 0; b < a.length; ++b) {
	    var temp = a[b].split('=');
	    _qs[temp[0]] = temp[1] ? temp[1] : null;
	}
	var testFuns = ["Object", "Function", "String"];
	testFuns.forEach(function (e) {
	    method["is" + e] = function (o) {
	        return (typeof o === "undefined" ? "undefined" : _typeof(o)) === e.toLowerCase();
	    };
	});
	method.extend(method, _adjax.ajax);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.deferred = deferred;
	
	var _core = __webpack_require__(1);
	
	function Deferred(task) {
	    var _this2 = this;
	
	    var callbacks = [[], [], [], []];
	    //promise标准有三种状态,pending(0),fulfilled(1),rejected(2)
	    //Neat为了提供优雅的错误处理,对promise进行了扩展,增加了第四种状态,
	    //异常态throwed(3),代表当前链有抛出异常,处于异常状态。这会触发所有
	    // 异常回调。默认为pending态
	    var promiseState = 0;
	    var saveCallbacks = function saveCallbacks() {
	        var argv = arguments;
	        for (var i = 0; i < argv.length; ++i) {
	            //if (_state ) return;
	            if (argv[i]) {
	                callbacks[i].push(argv[i]);
	            }
	        }
	        return _promise;
	    };
	    var _promise = {
	        //接收三个参数,分别是成功回调、失败回调、异常回调
	        then: function then() {
	            var _arguments = arguments,
	                _this = this;
	
	            var newDeferred = _core.$.Deferred();
	            var argv = [].slice.call(arguments);
	            var successCallback = argv[0];
	            //var newPromise=newDeferred.promise();
	            argv[0] = function (result) {
	                var ret = successCallback(result);
	                if (ret instanceof Deferred) {
	                    ret = ret.promise();
	                }
	                if (_core.$.isObject(ret) && ret._npt) {
	                    ret.done(function (data) {
	                        newDeferred.resolve(data);
	                    }).fail(function (e) {
	                        newDeferred.reject(e);
	                    });
	                } else {
	                    newDeferred.resolve(ret);
	                }
	            };
	
	            //pass reject and exception
	            //argv[1]=(e)=>{
	            //    arguments[1]&&arguments[1](e)
	            //    newDeferred.notify(e,2,true) ;
	            //
	            //}
	            //
	            //argv[2]=(e)=>{
	            //    arguments[2]&&arguments[2](e)
	            //    newDeferred.notify(e,3,true) ;
	            //}
	
	            //pass reject and exception
	            [1, 2, 3].forEach(function (state) {
	                argv[state] = function (data) {
	                    _arguments[state] && _arguments[state](data);
	                    newDeferred.emit(data, state + 1, _this, true);
	                };
	            });
	
	            saveCallbacks.apply(null, argv);
	            return newDeferred.promise();
	        },
	        done: function done(success) {
	            return saveCallbacks(success);
	        },
	        fail: function fail(_fail) {
	            return saveCallbacks(null, _fail);
	        },
	        always: function always(fun) {
	            return saveCallbacks(fun, fun);
	        },
	        catch: function _catch(fun) {
	            callbacks[2].push(fun);
	            return this;
	        },
	        progress: function progress(fun) {
	            callbacks[3].push(fun);
	            return this;
	        },
	
	        //promise对象的标签,
	        _npt: 1
	        //noChange为true则不改变promiseState,默认为false
	    };var safeCall = function safeCall(state, value, context, noChange) {
	        //若 promiseState不为pending态(0),则终止
	        if (promiseState) return;
	        context = context || _promise;
	        try {
	            callbacks[state - 1].forEach(function (fun) {
	                fun.call(context, value);
	            });
	        } catch (e) {
	            if (!callbacks[2].length && state == 3) throw e;
	            callbacks[2].forEach(function (fun) {
	                fun.call(context, e);
	            });
	        }
	        noChange || state < 4 && (promiseState = state);
	    };
	    _core.$.extend(this, {
	        resolve: function resolve(value, context) {
	            safeCall(1, value, context);
	        },
	        reject: function reject(error, context) {
	            safeCall(2, error, context);
	        },
	        notify: function notify(progress, context) {
	            safeCall(4, progress, context);
	        },
	        emit: function emit(data, state, context, changeState) {
	            safeCall(state, data, context, !changeState);
	        },
	        promise: function promise() {
	            return _promise;
	        }
	    });
	
	    setTimeout(function () {
	        task && task(_this2);
	    }, 0);
	}
	//在所有异步执行后回调,参数是Deferred/promise对象列表
	/**
	 * Created by du on 16/9/28.
	 */
	_core.$.all = function () {
	    var args = arguments;
	    var result = [];
	    var count = args.length;
	    return _core.$.Deferred(function (d) {
	        for (var i = 0; i < args.length; ++i) {
	            +function (i) {
	                var o = args[i];
	                //确保o为promise对象
	                if (o.promise) {
	                    o = o.promise();
	                }
	                o.done(function (data) {
	                    result[i] = data;
	                    if (--count == 0) {
	                        d.resolve(result);
	                    }
	                }).fail(function (err) {
	                    d.reject(err);
	                });
	            }(i);
	        }
	    }).promise();
	};
	
	function deferred(task) {
	    return new Deferred(task);
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ajax = undefined;
	
	var _core = __webpack_require__(1);
	
	var _deferred = __webpack_require__(3);
	
	/**
	 * Created by du on 16/9/28.
	 */
	function formatParams(data) {
	    var arr = [];
	    var _encode = encodeURIComponent;
	    for (var name in data) {
	        arr.push(_encode(name) + "=" + _encode(data[name]));
	    }
	    return arr.join("&");
	}
	var ajax = exports.ajax = {
	    ajax: function ajax() {
	        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	        var data = arguments[1];
	        var options = arguments[2];
	
	        var xhr;
	        var promise = (0, _deferred.deferred)(function (defer) {
	            options = _core.$.extend({ type: "GET" }, options);
	            var params = formatParams(data);
	            xhr = new XMLHttpRequest();
	            //已废弃,通过$.ajax().xhr.onxx直接设置
	            //处理用户提供的额外的回调,如onprogress,onabort
	            //for (var callback in options) {
	            //    if (callback.indexOf("on") == 0) {
	            //        xhr[callback] = options[callback]
	            //    }
	            //}
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState == 4) {
	                    var status = xhr.status;
	                    if (status >= 200 && status < 300) {
	                        defer.resolve(xhr.responseText, xhr);
	                    } else {
	                        defer.reject(status, xhr);
	                    }
	                }
	            };
	            xhr.onprogress = function (event) {
	                defer.notify(event, xhr);
	            };
	
	            if (options.type.toUpperCase() == "GET") {
	                xhr.open("GET", url + "?" + params, true);
	            } else {
	                xhr.open("POST", url, true);
	                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	            }
	            for (var k in options.header) {
	                xhr.setRequestHeader(k, options.header[k]);
	            }
	            xhr.send(params[0] ? params : null);
	            promise.xhr = xhr;
	        }).promise();
	
	        return promise;
	    },
	    get: function get(url, data) {
	        return this.ajax(url, data);
	    },
	    post: function post(url, data) {
	        return this.ajax(url, data, { type: "POST" });
	    }
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.prototype = undefined;
	
	var _core = __webpack_require__(1);
	
	var prototype = exports.prototype = {
	    ready: function ready(callback) {
	        if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
	            callback(_core.$);
	        } else {
	            this.on('DOMContentLoaded', function () {
	                callback(_core.$);
	            }, false);
	        }
	        return this;
	    },
	
	    each: function each(callback) {
	        this.every(function (el, idx) {
	            return callback.call(el, el, idx) !== false;
	        });
	        return this;
	    },
	    on: function on(evt, selector, fun) {
	        if (_core.$.isString(selector)) {
	            this.each(function (e) {
	                var _funProxy;
	                (0, _core.$)(e).on(evt, _funProxy = function funProxy() {
	                    var t = event.target;
	                    (0, _core.$)(t).attr("_", "_");
	                    (0, _core.$)(selector, e).each(function (el) {
	                        if (el == t || (0, _core.$)("[_=_]", el).indexOf(t) != -1) {
	                            (0, _core.$)(t).removeAttr("_");
	                            fun.call(el, window.event);
	                        }
	                    });
	                    //委托事件存根,解绑时会用
	                    e._cb = e._cb || [];
	                    e._cb.push({
	                        n: evt + selector,
	                        f: fun,
	                        cb: _funProxy
	                    });
	                });
	            });
	        } else {
	            this.each(function (e) {
	                e.addEventListener(evt, selector);
	            });
	        }
	        return this;
	    },
	    off: function off(event, selector, callback) {
	        if (_core.$.isString(selector)) {
	            this.each(function (e) {
	                if (e._cb) {
	                    //反向遍历删除元素
	                    for (var i = e._cb.length - 1; i > -1; --i) {
	                        var _stub = e._cb[i];
	                        if (_stub.n == event + selector && _stub.f == callback) {
	                            e._cb.splice(i, 1);
	                            (0, _core.$)(e).off(event, _stub.cb);
	                        }
	                    }
	                }
	            });
	        } else {
	            this.each(function (e) {
	                e.removeEventListener(event, selector);
	            });
	        }
	        return this;
	    },
	    eq: function eq(index) {
	        return (0, _core.$)(this[index]);
	    },
	    first: function first() {
	        return (0, _core.$)(this[0]);
	    },
	    last: function last() {
	        return (0, _core.$)(this[this.length - 1]);
	    },
	    add: function add(o) {
	        var t = this.slice(0);
	        t.push.apply(t, (0, _core.$)(o));
	        _core.$._b = this;
	        return (0, _core.$)(t);
	    },
	    parents: function parents(selector) {
	        var n = (0, _core.$)(selector);
	        var t = [];
	        this.each(function (e) {
	            e = (0, _core.$)(e).parent();
	            for (; e.length > 0;) {
	                if (n.indexOf(e[0]) > -1) {
	                    t.push(e[0]);
	                    break;
	                }
	                e = e.parent();
	            }
	        });
	        _core.$._b = this;
	        return (0, _core.$)(t);
	    },
	    text: function text(s, type) {
	        type = type || "textContent";
	        if (s) {
	            type = this.each(function (e) {
	                e[type] = s;
	            });
	        } else {
	            type = this[0] ? this[0][type] : "";
	        }
	        return type;
	    },
	    html: function html(s) {
	        return this.text(s, "innerHTML");
	    },
	    children: function children() {
	        var t = [];
	        this.each(function (e) {
	            t.push.apply(t, e.childNodes);
	        });
	        return (0, _core.$)(t.filter(function (e) {
	            return e.nodeType == 1;
	        }));
	    },
	    css: function css(mix, value) {
	        var t = {};
	        if (value) {
	            t[mix] = value;
	        } else if (_core.$.isObject(mix)) {
	            t = mix;
	        }
	
	        if (JSON.stringify(t) != "{}") {
	            //$.autoFix.forEach(e=> {
	            //    t[e] = t[e] && parseFloat(t[e]) + "px";
	            //})
	            return this.each(function (e) {
	                _core.$.extend(e.style, t);
	            });
	        } else {
	            return this[0] && getComputedStyle(this[0])[mix];
	        }
	    },
	    hide: function hide() {
	        return this.each(function (e) {
	            if ((0, _core.$)(e).css("display") != "none") {
	                (0, _core.$)(e).attr("od", (0, _core.$)(e).css("display")).css("display", "none");
	            }
	        });
	    },
	    show: function show() {
	        return this.each(function (e) {
	            (0, _core.$)(e).css("display", (0, _core.$)(e).attr("od"));
	        });
	    },
	    attr: function attr(name, value) {
	
	        if (value != undefined) {
	            return this.each(function (e) {
	                if (name == "value") {
	                    e.value = value;
	                } else {
	                    e.setAttribute(name, value);
	                }
	            });
	        } else {
	            return this[0] && this[0].getAttribute(name) || "";
	        }
	    },
	    val: function val(value) {
	        if (!value) {
	            return this[0] ? this[0].value : "";
	        } else {
	            return this.attr("value", value);
	        }
	    },
	    removeAttr: function removeAttr(name) {
	        return this.each(function (e) {
	            e.removeAttribute(name);
	        });
	    },
	    hasClass: function hasClass(cls) {
	        var first = this[0];
	        if (!(first && first.className)) return false;
	        return !!first.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	    },
	    addClass: function addClass(cls) {
	        return this.each(function (f) {
	            if (!(0, _core.$)(f).hasClass(cls)) {
	                f.className += " " + cls;
	            }
	        });
	    },
	    removeClass: function removeClass(cls) {
	        return this.each(function (f) {
	            if ((0, _core.$)(f).hasClass(cls)) {
	                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	                f.className = f.className.replace(reg, ' ');
	            }
	        });
	    },
	    find: function find(selector) {
	        var t = [];
	        this.each(function (e) {
	            var list = e.querySelectorAll(selector);
	            list && t.push.apply(t, list);
	        });
	        return (0, _core.$)(t);
	    },
	    end: function end() {
	        return this._b;
	    },
	    append: function append(content) {
	        return this.each(function (e, index) {
	            if (index > 0 && (_core.$.isObject(content) || _core.$.trim(content)[0] != '<')) {
	                return false;
	            }
	            (0, _core.$)(content).each(function (x) {
	                e.appendChild(x);
	            });
	        });
	    },
	    appendTo: function appendTo(s) {
	        (0, _core.$)(s).eq(0).append(this);
	        return this;
	    },
	    before: function before(ref) {
	        var t = (0, _core.$)(ref);
	        return this.each(function (e) {
	            t.parent()[0].insertBefore(e, t[0]);
	        });
	    },
	    remove: function remove() {
	        return this.each(function (e) {
	            (0, _core.$)(e).parent()[0].removeChild(e);
	        });
	    },
	    trigger: function trigger(event) {
	        var evt = document.createEvent('HTMLEvents');
	        evt.initEvent(event, true, true);
	        return this.each(function (e) {
	            e.dispatchEvent(evt);
	        });
	    },
	    animate: function animate(styles, speed) {
	        var _this = this;
	
	        speed = speed || 500;
	        return _core.$.Deferred(function (d) {
	            var start = {};
	            for (var k in styles) {
	                start[k] = parseFloat(_this.css(k));
	            }
	            _core.$.animate(speed, styles, function (t) {
	                for (var i in styles) {
	                    _this.css(i, start[i] + t / speed * (styles[i] - start[i]));
	                }
	                if (t == speed) {
	                    d.resolve(_this);
	                }
	            });
	        }).promise();
	    }
	}; /**
	    * Created by du on 16/9/28.
	    */
	
	["parentElement", "previousElementSibling", "nextElementSibling"].forEach(function (e) {
	    var i = !e.lastIndexOf("par") ? 6 : 4;
	    prototype[e.substr(0, i)] = function () {
	        var t = [];
	        this.each(function (ele) {
	            if (ele[e]) {
	                t.push(ele[e]);
	            }
	        });
	        return (0, _core.$)(t);
	    };
	});
	["click", "tap", "longTap", "singleTap", "doubleTap", "swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown"].forEach(function (e) {
	    prototype[e] = function (cb) {
	        if (!cb) {
	            this.trigger(e);
	        } else {
	            this.on(e, cb);
	        }
	        return this;
	    };
	});
	["map", "filter"].forEach(function (e) {
	    prototype[e] = function () {
	        return (0, _core.$)([][e].apply(this, arguments));
	    };
	});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _core = __webpack_require__(1);
	
	var doubleTap = {},
	    singleTimer,
	    longTapTimer; /**
	                   * Created by liux on 2016/10/17.
	                   */
	
	var TapD = 7,
	    SwipeD = 10,
	    DoubleTapDelay = 300,
	    LongTapDelay = 500,
	    TapTimeout = 1000,
	    TouchTimeout = 2000;
	function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
	}
	(0, _core.$)(function () {
	    var el, startTime, endTime, startX, startY, endX, endY;
	    function Range() {
	        return Math.max(Math.abs(endX - startX), Math.abs(endY - startY));
	    }
	    function trigger(name) {
	        el.trigger(name);
	        var t = name.toLowerCase();
	        if (name != t) {
	            el.trigger(t);
	        }
	    }
	    function touchType() {
	        var delay = endTime - startTime,
	            range = Range();
	        clearTimeout(longTapTimer);
	        if (delay > TouchTimeout) return; //按住的时间超过2s取消所有事件
	        if (range > SwipeD) {
	            trigger('swipe');
	            trigger('swipe' + swipeDirection(startX, endX, startY, endY));
	            return;
	        } else if (range < TapD && delay < TapTimeout) {
	            //按住超过1s取消所有tap类型的事件
	            //tap与longTap互斥
	            if (delay < LongTapDelay) {
	                trigger('tap');
	            }
	            if (delay < DoubleTapDelay) {
	                if (el[0] === doubleTap.el && Date.now() - doubleTap.startT < 300) {
	                    doubleTap = {};
	                    trigger('doubleTap');
	                    clearTimeout(singleTimer);
	                } else {
	                    doubleTap.el = el[0];
	                    doubleTap.startT = startTime;
	                    singleTimer = setTimeout(function () {
	                        trigger('singleTap');
	                    }, DoubleTapDelay);
	                }
	            }
	        }
	    }
	
	    (0, _core.$)(document).on('touchstart', function (e) {
	        el = (0, _core.$)(event.target);
	        startTime = Date.now();
	        startX = endX = e.touches[0].pageX;
	        startY = endY = e.touches[0].pageY;
	        longTapTimer = setTimeout(function () {
	            if (Range() < TapD) trigger('longTap');
	        }, LongTapDelay);
	    }).on('touchmove', function (e) {
	        if (!el || e.target !== el[0]) return;
	        endX = e.touches[0].pageX;
	        endY = e.touches[0].pageY;
	    }).on('touchend', function (e) {
	        if (!el || e.target !== el[0]) return;
	        endTime = Date.now();
	        touchType();
	    }).on('touchcancel', function () {
	        if (!el || e.target !== el[0]) return;
	        clearTimeout(longTapTimer);
	    });
	});

/***/ })
/******/ ])
});
;
//# sourceMappingURL=neat.js.map
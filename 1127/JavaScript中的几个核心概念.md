# JavaScript 中一些核心的概念

# 一些概念

作用域、作用域链、原型链、this 指向以及函数调用栈
堆栈内存、事件循环、多线程
异步编程（回调、promise、sync await、生成器）、错误传递与捕获
执行上下文
js 中多线程与事件循环实现

# 宏观层面

首先我们先从一个比较大的宏观层面来看待 JavaScript。`程序 = 数据结构 + 算法`，数据结构用于描述和存储数据，而算法则是数据转化过程的描述。

那么**程序本质上就是在将一种数据转换成另外一种数据**。而编程语言作为程序的实现载体，最核心的功能其实就是数据运算、转换。

# 概念解释

## 作用域（scope）

是指程序中定义变量的区域，**决定了变量的可访问性**和生命周期

JavaScript 中有这么几种作用域：全局、函数、模块、块级（仅用于 let、const）

### 模块化规范（ES Module、CommonJS）

模块化实现有多种方式，比如：AMD、CMD、UMD、CommonJS、ES Module 等。

最经典的还是 ES Module 与 CommonJS，而且**除了 ES Module 在语法层面提供作用域环境隔离，其他都是利用函数作用域环境模拟实现的**。

### 作用域的种类

作用域主要分成动态（dynamic scope）和静态（static scope）两种，静态 scope 又称词法（lexical）scope。

[Most of the programming languages support lexical or static scope such as C, C++, Java, JavaScript. Perl supports both static and dynamic scoping.](https://blog.bitsrc.io/understanding-scope-and-scope-chain-in-javascript-f6637978cf53)

## 作用域链（scope chain）

作用域链描述的是变量的查找规则。JavaScript 采用的是静态（词法）作用域，作用域链的建立取决于静态声明。

而又因为作用域支持嵌套，所以由内而外，就形成了作用域链（如果作用域不支持一层层嵌套，那就没有作用域链一说）。

更具体一点来讲，函数内部的变量访问取决于函数定义的位置，而不是函数调用的位置。

## 原型链

JavaScript 中对象采用原型继承，每一个对象都有一个 **proto** 属性指向其原型对象。通过这个属性连接各个对象，因此形成了原型链。对象某个属性的查找可能会遍历原型链。

## 函数调用栈

函数的嵌套调用，底层是采用栈的方式来实现的。

## this 指向

我们知道普通函数（除了箭头函数），this 默认指向调用方，除非使用 call、apply、bind 等方式改变了 this 指向。

而普通函数（非对象方法），调用方是全局对象（浏览器是 window，node 是 global）

## 多线程

每个线程维护自己独立的内存空间。当然，在一个进程下的所有线程，父线程可以为他们提供公共内存。

进程之间通信需要走 IPC 或者网络等，而线程之间通信可以直接通过父线程的公共内存。

## 事件循环

事件循环只是实现了一套调度体系，具体回调函数的相关作用域，与事件循环无关，直接查找作用域链即可。

## 堆栈内存

线程所使用的内存可以分成两部分：堆内存与栈内存。

## 执行上下文（execution context）

执行上下文是代码执行时的环境。

执行上下文的内容包括：变量环境、词法环境、this 绑定。

# 疑问

由于闭包导致延长生命周期的栈内存变量，在函数退栈的时候，是如何处理的？

# 注意

函数里面调用函数，不是作用域嵌套，而是调用栈；函数里面声明函数，才是作用域嵌套。

其实原型链是这里面八杆子打不着的，最无关的一个概念。

# 参考

-   [Understanding Scope and Scope Chain in JavaScript](https://blog.bitsrc.io/understanding-scope-and-scope-chain-in-javascript-f6637978cf53)

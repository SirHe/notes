# 浅读 await 规范

具体规范如下：

```md
The abstract operation Await takes argument value (an ECMAScript language value) and returns either a normal completion containing either an ECMAScript language value or empty, or a throw completion. It performs the following steps when called:

1. Let asyncContext be the running execution context.
2. Let promise be ? PromiseResolve(%Promise%, value).
3. Let fulfilledClosure be a new Abstract Closure with parameters (v) that captures asyncContext and performs the following steps when called:
   a. Let prevContext be the running execution context.
   b. Suspend prevContext.
   c. Push asyncContext onto the execution context stack; asyncContext is now the running execution context.
   d. Resume the suspended evaluation of asyncContext using NormalCompletion(v) as the result of the operation that suspended it.
   e. Assert: When we reach this step, asyncContext has already been removed from the execution context stack and prevContext is the currently running execution context.
   f. Return undefined.
4. Let onFulfilled be CreateBuiltinFunction(fulfilledClosure, 1, "", « »).
5. Let rejectedClosure be a new Abstract Closure with parameters (reason) that captures asyncContext and performs the following steps when called:
   a. Let prevContext be the running execution context.
   b. Suspend prevContext.
   c. Push asyncContext onto the execution context stack; asyncContext is now the running execution context.
   d. Resume the suspended evaluation of asyncContext using ThrowCompletion(reason) as the result of the operation that suspended it.
   e. Assert: When we reach this step, asyncContext has already been removed from the execution context stack and prevContext is the currently running execution context.
   f. Return undefined.
6. Let onRejected be CreateBuiltinFunction(rejectedClosure, 1, "", « »).
7. Perform PerformPromiseThen(promise, onFulfilled, onRejected).
8. Remove asyncContext from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
9. Let callerContext be the running execution context.
10. Resume callerContext passing empty. If asyncContext is ever resumed again, let completion be the Completion Record with which it is resumed.
11. Assert: If control reaches here, then asyncContext is the running execution context again.
12. Return completion.
```

# 第一段

```md
The abstract operation Await takes argument value (an ECMAScript language value) and returns either a normal completion containing either an ECMAScript language value or empty, or a throw completion. It performs the following steps when called:

这个抽象操作符 await 接收 value 参数（一个 ECMAScript language value），并且返回一个正常完成（一个 ECMAScript language value 或者 empty）或者抛出错误。当它被调用时，执行下面这些步骤：
```

## 疑惑

读完这句话，我们会有这些疑惑：

1、什么是 ECMAScript language value？
2、EMPTY 是啥？JavaScript 中 empty 这个概念不是 undefined 吗？而 undefined 不是包括在 ECMAScript language value 中吗？为什么要 or 一下，单独拿出来说？
3、normal completion containing 和 throw completion 分别又是啥？

## 解释

### ECMAScript language value

首先容易解释的是 ECMAScript language value，它其实就是符合 JavaScript 数据类型的这么一个 value。那么 JavaScript 的数据类型可以分成：`Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object`。

```md
The ECMAScript language types are Undefined, Null, Boolean, String, Symbol, Number, BigInt, and Object. An ECMAScript language value is a value that is characterized by an ECMAScript language type.
```

### normal completion containing 与 throw completion

The Completion Record Specification Type 的类型一共有 normal, break, continue, return, or throw 这么五种。

#### ECMAScript Specification Types

# 第二段

```md
1. Let asyncContext be the running execution context.

将 asyncContext 设置成运行时执行上下文。
```

## 疑问

asyncContext 和 running execution context 分别是什么？

## 解释

### asyncContext

我们知道，await 基本上（除了顶层 await）都是配合 async 函数一起使用。那么 asyncContext 指的就是这个 async 函数的上下文。

### running execution context

运行时执行上下文其实就是函数**调用栈的栈顶元素**。

# 第三段

```md
2. Let promise be ? PromiseResolve(%Promise%, value).
```

# 第四段

```md
3. Let fulfilledClosure be a new Abstract Closure with parameters (v) that captures asyncContext and performs the following steps when called:
   a. Let prevContext be the running execution context.
   b. Suspend prevContext.
   c. Push asyncContext onto the execution context stack; asyncContext is now the running execution context.
   d. Resume the suspended evaluation of asyncContext using NormalCompletion(v) as the result of the operation that suspended it.
   e. Assert: When we reach this step, asyncContext has already been removed from the execution context stack and prevContext is the currently running execution context.
   f. Return undefined.

将 fulfilledClosure 设置成一个新的带着 v 参数的抽象闭包，它捕获 asyncContext 并且在被调用的时候，执行接下来的步骤：
a. 将 prevContext 设置成 运行时上下文。
b. 暂停 prevContext
c. 将 asyncContext 推入 执行栈；asyncContext 变成现在的 运行时上下文。
d. 使用 NormalCompletion(v) 恢复 asyncContext 继续执行，作为暂停它这个操作的结果。
e. 断言：当我们到达这一步时，asyncContext 已经被移除执行上下文调用栈，并且 prevContext 变成了最新的 运行时上下文。
f. 返回 undefined。
```

## 疑问

1、NormalCompletion 是什么？

# 第五段

```md
4. Let onFulfilled be CreateBuiltinFunction(fulfilledClosure, 1, "", « »).

将 onFulfilled 设置成 CreateBuiltinFunction 的 return 结果
```

## 疑惑

1、哪来的 onFulfilled？
2、CreateBuiltinFunction 又是什么？

## 解释

### onFulfilled

我们知道 async function return 的是一个 promise。

而一个 promise 中有这么几个核心的部分：

1、promise 有三种状态：`pending、fulfilled、rejected`，promise 被创建时是 pending 状态，可以通过 resolve、reject 以及 executor 执行出错 这三种方式改变状态。
2、promise 通过 then、catch、finally 收集 onFulfilled、onRejected、onFinally 成功、失败 以及 finally 回调。

那么这里的 onFulfilled 实际上指的就是 promise 成功时调用回调。

### CreateBuiltinFunction

This operation creates a built-in function object.

我猜你肯定会接着问，内部函数对象是什么？关于内部函数对象的解释如下：

A function object is an object that supports the [[Call]] internal method.

这也再一次印证了在 JavaScript 中，object 和 function 的本质区别就是十分包含 `[[call]]` 这个内部方法。

# 第六段

```md
5. Let rejectedClosure be a new Abstract Closure with parameters (reason) that captures asyncContext and performs the following steps when called:
   a. Let prevContext be the running execution context.
   b. Suspend prevContext.
   c. Push asyncContext onto the execution context stack; asyncContext is now the running execution context.
   d. Resume the suspended evaluation of asyncContext using ThrowCompletion(reason) as the result of the operation that suspended it.
   e. Assert: When we reach this step, asyncContext has already been removed from the execution context stack and prevContext is the currently running execution context.
   f. Return undefined.
```

# 顶层 await

只能在 ES module 的顶层使用

# 参考

-   [ECMAScript-Await](https://tc39.es/ecma262/#await)

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

# 顶层 await

只能在 ES module 的顶层使用

# 参考

-   [ECMAScript-Await](https://tc39.es/ecma262/#await)

# 浅谈 JavaScript 错误捕获

我个人认为在 JavaScript 中错误捕获一共有两种：`try catch` 与 `promise`。

# 结论

我的习惯还是喜欢先说重点，我们先说结论：

1. promise 执行回调函数（executor、onFulfilled、onRejected）时发生的同步错误由 promise 自己捕获，并且沿着 promise 链进行传递。
2. 普通同步错误（非 promise 错误）沿着函数调用栈进行传递，并且都可以被 try catch 捕获。
3. 无论是 try catch 还是 promise，对于异步错误都无能为力。
4. 如果想要把 promise 错误传递到 try catch 中，需要 await。

# 解释

我们先从一段代码说起，先看下面这段代码：

```js
class MyPromise {
    constructor(executor) {
        executor();
    }
}
try {
    new MyPromise((resolve, reject) => {
        throw new Error("error");
    });
} catch (error) {
    console.log("try catch error", error);
}
```

上面的 try catch 很自然地捕获了错误，我们接着再看：

```js
try {
    new Promise((resolve, reject) => {
        throw new Error("error");
    }).catch((error) => {
        console.log("promise error", error);
    });
} catch (error) {
    console.log("try catch error", error);
}
```

升级：

```js
const fn = async () => {
    throw new Error("error");
};

try {
    fn();
} catch (error) {
    console.log("try catch error", error);
}
```

# try catch

关于 try catch 的使用，我这里就不再赘述。

错误传播链路：沿着函数的调用链进行传递

# promise

为什么 promise 在错误捕获方面也有一席之地呢？我们来看下面这个例子：

```js
try {
    new Promise((resolve, reject) => {
        throw new Error("error");
    }).catch((error) => {
        console.log("promise error", error);
    });
} catch (error) {
    console.log("try catch error", error);
}
```

观察上面的代码输出，可以发现我们的 try catch 并没有捕获到错误。那么理论上 try catch 没有捕获到的话，错误就会沿着函数调用栈向上传递，直到传递到全局，那么程序理论上应该崩溃才对呀。

学过 promise 用法的朋友会说，为什么会报错，这不是扯淡吗？promise 会捕获 executor 执行时的错误，然后传递给 onRejected，正如我们这里的 promise.catch 捕获到了错误。

比如下面的代码，很自然就被：

```js
class MyPromise {
    constructor(executor) {
        executor();
    }
}
try {
    new MyPromise((resolve, reject) => {
        throw new Error("error");
    });
} catch (error) {
    console.log("try catch error", error);
}
```

错误传播链路：沿着 promise 链传播

# 全局捕获

window 环境：error、unhandledrejection
node 环境：uncaughtException、unhandledRejection

# async 函数

async 函数与普通函数本质区别在于：**async 函数使用 promise 包裹了一下返回结果，而且可以理解成 async 函数放到了 promise 的 constructor 中去执行**。

先看下面这段代码：

```js
const fn = async () => {
    throw new Error("error");
};

try {
    fn();
} catch (error) {
    console.log("error", error);
}
```

为什么上面这段代码 try catch 捕获不到 fn 函数内部抛出的错误？我们将它等价改成下面这种，相信你就可以理解了：

```js
try {
    new Promise((resolve, reject) => {
        throw new Error("error");
    });
} catch (error) {
    console.log("error", error);
}
```

# 参考

-   [前端：为什么 try catch 能捕捉 await 后 Promise 的错误？](https://juejin.cn/post/7436370478521991183?searchId=202411220942251E70BAA3890074673B98)

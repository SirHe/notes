# 我们也来简单写一个 co 吧

最近偶然发现一个 npm 包：co，一看它的 [Weekly Downloads](https://www.npmjs.com/package/co) 在百万级左右，十分大。而且它的 [GitHub](https://github.com/tj/co) 也有将近 12k 的 stars。但其实它的实现一点也不复杂，**它的优秀之处在于它开创了一种新的编程方式，将异步代码转化成了同步写法**。我们先来看看它的使用。

```js
const co = require("co");

const fn1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(123);
        }, 1000);
    });
};
const fn2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(456);
        }, 2000);
    });
};
const fn3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(789);
        }, 3000);
    });
};

co(function* () {
    const a = yield fn1();
    console.log(a);
    const b = yield fn2();
    console.log(b);
    const c = yield fn3();
    console.log(c);
});
```

其实原理很简单，**就是在 Promise 完成的时候，启动下一次 next 调用，同时将 Promise 的结果传递给 next 函数**。

那么很自然地就可以写出如下代码：

```js
const co = (generator) => {
    const iterator = generator();
    const next = ({ value, done }) => {
        if (!done) {
            Promise.resolve(value).then((data) => {
                next(iterator.next(data));
            });
        }
    };
    next(iterator.next());
};
```

简单测试一下结果也是十分令人满意的。

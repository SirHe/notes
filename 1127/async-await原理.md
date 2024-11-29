# 浅谈 async await 原理

1、如果给函数加上 async 标记，可以简单理解成 JS 会帮我们把 return 结果包一层 promise。
2、而 await 等待的就是 promise 的结果，当 promise fulfilled 时，函数才会继续调用 next 走下一段。
3、`const a = await fn()` 中，添加 await 后并不会影响原来 fn 函数的执行，fn 原来该怎么执行还是怎么执行，只是 await 会等待 fn 返回的 promise 的结果。
4、async 和 await 是两个独立的关键字，async 可以单独使用。在 CommonJS 中 await 需要配合 async 一起使用，而在 ES Module 中，支持顶层 await。

# 疑问

1、async 函数的 execution context 是怎样的？

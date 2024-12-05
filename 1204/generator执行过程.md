# generator 执行过程

我们知道，有几个 yield 关键字，生成器就会被分成 yield 关键字数量 + 1 段，比如：

```js
function* fn(a) {
    console.log("第一段");
    const b = yield a + 1;
    console.log("第二段");
    const c = yield b + 2;
    console.log("第三段");
    return c + 3;
}
```

上面这段代码就会被分成三段去执行，也就是说我们需要调用三次 next。

第一段：从函数体开始，到 yield 为止（包含 yield 关键字的后半段）。也就是：`console.log('第一段');` 和 `a + 1;` 这两部分代码。
第二段：从第一个 yield 往左，到第二个 yield 往右。也就是：`const b = `、`console.log('第二段');`、`b + 2;` 这三部分代码。
第三段：从第二个 yield 往左，到函数体结束。也就是：`const c = `、`console.log('第三段');`、`return c + 3;` 这三部分代码。

我们知道生成器的使用如下，先生成一个 iterator，再调用 next 进行迭代：

```js
const iterator = fn(1);
console.log(iterator.next());
console.log(iterator.next(2));
console.log(iterator.next(3));
```

我们执行 `fn(1)` 时，实际上并不会运行生成器 fn 的函数体，而只是生成一个迭代器。
而等待第一次 next 调用时，才会真正执行第一段代码，也就是：`console.log('第一段');` 和 `a + 1;`。

那么 next 函数调用的返回值是什么呢？其实就是 yield 的右值（也就是 yield 右侧求值后会赋值给 yield，进而传递给 next 作为返回值）。

那么 `const b = yield` 中，b 又会得到什么呢？实际上，在下一次调用 next 的时候，我们可以给 next 传递参数，这个参数就会传递给上次暂停的 yield，进而传递给 b。也就是第二次调用 next 传入了 2（`iterator.next(2)`），所以 b 的值为 2。

而最后一次的 next 调用没有 yield，那么自然采用 return 作为 next 的返回值。

总的来说：**所谓的生成器函数就是被多个 yield 关键字分割成了一段一段去执行**。

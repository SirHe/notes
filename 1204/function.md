在 JavaScript 中，function 可以多传参数，也可以 return 多个返回值。
而参数以前面的为准，return 以后面的为准。

比如：

```js
const fn = () => {
    return 1, 2, 3;
};
console.log(fn()); // 3
```

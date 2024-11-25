# 浅谈 try catch

先同步一下我们的已知信息：我们知道 try catch 语法作为一个错误捕获工具，能够捕获 try `{}` 中的**任何类型**（EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError）的**同步错误**。而对于异步错误，则表示无能为力。

同样的，Promise.catch 与 try catch 类型，也只能捕获同步错误。比如：

```js
const fn = () => {
    setTimeout(() => {
        throw new Error("error");
    });
};

new Promise((resolve, reject) => {
    fn();
}).then(
    (result) => {
        console.log(result, "result");
    },
    (error) => {
        console.log(error, "error");
    }
);
```

值得一提的是：**Promise try catch 的时候并没有 await Promise constructor**。

## Error 传播链路

## Promise.try

只是相当于 await 了一下构造函数而已。

## 扩展（函数环境的恢复）

## 扩展（错误类型）

### 1、EvalError

eval 错误，与 eval 函数相关的错误（现代 JavaScript 中很少使用）

```js
try {
    throw new EvalError("Eval error");
} catch (e) {
    console.error(e); // EvalError: Eval error
}
```

### 2、RangeError

范围错误，当一个值不在预期范围内时抛出

```js
try {
    let arr = new Array(-1); // 范围错误
} catch (e) {
    console.error(e); // RangeError: Invalid array length
}
```

### 3、ReferenceError

引用错误，当引用一个不存在的变量时抛出

```js
try {
    console.log(nonExistentVariable); // 引用错误
} catch (e) {
    console.error(e); // ReferenceError: nonExistentVariable is not defined
}
```

### 4、SyntaxError

语法错误，当代码的语法不正确时抛出

```js
try {
    let a = ;
} catch (e) {
    console.error(e); // SyntaxError: Unexpected token ;
}
```

### 5、TypeError

类型错误，当一个值不是预期类型时抛出（访问不存在的属性 或者 调用不存在的函数）

```js
try {
    null.f(); // 类型错误
} catch (e) {
    console.error(e); // TypeError: Cannot read property 'f' of null
}
```

### 6、URIError

URI 错误，当全局 URI 处理函数（如 decodeURI 或 encodeURI）使用不正确时抛出

```js
try {
    decodeURI("%"); // URI 错误
} catch (e) {
    console.error(e); // URIError: URI malformed
}
```

# 参考

-   [Visualizing memory management in V8 Engine](https://deepu.tech/memory-management-in-v8/)

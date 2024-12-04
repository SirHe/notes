# TS 类型安全

我们知道 as 这个关键字意为：类型断言，**可以用作类型收窄**。比如：

```ts
type A = string | "hello";
const a: A = "world";
const b: "hello" = a as "hello";
const c = a;
```

可以发现 b 的类型是字面量 `hello`，而 c 的类型是 string。也就是我们通过 as 类型断言，将 string 类型收窄成字面量 `hello` 类型。

而类型断言的安全性，就得由我们自己去保证了。比如这里的 a 的值是 `world`，但是却赋给了 `hello` 类型的 b，这显然是不安全的。

当然 TS 也会为我们做一些基本的安全检查，比如它不允许我们将 number 类型断言成 string 类型。`类型 "number" 到类型 "string" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。`

## object 类型的断言

可多可少，但是必须要有重叠属性，而且重叠属性的约束类型要相同。

```ts
type A = {
    a: string;
    b: number;
};
type B = {
    a: string;
};
type C = {
    a: string;
    b: number;
    c: boolean;
};
const a: A = {
    a: "a",
    b: 1,
};
const b: B = a as B;
const c: C = a as C;
```

为什么要这样设计？

# AsyncBlockStart(promiseCapability, asyncBody, asyncContext)

## promiseCapability(a PromiseCapability Record)

这个 Record 有三个数据项：`[[Promise]]`、`[[Resolve]]`、`[[Reject]]`

promiseCapability 可以理解成 Promise 实现的底层数据存储支撑

## asyncBody(a Parse Node or an Abstract Closure with no parameters)

Parse Node 其实很好理解，就是 JavaScript 抽象语法树中的一个 Node 节点。
Abstract Closure 这个概念比较新，可以理解成它会捕获当前环境中的变量。

## asyncContext(an execution context)

这个概念比较简单，就是一个执行上下文

# 具体步骤

`1. Let runningContext be the running execution context.`

第一步很简单，就是将 execution stack 栈顶的 execution context 引用赋值给 runningContext 这个变量

```md
2. Let closure be a new Abstract Closure with no parameters that captures promiseCapability and asyncBody and performs the following steps when called:
   a. Let acAsyncContext be the running execution context.
   b. If asyncBody is a Parse Node, then
   i. Let result be Completion(Evaluation of asyncBody).
   c. Else,
   i. Assert: asyncBody is an Abstract Closure with no parameters.
   ii. Let result be asyncBody().
   d. Assert: If we return here, the async function either threw an exception or performed an implicit or explicit return; all awaiting is done.
   e. Remove acAsyncContext from the execution context stack and restore the execution context that is at the top of the execution context stack as the running execution context.
   f. If result is a normal completion, then
   i. Perform ! Call(promiseCapability.[[Resolve]], undefined, « undefined »).
   g. Else if result is a return completion, then
   i. Perform ! Call(promiseCapability.[[Resolve]], undefined, « result.[[Value]] »).
   h. Else,
   i. Assert: result is a throw completion.
   ii. Perform ! Call(promiseCapability.[[Reject]], undefined, « result.[[Value]] »).
   i. Return unused.
```

`2. Let closure be a new Abstract Closure with no parameters that captures promiseCapability and asyncBody`

创建一个 closure 变量，用于捕获 promiseCapability 和 asyncBody 这两个变量。

`a. Let acAsyncContext be the running execution context.`

将 acAsyncContext 变量设置成 running execution context，和前面的 runningContext 变量一样。

`b. If asyncBody is a Parse Node, then i. Let result be Completion(Evaluation of asyncBody).`
`c. Else, i. Assert: asyncBody is an Abstract Closure with no parameters. ii. Let result be asyncBody().`

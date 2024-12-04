# ECMAScript 中几个比较重要的概念

## ECMAScript Specification Types

可以简单理解成 JavaScript 底层的实际数据存储结构。比较重要的像：Record（可以简单理解成数组）

## Execution Contexts

An execution context is a specification device that is used to track the runtime evaluation of code by an ECMAScript implementation.

execution context 至少包含这四个构件（component）：code evaluation、Function、Realm、ScriptOrModule

## Agent

Agent（代理） 是一个抽象的执行实体，代表了一个独立的 JavaScript 线程或执行环境，每个 Agent 拥有自己的执行上下文栈（execution context）和任务队列（可以理解成一个线程）。

surrounding agent：与当前 agent 的相关 agent，比如父线程等。

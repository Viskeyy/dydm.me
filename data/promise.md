---
title: 'JavaScript 中的 Promise'
date: 2024-07-26
tags: ['javascript']
type: 'DefaultPost'
---

[原文地址](https://dev.to/kalyan-jyoti/all-about-javascript-promises-154e)

## Introduction

JavaScript 的 Promise 是一个表示异步操作最终完成或失败的对象. 允许将处理函数和异步方法相关联. 异步方法不立即返回值, 而是返回一个在未来某个时间点返回值的承诺.

或者

JavaScript Promise 是一种以更有条理和直观的方式处理异步代码的方法. 当有一个需要花些时间才能完成的异步操作时, 例如进行 API 调用或从服务器获取数据, 程序会被阻塞直到操作完成.

理想情况是继续运行其他代码, 在异步操作准备就绪时再处理.

## Promise States

Promise 提供了一种通过封装异步操作并提供一种在结果就绪时处理结果的方式处理异步函数. Promise 是一个代表还不可用的值的对象, 有三种状态:

* `Pending`: 初始状态, 异步操作完成前的状态
* `Fulfiled`: 操作成功完成, 并且结果可用
* `Rejected`: 操作失败, 并且错误原因可用

## Creating and using Promise

可以通过 Promise 构造函数创建一个 Promise 对象. 该构造函数接受一个函数作为参数, 该函数接受两个参数, 分别是 `resolve` 和 `reject`. 在这个函数中, 可以执行异步操作, 然后在操作成功时调用 `resolve`, 或在操作失败时调用 `reject`.

```js
let promise = new Promise(function(resolve, reject) {
    resolve();
    reject();
}
```

这里的 `resolve` 和 `reject` 是使 Promise 生命周期得以完成的函数. 当产生包含结果的代码时, 这个代码应该是下面的其中一个回调函数:

* `resolve(resultValue)`: 如果成功
* `reject(errorObject)`: 如果失败

下面是一个创建延迟之后 resolve 的 Promise 的例子:

```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('done!');
    }, 1000);
});
```

### Handling a fulfilled or Rejected Promise

一旦有了 Promise, 就可以在 Promise 就绪时使用 `then` 方法处理结果. `then` 方法接收一个函数作为参数,  当 promise 是 `fulfiled` 状态时调用这个函数. 这个函数接收一个参数, 该参数是 promise 的结果值.

```js
promise.then(result => {
    console.log(result);
}
```

当 promise 是 `rejected` 状态时, 可以使用 `catch` 方法处理错误.

```js
promise.catch(error => {
    console.log(error);
}
```

## Chaining Promises

可以使用 `then` 和 `catch` 方法将 promise 链接在一起, 以特定的顺序执行一系列异步操作.  这些方法用于将进一步的操作和以确定的 promise 相关联. 由于这些方法返回 promise, 因此可以链式调用.

```js
const promise = new Promise((resolve, reject) => {
    resolve();
    reject();
})

promise.then((value)=> anotherPromise ).then((value)=> anotherPromise ).then((value)=> anotherPromise ).catch((error)=> anotherPromise );
```

> 如果没有 `catch` 方法, 当代码发生错误时, 会作为未处理异常被抛出. 并根据 context, 可能会导致程序崩溃或被更高级的错误处理程序捕获. 在 promise 链中包含 `catch` 方法并正确处理是非常非常重要的.

## Promise.all and Promise.race

`Promise.all` 和 `Promise.race` 方法用于同时处理多个 promise 结果.

`Promise.all` 接收一组 promise 并在所有 promise 完成时返回一组 promise. 新的 promise 的解析值是每个 Promise.all 接收的数组中每个 promise 的结果组成的数组.

`Promise.race` 接收一组 promise 并在第一个 promise 完成时返回一个 promise. 新的 promise 的解析值是第一个完成的 promise 的结果.

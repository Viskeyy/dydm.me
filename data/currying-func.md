---
title: '柯里化函数'
date: 2024-07-24
tags: ['javascript']
type: 'DefaultDocument'
---

> [原文地址](https://designtechworld.medium.com/everything-about-currying-in-javascript-a2614b82e6ca)

柯里化是函数式编程中使用的一种技术, 它允许将具有多个参数的函数转换为一系列只有一个参数的函数.

在 JavaScript 中, 柯里化是一种强大的工具, 可以提高代码的可重用性, 可组合和可维护性.

假设有一个 `add` 函数, 它接收两个参数并返回它们的和

```js
function add(x, y) {
  return x + y
}

console.log(3, 5) // 8
```

现在对这个函数进行柯里化

```js
function add(x) {
    return function(y) {
        return x + y
    }
}

console.log(add(3)(5)) // 8
```

在柯里化版本中, `add` 函数接收一个参数 `x` 并返回另一个接收 `y` 的函数, 并执行加法. 这样调用 `add(3)` 会返回一个函数, 然后调用返回的函数 `add(3)(5)` 会返回 `8`.

一个优点是通过 `add` 函数创建可重用的 `addOne` 函数

```js
const addOne = add(1)

console.log(addOne(5)) // 6
console.log(addOne(10)) // 11
```

柯里化的另一个优点是能够创建可组合的高阶函数

```js
function multiply(x, y, z) {
    return x * y * z
}

function multiply(x) {
    return function(y) {
        return function(z) {
            return x * y * z
        }
    }
}

console.log(multiply(2, 3, 4)); //24
console.log(multiply(2)(3)(4)); //24
```

使用柯里化版本, 可以链接函数调用, 一次传递一个参数. 这样提高代码的可读性并允许简单的函数组合

```js
const multiplyByTwo = multiply(2);
const multiplyByThree = multiplyByTwo(3);

console.log(multiplyByThree(4)); //24
console.log(multiply(2)(3)(4)); //24

const multiplyByTwoAndThree = multiply(2)(3);

console.log(multiplyByTwoAndThree(5)); //30
```

柯里化一种强大的技术, 可以为 JavaScript 代码带来诸多好处, 促进代码重用, 增强可组合性, 提高函数的灵活性等.

通过将具有多个参数的函数转换为一系列的函数, 柯里化可能创建出专用版本函数并构建高阶函数.

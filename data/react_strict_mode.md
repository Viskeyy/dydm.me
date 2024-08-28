---
title: 'React Strict 模式下, 为什么要执行两次 hook'
date: 2024-08-28
tags: ['react']
type: 'DefaultPost'
---

## React Strict 模式下, 为什么要执行两次 hook

在 strict 模式下, react 会在真正的 setup 之前, 多运行一次开发环境下的 setup + cleanup 周期.

这是一种压力测试, 可以确保 cleanup 逻辑对应 setup 逻辑, 并且确保 cleanup 停止或撤销 setup 所做的任何事情.

如果严格模式下出现了一些问题, 那么就需要实现 cleanup 函数.

---

如果在严格模式下使用了 useEffect hook, 并且传递了一个空数组作为依赖向, 那么 useEffect 会执行两次: 一次是模拟卸载和重新挂载的过程, 另一次是真正的 setup.

这样的目的是为了检测 useEffect 的逻辑是否有副作用, 是否能够正确清理资源, 以及是否有不必要的依赖项.

---

strict 模式只在开发环境下生效, 对生产环境没有任何影响.

strict 模式不会影响渲染结果, 只会影响组件的渲染次数.

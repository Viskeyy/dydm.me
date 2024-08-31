---
title: React 中 hook 的执行顺序
date: 2024-08-31
tags: ['react']
type: 'DefaultPost'
---

在 react 中, 需要保证每次执行 hook 的顺序是一样的. 这是为了让 react 能够正确地在多个 useState 和 useEffect 调用之间保持 hook 状态.

如果 hook 的调用顺序在每次渲染时都不一致, 那么 react 就无法知道哪个 state 对应哪个 useState 调用, 或者哪个 effect 对应哪个 useEffect 调用. 这会导致 hook 的行为出现错误或不可预测的情况.

---

react 为了保证每次执行 hook 的顺序是一致的, 做出了两个要求:

* 只在最顶层调用 hook, 不在循环, 条件或嵌套函数中调用 hook.
* 只在 react 函数组件或自定义 hook 中调用, 不在普通的 JavaScript 函数中调用.

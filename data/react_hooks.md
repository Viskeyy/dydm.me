---
title: 'React Hooks'
date: 2024-08-17
tags: ['react']
type: 'DefaultPost'
---

UI : UI = f(data) 函数 f 将数据(data)映射到用户界面

状态有一个隐含的意思, 就是存在改变状态的行为(behavior)

![hooks-1](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0816-vbdJAR.png)
![hooks-2](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0816-I2cGj5.png)

promise 描述一个即将发生的值

stream 表示一个未来发生的值的集合

---

函数 V = f(props, state), UI = V useHook1() useHook2() ...

函数 V(视图) 将属性(props)和状态(state)画出来, UI 是视图使用了多个 hook

状态(state) 作用(effect) 上下文(context)

---

状态

const [count, setCount] = useState(0)    (看作一种描述)

状态      行为          hooks api

---

作用

UI 将数据映射到视图之外的看不到的东西(在视图上不可感知)

![hooks-3](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0816-db6ioL.png)

useEffect(()=>{},[deps])     (看作一种描述)

依赖 deps 变化的作用, 如果不写, 则是依赖变化变化的作用 (每次执行)

---

上下文

理解事物需要的背景知识

![hooks-4](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0816-HOwxCB.png)

---

useReducer (redux)

![hooks-5](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0816-qZ9uKI.png)

一个状态(state)拥有多个行为

---

ref 管理 React 之外的东西(focus等), 通常搭配 useEffect

是一个引用, 引用也是一个行为

---

缓存: 为了让软件提速

缓存一个函数(useCallback)

接收函数和依赖, 接收的函数会被缓存, 依赖变化时重新执行函数

状态变化会导致页面重新渲染从而重新创建函数, useCallback创建的函数在重新渲染时不会重新创建

---

缓存一个值(useMemo)

接收函数和依赖, 接收的函数的返回值会被缓存, 依赖变化时重新执行函数

状态变化重新渲染之后同样可以获取到 useMemo 的值

React.memo

hooks 同步问题

使用 hooks 封装行为

每一种行为一个 hook

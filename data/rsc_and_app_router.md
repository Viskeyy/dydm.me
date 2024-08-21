---
title: 'React Server Component and Next.js App Router'
date: 2024-08-18
tags: ['code', 'react']
type: 'DefaultPost'
---

## React Server Component and Next.js App Router

> [原文地址](https://addyosmani.com/blog/react-server-components-app-router/)

## 什么是服务端组件

* 被设计在服务器上运行的无状态组件
* 促进服务器和客户端组件之间无缝代码转换体验, 也称为同构
* 将数据获取作为组件树的一部分, 允许顶级 await 和 服务端数据序列化
* RSC 协议使服务器能够为客户端公开一个特殊的端点以请求组件树的部分, 从而允许使用类似 MPA 的架构进行类似 SPA 的路由
* RSC 的采用取决于实现该功能的框架
* 引入 async/await 作为服务端组件获取数据的主要方式
* 计划通过 `use()` hook 展开 Promise 以支持客户端数据加载
* React 服务端组件充当跨兼容 React 框架工作的组件的规范
* 从概念上讲, 可以将服务端组件视为 "应用程序流的骨架", 然后客户端组件围绕它们分层

## Next.js App Router 与服务端组件有什么关系

* Next.js 13+ 引入了具有新功能, 约定和对 React 服务端组件支持的 App Router
* app 目录中的组件默认是 React Server Component, 促进自动采用和提高性能
* RSC 提供了一些好处, 例如利用服务端基础设施和保持服务端的大型依赖关系, 从而带来更好的性能并减少客户端包大小
* Next.js App Router 结合了服务端渲染和客户端交互性, 逐步增强应用程序以实现无缝体验
* 可以添加客户端组件以引入客户端的交互性
* 'use client' 用于将组件标记为客户端组件
* 如果没有被另一个客户端组件导入, 或没有 'use client', 组件自动呈现为服务端组件
* 服务端和客户端组件可以在同一个组件树中交错, React 处理两个环境的合并
* 由于在生产中采用 RSC 和 App 目录, Next.js 用户已经慢慢开始看到性能改进

## 哪些 RSC 实现 是可用的 (在 Next.js 之外)

* [Simple implementataion](https://github.com/bholmesdev/simple-rsc) from Ben Holmes & Dan Abramov
* [Vite + RSC exploration](https://github.com/cyco130/vite-rsc) from Fatih Aygun
* [Webpack RSC exploration](https://github.com/unstubbable/mfng/tree/main/packages/webpack-rsc) from Hendrik Liebau
* [Official demo without a framework](https://github.com/reactjs/server-components-demo) ( 没有 SSR )

## 为什么使用生产框架 (如 Next.js 或 Remix) 而不是 Create React App

* CRA 提供有限的, 仅限客户端的开发体验, 对现代许多 Web 应用来说太局限了
* React 可以预呈现为 HTML, 因此生成一个空的 HTML 文件没有意义, 应该有更全面的渲染方法
* CRA 应该能够支持静态预渲染组件树, 支持非空 HTML 和持续的客户端交互
* 预渲染多个页面需要路由集成, 这导致大多用例需要基于文件的路由解决方案
* Next.js 和 Gatsby 等现代化框架已经提供了 100% 静态 + 客户端的能力, 包括 HTML 生成, 基于文件路由, SPA 导航和真实的客户端代码
* 这些框架还允许开发人员轻松地利用服务端呈现动态路由, 例如从数据库而不是文件中读取, 而无需重写整个程序
* React 服务端组件可以在构建过程中运行, 允许无服务渲染, 例如 Next.js 13 App Router 中所示
* 重点的转变不是从写 SPA 到不写 SPA, 而是锁定 SPA 到使用对每个页面有意义的渲染模式, 从而进入混合时代
* 这种转变主要是一种心理转变, 开发人员从构建时 + 客户端渲染开始, 然后根据需要在每页基础上添加服务端渲染

## 有哪些 RSC + Next App Router 示例

* [Hacker News](https://next-rsc-hn.vercel.app/) ([source](https://github.com/vercel/next-react-server-components))
* [Movies](https://next-movie.transitivebullsh.it/) ([source](https://github.com/transitive-bullshit/next-movie))
* [Netflix Clone](https://netflx-web.vercel.app/) ([source](https://github.com/sadmann7/netflx-web))
* [AirBnB Clone](https://abproject-sclone.vercel.app/) ([source](https://github.com/SashenJayathilaka/Airbnb-Build))
* [Drift](https://drift.lol/) ([source](https://github.com/MaxLeiter/Drift))
* [Next.js App Playground](https://vercel.com/templates/next.js/app-directory)

## 现在正走向更多的 "混合" 渲染吗

* 结合构建时, 服务端和客户端呈现以创建更灵活的 web 开发方法
* 专注于最终提供最佳结果, 如果页面可以静态提供, 则静态提供, 否则将选择动态策略 (例如 ISR, SSR, CSR + Streaming 用于后续导航)
* 挑战传统术语, 因为 web 开发领域趋向于混合渲染
* 强调需要新的术语来更好地描述现代网络开发实践
* 代表了开发人员如何进行 web 开发的心理转变, 从客户端的起点转向更通用的呈现策略组合
* 提供 SPA 的好处 (不需要服务器), 同时避免静态呈现问题 (无需重新加载页面的导航)
* RSC 和 Next.js App Router 展示了混合渲染的潜力

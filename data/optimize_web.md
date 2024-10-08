---
title: '优化 Web 性能: 关键指标和技术的指南'
date: 2024-08-26
tags: ['web']
type: 'DefaultPost'
---
## Optimizing Web Performance: A Guide to Essential Metrics and Techniques

[原文地址](https://shubhamsweb.hashnode.dev/optimizing-web-performance-a-guide-to-essential-metrics-and-techniques)

### Introduction

web 性能是影响网站成功的关键因素. 用户期望快速响应的网站. 如果网站加载慢, 可能会导致高的跳出率和低参与率. 因此, 定期测量和优化网站性能是至关重要的.

web 性能优化 (WPO) 是提高网站性能和效率的过程. 这很重要因为会对底线产生重大影响, 包括:

* 增加收入
* 降低成本
* 更好的用户体验

### Important Performance Metrics 重要的性能指标

为了测量 web 性能, 几个指标被开发出来用来帮助 web 开发者和客户评估他们网站的速度和响应. 这些指标用于评估 web 性能的不同的方面, 包括加载速度, 交互性和视觉稳定性. 文章将会看一些最重要的 web 性能指标. 包括 FCP, LPC, TTI 和 DCL.

#### First Contentful Paint (FCP) 首次内容绘制

FCP 是测量用户点击链接或输入 URL 后第一条内容展示在用户屏幕上所花费的时间的指标. 内容可以是图片, 文字或任何用户看到的元素.

FCP 是非常重要的因为它给用户提供了一个页面正在加载的指示, 并帮用户理解在可以使用 web 之前大概需要等多久. 一个好的 FCP 指标是 1.5 秒或更少.

#### Largest Contentful Paint (LCP) 最大内容绘制

LPC是测试 web 最大的元素对用户可见所花费的时间的指标. 这个元素可以是图片, 文字, 视频或其他任何用户可以看到的元素.

LPC 也是同样重要的, 它让用户了解在可以使用页面主要内容之前可能需要等多久. 一个好的 LPC 指标是 2.5 秒或更少.

#### Time to Interactive (TTI) 可交互时间

TTI 是测量页面变得可交互所花费的时间的指标. 或者说, TTI 测量用户能够与页面元素交互所花费的时间, 例如点击链接, 滚动或填写表单. 一个好的 TTI 指标是 5 秒或更少.

#### Total Blocking Time (TBT) 总阻塞时间

它测量 FCP 和 TTI 之间的总时间, 过程中主线程被阻断了足够长的时间导致阻止了用户输入的响应. 一个好的 TBT 指标是 200 毫秒或更少.

#### Cumulative Layout Shift (CLS) 累计布局偏移

它测量页面布局开始加载和生命周期状态改变布局可视性之间发生的所有意外布局偏移的总和. 一个好的 CLS 指标是 0.1 或更少.

#### DomContentLoaded (DCL) DOM 内容加载

它测量页面加载 HTML, CSS 和 JavaScript 文件所花费的时间的指标. 它同样是重要的因为让用户了解到在开始使用网站前可能需要等待多长时间. 一个好的 DCL 指标是 2 秒或更少.

### How matrics are measured 衡量指标的方式

通常有两种方式测量性能指标:

* In the lab: 使用工具在一个一致的, 可控的环境中模拟页面加载
* In the field: 真实的用户加载和交互

#### In the lab

在开发新功能时在 lab 中测试性能是至关重要的. 在功能发布到生产环境之前, 是不可能有真实用户测试性能特征, 所以在功能发布之前在 lab 中测试性能是防止性能退化的最好的方式.

#### In the field

另一方面, 虽然在 lab 中测试性能是合理的代理测试, 但不一定能反映所有用户体验的情况.

网站的性能会根据用户的设备兼容性和网络条件出现很大的不同. 也会根据用户是否 (或如何) 与页面交互而有所不同.

此外, 页面的加载可能是不确定的. 例如, 加载个性化内容或广告的站点可能会因用户之间的差异而产生巨大的性能差异.

真正了解网站对用户的表现的唯一方法是在这些用户正在加载并与之互动时测量其性能. 这种类型的测量通常被称为真实用户监控, 简称 RUM.

### Measuring Performance 测量性能

可以使用一个 web 性能工具测试网站的性能. 有很多可以使用的工具, 但还是推荐 Chrome DevTools.

### Way to Optimize WebSites

#### Optimize Images 优化图片

优化图片是提升网站性能最重要的一步. 图片可能是整个网站的一大部分, 尽可能使图片小和高效是至关重要的.

几个优化图片的方式:

* 调整大小和压缩: 当调整图片大小时, 在减少尺寸的同时保持长宽比. 压缩是通过移除不需要的数据减少图片的文件大小并不会损失图片质量和细节
* 使用矢量图: 矢量图是使用线制作而成的, 而不是像像素化的图片那样使用像素. 这表示当调整大小时矢量图不会丢失质量因为它们没有任何像素信息, 只有在任何分辨率下都能顺利扩展而不会失去锐利度和清晰度的线条信息. 也可以使用 PNG 代替 JPEGs.

#### Optimizing Code 优化代码

优化代码是提高网页性能最高效的方法之一. 第一步是减小和串联 HTML, CSS 和 JS 文件. 可以使用 Glup 或 Webpack, 或手动使用像 Sublime Text 一样的编辑器来编辑代码.

然后考虑为图像和其他静态资源使用 CDN, 因此可以加载地更快.

最后, 缓存可以在服务器上存储内容, 因此当有人访问网站时不用每次都重新生成内容.

#### Optimizing Fonts 优化字体

可以同构节约使用网络字体, 确保使用正确的字体格式, 以及使用新的字体显示属性来优化网络字体.

#### Optimizing Third-Party Scripts 优化第三方脚本

当涉及到第三方脚本时, 需要了解下面的内容:

* 选择正确的脚本: 应该只是用网站功能或用户体验所必需的脚本.
* 异步加载脚本: 异步加载是缩短页面加载时间的最佳方法之一, 因为它允许页面在加载脚本时继续加载其他内容.
* 使用 pre-connect 和 preload: 这两个新的浏览器标准允许网站通过 HTTP/2 发出实际请求之前指定与另一台服务器连接的意图.

### Some other Performance Matrics 其他性能指标

* Perceived load speed: 感知加载速度, 页面加载并将多有视觉元素呈现到屏幕的速度
* Load responsiveness: 加载响应速度, 页面加载和执行组件所需的任何 JavaScript 代码以快速响应用户交互的速度
* Runtime responsiveness: 运行时响应速度, 页面加载后, 页面能欧以多快的速度响应用户交互
* Visual stability: 视觉稳定性, 页面上的元素是否以用户不期望的方式移动并可能干扰他们的交互
* Smoothness: 平滑度, 过渡和动画是否以一致的帧率呈现并从一种状态流畅地流动到另一种状态

### Conclusion 总结

总之, 衡量网络性能对于确保用户在网站上获得积极体验至关重要. FCP, LPC, TTI 和 DCL 是 Web 开发人员和企业应定期跟踪的一些最重要的 Web 性能指标.

通过优化这些指标, 企业可以确保他们的网站快速响应, 从而提高参与度和用户满意度.

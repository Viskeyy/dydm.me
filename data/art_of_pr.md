---
title: 'Art of Pull Request'
date: 2024-07-22
tags: ['github']
type: 'DefaultPost'
---

## Art of Pull Request

[原文链接](https://drmingdrmer.github.io/culture/2019/12/20/pr.html)

> PR writer:
>
> * 保持 PR 足够小
> * 使用标签表明 PR 是许多部分之一
> * 发布后在社交软件上提一下
>
> PR reviewer:
>
> * 一有空就 review
> * 只要比之前好就批准
> * 尽量不 reject 一个 PR, 有时可以发一个 ticket 作为这个 PR 的补充, 或要求下一个 PR 来补充这个 PR
> * 建议而不是拒绝, 特别是当用标签来标识多个部分的时候

本质: PR 需要小而块

> 频繁发布小的 release, 这样就不会妨碍他人工作的推进

## PR 越大, review 时间越长

PR 需要能够快速地查看, 以便快速合并代码. 因此需要小的 PR, 一般来说, 长度应该少于 300 行.

## PR 越长, review 的人就越累

## 给出上下文

添加一个好的描述和一些截图

## 防止上下文切换

review 花费的时间越长, 开发者越难以从其他任务重切换回来并进行更改. 所以 PR 尽可能小, 并尽可能频繁地创建它们: 一天至少一次或更多.

## 审稿人也需要帮助

引入打开的 PR 上限, 如果达到限制, 任何人都不允许新增 PR, 首先 review 别人的 PR 清空 PR 队列.

## 专注于更重要的事情

所有的代码样式都应该由一些自动化的任务检查 - 这不应该是人的任务. CI 帮助处理大量的代码检查, 这样 review 可以很容易地集中在逻辑和体系结构上.

## 不要太严肃

在 PR 中与团队成员进行讨论时, 不要把它当作教学课堂.

## PR 不适合长时间的架构讨论

不要过度使用 PR 讨论, 反正已经太迟了 (代码已经写好了). PR 的作用在于确保质量水平提高, 发现潜在的 bug 和副作用.

## 如果代码比以前更好, 那就批准它

## 不要害怕

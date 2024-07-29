---
title: 'Github webhook 中的关键信息'
date: 2024-07-01
tags: ['github-notifier']
type: 'DefaultPost'
---

## GitHub 的 webhook 中有哪些重要的信息?

GitHub 的 webhook 中包含了这个事件的所有信息, 但是对于发送一个飞书通知来说, 并不需要其中所有的信息.

一般来说, 一个简单的飞书通知包含以下内容:

- 提交者
- 提交仓库
- 事件类型
- 事件动作
- 事件标题
- 提交时间
- 事件链接

但对于一些特殊事件或者动作, 还需要一些别的信息, 例如:

- 对于 `pull_request_review` 事件, 还需要 `reviewer` 的信息
- 对于 `assigned` 动作, 还需要 `assigner` 信息
- 对于一些 `comment` 事件, 还需要从 `comment` 中提取出是否有 @ 他人
- ...

当了解了需要哪些信息后, 就可以单独对各种类型的事件进行处理, 提取出各自关键的信息, 作为通知内容发送.

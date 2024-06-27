---
title: '接收并处理来自 GitHub 的 Webhook'
date: 2024-06-27
tags: ['github-notifier']
type: 'DefaultDocument'
---

## 接收并处理来自 GitHub 的 Webhook

想要接收来自 GitHub 的 Webhook, 需要在一个 repo 中配置 Webhook. 这时需要一个 URL, 这个 URL 就是接收 GitHub Webhook 的 URL.

![configure-webhook](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0627-yEN9Mp.jpg)

但是此时就会出现一个问题: 项目还未部署, 没有用来接收 GitHub Webhook 的 URL.

个人的建议是, 通过 Postman 或其他工具来模拟 GitHub Webhook 的发送, 从而完成 Webhook 的处理. 可以在 [octokit/webhooks](https://github.com/octokit/webhooks/tree/main/payload-examples/api.github.com) 中找到各个事件的 Webhook 示例. 同时还需要配置请求头字段信息, 可以在 [GitHub Docs](https://docs.github.com/en/webhooks/webhook-events-and-payloads) 中查看 Webhook 请求头都存在哪些字段. 这样, 就可以完整模拟一个 GitHub Webhook 事件.

当接收到模拟的 Webhook 后, 就可以进行 Webhook 的处理.

在 Next.js 中, 可以通过创建文件来直接创建一个 API 路由. 在 `app/api` 目录下创建自定义的 API 路由, 例如 `/github-webhook/route.ts`. 然后在该文件中编写处理 Webhook 的逻辑. 而通过 Postman 发送模拟 Webhook 的 URL 就是 `http://localhost:3000/api/github-webhook`. 详细内容可以查看 [Next.js 官方文档](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

在可以正常接收 Webhook 后, 需要考虑的是, 并不是所有 Webhook 都需要进行处理, GitHub 上有很多对于开发来说并没有太大的用处, 因此可以选择只处理某些事件. 例如:

- `commit_comment`: 提交评论被创建或更新时触发
- `discussion_comment`: 讨论评论被创建或更新时触发
- `discussion`: 讨论被创建或更新时触发
- `issue_comment`: 问题评论被创建或更新时触发
- `issues`: 问题被创建或更新时触发
- `pull_request_review_comment`: 拉取请求评论被创建或更新时触发
- `pull_request_review`: 拉取请求评论被创建或更新时触发
- `pull_request`: 拉取请求被创建或更新时触发
- `push`: 代码被推送时触发

也可以自定义想要处理的事件, 只需要添加对应事件的处理函数就可以.

这样 GitHub Webhook 的接收与处理就完成了, 最后的发送通知到飞书的内容之后再补充.

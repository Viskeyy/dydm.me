---
title: '调用飞书 API 发送通知'
date: 2024-07-03
tags: ['github-notifier']
type: 'DefaultPost'
---

## 创建机器人并发送消息

在[飞书开放平台的开发文档](https://open.feishu.cn/document/home/mass-messaging-to-designated-departments/introduction)中, 可以看到向指定部门成员群发消息的教程. 但这并不是我们想要的. 我们需要的是向多个用户群发消息, 因此在文档中找到群发消息的接口后, 需要自定义向用户群发消息.

在[群发消息 API 文档](https://open.feishu.cn/document/server-docs/im-v1/batch_message/send-messages-in-batches)中, 详细列出了其配置. 通过这些配置我们可以实现向多个用户群发消息的目的.

在进行调用 API 发送消息之前, 还需要一些前置工作:

1. 创建机器人: 在[飞书开发平台开发者后台](https://open.feishu.cn/app)中创建并获取机器人的 `App ID` 和 `App Secret`.
2. 启用机器人能力: 按照[启用机器人能力文档](https://open.feishu.cn/document/faq/trouble-shooting/how-to-enable-bot-ability)步骤启用机器人能力.
3. 配置机器人权限: 在[群发消息接口文档](https://open.feishu.cn/document/server-docs/im-v1/batch_message/send-messages-in-batches#c98c3220)中可以看到, 想要群发消息, 接口还需要机器人的**以应用的身份发送消息**以及**给多个用户批量发送消息**的权限. 这些权限需要在[开发者后台](https://open.feishu.cn/app?lang=zh-CN)找到刚才创建的机器人并进行权限配置, 在机器人的*权限管理*页面, 可以进行相关配置.
4. 获取 access token: 在[获取自建应用 access token 文档](https://open.feishu.cn/document/server-docs/authentication-management/access-token/tenant_access_token_internal)中得知, 需要使用 `App ID` 和 `App Secret` 调用 API 以获取 access token.
5. 获取用户列表: 在[获取用户列表 API 文档](https://open.feishu.cn/document/server-docs/historic-version//user/list)中, 按照步骤获取用户 user ID. 需要注意的是, 机器人需要开启一些权限.

经过上面的步骤后, 现在我们有以下内容:

* 机器人的 `App ID` 和 `App Secret`, 用于获取 `access token` (有效期为两个小时)
* 机器人的 `access token`, 用于调用 API 发送消息
* 用户的 user ID, 消息接收者

有了上面 `access token` 和 user ID 之后, 就可以通过调用 API 进行消息发送.

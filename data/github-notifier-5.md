---
title: '为不同的事件发送不同的消息'
date: 2024-07-04
tags: ['github-notifier']
type: 'DefaultDocument'
---

## 根据事件的不同, 发送不同的消息内容

在向用户发送消息时, 如果发送内容过于简单, 反而不会产生提醒的作用. 因此消息的内容需要包含一些关键信息.

但是在 GitHub webhook 中, 每种事件的结构基本都不相同.

例如在 `issues` 事件中, `title` 存在于 `payload.issue` 中, 而 `pull_request` 事件中, `title` 存在于 `payload.pull_request` 中. 对于 `comment` 事件例如 `issue_comment`, 关键信息还包括了`payload.comment.body` . 因此需要为每个事件单独编写发送消息的内容.

在 `issue` 中, 可以将消息体内容编写为:

```js
const msg = {
    title: `Issue.${raw.action} ${raw.repository.full_name}#${raw.issue.number} by @${raw.sender.login}`,
    content: [
        [
            {
                tag: 'text',
                text: `issue: ${raw.issue.title}`,
            },
        ],
        [
            {
                tag: 'a',
                href: raw.issue.html_url,
                text: '🔍 open in browser',
            },
        ],
    ],
};
```

在 `pull_request` 中, 可以将消息体内容编写为:

```js
const msg = {
    title: `PR.${raw.action} ${raw.repository.full_name}#${raw.pull_request.number} by @${raw.sender.login}`,
    content: [
        [
            {
                tag: 'text',
                text: `pull_request: ${raw.pull_request.title}`,
            },
        ],
        [
            {
                tag: 'a',
                href: raw.pull_request.html_url,
                text: '🔍 open in browser',
            },
        ],
    ],
};
```

然后就是一些重复性的工作, 编写需要处理的每个事件的消息内容.

最后针对不同事件调用不同的方法, 这样就完成了对不同的事件发送不同的消息内容:

```js
// ...
    switch (eventType) {
        case 'commit_comment':
            rawData = raw as CommitCommentEvent;
            eventTitle = rawData?.comment?.body;
            ts = rawData?.comment?.updated_at;
            break;

        case 'discussion':
            rawData = raw as DiscussionEvent;
            eventTitle = rawData?.discussion?.title;
            ts = rawData?.discussion?.updated_at;
            discussionEvent(rawData);
            break;

        case 'discussion_comment':
            rawData = raw as DiscussionCommentEvent;
            eventTitle = rawData?.comment?.body;
            ts = rawData?.comment?.updated_at;
            discussionCommentEvent(rawData);
            break;

        case 'issue_comment':
            rawData = raw as IssueCommentEvent;
            eventTitle = rawData?.comment?.body;
            ts = rawData?.comment?.updated_at;
            issueCommentEvent(rawData);
            break;

        case 'issues':
            rawData = raw as IssuesEvent;
            eventTitle = rawData?.issue?.title;
            ts = rawData?.issue?.updated_at;
            issuesEvent(rawData);
            break;

        case 'pull_request':
            rawData = raw as PullRequestEvent;
            eventTitle = rawData?.pull_request?.title;
            ts = rawData?.action === 'closed' ? rawData?.pull_request?.closed_at : rawData?.pull_request?.updated_at;
            pullRequestEvent(rawData);
            break;
        // case ...
        default:
            break;
    }
// ...
```

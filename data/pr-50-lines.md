---
title: '理想的 PR 是 50 行长'
date: 2024-05-18
tags: ['github']
type: 'DefaultPost'
---

原文地址: [The ideal PR is 50 lines long](https://graphite.dev/blog/the-ideal-pr-is-50-lines-long)

较小的代码更改要比较大的代码更改更好. 较小的 PR 更容易审查, 不太可能出现 bugs, 并且部署的速度更快.

## 主张观点: 理想的 PR 是 50 行长

审查和合并代码的速度比 250 行快了约 40%, 被回滚的可能性降低了 15%, 每行审查注释增加了 40%. 如果 PR 的平均行为 50 行, 那么会比 200 多行的 PR 多发送 40% 的代码量.

50 行是速度, 审查评论, 回滚率和总代码量的最佳点. 如果要提供一个范围, 推荐 50 - 100 行. 根据数据, 每行的审查时间, 合并时间和审查评论都会更好. 但有一个限制: 低于 25 行, 会遭受更高的回滚率和更低的总代码量.

## 样本集

所有基于数据的陈述都是使用与 Graphite 同步的私有和公共 PR 和 repos 进行的. 主要是 4 个指标以及它们与 PR 规模的相关性:

- 审查 / 合并时间
- 回滚率
- 平均评论数
- 一年内更改的总代码量

### 审查时间和合并时间

最小的 PR 几乎比 5k 行的 PR 快 5 倍. 更小的 PR 意味着更少的代码行, 更少的代码行意味这更低的破坏性或细致更改的可能性较低, 因此可以更快审查.

如果想要上传尽可能更多的代码, 2k 行的速度约为每小时 12 行, 而 10 行的速度约为每小时 0.25 - 2 行.

![review-merge-time](https://www.datocms-assets.com/85246/1690306946-1.png?fm%3Dwebp)

### PR 大小的回滚率

更小的 PR 比更大的 PR 回滚更少. 回滚最少的是 25 - 50 行的 PR.

![pr-revert](https://www.datocms-assets.com/85246/1690306988-2.png?fm%3Dwebp)

### PR 大小的平均评论数

![pr-comment](https://www.datocms-assets.com/85246/1690307033-3.png?fm%3Dwebp)

### 代码总量

持续编写小于 20 行代码的 PR 会对编码能力产生重大的影响, 编写大于 100 行的 PR 也是如此.

最高代码量和 repo 更改量大小的中位数为 40 - 80 行.

![total-output-repo](https://www.datocms-assets.com/85246/1690307118-4.png?fm%3Dwebp)
![total-output-author](https://www.datocms-assets.com/85246/1690307126-5.png?fm%3Dwebp)

## 总结

普通开发人员的编码的 PR 应该为 50 行. 对于一些具体情况可能需要上下调整, 但可能会在审查质量, 速度以及回滚方面付出明显的代价.

---
title: '版本号的意义'
date: 2024-07-17
tags: ['version']
type: 'DefaultDocument'
---

## 版本数字都代表什么?

![version-number](https://raw.githubusercontent.com/Viskeyy/uPic/master/uPic/0716-9wQqoS.jpg)

三部分版本号: MAJOR, MINOR, PATCH

* MAJOR: 主要版本, 当存在不兼容的 API 更改时增加
* MINOR: 以向后兼容的方式添加功能时增加
* PATCH: 以向后兼容的方式修复错误时增加

### 示例工作流

1. 初始开发阶段: 从 0.1.0 开始
2. 第一个稳定版本: 1.0.0
3. 后续变更:
    * 补丁发布: 修复 1.0.0 中的 bug, 版本号更新至 1.0.1
    * 次要版本: 1.0.1 中添加向后兼容的新功能, 版本好更新至 1.1.0
    * 主要版本: 1.1.0 中添加不兼容的重大变更, 版本号更新至 2.0.0
4. 特别版本和预览版本:
    * 预览版 (Pre-release): 1.0.0-alpha, 1.0.0-beta, 1.0.0-rc
    * 构建元数据 (Build Metadata): 1.0.0+20190904

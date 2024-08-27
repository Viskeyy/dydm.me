---
title: '常用的 Homebrew 命令'
date: 2024-08-27
tags: ['homebrew']
type: 'DefaultPost'
---

## Homebrew 常用命令

* `brew autoremove`: 删除仅作为依赖项的并且不再使用的 formula
* `brew cleanup`: 清理缓存
* `brew deps --tree installed`: 以树状图的形式查看所有已安装的 formula 的依赖项
* `brew deps <formula_name>`: 查看某个 formula 的依赖项
* `brew uninstall --cask --zap <cask_name>`: 彻底删除某个 cask
* `brew untap <tap_name>`: 删除某个 tap

* rmtree

  [rmtree](https://github.com/beeftornado/homebrew-rmtree) 是彻底删除某个 formula 的额外命令

  1. `brew tap beeftornado/rmtree`: 安装 rmtree
  2. `brew rmtree <formula_name>`: 彻底删除某个 formula

  一些可选项:

  * `--force`: 强制删除
  * `--dry-run`: 模拟删除
  * `--ignore`: 忽略依赖项
  * `--quiet`: 不输出日志

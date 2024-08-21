---
title: 'Nuphy air75 v2 键盘配置手册'
date: 2024-01-31
tags: ['nuphy']
type: 'DisarrayPost'
---

## Nuphy air75 v2

[官方文档](https://manuals.plus/nuphy/air75-mechanical-keyboard-manual##via_keymap_configurator)

[通过 VIA 更改键盘映射的官方文档](https://nuphy.com/pages/via-usage-guide-for-nuphy-keyboards)

### 键盘快捷键

#### 设备切换

- 切换蓝牙连接: `Fn` + `1` / `2` / `3`
- 切换为 2.4G 连接 : `Fn` + `4`

#### 键盘背光

- 键盘背光效果: `Fn` + `ArrowLeft`
- 键盘背光亮度: `Fn` + `ArrowUp` / `ArrowDown`
- 键盘背光颜色: `Fn` + `ArrowRight`
- 键盘背光速度: `Fn` + `M` + `,` / `.`

#### 左侧指示灯

- 左侧指示灯效果: `Fn` + `M` + `ArrowLeft`
- 左侧指示灯亮度: `Fn` + `M` + `ArrowUp` / `ArrowDown`
- 左侧指示灯颜色: `Fn` + `M` + `ArrowRight`
- 左侧指示灯速度: `Fn` + `M` + `,` / `.`

#### 右侧指示灯

- 右侧指示灯启用 / 禁用显示电量: `Fn` + `\`

### 其他快捷键

#### 睡眠模式

- 启用 / 禁用睡眠模式 (无动作 6 分钟后进入睡眠模式): `Fn` + `]` (闪烁红光表示禁用休眠模式, 闪烁绿光表示启用休眠模式)

#### 重置设置

- 长按 3s 重置设置: `Fn` + `[`

### 通过 VIA 更改键位

1. 在 [Nuphy's website](https://nuphy.com/pages/json-files-for-nuphy-keyboards) 中下载 air75 v2 的 JSON 格式文件
2. 通过数据线连接将键盘连接到 PC, 并将键盘设置为有线连接模式
3. 打开 [usevia.app](https://usevia.app/)
4. 在 usevia 的 `SETTING` 页面中将 `Show Design tab` 激活, 然后在 `DESIGN` 页面加载 air75 v2 的 JSON 格式文件
5. 在 `CONFIGURE` 页面点击 `Authorize device` 会弹出已经连接并且可配置的设备, 选择 nuphy air75 v2 连接即可
6. 然后在新页面中配置键位即可, 无需进行保存步骤, 配置完成就可以使用

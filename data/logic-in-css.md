---
title: '在 CSS 中编写逻辑'
date: 2024-07-08
tags: ['css']
type: 'DefaultDocument'
---

## 在 CSS 中编写逻辑处理代码

### 定义变量

```css
:root {
    --color: red;
}

span {
    color: var(--color, blue);
    /* 如果 --color 没有定义，则使用 blue */
}
```

### 条件判断

#### 根据属性判断

```css
[data-attr='true'] {
}

[data-attr='false'] {
}

:not([data-attr='true']) {
}
```

#### 伪类

```css
:checked {
}

:not(:checked) {
}
```

#### 媒体查询

```css
:root {
    color: red;
}
@media (min-width > 600px) {
    :root {
        color: blue;
    }
}
```

### 循环

#### 计数

只能在 `content` 中使用, 可以调整增量, 起点和任意给定的值, 输出仅限于文本

```css
main {
    counter-reset: section;
}

section {
    counter-increment: section;
    counter-reset: section;
}

section > h2::before {
    content: 'head line ' counter(section) ': ';
}
```

#### `auto-fill`

限制最小宽度, 自动填充到最大宽度

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
```

#### 循环选择器

```css
section:nth-child(2n) {
    /* 选择所有偶数元素 */
}
section:nth-child(4n + 2) {
    /* 从第二个开始, 每 4 个选择一个 */
}
section:nth-child(3n):not(:nth-child(6)) {
    /* 选择第三的倍数个元素, 但不选择第 6 个元素 */
}
```

### Logic Gates

[CSS Logic Gates](https://css-tricks.com/logical-operations-with-css-variables/)

### `* + *`

选择每个元素后有另一个元素的元素.

```css
* + * {
    margin-top: 1em;
}
```

### 条件样式

```css
.box {
    padding: 1rem 1rem 1rem calc(1rem + var(--s) * 4rem);
    color: hsl(0, calc(var(--s, 0) * 100%), 80%);
    background-color: hsl(0, calc(var(--s, 0) * 100%), 15%);
    border: calc(var(--s, 0) * 1px) solid hsl(0, calc(var(--s, 0) * 100%), 80%);
}

.icon {
    opacity: calc(var(--s) * 100%);
    transform: scale(calc(var(--s) * 100%));
}
```

### 自动对比颜色

```css
:root {
    --theme-hue: 210deg;
    --theme-sat: 30%;
    --theme-lit: 20%;
    --theme-font-threshold: 51%;

    --background-color: hsl(var(--theme-hue), var(--theme-sat), var(--theme-lit));

    --font-color: hsl(
        var(--theme-hue),
        var(--theme-sat),
        clamp(10%, calc(100% - (var(--theme-lit) - var(theme-font-threshold)) * 1000), 95%)
    );
}
```

### 清除 Stylesheet

```css
/* 定义变量 */
:root {
    --paragraph-width: 90ch;
    --sidebar-width: 30ch;
    --layout-s: "header header" "sidebar sidebar" "main main" "footer footer";
    --layout-l: "header header" "main sidebar" "footer footer";
    --template-s: auto auto minmax(100%, 1fr) auto /
        minmax(70%, var(--paragraph-width)) minmax(30%, var(--sidebar-width));
    --template-l: auto minmax(100%, 1fr) auto /
        minmax(70%, var(--paragraph-width)) minmax(30%, var(--sidebar-width));
    --layout: var(--layout-s);
    --template: var(--template-s);
    --gap-width: 1rem;
}

/* 改变视窗口以改变变量 */
@media (min-width: 48rem) {
    :root {
        --layout: var(--layout-l);
        --template: var(--template-l);
    }
}

/* 绑定到 DOM */
body {
    display: grid;
    grid-template: var(--template);
    grid-template-areas: var(--layout);
    grid-gap: var(--gap-width);
    justify-content: center;
    min-height: 100vh;
    max-width: calc(
        var(--paragraph-width) + var(--sidebar-width) + var(--gap-width)
    );
    padding: 0 var(--gap-width);
}
```

### `:target`

可以读取 URL 的 hash parameter

### 在 JavaScript 中设置 CSS 变量

```js
// 在 :root 中设置 --s`
document.documentElement.style.setProperty('--s', e.target.value);

// 在某个元素中设置 --s`
const el = document.querySelector('#id')
el.style.setProperty('--s', e.target.value);

// 获取某个元素的 --s`
const s = getComputedStyle(el).getPropertyValue('--s');
```

---
title: '一些 JavaScript 技巧'
date: 2024-07-15
tags: ['javascript']
type: 'DefaultDocument'
---

## 一些简单的技巧

在 JavaScript 中, 可以通过一些原生的简单的代码做到一些有趣的事, 以下是一些例子:

### 获取操作系统的详细信息

`window.navigator` 包含了用户浏览器系统信息. 一些系统属性在平台属性中也是可用的. 可以通过以下代码获取详细信息:

```js
console.log(window.navigator.platform);
```

### 使用 `void(0)` 防止页面刷新

通常使用在 HTML 文档中, 当用户点击链接时, 阻止页面刷新. 例如下面的链接会在不重新加载页面的情况下 `alert`:

```html
<a href="javascript:void(0)" onclick="alert('Hello World!')">Click me</a>
```

### 重定向到新页面

通过设置 `window.location.href` 重定向到新页面:

```js
function redirect() {
    window.location.href = "new-page.html";
}
```

### 获取页面 URL

可以通过 `window.location.href` 或 `document.URL` 获取当前页面的 URL (一般都使用 `window.location.href`):

```js
console.log(window.location.href);

console.log(document.URL);
```

### 设置鼠标为状态

可以通过 `document.body.style.cursor` 设置鼠标状态:

```js
window.document.body.style.cursor = "wait";
```

### 获取选择框状态

在 DOM 中请求选择框的 `checked` 属性, 可以获取选择框的状态:

```js
<input type="checkbox" id="checkboxname" value="Agree" /> Agree the
conditions<br />

console.log(document.getElementById(‘checkboxname’).checked); // true or false
```

### 为控制台信息添加 CSS

在控制台信息中添加 CSS 样式, 可以使用 `console.log` 的 `style` 参数:

```js
console.log("%cHello World!", "color: red; font-size: 20px;");
```

> 所有的 CSS 样式都可以使用.

### 禁用右键

通过 `<body>` 的 `oncontextmenu` 属性禁用右键:

```js
<body oncontextmenu="return false;">
```

### 捕获浏览器后退事件

通过 `beforeunload` 事件捕获浏览器后退事件:

```js
window.addEventListener("beforeunload", function() {
    return alert("Are you sure you want to leave?");
});
```

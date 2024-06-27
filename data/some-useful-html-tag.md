---
title: '一些有用的HTML标签'
date: 2024-06-26
tags: [ 'html' ]
type: 'DefaultDocument'
---

## 一些有用的HTML标签

在 HTML5 中, 最常用的标签无疑是 `<div>`, 但是对于某些特定的场景, 可能一些别的标签会更合适.

例如一个可折叠的内容块, 使用 `<div>` 标签可能实现起来非常麻烦, 这时可以使用 `<details>`, `<summary>` 来实现.

### 联系链接

创建可点击的 email, 电话和短信链接:

```html
<a href="mailto:example@example.com">Email</a>
<a href="tel:1234567890">Phone</a>
<a href="sms:1234567890">SMS</a>
```

### 可折叠的内容块

```html

<details>
    <summary>click to expend</summary>
    <p>this is a content</p>
</details>
```

### 使用语义化标签

```html

<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<section>...</section>
<aside>...</aside>
<footer>...</footer>
```

### 分组表单元素

在 `<form>` 中使用 `<fieldset>` 分组表单元素, 使用 `<legend>` 定义分组标题:

```html

<form>
    <fieldset>
        <legend>Personal Information</legend>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
    </fieldset>
</form>
```

### 分组 `<select>` 选项

在 `<select>` 中使用 `<optgroup>` 分组 `<option>` 选项:

```html
<select>
    <optgroup label="Fruits">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
    </optgroup>
    <optgroup label="Vegetables">
        <option value="carrot">Carrot</option>
        <option value="broccoli">Broccoli</option>
        <option value="tomato">Tomato</option>
    </optgroup>
</select>
```

### 使用 `poster` 属性为视频添加封面

```html

<video controls poster="image.png">
    <source src="movie.ogg" type="video/ogg">
</video>
```

### 在 `<input>` 和 `<select>` 中使用 `multiple` 属性以实现多选

```html
<input type="file" multiple />
<select multiple>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
</select>
```

### 使用 `<sub>` 和 `<sup>` 标签实现下标和上标

```html
<p>H<sub>2</sub>O</p>
<p>x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>
```

### 使用 `download` 属性创建下载链接

```html
<a href="file.pdf" download="file.pdf">Download PDF</a>
```

### 使用 `<base>` 定义 base URL

```html

<head>
    <base href="https://example.com">
</head>
<body>
<a href="/page">Link</a>
<a href="/contact">Contact</a>
</body>
```

### 使用 `loading` 属性控制图片加载模式

```html
<img src="image.jpg" loading="lazy">
```

### 使用 `translate` 属性控制元素是否被翻译

```html

<div translate="no">This div will not be translated</div>
```

### 使用 `maxlength` 设置输入框的最大长度

```html
<input type="text" maxlength="10">
```

### 使用 `minlength` 设置输入框的最小长度

```html
<input type="text" minlength="5">
```

### 使用 `contenteditable` 属性控制元素是否可编辑

```html

<div contenteditable="true">This div is editable</div>
```

### 使用 `spellcheck` 属性控制元素是否进行拼写检查

```html

<div spellcheck="true">This div will be spellchecked</div>
```

### 使用 `target` 属性控制链接的打开方式

```html
<!-- Opens in the same frame -->
<a href="https://example.com" target="_self">Open</a>

<!-- Opens in a new window or tab -->
<a href="https://example.com" target="_blank">Open</a>

<!-- Opens in the parent frame -->
<a href="https://example.com" target="_parent">Open</a>

<!-- Opens in the full body of the window -->
<a href="https://example.com" target="_top">Open</a>

<!-- Opens in the named frame -->
<a href="https://example.com" target="framename">Open</a>
```

### 使用 `title` 属性为元素添加提示信息

```html

<button title="Click me">Click me</button>
<p title="World Health Organization">WHO</p>
```

### 使用 `accept` 属性控制文件上传的文件类型

```html
<input type="file" accept="image/*">
```

### 使用 `preload` 属性控制预加载资源

```html

<video src="video.mp4" preload="auto">
    Your browser does not support the video tag.
</video>
```

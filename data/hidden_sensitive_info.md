---
title: '隐藏敏感信息'
date: 2024--11-28
tags: ['javascript']
type: 'DefaultPost'
---

## 隐藏代码块中的敏感信息

在前端页面开发的过程, 有时需要隐藏高亮代码块中的某些敏感信息, 比如 `token` 等.

而在使用高亮库的同时进行敏感信息的隐藏, 可能不是那么容易实现. 例如: `highlight.js` 没有提供隐藏敏感信息的方法.

[`react-syntax-highlighter`](https://github.com/react-syntax-highlighter/react-syntax-highlighter) 这个库中, 提供了自定义渲染函数的功能. 从这个功能入手, 就可以进行敏感信息的隐藏.

`react-syntax-highlighter` 的最简单的使用方法是:

```jsx
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'

SyntaxHighlighter.registerLanguage('bash', bash)

// ...

return (
    // ...
    <SyntaxHighlighter language="bash" renderer={customRenderer}>
        {code}
    </SyntaxHighlighter>
    //...
)
```

通过自定义 `customRenderer` 函数, 可以在渲染时进行敏感信息的隐藏.

通过 `react-syntax-highlighter` 源码中的[默认渲染函数](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/create-element.js), 可以看到:

![default-renderer](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/1128-bPiCAs.png)

在第 157 ~ 159 行, 就是对接收到的字符进行渲染的地方.

假设在代码字符串中, 通过 `*{` 和 `}*` 将敏感信息包裹, 那么在此时就需要对包裹的内容进行隐藏并删除 `*{` 和 `}*`.

此时, 就不能直接返回 `value`, 而是需要使用正则表达式对其进行处理:

```js
//...
if (type === 'text') {
    const parts = (value || '').split(/(\*\{.*?\}\*)/)
    return parts.map((part, index) => {
      if (part.match(/^\*\{.*\}\*$/)) {
        const content = part.slice(2, -2)
        return React.createElement('s', { key: index }, content)
      }
      return part
    })
    return value || null
  }
//...
```

假设在新文件中复制里源码并对 `createElement` 函数进行了修改, 那么在渲染时调用自定义的 `createElement` 函数, 就可以隐藏敏感信息了.

```jsx
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { createElement } from './createElement'

SyntaxHighlighter.registerLanguage('bash', bash)

// ...
function customRenderer({ rows, stylesheet, useInlineStyles }: any) {
    return rows.map((node: any, i: number) =>
        createElement({
            node,
            stylesheet,
            useInlineStyles,
            key: `code-segment${i}`,
        }),
    )
}

return (
    // ...
    <SyntaxHighlighter language="bash" renderer={customRenderer}>
        {code}
    </SyntaxHighlighter>
)
```

此时, 敏感信息会被 `<s>` 包裹, 再通过 CSS 样式处理 `<s>` 标签的样式, 就可以隐藏敏感信息, 同时在鼠标悬停时, 显示其内容.

```css
  s {
    color: transparent;
    text-decoration: auto;
    transition: all 0.3s;
    background-color: #f8f8f8;
    border-radius: 4px;
    &:hover {
      color: inherit !important;
      background-color: transparent !important;
    }
  }
```

这样基本上就实现了在页面中隐藏敏感信息的功能.

整个逻辑上来说, 就是使用自定义标志包裹敏感信息, 同时在代码高亮库渲染时, 对包裹的内容使用特殊标签进行隐藏, 通过特殊标签的样式处理, 当鼠标悬停时, 显示其内容.

---
title: 'React 中的新 hook: useActionState'
date: 2024-07-13
tags: ['react']
type: 'DefaultDocument'
---

## `useActionState`

基于表单动作结果更新状态的新的 React hook.

像智能助手一样记住某些东西并在提交表单时改变它们.

查看[官方文档](https://react.dev/reference/react/useActionState)

## 如何使用

```jsx
import { useActionState } from 'react';

const [state, formAction] = useActionState(actionFunction, initialState);
```

* `state` 表示当前表单状态.
* `formAction` 是一个在表单中使用的新动作.
* `actionFunction` 是一个函数, 当表单提交时触发.
* `initialState` 是表单状态初始值.

## 什么时候使用 `useActionState`

当想要基于表单提交更新状态时, 尤其是使用服务端组件并想要更快的响应时可以使用.

```jsx
import { useActionState } from 'react';

async function increment(previousState, formData) {
    return previousState + 1;
}

function StateFullForm() {
    const [state, formAction] = useActionState(increment, 0);

    return (
        <form>
            {state}
            <button formAction={formAction}>Increment</button>
        </form>
    )
}
```

上面的例子中, 每次点击按钮, 计数都会加一. `useActionState` hook 负责表单提交时更新状态.

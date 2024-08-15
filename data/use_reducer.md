---
title: 'useReducer'
date: 2024-08-15
tags: ['react']
type: 'DefaultPost'
---

`useReducer` 向 **React 组件**添加一个 reducer.

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

## reference

在顶层组件调用 `useReducer`, 通过 reducer 管理组件的状态.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
    //...
}

function MyComponent() {
    const [state, dispatch] = useReducer(reducer, { age: 42 })
    //...
}
```

### 参数

* reducer: 表示状态如何更新的函数, 必须是纯函数, 接收 state 和 action 作为参数, 返回新的 state. state 和 type 可以是任何类型.
* initialArg: 初始化 state 的值, 可以是任何类型. 初始值的计算逻辑取决于接下来的 `init` 函数.
* init: 可选参数, 应返回初始 state 的初始化函数. 未指定则初始 state 为 `initialArg`. 否则将为 `init(initialArg)`.

### 返回值

`useReducer` 返回一个包含两个值的数组:

1. 当前 state. 第一次渲染期间, 被设置为 `init(initialArg)` 或 `initialArg`.
2. `dispatch` 函数, 更新 state 为另一个值并重新渲染.

### 注意事项

* `useReducer` 是一个 hook, 所以只能在组件最顶层或自定义的 hook 中调用, 不能在循环或条件语句中调用. 如果有这种需求, 可以创建一个新的组件, 并将 state 移入其中.
* 在严格模式下, React 会调用 reducer 和初始化函数两次, 用户检测意外的副作用. 这只是开发模式下的行为, 并不会影响到生产环境.

## `dispatch` 函数

`useReducer` 返回的 `dispatch` 函数更新 state 为另一个不同的值并触发重新渲染. 需要传递 action 作为 `dispatch` 的唯一参数:

```jsx
const [state, dispatch] = useReducer(reducer, { age: 42 })

function handleClick() {
    dispatch({ type: 'incremented_age' });
    //...
}
```

React 会调用 `reducer` 以更新 state, `reducer` 的参数为当前的 state 与传递的 action.

### 参数

* action: 用户执行的操作, 可以是任意类型的值. 通常来说 action 是一个对象, 其中 `type` 属性标识类型, 其他属性携带额外信息.

### 返回值

`dispatch` 函数没有返回值.

### 注意事项

* `dispatch` 函数是为**下一次渲染而更新 state**. 因此在调用 `dispatch` 函数后读取 state **并不会拿到更新后的值**, 只能获取到调用前的值.
* 如果提供的新值与当前的 state 相同, React 会**跳过组件和子组件的重新渲染**.
* React 会**批量更新 state**. state 会在**所有事件函数执行完毕**并且已经调用过它的 `set` 函数后进行更新, 这可以防止在一个事件中多次进行重新渲染. 如果在访问 DOM 等极少数情况下需要强制 React 提前更新, 可以使用 `flushSync`.

## 用法

### 向一个组件添加 reducer

在组件最顶层调用 `useReducer` 通过 reducer 管理组件状态.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
    //...
}

function MyComponent() {
    const [state, dispatch] = useReducer(reducer, { age: 42 })
    //...
}

```

`useReducer` 返回一个包含两个值的数组:

1. ***当前 state***, 首次渲染时提供 ***初始值***.
2. ***`dispatch` 函数***, 根据交互修改 state.

为了更新屏幕上的内容, 使用一个表示用户操作的 action 来调用 ***`dispatch`*** 函数.

```jsx
function handleClick() {
    dispatch({ type: 'incremented_age' });
    //...
}
```

React 会将当前的 state 和这个 action 一起作为参数传递给 ***`reducer`*** 函数, 然后 reducer 计算并返回新的 state, 最后 React 保存新的 state, 并使用它渲染组件和更新 UI.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
    if (action.type === 'incremented_age') {
        return {
            age: state.age + 1,
        };
    }
    throw Error('Unknown action.');
}

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, { age: 42 });

    return (
        <>
            <button
                onClick={() => {
                    dispatch({ type: 'incremented_age' });
                }}>
                Increment age
            </button>
            <p>Hello! You are {state.age}.</p>
        </>
    );
}
```

`useReducer` 与 `useState` 非常相似, 但是 `useReducer` 将状态更新逻辑从事件处理函数中移动到组件外部.

## 实现 reducer 函数

reducer 函数的定义如下:

```jsx
function reducer(state, action) {
    // ...
}
```

需要在函数体中添加计算并返回新 state 的逻辑. 一般会使用 *`switch` 语句* 来完成. 在 `switch` 语句中通过匹配 `case` 来计算并返回新的 state.

```jsx
function reducer(state, action) {
    switch (action.type) {
        case 'incremented_age': {
            return {
                name: state.name,
                age: state.age + 1,
            };
        }
        case 'changed_name': {
            return {
                name: action.nextName,
                age: state.age,
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}
```

action 可以是任意类型, 不过通常至少是一个存在 `type` 属性的对象. 也就是说它需要携带计算新的 state 值所必须的数据.

```jsx
function Form() {
    const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });

    function handleButtonClick() {
        dispatch({ type: 'incremented_age'});
    }

    function handleInputChange(e) {
        dispatch({
            type: 'changed_name',
            nextName: e.target.value,
        })
    }

    // ...
}
```

action 的 type 依赖与组件的实际情况. *即使会导致数据的多次更新, 每个 action 都只描述一次交互*. state 的类型也是任意的, 一般会使用对象或数组.

> state 是只读的, 即使是对象或数组都不要尝试修改,
>
> ```jsx
> // 错误
> state.age = state.age + 1;
> // 错误
> state.push(1);
> ```
>
> 如果需要修改 state, 需要返回一个新的对象或数组.
>
> ```jsx
> // 正确
> return {
>     ...state,
>     age: state.age + 1,
> };
> // 正确
> return [...state, 1];
> ```

## 避免重新创建初始值

React 会保存 state 的初始值并在下一次渲染时忽略.

```jsx
function createInitialState(username) {
    // ...
}

function TodoList({ username }) {
    const [state, dispatch] = useReducer(reducer, createInitialState(username));
    // ...
}
```

虽然 `createInitialState(username)` 的返回值只用于初次渲染, 但是在每一次渲染的时候都会被调用. 如果 `createInitialState` 是一个昂贵的函数, 那么这将会导致性能问题.

可以通过给 `useReducer` 的第三个参数传入**初始化函数**来解决这个问题:

```jsx
function createInitialState(username) {
    // ...
}

function  TodoList({ username}) {
    const [state, dispatch] = useReducer(reducer, username, createInitialState);
    // ...
}
```

要注意传递的是函数本身, 而不是结果. 如果初始化函数不需要参数就可以计算出初始值, 那么第二个参数可以为 `null`.

## 疑难解答

### 已经 dispatch 了一个 action, 但是打印出来还是旧 state

调用 `dispatch` 函数**不会改变当前渲染的 state**. 这是因为*state 的行为和快照一样*. 更新 state 会使用新的值来对组件重新渲染, 但是不会改变当前执行的事件处理函数里面的 state 值.

如果需要获取更新后的 state, 可以手动调用 reducer 来得到结果:

```jsx
const action = { type: 'incremented_age' };
dispatch(action);

const nextState = reducer(state, action);
console.log(state);
console.log(nextState);
```

### 已经 dispatch 了一个 action, 但是屏幕并没有更新

React 使用 `Object.is` 比较更新前后的 state, 如果**它们相等就会跳过这次更新**. 这通常是因为直接修改了对象或数组.

由于直接修改并返回了 `state` 对象, 所以 React 会跳过这次更新. 为了修复这个错误, 应该确保总是*使用正确的方式更新对象和数组*.

### dispatch 之后 state 的某些属性变为 undefined

确保每个 `case` 语句中所返回的新的 state 都**复制了当前的属性**.

### reducer 和初始化函数运行了两次

*严格模式* 下 React 会调用两次 reducer 和初始化函数, 这不会破坏代码逻辑.

这个**仅限于开发模式**的行为可以帮助*保持组件纯粹*: React 会使用其中一次调用结果并忽略另一个结果. 如果组件, 初始化函数以及 reducer 函数都是纯函数, 这并不会影响逻辑. 不过一旦它们存在副作用, 这个额外的行为可以帮助开发者发现潜在的问题.

**只有组件, 初始化函数和 reducer 函数需要是纯函数**. 事件处理函数不需要是纯函数, 并且 React 不会调用事件函数两次.

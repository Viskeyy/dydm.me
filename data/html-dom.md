---
title: 'HTML attributes 和 DOM properties'
date: 2024-07-02
tags: ['html']
type: 'DefaultDocument'
---

## HTML attributes 和 DOM properties

虽然都翻译为 '属性', 但 HTML 属性和 DOM 属性是根本不同的东西.

### 关键不同点

#### HTML 序列化

Attributes 会序列化, 但 properties 不会, 因此在开发者工具中, 只能看到 attributes 而不是 properties.

```js
const div = document.createElement('div');

div.setAttribute('foo', 'bar');
div.hello = 'world';

console.log(div.outerHTML); // <div foo="bar"></div>
console.log(div.hello); // undefined
```

#### 值类型

为了可以序列化, attributes 必须是字符串, 而 properties 可以是任何类型.

```ts
const div = document.createElement('div');
const obj = { foo: 'bar' };

div.setAttribute('foo', obj);
console.log(typeof div.getAttribute('foo')); // 'string'
console.log(div.getAttribute('foo')); // '[object Object]'

div.hello = obj;
console.log(typeof div.hello); // 'object'
console.log(div.hello); // { foo: 'bar' }
```

#### 大小写敏感

Attributes 大小写不敏感, 但 properties 大小写敏感.

```html
<div id="test" heLlo="world"></div>
<script>
    const div = document.querySelector('#test');
    console.log(div.getAttributeNames()); // ['id', 'hello']

    div.setAttribute('FOO', 'bar');
    console.log(div.getAttributeNames()); // ['id', 'hello', 'foo']

    div.TeSt = 'value';
    console.log(div.TeSt); // 'value'
    console.log(div.test); // undefined
</script>
```

### 映射

```html
<div id="foo"></div>
<script>
    const div = document.querySelector('#foo');
    console.log(div.getAttribute('id')); // 'foo'
    console.log(div.id); // 'foo'

    div.id = 'bar'
    console.log(div.getAttribute('id')); // 'bar'
    console.log(div.id); // 'bar'
</script>
```

`Element` 中存在一个 `id` 的 `getter` 和 `setter` 来映射 `id` attribute.

当 property 对应 attribute 时, `attribute` 是数据源. 当设置 `property` 时, 更新 `attribute`. 当读取 `property` 时, 读取 `attribute`.

为了方便, 大多数规范会为每个定义的 attribute 创建对应的 property.

#### 命名区别

有时 property 和 attribute 会有不同的命名.

有时只是为了区分大小写:

* `<img>` 中, `el.crossOrigin` 会映射为 `crossorigin` attribute.
* 在所有元素中, `el.ariaLabel` 会映射为 `aria-label` attribute.

有时由于旧的 JavaScript 保留字, property 和 attribute 会有不同的命名:

* `el.className` 会映射为 `class` attribute.
* 在 `<label>` 中, `el.htmlFor` 会映射为 `for` attribute.

#### 验证, 强制类型和默认值

Properties 有验证和默认值, 但 attributes 没有.

```js
const input = document.createElement('input');
console.log(input.getAttribute('type')); // null
console.log(input.type); // 'text'

input.type = 'number';
console.log(input.getAttribute('type')); // 'number'
console.log(input.type); // 'number'

input.type = 'foo';
console.log(input.getAttribute('type')); // 'foo'
console.log(input.type); // 'text'
```

上面的例子中, 使用 `type` 的 getter 进行验证, setter 允许非法值 `'foo'`, 但当 getter 得到非法值或空时, 会返回 `'text'`.

一些 properties 执行强制类型:

```html
<details open>...</details>
<script>
    const details = document.querySelector('details');
    console.log(details.getAttribute('open')); // ''
    console.log(details.open); // true

    details.open = false;
    console.log(details.getAttribute('open')); // ''
    console.log(details.open); // false

    details.open = 'hello';
    console.log(details.getAttribute('open')); // ''
    console.log(details.open); // true
</script>
```

#### input 中的 `value`

`value` property 不映射 `value` attribute, 实际上 `value` property 不映射任何 attribute.

最初 `value`  property 遵循 `defaultValue` property. 一旦通过 JavaScript 或用户交互设置新的 `value` property, 就会使用内部 `value`:

```js
class HTMLInputElement extends HTMLElement {
    get defaultValue() {
        return this.getAttribute('value') ?? '';
    }
    set defaultValue(newValue) {
        this.setAttribute('value', String(newValue));
    }

    #value = undefined;
    get value() {
        return this.#value ?? this.defaultValue;
    }
    set value(newValue) {
        this.#value = String(newValue);
    }

    // reset
    formResetCallback() {
        this.#value = undefined;
    }
}
```

```html
<input type="text" value="default" />
<script>
    const input = document.querySelector('input');
    console.log(input.getAttribute('value')) // 'default'
    console.log(input.value); // 'default'
    console.log(input.defaultValue); // 'default'

    input.defaultValue = 'new default';
    console.log(input.getAttribute('value')) // 'new default'
    console.log(input.value); // 'new default'
    console.log(input.defaultValue); // 'new default'

    input.value = 'hello';
    console.log(input.getAttribute('value')) // 'hello'
    console.log(input.value); // 'hello'
    console.log(input.defaultValue); // 'new default'

    input.setAttribute('value', 'another new default')
    console.log(input.getAttribute('value')) // 'another new default'
    console.log(input.value); // 'hello'
    console.log(input.defaultValue); // 'another new default'
</script>
```

### Attributes 应当用于配置

Attributes 应该用于配置, 而 properties 可以包含状态.

`<input value>` 就是对的, `value` attribute 配置默认值, 而 `value` property 给出当前状态.

验证时 `getter/setter` 的是 property, 而不是 attribute.

`<detail>` 和 `<dialog>` 通过 `open` attribute 代表元素状态, 并且浏览器通过自己添加 / 删除这个属性响应用户交互. 这种设计打破了 attributes 应该用于配置的设计.

### 框架如何处理不同

```html
<input className="..." type="..." aria-label="..." value="..." />
```

#### Preact 和 VueJS

如果 `propName in element`, 它们将 prop 设置为 property, 否则设置为 attribute.

基本上它们更喜欢 property 而不是 attribute.

* `setProperty` in Preact
* `shouldSetAsProps` in VueJS

#### React

React 设置 attribute, 这使它们的 render-to-string 方法更符合逻辑.

这也解释了为什么自定义元素在 React 中似乎没有效果. 因为它们是自定义的, 它们的属性不在 React 的预定义列表中, 所以它们都设置为 attribute.

React 使用 `className` 替代 `class`, 看起来像一个 attribute. 但尽管使用 property, React 也会在底层设置 `class` attribute.

* `setProp` in React

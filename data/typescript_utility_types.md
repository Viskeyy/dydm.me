---
title: TypeScript 实用类型
date: 2024-08-25
tags: ['typescript']
type: 'DefaultPost'
---

## TypeScript utility types that you must know

[原文地址](https://dev.to/arafat4693/typescript-utility-types-that-you-must-know-4m6k)

这篇文章将介绍一些有益和重要的实用类型, 可以使一些工作更简单.

TypeScript 中的实用类型是一些预定义的通用类型, 可以用来操作或创建其他新类型. 这些类型在整个 TypeScript 项目中都是可用的, 所以不需要添加任何依赖以获得它们.

### Partial

第一个实用类型是 `Partial` (部分), 就像听起来的那样, 它使所有的属性都是可选的或部分的.

```ts
interface Person {
    name: string;
    age: number;
    email: string;
}

// defined the new type PartialPerson is a partial version of 'Person'
type PartialPerson = Partial<Person>;

// same as
// interface PartialPerson {
//      name?: string;
//      age?: number;
//      email?: string;
// }
```

### Required

与 `Partial` 相反, 它使所有属性都是必须的.

```ts
interface Person {
    name?: string | undefined;
    age?: number | undefined;
    email?: string | undefined;
}

type RequiredPerson = Required<Person>;

// interface RequiredPerson {
//      name: string;
//      age: number;
//      email: string;
// }
```

### Omit

可以使用 `Omit` 从现有的类型中创建一个缺少某些属性的新类型.

```ts
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type UserWithoutEmail = Omit<User, 'email'>

// interface UserWithoutEmail {
//   id: string;
//   name: string;
//   age: number;
// }

type UserWithoutEmailAndId = Omit<User, 'email' | 'id'>;
```

### Pick

与 `Omit` 相反, `Pick` 从现有的类型中创建一个含有某些属性的新类型.

```ts
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type UserWithNameAndAge = Pick<User, 'name' | 'age'>

// interface UserWithNameAndAge {
//      name: string;
//      age: number;
// }
```

### Readonly

`Readonly` 从现有的类型中创建一个新的类型并将所有属性设置为 `readonly`, 这意味这在初始化之后不能修改任何属性.

```ts
interface Person {
  id: number;
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;

// interface ReadonlyPerson {
//   readonly id: number;
//   readonly name: string;
//   readonly age: number;
// }
```

### Mutable

`Mutable` 允许将所有的只读属性转换为可变属性.

```ts
interface Person {
    readonly id: number;
    readonly name: string;
    readonly age: number;
}

type MutablePersong = Mutable<Pserson>;

// interface MutablePerson {
//   id: number;
//   name: string;
//   age: number;
// }
```

### Exclude

`Exclude` 允许通过移除联合类型 (`union`) 的成员创建新类型.

```ts
type NumberOrString = number | string | boolean;

type OnlyNumber = Exclude<NumberOfString, string | boolean>;

type NumberString = Exclude<NumberOfString, boolean>;
```

### Extract

与 `Exclude` 相反, `Extract` 是从联合类型中提取出一个或多个成员.

```ts
type NumberOrString = number | string | boolean;
type OnlyNumber = Exclude<NumberOrString, number>;
```

### Multiple utility types together

```ts
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type PartialPick = Partial<Pick<User, 'name' | 'age'>>;

// interface PartialPick {
//     name?: string | undefined;
//     age?: number | undefined;
// }
```

### ReturnType

`ReturnType` 取出一个函数的返回值类型. 它接收一个函数作为参数并返回函数返回值的类型.

```ts
function add (a: number, b: number): number {
    return a + b;
}

type AddReturnType = ReturnType<typeof add>;
```

### Parameters

`Parameters` 取出一个函数的参数的类型.

```ts
function add(a: number, b: string, c: boolean): string {
    return a + b;
}

type AddParametersType = Parameters<typeof add>;
// type AddParametersType = [a: number, b: string, c: boolean]
```

### NonNullable

`NonNullable` 通过排除给定类型的 `null` 和 `undefined` 类型创建一个新的类型.

```ts
type NullableString = string | null | undefined;

type NonNullableString = NonNullable<NullableString>;
// type NonNullableString = string;
```

### Awaited

`Awaited` 类型通过提取 `promise` 或使用 `await` 的类型的解析类型.

```ts
type PromiseNumber = Promise<number>;

type JustNumber = Awaited<PromiseNumber>;
// type JustNumber = number
```

### Awaited and ReturnedType combined

```ts
async function fetchData(): Promise<string> {
    // fetch data...
}

type ResolveResult = Awaited<ReturnType<typeof fetchData>>
// type ResolveResult = string
```

### Conclusion

这些是一些最常用的 TypeScript 实用类型, 被全球的其他开发者大量使用. 它可以清理你的代码, 并可用于更有表现力和更简洁地处理类型. 希望这篇文章会有帮助.

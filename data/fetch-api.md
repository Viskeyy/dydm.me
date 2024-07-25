---
title: 'Fetch 在底层是如何工作的'
date: 2024-07-25
tags: ['javascript']
type: 'DefaultDocument'
---

> [原文地址](https://javascript.plainenglish.io/how-javascripts-fetch-api-works-under-the-hood-2e4f990b9ce1)

## Introduction

Fetch 是提供通过网络异步获取资源的现代 web API. 由于其简单性, 灵活性和一致性, 它已经成为 web 应用中获取数据和资源的受欢迎的选择. 这篇文章将查看 Fetch API 在低层如何工作的, 并探索其核心功能.

## How Fetch API works?

Fetch 是基于 Promise 的, 它为处理 JavaScript 中的异步操作提供了一种一致而优雅的方式. 当调用 `fetch()` 函数时, 它返回一个 Promise 对象. 如果请求成功, Promise 对象将与一个 `Response` 对象一起解析, 如果请求失败, Promise 对象将用 `error` 拒绝请求.

在底层, Fetch 使用 `XMLHTTPRequest` 对象发送 HTTP 请求和接收服务端的返回值. `XMLHTTPRequest` 是一个低级别的 API, 从网络早期就存在, 并被其他网络 API 使用, 包括 AJAX 和 WebSockets.

当调用 `fetch()` 时, 它创建一个新的 `XMLHTTPRequest` 对象并设置事件监听来处理服务端的返回值. `fetch()` 函数也接收可选的 `options` 对象作为参数用于自定义 HTTP 请求, 包括 HTTP 的请求方式, 请求头部和请求体.

下面是一个使用 Fetch API 通过网络获取资源的例子.

```js
fetch('https://abc.com/data.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
```

例子中, 使用 `fetch()` 从服务端获取 JSON 文件. 一旦受到返回值, 就调用 `Response` 对象上的 `json()` 方法从返回值中取出 JSON 数据. 然后在控制台中打印数据. 如果发生错误, 也把错误打印在控制台上.

Fetch API 还支持多种 HTTP 方法, 包括 GET, POST, PUT, DELETE 和其他. 可以通过使用 `options` 对象指定 HTTP 请求方式.

```js
fetch('https://abc.com/data.json', {
    method: 'POST',
    body: JSON.stringify({ foo: 'bar' }),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => console.log(response))
.catch(error => console.error(error));
```

在例子中, 使用 `fetch()` 向服务端发送一个JSON 格式的 payload 的 POST 请求. 并设置请求头中的 `Content-Type` 为 `application/json` 来表明 payload 是 JSON 格式数据.

Fetch API 同样支持其他的各种功能, 包括请求头和响应头, 请求和响应模式, cookies 还有更多.

## Simplified Implementation

下面是一个简单的 JavaScript 实现 Fetch API, 解释了它在底层是如何工作的.

```js
function fetch(url, options) {
    // create a new Promise object
    return new Promise((resolve, reject) => {
        // create a XMLHTTPRequest object
        const xhr = new XMLHTTPRequest();

        // handle the response from the server
        xhr.onload = () => {
            const response = new Response(xhr.responseText, {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: xhr.getAllResponseHeaders()
            });
            resolve(response);
        }
        // handle any errors that occur while fetching
        xhr.onerror = () => {
            reject(new TypeError('Network request failed'));
        }
        // open the connection to the server
        xhr.open(options.method || 'GET', url);
        // set any headers that were provided
        for (const header in options.headers) {
            xhr.setRequestHeader(header, options.headers[header]);
        }
        // send the request to server
        xhr.send(options.body);
    })
}
```

Fetch API 的实现使用了 XMLHTTPRequest 对象, 这个对象是一个低级别的网络 API, 是大多数现代网络的基础. 下面是对其工作原理的分解.

* `fetch()` 接收两个参数作为参数, 分别是要获取的资源的 url 和包含请求的所有附加信息的 options (例如, 请求头, 请求方式和请求体).
* `fetch()` 创建一个新的 Promise 对象并返回. Promise 会在请求成功时 resolve `Response` 对象, 请求失败时会 reject 错误.
* `fetch()` 创建一个新的 XMLHTTPRequest 对象, 它被用于向服务端发送实际的 HTTP 请求.
* 当收到服务端的返回值时会调用 `xhr.onload()` 方法. 这个方法创建一个新的 `Response` 对象, 这个对象被请求返回数据 (返回体, 返回头部, 状态码和状态文本) 填充. 然后 `Response` 对象被传递给 `resolve()` 函数, 这个函数 resolve `fetch()` 返回的 Promise.
* 当获取资源发生错误时, 会调用 `xhr.onerror()` 方法. 这个方法 用 `'Network request failed'` 这条信息创建一个新的 `TypeError` 对象, 这个对象被传递个 `reject()` 函数, 这个函数 reject `fetch()` 返回的 Promise.
* `xhr.open()` 函数用于开启和服务器的连接. 它接收两个参数, 所使用的请求方式以及要获取的资源的 URL.
* `xhr.setRequestHeader()` 方法用于设置 `options` 对象中提供的任何头信息. 这是通过遍历 `options.headers` 的属性并依次设置每个头来实现.
* `xhr.send()` 是实际上给服务端发送请求的方法. 如果请求含有请求体, 会被作为参数传递给 `send()`.

Fetch API 的实现只是简单的, 并且没有包含实际上 Fetch API 的所有功能. 但它应该让你了解它在底层是如何工作的.

## Conclusion

Fetch API 在 web 应用中提供了一种强力且灵活的通过网络获取资源的方式. 在底层, 它使用 `XMLHTTPRequest` 对象发送 HTTP 请求并接收服务端的返回值. 通过使用 Promise 和一致的 API, Fetch API 使在 JavaScript 处理异步操作变得简单. 由于对 HTTP 方法, 头部以及其他功能的支持, Fetch API 已经成为现代 web 应用中获取资源和数据的热门选择.

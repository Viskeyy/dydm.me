---
title: '在 React 中使用 WebSockets'
date: 2024-09-01
tags: ['react']
type: 'DefaultPost'
---

## React 中使用 WebSockets 完整指南

[ably/websockets-react-turtorial](https://ably.com/blog/websockets-react-tutorial)

### 什么是 WebSockets

WebSockets 是一种通信协议, 可以实现应用程序之间的双向通信.

当需要双向通信例如聊天和多人协作时, 它们会是一个很好的选择.

此外, 当需要服务器上有新数据可用就立即推送时, WebSockets 非常适合使用, 比如实时体育比分更新, 包裹送达状态更新或实时图表数据等.

这是因为它们是双向的, 信息可以同时在两个方向上流动, 这使得 WebSockets 在高吞吐量场景 (如在线多人游戏) 中成为一个有吸引力的选择.

### WebSockets 是如何工作的

与短暂的 HTTP 请求不同, WebSockets 使用长连接进行实时通信.

一旦建立连接, 它将保持连接状态, 直到其中一方关闭连接.

![established a connection](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0901-htVry7.jpg)

由于这些连接是长连接, 打开更多不必要的连接会引起内存问题. 并且由于一个 WebSockets 连接具有足够的带宽, 通常的做法是所有消息使用同一个连接 (这种技术称为多路复用).

这引发了一些有趣的问题, 例如 "在 React 中应该将连接放在哪里" 和 "如何清理连接" 等.

### WebSockets 和 React

WebSockets 在所有主要的浏览器中都有一个可访问的 Web API, 而且由于 React "只是 JavaScript", 所以可以在没有任何额外模块或特定 React 代码的情况下访问:

```js
const socket = new WebSockets('ws://localhost:8080')

// Connextion opened
socket.addEventListener("open", event => {
    socket.send("Connection established")
})

// Listen for messages
socket.addeventListener("message", event => {
    console.log("Message from server", event.data)
})
```

开始使用 WebSockets 不需要特定的 React 库.

简单而精简的 WebSockets API 提供了灵活性, 但这也意味着需要额外的工作来实现一个可用于生产环境的 WebSockets 方案.

当直接使用 WebSockets API 时, 需要自己编写的一些内容:

* 身份验证和授权.
* 通过实现 "心跳" 来实现可靠的断开检测.
* 无缝自动连接.
* 在暂时断开连接时回复用户错过的消息.

与其重新发明轮子, 通常更有生产力的做法是使用一个通用的 WebSockets 库. 这个库应该提供上述功能 - 这样可以专注于构建应用中独特的功能, 而不是常见的实时消息代码.

### 最好的几个 WebSockets 库

在看一些 WebSockets 库之前, 将 React 和 JavaScript 区分开是很有帮助的.

尽管 React "只是 JavaScript", 但可能仍需要一个 React 特定的 WebSockets 库.

也就是说, 如果 WebSockets 库具有符合 React 惯用方式的功能, 例如现成的 React Hook, 那肯定会有所帮助.

市面上有很多 WebSockets 库 (但其中很多已经过时), 因此在[这篇文章](https://ably.com/blog/choosing-the-right-websocket-library-for-react-project)中, 只介绍了适用于 React 的最佳 WebSockets 库.

* React useWebSockets: 在 WebSockets API 上添加了一层, 有自动重连和服务器发送事件的备用功能 (需要在服务器上提供编码支持). 该库专门为 React 设计, 因此使用 useWebSocket hook 及其他所有选项都是非常自然的, 缺点是可能没有所需要的所有功能和可靠性支持.
* Socket.IO: 一个 JavaScript 实时消息库, 可以选择在无法建立 WebSockets 连接的情况下使用 HTTP long polling. 比 useWebSockets 有更多的功能, 但不是针对 React 的, 并且仍需要做一些工作以确保良好的性能和可靠性.
* React useWebSockets 和 Socket.IO: 它们实际上可以一起工作, 可以在 React 项目中一起使用.
* Ably: 一个实时基础设施平台, 提供一流的 React 客户端支持. 使用 useWebSockets 或 Socket.IO, 需要托管自己的服务器. 听起来很简单, 但实际上管理自己的 WebSockets 后端是很大的负担. 通过 Ably, 只需要创建一个账户, 所有消息都通过 Ably 全球基础设施进行路由, 延迟最低. 不需要担心运行时间或消息是否准确地按照顺序发送, 只需要在 React hook 中使用并专注于构建真正重要的功能即可.

### 在 React 中使用 WebSockets 的最佳实践

在 React 中使用 WebSockets 时, 它们成为新信息流动的重要渠道. 理想情况下, 任何需要的组件都能使用共享连接发送和接收数据.

同时, 无需创建混乱的 props 以及为了让 WebSockets 在每个组件中都可以访问而导致组件脆弱. 如果这样做, 就违反了封装性. 这意味这任何组件都可以更改 WebSocket 对象, 从而导致其他地方出现意外行为.

最佳实践取决于正在构建什么以及应用的具体形态.

### React 中在哪里使用 WebSockets

是将连接放在组建中, 使用上下文, 创建钩子还是使用其他方法?

#### 使用 useWebSocket hook

自己管理固然有优势, 但对于大多数人来说, 只需要 `npm install` 就能找到所有 "WebSockets-with-React" 的答案.

```jsx
import useWebSocket, { ReadyState } from "react-use-websocket"

export const Home = () => {
  const WS_URL = "ws://127.0.0.1:800"
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed")
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          channel: "general-chatroom",
        },
      })
    }
  }, [readyState])

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`)
  }, [lastJsonMessage])

  return <Chat lastJsonMessage={lastJsonMessage} />
}
```

处理提供一个常用的抽象概念, useWebSocket 还有一些方便的选项, 比如 `share`.

当设置为 `true` 时, 无论在哪里调用 hook, useWebSockets 都会共享连接到同一个端点.

这样就可以在组件的不同实例中重复使用连接, 并在任何需要的地方访问 WebSocket.

#### 顶层组件

如果不想依赖库, 接下来的代码将展示如何使用常用的 React 代码直接管理 WebSocket 实例.

对于简单的应用, 直接在顶层组件中打开 WebSocket 连接并利于 `useRef` (`useMemo` 也可以) 在渲染之间保持连接是完全合适的:

```jsx
export const Home = () => {
  const connection = useRef(null)

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:800")

    // Connection opened
    socket.addEventListener("open", (event) => {
      socket.send("Connection established")
    })

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data)
    })

    connection.current = ws

    return () => connection.close()
  }, [])

  return <Chat />
}
```

最佳做法是从顶层组件订阅 WebSocket 事件, 根据新事件更新顶层状态, 并将状态作为 props 向下传递.

将 WebSocket 对象作为 props 向下传递, 这样就可以附加事件处理程序或直接调用 `send`. 虽然这很有诱惑力, 但与在同一个地方管理 WebSocket 连接相比, 这可能会变得棘手.

如果子组件需要发送数据, 可以传递一个回调函数.

#### Context API

如果组件层次结构中有很多组件, 而且其中许多组件都需要访问 WebSocket, 那么从顶层组件传递 props 很快就会变得非常臃肿.

Context 是 React 专为解决这一问题而发明的功能.

它提供了一种通过组件树共享数据的方式, 而无需从父级组件手动向子级组件传递 props, 非常适合应用中被视为 "全局" 的状态, 例如当前已验证的用户, 主题, 首选语言, 或者是 WebSocket 连接.

```jsx
export const WebsocketContext = createContext(false, null, () => {})
//                                            ready, value, send

// Make sure to put WebsocketProvider higher up in
// the component tree than any consumer.
export const WebsocketProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false)
  const [val, setVal] = useState(null)

  const ws = useRef(null)

  useEffect(() => {
    const socket = new WebSocket("wss://echo.websocket.events/")

    socket.onopen = () => setIsReady(true)
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => setVal(event.data)

    ws.current = socket

    return () => {
      socket.close()
    }
  }, [])

  const ret = [isReady, val, ws.current?.send.bind(ws.current)]

  return (
    <WebsocketContext.Provider value={ret}>
      {children}
    </WebsocketContext.Provider>
  )
}
```

```jsx
// Very similar to the WsHook component above.
export const WsConsumer = () => {
  const [ready, val, send] = useContext(WebsocketContext); // use it just like a hook

  useEffect(() => {
    if (ready) {
      send("test message");
    }
  }, [ready, send]); // make sure to include send in dependency array

  return (
    <div>
      Ready: {JSON.stringify(ready)}, Value: {val}
    </div>
  );
};

```

#### 自定义 hook

自定义 WebSocket hook 可以将 WebSocket 相关代码抽象到一个地方.

如果将所有相关代码抽象到 hook 中, 就可以避免使组件复杂化并减少代码重复.

```jsx
export const useWs = ({ url }) => {
  const [isReady, setIsReady] = useState(false)
  const [val, setVal] = useState(null)

  const ws = useRef(null)

  useEffect(() => {
    const socket = new WebSocket(url)

    socket.onopen = () => setIsReady(true)
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => setVal(event.data)

    ws.current = socket

    return () => {
      socket.close()
    }
  }, [])

  // bind is needed to make sure `send` references correct `this`
  return [isReady, val, ws.current?.send.bind(ws.current)]
}
```

```jsx
export const WsComponent = () => {
  const [ready, val, send] = useWs("wss://echo.websocket.events/")

  useEffect(() => {
    if (ready) {
      send("test message")
    }
  }, [ready, send]) // make sure to include send in dependency array

  return (
    <div>
      Ready: {JSON.stringify(ready)}, Value: {val}
    </div>
  )
}
```

虽然这样很简洁, 但并不能解决在整个应用中都访问 WebSocket 连接的问题, 仍需要依赖 props 或 context.

也可以从 useWebSocket 中提取一个页面并实现单例模式, 这样就只会有一个连接.

### 如何在 React 和 Node 中使用 WebSocket

#### 在 Node 中实现 WebSocket 服务

每个 WebSocket 应用都有两个组件: 服务端和客户端.

客户端在连接到服务端之前不会做太多事情, 因此需要先构建服务端.

几乎可以使用任何语言实现 WebSocket 服务器, 但由于 React 使用 JavaScript, 所以将使用 Node 和 ws 模块.

```jsx
const { WebSocketServer } = require("ws")
const http = require("http")
const uuidv4 = require("uuidv4")
const url = require("url")

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections = {}
const users = {}

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString())
  const user = users[uuid]
  user.state = message
  broadcast()

  console.log(
    `${user.username} updated their updated state: ${JSON.stringify(
      user.state,
    )}`,
  )
}

const handleClose = (uuid) => {
  console.log(`${users[uuid].username} disconnected`)
  delete connections[uuid]
  delete users[uuid]
  broadcast()
}

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid]
    const message = JSON.stringify(users)
    connection.send(message)
  })
}

wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query
  console.log(`${username} connected`)
  const uuid = uuidv4()
  connections[uuid] = connection
  users[uuid] = {
    username,
    state: {},
  }
  connection.on("message", (message) => handleMessage(message, uuid))
  connection.on("close", () => handleClose(uuid))
})

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`)
})
```

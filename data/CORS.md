---
title: 'CORS 指南'
date: 2024-08-05
tags: ['http']
type: 'DefaultPost'
---

## CORS 指南

假设访问一个 A 网站, 如何没有跨域, A 网站可以在拿到信息后请求任意网站, 包括社交, 金融等敏感网站. 所以需要跨域限制.

### Asynchronous JavaScript and XML (AJAX)

AJAX 是 JavaScript 中的一种机制, 可以让浏览器在后台发送请求. AJAX 在客户端执行, 当用户访问网站时, 浏览器将启动 AJAX 请求.

当向网站发送请求时, 可以告诉 AJAX "使用凭据". 这种情况下, 浏览器将检查用户在网站上是否有 cookie. 如果有, 浏览器会将这些 cookie 随着请求一起发送. 因此, 如果用户在网站上经过身份验证, 网站将会识别出用户. 浏览器使用用户的身份发出 AJAX 请求.

![AJAX request](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0805-V0eO56.jpg)

### 互联网为什么安全

如何有人创建恶意网站, 是什么保护了用户的隐私和敏感内容?

1. SOP: 同源策略, 可以防止 A 网站读取 B 网站的资源, 保护网站及其上的用户数据免遭泄漏
2. CORS: 跨域资源共享, 是一组可以向 SOP 添加例外的规则. 是对 SOP 的一种放宽, 允许 A 网站加载 B 网站的资源

一个网站是域名, 协议方案和网络端口的组合. 如何两个 url 的任一部分不同, 浏览器会将其视作不同来源.

如果网站向不同来源的 url 发送请求, 则该请求被视为**跨域请求**.

### 有凭据和没有凭据

"使用凭据" 是可以在 AJAX 中启用的选项. 它告诉浏览器在 AJAX 请求中包含用的的 cookie. 因此网站知道是哪个用户的浏览器执行了请求, 响应对应于该用户的相关信息.

如果没有启用 "使用凭证", AJAX 则不会包含任何 cookie. 网站会将此请求视为匿名用户访问. 这时的响应中不存在个人信息.

### CORS 规则定义

当浏览器执行一个从 A 到 B 的 AJAX 请求, 会根据 B 的 CORS 规则来表现. B 的服务器定义了需要浏览器遵守的 CORS 规则. 特定的 HTTP 响应头定义了这些规则. 头部中的最重要的部分是 **Access-Control-Allow-Origin** 和 **Access-Control-Allow-Credentials**.

### 跨域请求处理

当一个 A 想 B 执行 AJAX 跨域请求时, 浏览器会检查 B 的 CORS 策略以了解如何处理来自 A 的请求.

浏览器必须做出两个决定:

1. 浏览器是否应该按照 JavaScript 代码执行 HTTP 请求
2. 如果浏览器执行请求, 是否应该让 JavaScript 代码访问响应

#### 是否请求?

对于某些 AJAX 配置, 浏览器在请求时不会检查 CORS 策略. 其他情况下则会检查, 浏览器会先对 url 执行 HTTP OPTIONS 请求以检索 CORS 策略, 称为预检请求.

下图解释浏览器在发送请求之前检查 CORS 策略的条件:

![CORS preflight](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0805-TIcB1A.jpg)

下面是浏览器不进行跨域检查的条件:

* AJAX 是一个 GET 请求, 并且没有自定义 HTTP headers
* AJAX 是一个 POST 请求, 并且使用标准 content-type 以及没有自定义 HTTP headers

这些请求不需要使用 AJAX 即可发起:

* 可以使用 `<img>` 或 `<iframe>` 等 HTML 标签触发不带自定义 HTTP headers 的 GET 请求
* 可以使用 `<form>` 等 HTML 标签触发具有标准 content-type 且没有自定义 HTTP headers 的 POST 请求

其他情况下, 会进行 CORS 策略检查:

* PUT, DELETE 或其他类型的 HTTP 请求
* 非标准 content-type 类型的 POST 请求
* 自定义 HTTP headers

#### 允许或拒绝访问

如果浏览器执行 AJAX 请求 , 则必须决定是否允许 JavaScript 访问响应. 浏览器将从响应中检索 CORS 策略, 并查看 AJAX 请求是否符合该策略.

如果是, JavaScript 就可以访问响应. 如果不是则无法访问, 并在控制台中显示一条错误消息

#### CORS 策略检查

总的来说, 浏览器在两种情况下检查 CORS 策略:

1. 在发送非标准 HTTP 请求之前
2. 在决定是否允许访问响应之前

浏览器会检查下面的元素:

* 检索响应头中 **Access-Control-Allow-Origin** 的值, 这个值必须等于发起 AJAX 请求的网站源. 来源的格式是 "/schema://fqdn:port"
  * 如果响应头中 **Access-Control-Allow-Origin** 不存在, 则此检查失败
  * 如果响应头中 **Access-Control-Allow-Origin** 具有通配符 "*", 检查也会失败
* 如果请求使用凭据, 则响应头中 **Access-Control-Allow-Credentials** 必须为 "true"
* 如果 AJAX 请求有一个或多个 HTTP headers, 浏览器会检索响应头中的 **Access-Control-Allow-Headers**. 这个值必须包含在请求中使用的所有自定义 HTTP headers

如果其中任何一个条件失败, 则整个 CORS 策略检查都会失败:

* 如果浏览器在发送请求之前执行 CORS 检查, 则不会发送请求
* 如果浏览器在发送请求之后执行 CORS 检查, 则 JavaScript 代码无法访问响应

![CORS check](https://cdn.jsdelivr.net/gh/Viskeyy/uPic@master/uPic/0806-vVDzQV.jpg)

### 如果 CORS 策略配置错误会有哪些危险

良好的 CORS 策略可确保恶意网站无法使用用户身份向某个网站发送 HTTP 请求.

CORS 策略是使用 HTTP response headers 定义的, 开发人员需要定义足够严格的 CORS 策略, 防止其他来源的恶意请求.

如果采用宽松的 CORS 策略, 则可能会发生不好的事情. 假设用户访问了恶意网站:

* 恶意网站执行 AJAX 请求检索网站上用户的个人信息, 然后 JavaScript 可以将这些电子邮件发送给恶意网站的所有者
* 恶意网站执行 AJAX POST 请求, 更改用户的信息

### 如何定义安全的 CORS  策略

CORS 策略由特定的 HTTP response headers 定义, 每个 header 都需要确保其值足够严格以防止任何恶意活动. 还要确保该策略不会影响合法请求:

* **Access-Control-Allow-Origin**: 允许的来源
  * 如果多个网站都可以请求, 则需要定义白名单, 对于所有请求, 检查 request headers 的 **Origin** 是否在白名单中
    * 如果是, 则返回 request headers 的 **Origin** 值作为 **Access-Control-Allow-Origin** 的值
    * 如果不是则返回 **Access-Control-Allow-Origin** 的默认值
  * 如果只允许一个网站请求, 则不要定义 **Access-Control-Allow-Origin** 的值
* **Access-Control-Allow-Credentials**: 如果使用 cookie 则设置为 "true"
  * 如果没有其他来源, 则不要定义
* **Access-Control-Allow-Headers**: 如果请求中需要自定义 HTTP headers, 则应将其添加到 response headers 中. 如果需要多个 HTTP headers, 则使用逗号分隔
  * 如果没有其他来源, 则不要定义
* **Access-Control-Allow-Methods**: 如果需要处理其他请求方法, 应将其添加到这个 response headers 中. 如果需要多个请求方法, 则使用逗号分隔
  * 如果没有其他来源, 则不要定义

当收到预检请求 (OPTIONS 类型的请求) 时, 需要确保只返回响应头, 而不执行任何额外的处理.

逐步进行这些更改, 确保每个更改都不会影响合法请求.

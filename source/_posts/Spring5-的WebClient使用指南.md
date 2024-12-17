---
title: Spring5+的WebClient使用指南
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/spring%E7%87%95%E5%AD%90-cover.webp
tags: 'Java,Spring'
categories: 技术分享
abbrlink: 35b1d86e
date: 2024-12-11 14:29:31
updated: 2024-12-11 14:29:31
---

# 为什么使用WebClient

在 **Spring Framework 5.0 及更高版本**中，**RestTemplate 已被标记废弃**，取而代之的是较新的 WebClient。

> 这意味着虽然 RestTemplate 仍然可用，但鼓励 Spring 开发人员迁移到新项目的 WebClient。

WebClient 优于 RestTemplate 的原因有几个：

- **非阻塞 I/O：** WebClient 构建在 Reactor 之上，它提供了一种**非阻塞、反应式**的方法来处理 I/O，这可以在高流量应用程序中实现更好的可扩展性和更高的性能。
- **函数式风格：** WebClient **使用函数式编程风格，可以使代码更易于阅读和理解**。它还提供了流畅的 API，可以**更轻松地配置和自定义**请求。
- **更好地支持流式传输：** WebClient 支持请求和响应正文的流式传输，这对于处理大文件或实时数据非常有用。
- **改进的错误处理：** WebClient 提供比 RestTemplate 更好的错误处理和日志记录，从而更轻松地诊断和解决问题。

> **重点：即使升级了spring web 6.0.0版本，也无法在HttpRequestFactory中设置请求超时，这是放弃使用 RestTemplate 的最大因素之一。**

总的来说，虽然 RestTemplate 可能仍然适用于某些用例，但 WebClient 提供了几个优势，使其成为现代 Spring 应用程序的更好选择。

# SpringBoot3应用程序中使用WebClient

##### 创建网络客户端：

```java
HttpClient httpClient =
        HttpClient.create()
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectionTimeout)
            .responseTimeout(Duration.ofMillis(requestTimeout))
            .doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(readTimeout)));

   WebClient client =
        WebClient.builder().clientConnector(new ReactorClientHttpConnector(httpClient)).build();
```

##### 同步发送请求（就像RestTemplate一样）

如果你想坚持使用发送 HTTP 请求并等待响应的老方法，也可以使用 WebClient 实现如下所示的相同功能：

```java
public String postSynchronously(String url, String requestBody) {
  LOG.info("Going to hit API - URL {} Body {}", url, requestBody);
  String response = "";
  try {
    response =
        client
            .method(HttpMethod.POST)
            .uri(url)
            .accept(MediaType.ALL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(String.class)
            .block();

  } catch (Exception ex) {
    LOG.error("Error while calling API ", ex);
    throw new RunTimeException("XYZ service api error: " + ex.getMessage());
  } finally {
    LOG.info("API Response {}", response);
  }

  return response;
}
```

`block()`用于同步等待响应，这可能并不适合所有情况，你可能需要考虑`subscribe()`异步使用和处理响应。

##### 异步发送请求：

有时我们不想等待响应，而是希望异步处理响应，这可以按如下方式完成：

```java
public static Mono<String> makePostRequestAsync(String url, String postData) {
    WebClient webClient = WebClient.builder().build();
    return webClient.post()
            .uri(url)
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(BodyInserters.fromFormData("data", postData))
            .retrieve()
            .bodyToMono(String.class);
}
```

要使用此函数，只需传入要向其发送 POST 请求的 URL 以及要在请求正文中以 URL 编码字符串形式发送的数据。该函数将返回来自服务器的响应，或者如果请求由于任何原因失败，则返回一条错误消息。

> 请注意，在此示例中，WebClient是使用默认配置构建的。你可能需要根据不同要求进行不同的配置。
>
> 另请注意，block()用于同步等待响应，这可能并不适合所有情况。你可能需要考虑subscribe()异步使用和处理响应。

要使用响应，您可以订阅（subscribe）Mono并异步处理响应。下面是一个例子：

```java
makePostRequestAsync("https://example.com/api", "param1=value1&m2=value2") 
.subscribe(response -> { 
    // 处理响应
    System.out.println(response); 
}, error -> { 
    / / 处理错误
    System.err.println(error.getMessage());     
   }
);
```

`subscribe()`用于异步处理响应，你可以提供两个 lambda 表达式作为 `subscribe()` 的参数。如果请求成功并收到响应作为参数，则执行第一个 lambda 表达式；如果请求失败并收到错误作为参数，则执行第二个 lambda 表达式。

##### 处理4XX和5XX错误：

```java
public static Mono<String> makePostRequestAsync(String url, String postData) {
    WebClient webClient = WebClient.builder()
            .baseUrl(url)
            .build();
    return webClient.post()
            .uri("/")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .body(BodyInserters.fromFormData("data", postData))
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(new RuntimeException("Client error")))
            .onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(new RuntimeException("Server error")))
            .bodyToMono(String.class);
}
```

在此示例中，该`onStatus()`方法被调用两次，一次针对 4xx 客户端错误，一次针对 5xx 服务器错误。`onStatus()` 每次调用都采用两个参数：

- `aPredicate`确定错误状态代码是否与条件匹配
- `aFunction`用于返回Mono，即要传播到订阅者的错误信息。

如果状态代码与条件匹配，Mono则会发出相应的状态代码，并且Mono链会因错误而终止。在此示例中，Mono 将发出一条 `RuntimeException` 错误消息，指示该错误是客户端错误还是服务器错误。

##### 根据错误状态采取行动：

要根据Mono的`subscribe()`方法中的错误采取操作，可以在`subscribe`函数中处理响应的lambda表达式之后添加另一个lambda表达。如果在处理`Monumber`的过程中出现错误，则执行第二个lambda表达式。

下面是如何使用`makePostRequestAsync`函数和处理`subscribe`方法中的错误的更新示例:

```java
makePostRequestAsync("https://example.com/api", "param1=value1&param2=value2")
.subscribe(response -> {
    // handle the response
    System.out.println(response);
}, error -> {
    // handle the error
    System.err.println("An error occurred: " + error.getMessage());
    if (error instanceof WebClientResponseException) {
        WebClientResponseException webClientResponseException = (WebClientResponseException) error;
        int statusCode = webClientResponseException.getStatusCode().value();
        String statusText = webClientResponseException.getStatusText();
        System.err.println("Error status code: " + statusCode);
        System.err.println("Error status text: " + statusText);
    }
});
```

`subscribe`方法中的第二个lambda表达式检查错误是否是`WebClientResponseException`的实例，这是`WebClient`在服务器有错误响应时抛出的特定类型的异常。如果它是`WebClientResponseException`的实例，则代码将从异常中提取状态代码和状态文本，并将它们记录到日志中。

还可以根据发生的特定错误在此lambda表达式中添加其他错误处理逻辑。例如，你可以重试请求、回退到默认值或以特定方式记录错误。

##### 处理成功响应和错误的完整代码：

```java
responseMono.subscribe(
response -> {
  // handle the response
  LOG.info("SUCCESS API Response {}", response);
},
error -> {
  // handle the error
  LOG.error("An error occurred: {}", error.getMessage());
  LOG.error("error class: {}", error.getClass());

  // Errors / Exceptions from Server
  if (error instanceof WebClientResponseException) {
    WebClientResponseException webClientResponseException =
        (WebClientResponseException) error;
    int statusCode = webClientResponseException.getStatusCode().value();
    String statusText = webClientResponseException.getStatusText();
    LOG.info("Error status code: {}", statusCode);
    LOG.info("Error status text: {}", statusText);
    if (statusCode >= 400 && statusCode < 500) {
      LOG.info("Error Response body {}", webClientResponseException.getResponseBodyAsString());
    }

    Throwable cause = webClientResponseException.getCause();
    LOG.error("webClientResponseException");
    if (null != cause) {
      LOG.info("Cause {}", cause.getClass());
      if (cause instanceof ReadTimeoutException) {
        LOG.error("ReadTimeout Exception");
      }
      if (cause instanceof TimeoutException) {
        LOG.error("Timeout Exception");
      }
    }
  }

  // Client errors i.e. Timeouts etc - 
  if (error instanceof WebClientRequestException) {
    LOG.error("webClientRequestException");
    WebClientRequestException webClientRequestException = (WebClientRequestException) error;
    Throwable cause = webClientRequestException.getCause();
    if (null != cause) {
      LOG.info("Cause {}", cause.getClass());
      if (cause instanceof ReadTimeoutException) {
        LOG.error("ReadTimeout Exception");
      }
      
      if (cause instanceof ConnectTimeoutException) {
        LOG.error("Connect Timeout Exception");
      }
    }
  }
});
```

##### 超时

我们可以在每个请求中设置超时，如下所示：

```java
return webClient
    .method(this.httpMethod)
    .uri(this.uri)
    .headers(httpHeaders -> httpHeaders.addAll(additionalHeaders))
    .bodyValue(this.requestEntity)
    .retrieve()
    .bodyToMono(responseType)
    .timeout(Duration.ofMillis(readTimeout))  // request timeout for this request
    .block();
```

但是，我们无法在每个请求中设置连接超时，这是WebClient 的属性，只能设置一次。如果需要，我们始终可以使用新的连接超时值创建一个新的 Web 客户端实例。

另外连接超时、读取超时和请求超时的区别如下：

![图片](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/640)

##### 结论

由于 RestTemplace 已弃用，开发人员应开始使用 WebClient 进行 REST 调用，非阻塞 I/O 调用肯定会提高应用程序性能。它不仅提供了许多其他令人兴奋的功能，例如改进的错误处理和对流的支持，而且如果需要，它还可以在阻塞模式下使用来模拟 RestTemplate 行为。

---
title: JAVA21新特性-虚拟线程的使用
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E7%BA%BF%E6%9D%A1%E5%B0%8F%E7%8B%97%E6%B0%B4%E4%B8%AD%E7%8E%A9-cover.png
tags: Java
categories: 技术分享
abbrlink: 6cdabc61
date: 2024-09-03 14:09:55
---

虚拟线程是 Java 21 引入的一个新特性，用于简化并发编程。它与传统的操作系统线程相比，具有显著的优势：

1. **轻量级**：虚拟线程由 JVM 管理，而非操作系统，因此它们的内存占用和创建成本远低于传统线程。理论上，你可以轻松创建数十万甚至更多的虚拟线程。
2. **高并发性**：虚拟线程能处理更高并发的场景，特别是 I/O 密集型的应用，适合开发高并发、响应式的应用程序。
3. **自动管理**：无需手动管理线程池，JVM 会根据负载自动调整虚拟线程的调度，简化了并发编程的复杂性。

# 虚拟线程的基础用法

创建虚拟线程非常简单。你可以像创建传统线程一样启动虚拟线程，但它的创建与启动更加轻量：

```java
Thread virtualThread = Thread.ofVirtual().start(() -> {
    System.out.println("虚拟线程正在运行");
});
System.out.println("主线程正在运行");
```

虚拟线程的延时启动：

```java
// 虚拟线程定义，是用unstarted来定义线程的核心事务，但不直接启动
Thread virtualThread = Thread.ofVirtual()
    .name("虚拟线程1")
    .unstarted(() -> System.out.println("虚拟线程运行中"));
// 虚拟线程正式启动
virtualThread.start();
// 等待虚拟线程完成事务
virtualThread.join();
```

# 在Springboot中使用虚拟线程

1. **确保 Java 版本为 21 或以上**。
2. 在 `pom.xml` 中启用 `--enable-preview`，以便支持虚拟线程特性。

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>21</source>
        <target>21</target>
        <compilerArgs>
            <arg>--enable-preview</arg>
        </compilerArgs>
    </configuration>
</plugin>
```

3. 在 `application.properties` 中启用性能监控工具

```properties
management.endpoints.web.exposure.include=health,info,metrics
```

4. 在 Spring Boot 中为 Tomcat 配置虚拟线程执行器

```java
@Bean
public TomcatProtocolHandlerCustomizer<?> protocolHandlerVirtualThreadExecutorCustomizer() {
    return protocolHandler -> protocolHandler.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
}
```

虚拟线程的创建与执行切换效率快，相对应的在虚拟线程中创建http请求进行对比会发现吞吐量大幅提升，响应时间显著缩短。

# Java性能提升的其他技巧

除了虚拟线程，Java 还有一些其他的性能提升技巧，尤其适用于 Spring Boot 高并发场景：

1. **使用并行流**：对于 CPU 密集型任务，可以使用并行流（`parallelStream()`）来利用多核 CPU，提高处理速度。

   ```java
   List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
   numbers.parallelStream().forEach(number -> {
       System.out.println(number * 2);
   });
   ```

2. **异步编程与CompletableFuture**：对于 I/O 密集型任务，可以使用 `CompletableFuture` 进行异步处理，减少线程阻塞，提高响应性能。

   ```java
   CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
       // 异步执行任务
       System.out.println("异步任务完成");
   });
   future.join();  // 等待任务完成
   ```

3. **优化数据库查询**：减少数据库查询的次数，使用缓存（如 Redis）来存储频繁查询的数据，减少不必要的 I/O 操作。

4. **内存管理优化**：通过使用对象池（如 `Apache Commons Pool`）来管理资源，减少频繁的对象创建和销毁，提高内存使用效率。

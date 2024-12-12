---
title: Redis与Mysql的数据同步
cover: https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E7%BA%BF%E6%9D%A1%E5%B0%8F%E7%8B%97%E5%A4%8F%E6%97%A5%E4%B9%98%E5%87%89.jpg
tags: 中间件
categories: 技术分享
abbrlink: '4e422229'
date: 2024-11-14 17:02:14
updated: 2024-11-14 17:02:14
---

Redis 和 MySQL 一致性问题是企业级应用中常见的挑战之一，特别是在高并发、高可用的场景下。由于 Redis 是内存型数据库，具备极高的读写速度，而 MySQL 作为持久化数据库，通常用于数据的可靠存储，如何保证两者数据的一致性需要具体业务场景的设计与优化。

下面我们将结合几个典型的业务场景，逐步分析如何在不同的场景下保证 Redis 和 MySQL 之间的数据一致性。

### 1. **缓存更新策略：Cache Aside Pattern（旁路缓存模式）**

#### 场景：

在大部分业务系统中，Redis 作为缓存层用于提升系统的读取性能，而 MySQL 作为持久化存储，用于保证数据的可靠性。最常见的场景是：

- 系统先查询 Redis 缓存，如果缓存中没有数据，再从 MySQL 中查询并将数据写入 Redis 缓存。
- 更新数据时，更新 MySQL 并删除 Redis 缓存，使缓存数据失效，保证下次读取时能拿到最新数据。

#### 典型业务场景：

- **商品详情页面**：当用户请求某个商品详情时，首先查询 Redis 缓存，如果缓存中没有，则查询 MySQL，将查询结果缓存到 Redis 中；如果商品信息发生变更时，更新 MySQL 并删除 Redis 中的缓存。

#### 方案分析：

- **读取路径**：从 Redis 获取缓存，如果缓存命中则直接返回数据；如果缓存未命中，则查询 MySQL，将结果写入 Redis，并返回数据。
- **写入路径**：更新时先操作 MySQL，然后删除 Redis 缓存中的数据。下次读取时，由于缓存未命中，会重新从 MySQL 中获取最新数据。

#### 如何保障一致性：

- **缓存淘汰策略**：MySQL 数据更新后立即删除 Redis 缓存，确保下次读取时能获取到最新数据。即通过 “删除缓存” 的方式避免脏数据存在于缓存中。

- **并发问题**：当并发请求较高时，可能会出现“缓存雪崩”或“缓存击穿”问题。例如：A 更新 MySQL 数据，B 在缓存失效的瞬间读取了旧数据，再次缓存到 Redis。为解决此问题，可以采用 **延迟双删策略**：

  1. 删除 Redis 缓存。
  2. 更新 MySQL。
  3. 适当延迟（如 500ms），再次删除 Redis 缓存，确保在并发情况下不存在缓存不一致问题。

- **业务实例：**

```java
public void updateProduct(Product product) {
	updateProductInMySQL(product);
	deleteProductCache(product.getId());
	try {
		Thread.sleep(500);  
	} catch (InterruptedException e) {
	}
	deleteProductCache(product.getId());
}
```

### 2. **先更新缓存再更新数据库**

#### 场景：

在某些实时性要求较高的场景中，可以考虑先更新 Redis 缓存，然后再异步更新 MySQL 数据库。

#### 典型业务场景：

- **秒杀系统**：例如商品库存的扣减，用户购买商品时，首先更新 Redis 中的库存数量，保证极低延迟的实时性体验。然后将变更异步写入 MySQL，确保持久化存储的一致性。

#### 方案分析：

- **读取路径**：读取 Redis 缓存的库存信息，能够提供快速的读取响应。
- **写入路径**：更新 Redis 中的库存数量后，使用消息队列或其他异步机制将更新同步到 MySQL。

#### 如何保障一致性：

- **数据最终一致性**：Redis 作为前端实时数据的缓存，MySQL 作为后端数据的持久化存储，采用异步更新策略时，一致性无法保证是**强一致性**，但可以通过使用**消息队列**等手段来保证**最终一致性**。异步写入 MySQL 时，如果操作失败，可以通过重试机制或补偿机制恢复一致性。
- **业务实例：**

```java
// 扣减库存
public void reduceStock(Long productId, int amount) {
	redisTemplate.decrement("stock:" + productId, amount);
	sendUpdateStockMessage(productId, amount);
}
```




```java
// 更新库存Mysql
@RabbitListener(queues = "stock_update_queue")
public void updateStockInMySQL(UpdateStockMessage msg) {
    productRepository.reduceStock(msg.getProductId(), msg.getAmount());
}
```

#### 一致性保证策略：

- **幂等性保障**：确保消息的处理是幂等的，即相同的消息即使被处理多次，也不会导致库存重复扣减。
- **消息重试机制**：如果消费消息时更新 MySQL 失败，可以设置重试机制或消息补偿机制，保证最终数据一致性。

### 3. **双写操作（缓存与数据库同时更新）**

#### 场景：

有时业务需要同时更新 Redis 和 MySQL 的数据，如用户余额更新、积分奖励系统等场景中，Redis 和 MySQL 需要同步写入。

#### 典型业务场景：

- **积分系统**：用户消费时增加或减少积分，需要同时更新 Redis 和 MySQL 中的积分记录。

#### 方案分析：

- **同步写入**：当更新用户积分时，Redis 和 MySQL 同时更新数据。由于需要保证两个存储的同步性，必须考虑事务性问题。
- **分布式事务**：如果系统架构分布式，可能需要使用分布式事务（如 `2PC`，或者更轻量的解决方案如 `TCC`）来确保一致性。

#### 如何保障一致性：

- **双写一致性问题**：如果同时写 Redis 和 MySQL，可能会面临一致性问题。常见解决方案是通过**事务补偿机制**来实现。具体步骤：

  1. 使用数据库事务保证 MySQL 写入成功。
  2. 如果 Redis 写入失败，可以尝试重试，或在事务结束后通过补偿机制将失败的数据写入 Redis。

- **业务实例：**

```java
@Transactional
public void updateUserPoints(Long userId, int points) {
	userRepository.updatePoints(userId, points);
	redisTemplate.opsForValue().set("user:points:" + userId, points);
}
```

#### 事务性保障：

- **本地事务**：在单体系统中，可以依赖数据库事务和 Redis 的操作保证一致性。如果操作失败，通过重试机制来恢复一致性。
- **分布式事务**：在微服务架构中，双写操作涉及分布式事务，可能需要使用 `TCC`（Try, Confirm, Cancel）等模式，或使用消息队列进行最终一致性补偿。

------

### 4. **数据回写（Write Back）策略**

#### 场景：

数据回写模式适用于 Redis 作为缓存层，MySQL 作为持久化存储层，但 Redis 中数据修改后并不立即同步更新 MySQL，而是在特定时机触发数据回写。

#### 典型业务场景：

- **广告计费系统**：广告点击量保存在 Redis 中，以减少频繁的数据库写入压力，定期将 Redis 中的统计数据批量写入 MySQL。

#### 方案分析：

- **延迟回写**：可以通过定时任务或者触发器将 Redis 中的数据定期回写到 MySQL，这样既减少了 MySQL 的压力，又保证了数据一致性。

#### 如何保障一致性：

- **持久化与批量同步**：通过 Redis 的持久化机制（如 RDB、AOF），在 Redis 崩溃时不会丢失数据。通过定时器或事件驱动系统触发批量同步 MySQL。

------

### 总结

Redis 和 MySQL 的一致性保障在不同的业务场景中需要结合场景特性来进行权衡，主要的策略包括：

1. **Cache Aside Pattern（旁路缓存模式）**：常用于读多写少的场景，写操作时删除缓存。
2. **异步更新（Write Behind）**：先更新缓存再异步写入 MySQL，保证最终一致性。
3. **双写策略**：同时更新 Redis 和 MySQL，配合事务机制确保一致性。
4. **延迟回写**：通过定时批量写入 MySQL 减少频繁数据库操作。

每种策略有不同的适用场景，设计时需要考虑一致性、性能和可用性之间的平衡。这算得上是全网最全最详细的，货真价实的同步方案分析了，完全结合真实业务场景来考虑设计。所谓赠人玫瑰，手留余香，希望对你有帮助作用。

---
title: Spring框架结构与学习重点
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/Spring%E6%A1%86%E6%9E%B6%E5%AD%A6%E4%B9%A0%E6%80%BB%E7%BB%93-cover.webp
tags: Java
categories: 技术分享
abbrlink: 6b8e949c
date: 2024-08-13 11:15:40
---

# 一、Spring框架学习路线图

![spring框架学习总结思维导图](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/spring%E6%A1%86%E6%9E%B6%E5%AD%A6%E4%B9%A0%E6%80%BB%E7%BB%93%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE.png)



# 二、什么是Spring ?

> Spring 是一个开源框架，Spring是于2003 年兴起的一个轻量级的Java 开发框架，由 Rod Johnson 在其著作 Expert One-On-One J2EE Development and Design 中阐述的部分理念和原型衍生而来。它是为了解决企业应用开发的复杂性而创建的。框架的主要优势之一就是其分层架构，分层架构允许使用者选择使用哪一个组件，同时为 J2EE 应用程序开发提供集成的框架。Spring 使用基本的 JavaBean 来完成以前只可能由 EJB 完成的事情。

然而，Spring的用途不仅限于服务器端的开发。从简单性、可测试性和松耦合的角度而言，任何Java应用都可以从Spring中受益。**Spring的核心是控制反转（IoC）和面向切面（AOP）**。简单来说，Spring 是一个分层的 `JavaSE/EE full-stack`(一站式) `轻量级`开源框架。

简单来说，Spring 是一个轻量级的控制反转(IoC)和面向切面(AOP)的容器框架。

![spring-overview](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/spring-overview.png)

# 三、Spring 框架组件

| GroupId             | ArtifactId               | Description                                                  |
| ------------------- | ------------------------ | ------------------------------------------------------------ |
| org.springframework | spring-aop               | Proxy-based AOP support 基于代理的 AOP 支持                  |
| org.springframework | spring-aspects           | AspectJ based aspects 基于 AspectJ 的切面                    |
| org.springframework | spring-beans             | Beans support, including Groovy Bean 支持，包括 Groovy       |
| org.springframework | spring-context           | Application context runtime, including scheduling and remoting abstractions 应用程序上下文运行时，包括调度和远程抽象 |
| org.springframework | spring-context-support   | Support classes for integrating common third-party libraries into a Spring application context 支持将常见的第三方库集成到 Spring 应用程序上下文中的类 |
| org.springframework | spring-core              | Core utilities, used by many other Spring modules 核心应用程序，由许多其他 Spring 模块使用 |
| org.springframework | spring-expression        | Spring Expression Language (SpEL)，提供 spel 表达式支持，支持设置和获取属性 值,属性赋值,方法调用,访问数组的内容,集合和索引器,逻辑和算术运算符,命名变 量,以及通过 Spring IoC 容器中的名称检索对象。 它还支持列表投影和选择以及公共列表聚合 |
| org.springframework | spring-instrument        | Instrumentation agent for JVM bootstrapping JVM 引导的工具代理 |
| org.springframework | spring-instrument-tomcat | Instrumentation agent for Tomcat Tomcat 的工具代理           |
| org.springframework | spring-jdbc              | JDBC support package, including DataSource setup and JDBC access support JDBC 支持包，包括 DataSource 设置和 JDBC 访问支持，模块提供了一个 JDBC 抽象层，消除了对繁琐的 JDBC 编码和解析数据库供应商特定的错误代码的需要 |
| org.springframework | spring-jms               | JMS support package, including helper classes to send and receive JMS messages JMS 支持包，包括用于发送和接收 JMS 消息的助手类，模块（Java 消息服务）包含用于生成和使用消息的功能。从 Spring Framework 4.1 开始，它提供了与 spring-messaging 模块的集成 |
| org.springframework | spring-messaging         | Support for messaging architectures and protocols 支持消息架构和协议 |
| org.springframework | spring-orm               | Object/Relational Mapping, including JPA and Hibernate support 对象/关系映射，包括 JPA 和 Hibernate 与 MyBatis支持，模块为流行的对象关系映射 API 提供集成层，包括 JPA 和 Hibernate。使用 spring-orm 模块，您可以使用这些 O / R 映射框架结合 Spring 提供的所有其他功能，例如前面提到的简单声明式事务管理功能 |
| org.springframework | spring-oxm               | Object/XML Mapping 对象/ XML 映射                            |
| org.springframework | spring-test              | Support for unit testing and integration testing Spring components 支持单元测试和集成测试的 Spring 组件,模块支持使用`JUnit`或`TestNG`对`Spring`组件进行单元测试和集成测试。 它提供了`SpringApplicationContexts`的一致加载和这些上下文的缓存。 它还提供了[mock objects](http://docs.spring.io/spring/docs/5.0.0.M4/spring-framework-reference/htmlsingle/#mock-objects)(模拟对象)，您可以使用它来单独测试您的代码 |
| org.springframework | spring-tx                | Transaction infrastructure, including DAO support and JCA integration 事务基础设施，包括 DAO 支持和集成制定，模块支持实现特殊接口的类以及所有 POJO（普通 Java 对象）的编程和声明事务管理 |
| org.springframework | spring-web               | Web support packages, including client and web remoting Web 支持包，包括客户端和 Web 远程处理，模块提供基本的面向 Web 的集成功能，例如多部分文件上传功能和使用 Servlet 侦听器和面向 Web 的应用程序上下文来初始化 IoC 容器。 它还包含一个 HTTP 客户端和 Web 的相关部分的 Spring 的远程支持 |
| org.springframework | spring-webmvc            | REST Web Services and model-view-controller implementation for web applications Web 应用程序的 REST Web 服务和模型 - 视图 - 控制器实现，模块（也称为 Web-Servlet 模块）包含用于 Web 应用程序的 Spring 的模型视图控制器（MVC）和 REST Web 服务实现。 Spring 的 MVC 框架提供了 domain model（领域模型）代码和 Web 表单之间的清晰分离，并且集成了 Spring Framework 所有的其他功能 |
| org.springframework | spring-websocket         | WebSocket and SockJS implementations, including STOMP support WebSocket 和 SockJS 实现，包括 STOMP 支持 |

# 四、核心组件说明

- **Spring Core**：Spring核心模块，主要提供 ioC 依赖注入
- **Spring Context**：向Spring框架提供上下文信息
- **Spring AOP**：面向切面编程，为基于 Spring 的应用程序中的对象提供了事务管理服务
- **Spring JDBC**：Java数据库连接
- **Spring JMS**：Java消息服务
- **Spring ORM**：用于支持 MyBatis、Hibernate 等 ORM 工具
- **Spring Web**：为创建Web应用程序提供支持
- **Spring Test**：提供了对 JUnit 和 TestNG 测试的支持
- **Spring Aspects**：该模块为与AspectJ的集成提供支持
- **Spring Web**：Spring框架支持与Struts集成，为基于web的应用程序提供了上下文

# 五、Spring的优点

- **方便解耦，简化开发 （高内聚低耦合）**

Spring就是一个大工厂（容器），可以将所有对象创建和依赖关系维护，交给Spring管理，spring工厂是用于生成bean

- **AOP编程的支持**

Spring提供面向切面编程，可以方便的实现对程序进行权限拦截、运行监控等功能

- **声明式事务的支持**

只需要通过配置就可以完成对事务的管理，而无需手动编程

- **方便程序的测试**

Spring对Junit4支持，可以通过注解方便的测试Spring程序

- **方便集成各种优秀框架**

Spring不排斥各种优秀的开源框架，其内部提供了对各种优秀框架（如：Struts、Hibernate、MyBatis、Quartz等）的直接支持

- **降低JavaEE API的使用难度**

Spring 对 JavaEE 开发中非常难用的一些 API（JDBC、JavaMail、远程调用等），都提供了封装，使这些 API 应用难度大大降低

# 六、IoC（Inversion of Control）控制反转

了解Ioc之前，先了解一下`DI（Dependency Injection）`(依赖注入)

`IoC` 需要 `DI`(依赖注入)的支持为什么呢？因为没有 DI 的注入 Spring 创造出的对象都是空值是无法使用的,所以说 `IoC` 和 `DI` 多数是同时出现人们眼前的。

`IOC` 是 `Inversion of Control` 的缩写，多数书籍翻译成“控制反转”。**为了解决对象之间的耦合度过高的问题**，软件专家 Michael Mattson 提出了 IOC 理论，用来实现对象之间的**解耦**。

“获得依赖对象的过程被反转了”。控制被反转之后，获得依赖对象的过程由自身管理变为了由 IOC 容器主动注入。于是，他给“控制反转”取了一个更合适的名字叫做“依赖注入（Dependency Injection）”。他的这个答案，实际上给出了实现 IOC 的方法：注入。所谓依赖注入，就是由IOC容器在运行期间，动态地将某种依赖关系注入到对象之中。

`DI`可以被认为是一种Ioc容器构想的实现方法，依赖注入(DI)和控制反转(IOC)是从不同的角度的描述的同一件事情，就是指**通过引入 IOC 容器，利用依赖关系注入的方式，实现对象之间的解耦。**

**将原本在程序中自己手动创建对象的控制权，交由 Spring 框架来管理**。Spring 框架负责控制对象的**生命周期**和**对象之间的关系**。IoC 在其他语言中也有应用，并非 Spirng 特有。**ioc 容器实际上就是个 map（key，value），里面存的是各种对象**（在xml里配置的bean节点||repository、service、controller、component）。

**Spring IOC 容器就像是一个工厂一样，当我们需要创建一个对象的时候，只需要配置好配置文件/注解即可，完全不用考虑对象是如何被创建出来的。** IOC 容器负责创建对象，将对象连接在一起，配置这些对象，并从创建中处理这些对象的整个生命周期，直到它们被完全销毁。

在实际项目中一个 Service 类如果有几百甚至上千个类作为它的底层，我们需要实例化这个 Service，你可能要每次都要搞清这个 Service 所有底层类的构造函数，这可能会把人逼疯。如果利用 IOC 的话，你只需要配置好，然后在需要的地方引用就行了，这大大增加了项目的可维护性且降低了开发难度。

**IoC容器的初始化过程可以分为三步：**

1. Resource 定位（Bean的定义文件定位）
2. 将 Resource 定位好的资源载入到 BeanDefinition（BeanDefinition 中保存了我们的 Bean 信息，比如这个 Bean 指向的是哪个类、是否是单例的、是否懒加载、这个 Bean 依赖了哪些 Bean 等等）
3. 将 BeanDefiniton 注册到容器中（BeanFactory）

![image-20240813144751993](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20240813144751993.png)

详见：[Spring Ioc源码分析](https://javadoop.com/post/spring-ioc)

# 七、AOP（Aspect-OrientedProgramming）面向切面编程

AOP（Aspect Oriented Programming 面向切面编程），在程序开发中主要用来解决一些系统层面上的问题，比如**日志收集，事务管理，权限，缓存，对象池管理**等。

AOP 可以说是 OOP（Object Oriented Programming，面向对象编程）的补充和完善。OOP 引入封装、继承、多态等概念来建立一种对象层次结构，用于模拟公共行为的一个集合。不过 OOP 允许开发者定义纵向的关系，但并不适合定义横向的关系，例如日志功能。日志代码往往横向地散布在所有对象层次中，而与它对应的对象的核心功能毫无关系对于其他类型的代码，如**安全性、异常处理和透明的持续性**也都是如此，这种散布在各处的无关的代码被称为横切（cross cutting），在 OOP 设计中，它导致了**大量代码的重复，而不利于各个模块的重用**。

AOP技术恰恰相反，它利用一种称为"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，**便于减少系统的重复代码，降低模块之间的耦合度**，并有**利于未来的可操作性和可维护性**。

它实际做的就是将业务和一些非业务进行拆解，降低彼此业务模块与非业务模块的耦合度，便于后续的扩展维护。例如`权限校验`、`日志管理`、`事务处理`等都可以使用`AOP`实现。而`Spring`就是基于动态代理实现`AOP`的。如果被代理的类有实现接口的话，就会基于`JDK Proxy`完成代理的创建。反之就是通过`Cglib`完成代理创建。

**核心术语：**

1. `目标(Target)`: 这就被代理的对象，例如我们希望对`UserService`每个方法进行`增强(在不动它的代码情况下增加一些非业务的动作)`，那么这个`UserService`就是目标。
2. `代理(Proxy)`: 就是给你被代理后的对象的厂商，例如我们上面说过希望对`UserService`每个方法进行增强，那么给用户返回增强后的对象的类就是`代理类`。
3. `连接点(JoinPoint)`:目标对象，每一个可能可以被增强的方法都可以称为连接点，尽管它最后可能不会被增强。
4. `切入点(Pointcut)`: 连接点中确确实实被做增强操作的方法就叫切入点。
5. `通知(Advice)`: 不要被表面的语义误导，通知并不是告知某人的意思，通知的意思是拦截对象后，做的增强操作。
6. `切面(Aspect)`: 切入点`(Pointcut)`+通知`(Advice)`
7. `织入(Weaving)`：把通知的动作融入到对象中，生成代理对象的过程就叫做织入。

## 7.1 Spring AOP

Spring AOP就是基于动态代理的，底层实现有俩种方式：一种是 **JDK 动态代理(JDK Proxy)**，另一种是 **CGLib**(Code Generation Library(基于字节码操作)) 的方式。

![在这里插入图片描述](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/img202304071136659.png)

- **静态代理**通过实现被代理类所实现的接口，内部保存被代理类的引用，在实现的方法中对处理逻辑进行**增强**，真正的方法执行调用被代理对象的方法。**静态代理**比较简洁直观，不过每个目标对象都需要创建一个代理类，在复杂的场景下需要创建大量的代理类，不易于维护，也不易于扩展，我们更加注重的应该是业务开发，对于这一层**增强**处理应该抽取出来。
- **JDK 动态代理**基于接口代理，在 JVM 运行时通过反射机制生成一个实现代理接口的类，在调用具体方法时会调用 InvokeHandler 来进行处理。
- **CGLIB 动态代理**基于类代理（字节码提升），通过 ASM（Java 字节码的操作和分析框架）将被代理类的 class 文件加载进来，通过修改其字节码生成一个子类来处理。

当然，也可以使用 AspectJ ，AspectJ 可以做Spring AOP干不了的事情，它是 AOP 编程的完全解决方案。

## 7.2 Spring AOP 和 AspectJ AOP 的区别

**Spring AOP 属于运行时增强；而 AspectJ 是编译时增强**。Spring AOP 只能在运行时织入，AspectJ 运行时织入不可用，支持编译时、编译后和加载时织入。

AspectJ 相比于 Spring AOP 功能更加强大，但是 Spring AOP 相对来说更简单。

## 7.3 AspectJ AOP通知类型

1. `Before（前置通知）`: 目标对象方法调用前触发增强。
2. `After （后置通知）`:目标对象方法调用后进行增强。
3. `AfterReturning（返回通知）`:目标对象方法执行结束，返回值时进行增强。
4. `AfterThrowing（异常通知）`:目标对象方法执行报错并抛出时做的增强。
5. `Around(环绕通知）`:这个比较常用了，目标对象方法调用前后我们可以做各种增强操作,甚至不调用对象的方法都能做到。

## 7.4 多个切面执行顺序我们如何确定

1. 注解法:使用`@Order`注解来决定切面`bean`的执行顺序。

```java
// 值越小优先级越高
@Order(1)
@Component
@Aspect
public class LoggingAspect implements Ordered {}
```

2. 继承接口法:`implements Ordered`接口

```java
@Component
@Aspect
public class LoggingAspect implements Ordered {
    // ....
    @Override
    public int getOrder() {
        // 返回值越小优先级越高
        return 1;
    }
}
```

# 八、Spring 的 bean

## 8.1 作用域（Scope）

| type        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| singleton   | 单例作用域，在Spring loC容器中仅存在一个Bean实例，Bean以单例方式存在，默认值 |
| prototype   | 原型作用域（多例作用域），每次从容器中调用Bean时，都返回一个新的实例，即<br/>每次调用getBean()时，相当于执行new XxxBean() |
| request     | 请求作用域，该作用域仅适用于WebApplicationContext环境，具体为SpringMVC下使用 |
| session     | 会话作用域，每次HTTP请求都会创建一个新的Bean，该作用域仅适用于WebApplicationContext环境，具体为SpringMVC下使用 |
| application | 全局作用域，同一个HTTP Session共享一个Bean，该作用域仅适用于WebApplicationContext环境，具体为SpringMVC下使用 |

## 8.2 SpringBean的线程安全问题

线程安全一直是代码编写的重地，我们大多时候在系统开发中不会使用多线程。单例 bean 存在线程安全问题，当多个线程操作同一个对象的时候，这个对象的非静态成员变量会存在线程安全问题。

解决方法：

- 在类中定义一个ThreadLocal成员变量，将需要的可变成员变量保存在 ThreadLocal 中（推荐的一种方式，这也是常用一种）；
- 在Bean对象中尽量避免定义可变的成员变量。

## 8.3 Spring bean 的生命周期

在传统的Java应用中，bean的生命周期很简单，使用Java关键字 new 进行Bean 的实例化，然后该Bean 就能够使用了。一旦bean不再被使用，则由Java自动进行垃圾回收。

相比之下，Spring管理Bean的生命周期就复杂多了，正确理解Bean 的生命周期非常重要。

![image-20240813170530963](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20240813170530963.png)

由此可以得出，Bean的三种自定义初始化和销毁方法

- 在配置类中指定 @Bean(initMethod = “init”,destroyMethod = “destory”)注解
- 实现InitializingBean接口并重写其afterPropertiesSet方法，实现DisposableBean接口并重写destroy方法
- 利用java的JSR250规范中的@PostConstruct标注在init方法上，@PreDestroy标注在destroy方法上

## 8.4 Spring MVC

Spring MVC 是一款很优秀的 MVC 框架。可以让我们的开发更简洁，而且它和 Spring 是无缝集成，是 Spring 的一个子模块，是我们上面提到 Spring 大家族中 Web 模块。

Spring MVC 框架主要由 **DispatcherServlet 、处理器映射、处理器(控制器)、视图解析器、视图**组成。

### ![SpringMVC-arch3](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/SpringMVC-arch3.png)

# 九、Spring管理事务

## 9.1 事务管理方式

> 事务管理对于企业应用来说是至关重要的，即使出现异常情况，它也可以保证数据的一致性。

1. **编程式事务，在代码中硬编码。(不推荐使用)**

所谓编程式事务指的是通过编码方式实现事务，允许用户在代码中精确定义事务的边界。

Spring框架提供了两种编程式事务方式：

- 使用TransactionTemplate
- 使用PlatformTransactionManager

Spring团队通常**建议使用TransactionTemplate**进行程序化事务管理。

TransactionTemplate采用与其他spring模板相同的方法，它使用一种回调方法，使应用程序代码可以处理获取和释放事务资源，让开发人员更加专注于业务逻辑。

```java
@Autowired
private TransactionTemplate transactionTemplate;
public void testTransaction() {

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus transactionStatus) {

                try {

                    // ....  业务代码
                } catch (Exception e){
                    //回滚
                    transactionStatus.setRollbackOnly();
                }

            }
        });
}
```

2. **声明式事务，在配置文件中配置（推荐使用）**

```java
@Transaction
public void insert(String userName){
    this.jdbcTemplate.update("insert into t_user (name) values (?)", userName);
}
```

**声明式事务**又分为两种：

- 基于XML的声明式事务
- 基于注解的声明式事务

## 9.2 声明式事务注意点

**@Transactional(rollbackFor = Exception.class)注解**

在 `@Transactional` 注解中如果不配置 `rollbackFor` 属性,那么事物只会在遇到 `RuntimeException` 的时候才会回滚,加上 `rollbackFor=Exception.class` ,可以让事物在遇到非运行时异常时也回滚。

`@Transactional`是通过SpringAOP代理增强的方式进行事务的管理与控制的，所以`@Transactional`只能**加在public方法**上，且**调用方不能是同一个类中的方法（JDK代理模式时）**

## 9.3 Spring管理事务原理说明

Spring事务的本质 其实就是 AOP 和 数据库事务，Spring 将数据库的事务操作提取为 切面，通过 aop 在方法执行前后增加数据库事务的操。

1、在方法开始时判断是否开启新事务，需要开启事务则设置事务手动提交 set autocommit=0;

2、在方法执行完成后手动提交事务 commit;

3、在方法抛出指定异常后调用 rollback 回滚事务。


---
title: JVM系列-1-字节码详解
tags: 'Java, JVM'
categories: 技术分享
abbrlink: c95d1159
date: 2024-05-12 14:53:26
updated: 2024-05-12 14:53:26
---

## 多语言编译为统一的字节码规范在JVM中运行

Java是一种高级编程语言，之所以称之为高级是因为Java语言属于面向人类理解逻辑领域，计算机是无法直接识别并执行，需经由Java虚拟机运行编译后的Java代码。这个编译后的代码，就是本文要介绍的java字节码。

- Java代码通过编译器编译成字节码，储存字节码的文件再交由运行于不同平台上的JVM虚拟机去读取执行，从而实现一次编写，到处运行的目的。
- 另外JVM也不再只支持Java，由此衍生出了许多基于JVM的编程语言，如Groovy, Scala, Koltin等，它们最终也会编译成字节码，供给JVM进行转换执行。

![img](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/java-jvm-class-1.png)

###  字节码的定义

Java之所以可以“一次编译，到处运行”，一是因为JVM针对各种操作系统、平台都进行了定制，二是因为无论在什么平台，都可以编译生成固定格式的字节码（.class文件）供JVM使用，再有JVM去统一转换成计算机能理解的指令。之所以被称之为字节码，是因为字节码文件由十六进制值组成，而JVM以两个十六进制值为一组，即以字节为单位进行读取。在Java中一般是用`javac`命令编译源代码为字节码文件，一个.java文件从编译到运行的过程如下图所示。

![图1 Java运行示意图](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/110b593ecf53866e0dec8df3618b0443257977.png)

JVM规范要求每一个字节码文件都要由十部分按照固定的顺序组成，整体结构如下图所示。接下来我们将一一介绍这十部分：

![图3 JVM规定的字节码结构](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/393097261d80d730f434561157e219c657820.png)

### 引入案例

下面以一个简单的例子来逐步讲解字节码。

```java
//Main.java
public class Main {
    
    private int m;
    
    public int inc() {
        return m + 1;
    }
}
```

通过以下命令, 可以在当前所在路径下生成一个`Main.class`文件。

```bash
javac Main.java
```

以文本的形式打开生成的class文件，内容如下:

```bash
cafe babe 0000 0034 0013 0a00 0400 0f09
0003 0010 0700 1107 0012 0100 016d 0100
0149 0100 063c 696e 6974 3e01 0003 2829
5601 0004 436f 6465 0100 0f4c 696e 654e
756d 6265 7254 6162 6c65 0100 0369 6e63
0100 0328 2949 0100 0a53 6f75 7263 6546
696c 6501 0009 4d61 696e 2e6a 6176 610c
0007 0008 0c00 0500 0601 0010 636f 6d2f
7268 7974 686d 372f 4d61 696e 0100 106a
6176 612f 6c61 6e67 2f4f 626a 6563 7400
2100 0300 0400 0000 0100 0200 0500 0600
0000 0200 0100 0700 0800 0100 0900 0000
1d00 0100 0100 0000 052a b700 01b1 0000
0001 000a 0000 0006 0001 0000 0003 0001
000b 000c 0001 0009 0000 001f 0002 0001
0000 0007 2ab4 0002 0460 ac00 0000 0100
0a00 0000 0600 0100 0000 0800 0100 0d00
0000 0200 0e
```

按字节为单位进行剖析（8bit为1字节）

### 第一部分，cafebabe 魔数（Magic Number）

文件格式，文件类型在JVM中的判断方式是使用魔数来进行判断的，所有的.class文件的前四个字节都是魔数，魔数的固定值为：0xCAFEBABE。魔数放在文件开头，JVM根据文件的开头来判断这个文件是否可能是一个.class文件，如果是，才会继续进行之后的操作。

> 有趣的是，魔数的固定值是Java之父James Gosling制定的，为CafeBabe（咖啡宝贝），而Java的图标为一杯咖啡。

### 第二部分，版本号（Version）

版本号为魔数之后的4个字节，前两个字节表示次版本号（Minor Version），后两个字节表示主版本号（Major Version）。示例中版本号为“00 00 00 34”，次版本号转化为十进制为0，主版本号转化为十进制为52，在Oracle官网中查询序号52对应的主版本号为1.8，所以编译该文件的Java版本号为1.8.0。

通过java -version命令稍加验证, 可得结果。

```java
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)
```

接下来的部分，通过肉眼难以看出，所以要请出一个java内置的分析工具`javap`来进行反编译字节码帮助我们完成分析。

> 使用到java内置的一个反编译工具javap可以反编译字节码文件, 用法: `javap <options> <classes>`

其中`<options>`选项包括:

```bash
  -help  --help  -?        输出此用法消息
  -version                 版本信息
  -v  -verbose             输出附加信息
  -l                       输出行号和本地变量表
  -public                  仅显示公共类和成员
  -protected               显示受保护的/公共类和成员
  -package                 显示程序包/受保护的/公共类
                           和成员 (默认)
  -p  -private             显示所有类和成员
  -c                       对代码进行反汇编
  -s                       输出内部类型签名
  -sysinfo                 显示正在处理的类的
                           系统信息 (路径, 大小, 日期, MD5 散列)
  -constants               显示最终常量
  -classpath <path>        指定查找用户类文件的位置
  -cp <path>               指定查找用户类文件的位置
  -bootclasspath <path>    覆盖引导类文件的位置
```

输入命令`javap -verbose -p Main.class`查看输出内容:

```java
Classfile /E:/JavaCode/TestProj/out/production/TestProj/com/rhythm7/Main.class
  Last modified 2018-4-7; size 362 bytes
  MD5 checksum 4aed8540b098992663b7ba08c65312de
  Compiled from "Main.java"
public class com.rhythm7.Main
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #4.#18         // java/lang/Object."<init>":()V
   #2 = Fieldref           #3.#19         // com/rhythm7/Main.m:I
   #3 = Class              #20            // com/rhythm7/Main
   #4 = Class              #21            // java/lang/Object
   #5 = Utf8               m
   #6 = Utf8               I
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/rhythm7/Main;
  #14 = Utf8               inc
  #15 = Utf8               ()I
  #16 = Utf8               SourceFile
  #17 = Utf8               Main.java
  #18 = NameAndType        #7:#8          // "<init>":()V
  #19 = NameAndType        #5:#6          // m:I
  #20 = Utf8               com/rhythm7/Main
  #21 = Utf8               java/lang/Object
{
  private int m;
    descriptor: I
    flags: ACC_PRIVATE

  public com.rhythm7.Main();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 3: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/rhythm7/Main;

  public int inc();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: getfield      #2                  // Field m:I
         4: iconst_1
         5: iadd
         6: ireturn
      LineNumberTable:
        line 8: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       7     0  this   Lcom/rhythm7/Main;
}
SourceFile: "Main.java"
```

### 反编译的字节码文件分析

开头的7行信息包括:Class文件当前所在位置，最后修改时间，文件大小，MD5值，编译自哪个文件，类的全限定名，jdk次版本号，主版本号。

然后紧接着的是该类的`access_flag`访问标志：ACC_PUBLIC, ACC_SUPER，访问标志的含义如下:

| 标志名称       | 标志值 | 含义                                                         |
| -------------- | ------ | ------------------------------------------------------------ |
| ACC_PUBLIC     | 0x0001 | 是否为Public类型                                             |
| ACC_PRIVATE    | 0x0002 | 是否为Private类型                                            |
| ACC_PROTECTED  | 0x0004 | 是否为protected类型                                          |
| ACC_STATIC     | 0x0008 | 字段是否为static类型                                         |
| ACC_FINAL      | 0x0010 | 是否被声明为final                                            |
| ACC_VOLATILE   | 0x0040 | 字段是否为volatile                                           |
| ACC_TRANSIENT  | 0x0080 | 字段是否为transient                                          |
| ACC_SUPER      | 0x0020 | 是否允许使用invokespecial字节码指令的新语义．                |
| ACC_INTERFACE  | 0x0200 | 标志这是一个接口                                             |
| ACC_ABSTRACT   | 0x0400 | 是否为abstract类型，对于接口或者抽象类来说，次标志值为真，其他类型为假 |
| ACC_SYNTHETIC  | 0x1000 | 标志这个类并非由用户代码产生                                 |
| ACC_ANNOTATION | 0x2000 | 标志这是一个注解                                             |
| ACC_ENUM       | 0x4000 | 标志这是一个枚举                                             |

### 第三部分，常量池（Constant Pool）

常量池可以理解成Class文件中的资源仓库。主要存放的是两大类常量：字面量(Literal)和符号引用(Symbolic References)。字面量类似于java中的常量概念，如文本字符串，final常量等，而符号引用则属于编译原理方面的概念，包括以下三种:

- 类和接口的全限定名(Fully Qualified Name)
- 字段的名称和描述符号(Descriptor)
- 方法的名称和描述符

不同于C/C++, JVM是在加载Class文件的时候才进行的动态链接，也就是说这些字段和方法符号引用只有在运行期转换后才能获得真正的内存入口地址。当虚拟机运行时，需要从常量池获得对应的符号引用，再在类创建或运行时解析并翻译到具体的内存地址中。 直接通过反编译文件来查看字节码内容：

```java
#1 = Methodref          #4.#18         // java/lang/Object."<init>":()V
#4 = Class              #21            // java/lang/Object
#7 = Utf8               <init>
#8 = Utf8               ()V
#18 = NameAndType        #7:#8          // "<init>":()V
#21 = Utf8               java/lang/Object
```

**第一个常量**是一个方法定义，指向了第4和第18个常量。以此类推查看第4和第18个常量。最后可以拼接成第一个常量右侧的注释内容:

```java
java/lang/Object."<init>":()V
```

这段可以理解为该类的实例构造器的声明，由于Main类没有重写构造方法，所以调用的是父类的构造方法。此处也说明了Main类的直接父类是Object。 该方法默认返回值是V, 也就是void，无返回值。

**第二个常量**同理可得:

```java
#2 = Fieldref           #3.#19         // com/rhythm7/Main.m:I
#3 = Class              #20            // com/rhythm7/Main
#5 = Utf8               m
#6 = Utf8               I
#19 = NameAndType        #5:#6          // m:I
#20 = Utf8               com/rhythm7/Main
```

此处声明了一个字段m，类型为I, I即是int类型。关于字节码的类型对应如下：

| 标识字符 | 含义                                       |
| -------- | ------------------------------------------ |
| B        | 基本类型byte                               |
| C        | 基本类型char                               |
| D        | 基本类型double                             |
| F        | 基本类型float                              |
| I        | 基本类型int                                |
| J        | 基本类型long                               |
| S        | 基本类型short                              |
| Z        | 基本类型boolean                            |
| V        | 特殊类型void                               |
| L        | 对象类型，以分号结尾，如Ljava/lang/Object; |
| [        | 数组类型，前置表示，每增加一个则多一维     |

> 补充说明：对于**数组类型**，**每一维使用一个**前置的`[`字符来描述，如定义一个`java.lang.String[][]`类型的二维数组，将被记录为`[[Ljava/lang/String;`

### 第四部分，访问标志（access_flag）
常量池结束之后的两个字节，描述该Class是类还是接口，以及是否被Public、Abstract、Final等修饰符修饰。需要注意的是，JVM并没有穷举所有的访问标志，而是使用按位或操作来进行描述的，比如某个类的修饰符为Public Final，则对应的访问修饰符的值为ACC_PUBLIC | ACC_FINAL，即0x0001 | 0x0010=0x0011，如果使用javap分析则直观化展示了
### 第五部分，当前类名(this_class)
访问标志后的两个字节，描述的是当前类的全限定名。这两个字节保存的值为常量池中的索引值，根据索引值就能在常量池中找到这个类的全限定名，如果使用javap分析则直观化展示了
### 第六部分，父类名称(super_class)
当前类名后的两个字节，描述父类的全限定名，同上，保存的也是常量池中的索引值，如果使用javap分析则直观化展示了
### 第七部分，接口信息(interfaces)
父类名称后为两字节的接口计数器，描述了该类或父类实现的接口数量。紧接着的n个字节是所有接口名称的字符串常量的索引值，如果使用javap分析则直观化展示了
### 第八部分，字段表(fields)
字段表用于描述类和接口中声明的变量，包含类级别的变量以及实例变量，但是不包含方法内部声明的局部变量。字段表也分为两部分，第一部分为两个字节，描述字段个数；第二部分是每个字段的详细信息fields_info。字段表结构如下图所示：

![图10 字段表结构](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/0f795d2b2b28ce96b5963efb2e564e5a197874.png)

以图中字节码的字段表为例，如下图所示，其中字段的访问标志0002对应为private，接下来字段描述符索引，通过索引下标常量池分别得到字段名为“a”，描述符为“I”（代表int），综上，就可以唯一确定出一个类中声明的变量private int a，如用javap进行分析则会直观的显示在{}内

![图11 字段表示例](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/bd2b14ec23771a8f6a20699d1295dec6129370.png)

### 第九部分，方法表
字段表结束后为方法表，方法表也是由两部分组成，第一部分为两个字节描述方法的个数；第二部分为每个方法的详细信息。方法的详细信息较为复杂，包括方法的访问标志、方法名、方法的描述符以及方法的属性，如下图所示：

![图12 方法表结构](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/d84d5397da84005d9e21d5289afa29e755614.png)

方法的权限修饰符依然可以通过查表得到，方法名和方法的描述符都是常量池中的索引值，可以通过索引值在常量池中找到。而“方法的属性”这一部分较为复杂，直接借助javap -verbose将其反编译为人可以读懂的信息进行解读，可以看到属性中包括以下三个部分：

### 第九部分，方法表集合(methods)

在常量池之后的是对类内部的方法描述，在字节码中以表的集合形式表现，暂且不管字节码文件的16进制文件内容如何，我们直接看反编译后的内容。

```java
private int m;
  descriptor: I
  flags: ACC_PRIVATE
```

此处声明了一个私有变量m，类型为int，返回值为int

```java
public com.rhythm7.Main();
   descriptor: ()V
   flags: ACC_PUBLIC
   Code:
     stack=1, locals=1, args_size=1
        0: aload_0 // 这条指令, 前面的0表示字节码的位置索引; 在执行跳转指令的时候, 其操作数引用的就是这种索引值(也可以叫指令偏移量), 在这里 aload_0 指令的作用, 就是将局部变量表中0号槽位的变量值(this)加载到操作数栈(压入), 供后续的其他指令使用。
        1: invokespecial #1                  // Method java/lang/Object."<init>":()V,是位置索引偏移量=1的指令, 这个指令的助记符是 invokespecial, 在字节码文件中需要附带2个字节的操作数, 也就是后面跟着的 #1 占了2个字节, 表示引用常量池中的1号item。 这条指令包括了操作码和操作数, 表示的意思是: 使用前一条指令压入操作数栈的对象, 调用特殊方法, 也就是Object类的初始化块 <init> 方法。
        4: return // 表示方法结束并返回; 为什么指令前面的索引值是4呢? 参考前一条指令的说明, 索引位置2和索引位置3, 被 invokespecial 指令的操作数占用了
     LineNumberTable:
       line 3: 0
     LocalVariableTable:
       Start  Length  Slot  Name   Signature
           0       5     0  this   Lcom/rhythm7/Main;
```

Code区的编号0～4，就是.java中的方法源代码编译后让JVM真正执行的操作码。为了帮助人们理解，反编译后看到的是十六进制操作码所对应的助记符，十六进制值操作码与助记符的对应关系，以及每一个操作码的用处可以查看Oracle官方文档或https://github.com/cncounter/translation/blob/master/tiemao_2020/42_method_byte_code/README.md进行了解，这里是构造方法：Main()，返回值为void, 权限为public方法。

Code内的主要属性为:

- **stack**: 最大操作数栈，JVM运行时会根据这个值来分配栈帧(Frame)中的操作栈深度,此处为1
- **locals**: 局部变量所需的存储空间，单位为Slot, Slot是虚拟机为局部变量分配内存时所使用的最小单位，为4个字节大小。方法参数(包括实例方法中的隐藏参数this)，显示异常处理器的参数(try catch中的catch块所定义的异常)，方法体中定义的局部变量都需要使用局部变量表来存放。值得一提的是，locals的大小并不一定等于所有局部变量所占的Slot之和，因为局部变量中的Slot是可以重用的。
- **args_size**: 方法参数的个数，这里是1，因为每个实例方法都会有一个隐藏参数this
- **attribute_info**: 方法体内容，0,1,4为字节码"行号"，该段代码的意思是将第一个引用类型本地变量推送至栈顶，然后执行该类型的实例方法，也就是常量池存放的第一个变量，也就是注释里的`java/lang/Object."":()V`, 然后执行返回语句，结束方法。
- **LineNumberTable**: 该属性的作用是描述源码行号与字节码行号(字节码偏移量)之间的对应关系。简单说即是定义源代码走一行，需要走多少个JVM指令操作码，可以使用 -g:none 或-g:lines选项来取消或要求生成这项信息，如果选择不生成LineNumberTable，当程序运行异常时将无法获取到发生异常的源码行号，也无法按照源码的行数来调试程序。
- **LocalVariableTable**: 本地变量表，包含This和局部变量，之所以可以在每一个方法内部都可以调用This，是因为JVM将This作为每一个方法的第一个参数隐式进行传入，当然，这是针对非Static方法而言，该属性的作用是描述帧栈中局部变量与源码中定义的变量之间的关系。可以使用 -g:none 或 -g:vars来取消或生成这项信息，如果没有生成这项信息，那么当别人引用这个方法时，将无法获取到参数名称，取而代之的是arg0, arg1这样的占位符。 start 表示该局部变量在哪一行开始可见，length表示可见行数，Slot代表所在帧栈位置，Name是变量名称，然后是类型签名。

同理可以分析Main类中的另一个方法"inc()":

```java
public int inc();                             // 方法名
    descriptor: ()I                            // 方法的描述符
    flags: ACC_PUBLIC// 方法的访问标志
    Code:       // Code开始
      stack=2, locals=1, args_size=1 // 最大栈深度、局部变量数、参数列表size
         0: aload_0// 0~6为java中的代码对应的操作码
         1: getfield      #2                  // 引用常量池#2的值，Field m:I
         4: iconst_1
         5: iadd
         6: ireturn
      LineNumberTable:   // 行号码，将上面的操作码与.java文件中的行号进行对应
        line 8: 0
      LocalVariableTable:  // 本地变量表，包括局部变量的定义
        Start  Length  Slot  Name   Signature
            0       7     0  this   Lcom/rhythm7/Main; // shot = 0， 为this
```

### 第十部分，附加属性表(attributes)

字节码的最后一部分，该项存放了在该文件中类或接口所定义属性的基本信息。

通过以上一个最简单的例子，可以大致了解源码被编译成字节码后是什么样子的。 下面利用所学的知识点来分析try-catch-finally

```java
public class TestCode {
    public int foo() {
        int x;
        try {
            x = 1;
            return x;
        } catch (Exception e) {
            x = 2;
            return x;
        } finally {
            x = 3;
        }
    }
}
```

使用`javap -verbose TestCode.class`命令查看foo方法的字节码如下：

```java
public int foo();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=5, args_size=1
         0: iconst_1 // int型1入栈 ->栈顶=1
         1: istore_1 // 将栈顶的int型数值存入第二个局部变量 ->局部2=1
         2: iload_1 // 将第二个int型局部变量推送至栈顶 ->栈顶=1
         3: istore_2 // !!将栈顶int型数值存入第三个局部变量 ->局部3=1
         
         4: iconst_3 // int型3入栈 ->栈顶=3
         5: istore_1 // 将栈顶的int型数值存入第二个局部变量 ->局部2=3
         6: iload_2 // !!将第三个int型局部变量推送至栈顶 ->栈顶=1
         7: ireturn // 从当前方法返回栈顶int数值 ->1
         
         8: astore_2 // ->局部3=Exception
         9: iconst_2 // ->栈顶=2
        10: istore_1 // ->局部2=2
        11: iload_1 // ->栈顶=2
        12: istore_3 // !! ->局部4=2
        
        13: iconst_3 // ->栈顶=3
        14: istore_1 // ->局部1=3
        15: iload_3 // !! ->栈顶=2
        16: ireturn // -> 2
        
        17: astore        4 // 将栈顶引用型数值存入第五个局部变量=any
        19: iconst_3 // 将int型数值3入栈 -> 栈顶3
        20: istore_1 // 将栈顶第一个int数值存入第二个局部变量 -> 局部2=3
        21: aload         4 // 将局部第五个局部变量(引用型)推送至栈顶
        23: athrow // 将栈顶的异常抛出
      Exception table:
         from    to  target type
             0     4     8   Class java/lang/Exception // 0到4行对应的异常，对应#8中储存的异常
             0     4    17   any // Exeption之外的其他异常
             8    13    17   any
            17    19    17   any
```

在字节码的4,5，以及13,14中执行的是同一个操作，就是将int型的3入操作数栈顶，并存入第二个局部变量。这正是我们源码在finally语句块中内容。也就是说，JVM在处理异常时，会在每个可能的分支都将finally语句重复执行一遍。

通过一步步分析字节码，可以得出最后的运行结果是：

- 不发生异常时: return 1
- 发生异常时: return 2
- 发生非Exception及其子类的异常，抛出异常，不返回值

> 以上例子来自于《深入理解Java虚拟机 JVM高级特性与最佳实践》, 关于虚拟机字节码指令表，也可以在《深入理解Java虚拟机 JVM高级特性与最佳实践-附录B》中获取。

### kotlin 函数扩展的实现

kotlin提供了扩展函数的语言特性，借助这个特性，我们可以给任意对象添加自定义方法。

以下示例为Object添加"sayHello"方法

```java
//SayHello.kt
package com.rhythm7

fun Any.sayHello() {
    println("Hello")
}
```

编译后，使用javap查看生成SayHelloKt.class文件的字节码。

```java
Classfile /E:/JavaCode/TestProj/out/production/TestProj/com/rhythm7/SayHelloKt.class
Last modified 2018-4-8; size 958 bytes
 MD5 checksum 780a04b75a91be7605cac4655b499f19
 Compiled from "SayHello.kt"
public final class com.rhythm7.SayHelloKt
 minor version: 0
 major version: 52
 flags: ACC_PUBLIC, ACC_FINAL, ACC_SUPER
Constant pool:
    // 此处省略常量池部分字节码
{
 public static final void sayHello(java.lang.Object);
   descriptor: (Ljava/lang/Object;)V
   flags: ACC_PUBLIC, ACC_STATIC, ACC_FINAL
   Code:
     stack=2, locals=2, args_size=1
        0: aload_0
        1: ldc           #9                  // String $receiver
        3: invokestatic  #15                 // Method kotlin/jvm/internal/Intrinsics.checkParameterIsNotNull:(Ljava/lang/Object;Ljava/lang/String;)V
        6: ldc           #17                 // String Hello
        8: astore_1
        9: getstatic     #23                 // Field java/lang/System.out:Ljava/io/PrintStream;
       12: aload_1
       13: invokevirtual #28                 // Method java/io/PrintStream.println:(Ljava/lang/Object;)V
       16: return
     LocalVariableTable:
       Start  Length  Slot  Name   Signature
           0      17     0 $receiver   Ljava/lang/Object;
     LineNumberTable:
       line 4: 6
       line 5: 16
   RuntimeInvisibleParameterAnnotations:
     0:
       0: #7()
}
SourceFile: "SayHello.kt"
```

观察头部发现,koltin为文件SayHello生成了一个类，类名"com.rhythm7.SayHelloKt".

由于我们一开始编写SayHello.kt时并不希望SayHello是一个可实例化的对象类，所以，SayHelloKt是无法被实例化的，SayHelloKt并没有任何一个构造器。

再观察唯一的一个方法：发现Any.sayHello()的具体实现是静态不可变方法的形式:

```java
public static final void sayHello(java.lang.Object);
```

所以当我们在其他地方使用Any.sayHello()时，事实上等同于调用java的SayHelloKt.sayHello(Object)方法。

顺便一提的是，当扩展的方法为Any时，意味着Any是non-null的，这时，编译器会在方法体的开头检查参数的非空，即调用 `kotlin.jvm.internal.Intrinsics.checkParameterIsNotNull(Object value, String paramName)` 方法来检查传入的Any类型对象是否为空。如果我们扩展的函数为`Any?.sayHello()`，那么在编译后的文件中则不会有这段字节码的出现。

## 参考文章

- https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html
- https://www.cnblogs.com/paddix/p/5282004.html
- https://blog.csdn.net/sinat_37191123/article/details/84582438
- https://blog.csdn.net/tyyj90/article/details/78472986
- https://blog.csdn.net/a15089415104/article/details/83215598
- https://juejin.im/post/5aca2c366fb9a028c97a5609
- https://tech.meituan.com/2019/09/05/java-bytecode-enhancement.html
- https://github.com/cncounter/translation/blob/master/tiemao_2020/42_method_byte_code/README.md


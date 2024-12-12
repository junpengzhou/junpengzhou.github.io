---
title: Office2021安装
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/office-cover.webp
abbrlink: 82d0f8f4
tags: 软件安装
categories: 技术分享
date: 2024-08-12 11:23:32
updated: 2024-08-12 11:23:32
---

由于微软在Office 2016之后的版本均不提供ISO镜像下载（指正版商业镜像），VL版本的Office需要管理员手动使用ODT工具进行部署。

# 一、下载ODT工具

ODT工具下载： [官方下载地址](https://www.microsoft.com/en-us/download/details.aspx?id=49117)

点击`[Download]`按钮下载微软官网提供的ODT工具，下载下来的是一个自解压程序的压缩包，双击选择解压位置，你就会得到一个红色图标的`setup.exe`和一些示例的xml文件。我们只要其中的`setup.exe`即可。

# 二、定制自己的Office套件

[点击此处开始配置](https://config.office.com/deploymentsettings)
打开上面的微软Office提供的Office配置定制网站，可以自由地定制想要的Office。此处仅介绍几个重点：

- 版本选择：请选择带`批量许可证`字样的版本，同时请不要选择带`SPLA`字样的版本。（注意：如果你要安装Visio之类的组件，LTSC版本会和个人版OFFICE冲突，如果你电脑上有个人版OFFICE导致安装冲突请不要选择带LTSC字样版本。）
- 你可以自由选择安装的组件和语言，比如仅安装Word，Excel和PowerPoint。
- 授权和激活：开启自动接受EULA，点选KMS选项。
- DIY好你心仪的配置之后，可以点击`导出`按钮，如有询问默认文件格式点击`[保留当前配置]`即可。
  ***你将会下载到一个xml格式的配置文件，为了后续操作方便，你可以重命名为`office.xml`。***

# 三、开始安装Office

把步骤1得到的setup.exe和步骤2得到的office.xml放在同一个目录，在当前目录的地址栏输入cmd回车，打开命令提示符窗口，输入以下命令即可执行安装：

```shell
setup.exe /configure office.xml
```

将下面脚本保存为step1.bat，并与setup.exe与刚刚所生成的xml文件放置同目录下，然后双击运行即可安装。
```shell
echo @off
setup.exe /configure officeandvisio.xml
```

# 四、激活Office2021

将以下脚本保存为step2.bat，安装完office后双击运行以激活office！

```shell
@echo off
chcp 65001
"%windir%\System32\cscript" "%ProgramFiles%\Microsoft Office\Office16\ospp.vbs" /sethst:kms.03k.org
"%windir%\System32\cscript" "%ProgramFiles%\Microsoft Office\Office16\ospp.vbs" /act
echo '是否出现<Product activation successful>关键词，出现则表示激活成功！'
pause
```

脚本中其中`/sethst:`后紧跟着的域名为kms服务器域名，其中KMS站点测试情况：[kms站点列表](https://www.coolhub.top/tech-articles/kms_list.html)

# 五、再次检查激活状态

随意打开一个word或者ppt文件，找到`文件`->`账户`->`产品信息`查看是否激活！

![image-20240812114533020](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20240812114533020.png)

# 六、常见问题排查

## 6.1 执行`cscript ospp.vbs /sethst:xxx.xxx.xxx`报错：`0x80070005`解决思路

1. Windows11请勿使用cmd启动，可搜索栏搜索`终端`右键管理员启动（或使用powershell）
2. 提高操作权限，使用右键管理员身份运行脚本


## 6.2 提示0xC004F074软件授权服务报告无法激活计算机，无法联系任何密钥管理服务（KMS）no kms could be contacted

1. KMS服务器宕机或者你的网络断了导致无法连接，使用`vlmcs kms.example.com`来测试KMS服务器是否有正常返回(successful)。[vlmcs工具下载](https://github.com/kkkgo/vlmcsd/releases)

2. 第三方KMS激活工具，把系统的软件服务激活劫持了，无论你设置什么KMS地址都会劫持到本地去，这种情况可能没什么比较通用的解决方法，可以用下面的方法尝试检查下注册表的劫持项，不行就重开吧：
   打开注册表**HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options**
   定位到(如果有)**SppExtComObj.exe，sppsvc.exe，osppsvc.exe**，删除这些项。






本文参考自：https://blog.03k.org/post/dowload-vloffice.html

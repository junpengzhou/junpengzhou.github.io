---
title: CloudFlare+NameSilo进行域名解析
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E5%A4%8F%E6%97%A5%E8%8D%B7%E5%8F%B6%E4%B8%8B%E6%BD%9C%E6%B0%B4-cover.webp
tags: 建站经验
categories: 技术分享
abbrlink: 2c13306e
date: 2023-08-12 10:00:20
---
# 一、 前提条件
* CloudFlare账号注册
* NameSilo账号注册
# 二、 操作步骤

1. 在NameSilo中申请一个域名，对比起来NameSilo上的域名购买更加优惠

   ![image-20230812100350459](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812100350459.png)

2. 从CloudFlare上复制下NameServer1和NameServer2（Add a WebSite，然后输入对应域名即可出现以下页面）
   ![image-20230812100744729](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812100744729.png)

3. 在NameSilo页面中选择对应域名，点击manager进入管理页面，选中域名，并点击Change Nameservers功能按钮

   ![image-20230812100231247](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812100231247.png)

4. 在弹出页面中清除原有的所有NameServer记录（如果有其他用途记得先记录下来进行备忘），并添加从CloudFlare中复制的NameServer并Submit
   
   ![image-20230812100634085](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812100634085.png)
   
5. 等待收到CloudFlare接管域名控制权的消息，或者过几个小时上去查看一下，如果显示Great new！即可继续下一步
   
   ![image-20230812105952000](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812105952000.png) 
   
6. 之后在CloudFlare中的DNS Records管理页中，配置站点的CNAME指向，配置方式按Vercel中自定义域名时Vercel所给出的提示进行配置即可
   
   ![image-20230812123956463](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812123956463.png)
   
7. 配置完毕后返回查看Vercel发现流程节点继续流转下去了，待生成SSL证书完毕后，即可开始验证是否能正常访问
   
   ![image-20230812124255443](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812124255443.png)
   
8. 开始验证是否正常访问，可能会出现问题，重定向次数过多
   
   ![image-20230812124419079](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812124419079.png)
   
9. 如果出现上述问题进入 Cloudflare Dashboard，点击有问题的域名，打开左侧的 SSL/TLS 设置，在 Overview 中设置加密模式为完全或完全（严格）即可。

   ![image-20230812124905866](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812124905866.png)

10. 使用域名再次测试访问恢复正常了！

![image-20230812124952485](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230812124952485.png)
至此，全部完成！！:laughing:
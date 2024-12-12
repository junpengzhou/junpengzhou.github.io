---
title: 使用Vercel部署Twikoo评论系统
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E7%94%B5%E5%8A%A8%E8%BD%A6%E9%AA%91%E8%A1%8C%E8%83%8C%E6%99%AF-cover.png
tags: 建站经验
categories: 技术分享
abbrlink: d56aa5a7
date: 2023-08-11 12:20:35
updated: 2023-08-11 12:20:35
---
``注意 Vercel 部署的环境需配合 1.4.0 以上版本的 twikoo.js 使用 默认域名 *.vercel.app 在中国大陆访问速度较慢甚至无法访问，绑定自己的域名可以提高访问速度``

1. 申请MongoDB账号（[MongoDB：应用程序数据平台 | MongoDB](https://www.mongodb.com/zh-cn)）

   ![image-20230811124738057](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811124738057.png)
2. 创建免费 MongoDB 数据库，区域推荐选择 `AWS / N. Virginia (us-east-1)`

   ![image-20230811125436976](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811125436976.png)

   * 点击Create创建deployment

   ![image-20230811142520047](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811142520047.png)

   * 选择数据库（如需免费请选择M0），服务提供商选择亚马逊云，地区选择N. Virginia(us-east-1)

   ![image-20230811142728438](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811142728438.png)

   * 设置用户名和密码

   ![image-20230811143059729](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811143059729.png)

   * 选择云环境，并设置ip白名单，如果要全公网可访问设置ip白名单为0.0.0.0/0

   ![image-20230811143311162](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811143311162.png)

   * 出现Congratulations字样！离成功又近了！

   ![image-20230811143418916](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811143418916.png)

   * 点击Connect连接，复制连接参数

   ![image-20230811143647250](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811143647250.png)

   * 使用工具测试连接成功（DataGrip、Navicat、或者MangoDB for vscode等工具都可以）

   ![image-20230811144134855](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811144134973.png)
3. 在 Clusters 页面点击 CONNECT，按步骤设置允许所有 IP 地址的连接（[为什么？open in new window](https://vercel.com/support/articles/how-to-allowlist-deployment-ip-address)），创建数据库用户，并记录数据库连接字符串，请将连接字符串中的 `<password>` 修改为数据库密码
4. 申请 [Vercel](https://vercel.com/signup) 账号
5. 点击以下按钮将 Twikoo 一键部署到 Vercel
   [![img](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/main/src/server/vercel-min)

   ![image-20230811125154158](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811125154158.png)
6. 进入 Settings - Environment Variables，添加环境变量 `MONGODB_URI`，值为第 3 步的数据库连接字符串

   ![image-20230811151707503](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811151707503.png)
7. 进入 Deployments , 然后在任意一项后面点击更多（三个点） , 然后点击Redeploy , 最后点击下面的Redeploy

   ![image-20230811145857600](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811145857600.png)
8. 进入 Overview，点击 Domains 下方的链接，如果环境配置正确，可以看到 “Twikoo 云函数运行正常” 的提示

   ![image-20230811150336432](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230811150336432.png)
9. Vercel Domains（包含 `https://` 前缀，例如 `https://xxx.vercel.app`）即为您的环境 id
10. 复制后配置到博客twikoo配置项中，主要配置环境id即可

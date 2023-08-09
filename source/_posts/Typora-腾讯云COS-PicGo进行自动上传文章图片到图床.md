---
title: Typora+腾讯云COS+PicGo进行自动上传文章图片到图床
tags: Markdown

cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/github%E5%BE%8B%E5%8A%A8%E6%9C%AA%E6%9D%A5%E5%9B%BE%E7%89%87.webp
abbrlink: 4defb0f4
date: 2023-08-01 16:49:24
---
# 一、工具清单

* Typora
* 腾讯COS（对象存储服务）
* PicGo

# 二、操作步骤

1. 点击最右上角的头像选择访问管理

![image-20230801165131706](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230801165131706.png)

2. 新建一个客户端秘钥，使得PicGo客户端在此授权下的权限和授权时间内，可以进行上传图片的操作

![image-20230801165343294](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230801165343294.png)

2. 配置PicGo，填入腾讯COS上相关的秘钥参数和桶基础参数

![image-20230801165920178](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230801165920178.png)

3. 进入Typora ==> 文件 ==> 偏好设置 ==> 图像中设置插入图片时候的自动上传动作和指定PicGo.exe程序位置，并在完成设置后可以验证图片上传选项

![image-20230801165606337](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230801165606337.png)
4. 配置完成后上传后测试（桶内会多出文件来）

![image-20230801165031976](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230801165031976.png)

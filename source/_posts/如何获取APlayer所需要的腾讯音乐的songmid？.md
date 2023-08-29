---
title: 如何获取APlayer所需要的腾讯音乐的songmid？
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/qq%E9%9F%B3%E4%B9%90%E6%8A%80%E5%B7%A7%E5%88%86%E4%BA%AB-cover.jpg
tags: 建站经验
categories: 技术分享
abbrlink: abefaec9
date: 2023-08-28 17:40:25
---
# 一、Aplayer介绍

> APlayer is a lovely HTML5 music player.
> **APlayer supports:**
>
> - Media formats - MP4 H.264 (AAC or MP3) - WAVE PCM - Ogg Theora Vorbis
> - Features - Playlist - Lyrics

**[English Docs](https://aplayer.js.org/)**

**[中文文档](https://aplayer.js.org/#/zh-Hans/)**

# 二、抓取QQ音乐的songmid
`songmid`为腾讯音乐分享的音乐单曲标识ID，使用改id可抓取免费音乐的相关歌曲、歌词、封面，这部分内容仅介绍如何获取此id。

## 操作步骤

1. 找到要进行分享的音乐，复制链接，浏览器打开

![image-20230828175158428](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230828175158428.png)

2. 浏览器打开页面中点击播放，进入QQ音乐的官方H5音乐播放器中

![image-20230828175236399](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230828175236399.png)

3. 在网页播放器中，F12打开开发者选项，点击`网络(Network)`，按`ctrl+f`进行搜索`songmid`在结果中找到带有`musics`的请求项，点击进入查看`Response`并复制其内容

![image-20230828175655607](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230828175655607.png)

4. 将响应报文（Response）进行json格式化，找到songmid节点，复制出节点值，该值即为songmid

![image-20230828175832389](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230828175832389.png)

5. 将`songmid`填写入在Aplayer的单曲id设置选项内，即可网页中嵌入单曲播放器

over~:sunrise_over_mountains:水一期博文成就达成~:dog:


---
title: Markdown插入bilibili视频
cover: https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E5%88%86%E4%BA%AB-cover.jpg
tags: Markdown
categories: 技术分享
abbrlink: eeaa9f96
date: 2023-08-23 15:24:47
updated: 2023-08-23 15:24:47
---
# 一、操作步骤
1. 在`素质三连键`:dog:边上找到分享按钮，然后选择`嵌入代码`
![image-20230823152733855](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230823152733855.png)

2. 复制出来的嵌入代码其中src的内容为视频链接，其他参数为iframe参数

```html
<iframe src="//player.bilibili.com/player.html?aid=500715827&bvid=BV1CK411u75G&cid=269252712&page=2&high_quality=1&danmaku=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"> </iframe>
```

3. 修改链接
  * 视频链接参数
| 选项         | 说明                          |
| :----------- | :---------------------------- |
| high_quality | 1 最高画质 0 最低画质         |
| danmaku      | 1 打开弹幕 0 关闭弹幕         |
| autoplay     | 1 打开自动播放 0 关闭自动播放 |

  * iframe参数
| 选项            | 说明                                                         |
| :-------------- | :----------------------------------------------------------- |
| allowfullscreen | true 允许全屏 false 不允许                                   |
| sandbox         | allow-top-navigation allow-same-origin allow-forms allow-scripts 禁止弹出网页 |
| width           | 宽度像素                                                     |
| height          | 高度像素                                                     |
  * 修改后代码

```html
<iframe src="//player.bilibili.com/player.html?aid=500715827&bvid=BV1CK411u75G&cid=269252712&page=2&high_quality=1&danmaku=0&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts" width="100%" height="600"></iframe>
```

4. 将修改后的`嵌入代码`插入到Markdown文档中

![image-20230823155801529](https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/image-20230823155801529.png)
# 二、效果示例

<div class="aspect-ratio" style="text-align: center;">
  <iframe src="//player.bilibili.com/player.html?aid=500715827&bvid=BV1CK411u75G&cid=269252712&page=2&high_quality=1&danmaku=0&autoplay=0" scrolling="no" frameborder="no" framespacing="0" allowfullscreen="true" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts">
  </iframe>
</div>

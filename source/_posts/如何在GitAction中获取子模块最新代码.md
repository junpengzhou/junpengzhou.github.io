---
title: 如何在GitAction中获取子模块最新代码
cover: https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%E9%85%8D%E5%9B%BE-cover.webp
tags: 源代码管理
categories: 技术分享
abbrlink: 67e7adac
date: 2023-08-01 11:38:01
---
## Alternatives

* You can use the `submodules` input to the checkout action:
  ```yaml
  steps:
  - name: Checkout repository and submodules
    uses: actions/checkout@v3
    with:
      submodules: recursive
  ```
* another way, you can just run the command directly:
  ```yaml
  steps:
  - name: Checkout repository
    uses: actions/checkout@v3
  - name: Checkout submodules
    run: git submodule update --init --recursive
  ```
* or use git command with [git-action plugin](https://github.com/marketplace/actions/git-actions) instead:
  ```yaml
  steps:
  - name: Checkout repository
    uses: actions/checkout@v3
  - name: Checkout submodules
    uses: srt32/git-actions@v0.0.3
    with:
      args: git submodule update --init --recursive
  ```
  
## Git submodule 切换分支的代码
* 切换分支语法

```shell
  git config -f .gitmodules submodule.xxx.branch xxx1
```

* 示例

```shell
  git config -f .gitmodules submodule.themes/anzhiyu.branch dev
```

**将`xxx`替换成对应的子模块名称(可在`.gitmodules`文件中查看到)，`xxx1`替换成子模块需要的目标分支**


> 原文链接：https://github.com/marketplace/actions/checkout-submodules

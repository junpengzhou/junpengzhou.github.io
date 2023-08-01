---
title: 如何在GitAction中获取子模块最新代码
tags: 源代码管理
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

原文链接：https://github.com/marketplace/actions/checkout-submodules

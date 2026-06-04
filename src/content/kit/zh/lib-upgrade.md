---
title: lib-upgrade
description: "通过 dependency-upgrade 附加组件，以经验证、可回退的批次安全地升级仓库的依赖。仅在该附加组件被采纳时才安装。"
kind: command
lang: zh
order: 9
usage: /lib-upgrade
---

# lib-upgrade

安全地升级仓库的依赖。一个委派给 **dependency-upgrade** 附加组件的轻量委派器。

## 它做了什么

`lib-upgrade` 路由到 dependency-upgrade 附加组件。该附加组件会对仓库实际使用的包管理器进行推理——绝不假定 npm——按 semver 对升级进行分类，以安全的批次升级，在每个批次后运行仓库真实的验证关卡，回退失败的批次，并给出总结。

## 用法

```
/lib-upgrade
```

## 行为

1. 要求一个干净的（或已备份的）工作树。
2. 从存在的清单与锁文件中检测真实的包管理器。
3. 对升级进行分类（patch / minor / major）；major 需要批准。
4. 以小批次升级；在每个批次后验证仓库真实的关卡。
5. 回退任何未通过关卡的批次；给出总结，并交由开发者提交。

## 备注

本命令仅在 dependency-upgrade 附加组件被采纳时才安装。包管理器无关；它绝不自动提交。

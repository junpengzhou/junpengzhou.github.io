---
title: Mysql通过binlog恢复误修改的数据
cover: >-
  https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/%E5%A4%8F%E6%97%A5%E8%8D%B7%E5%8F%B6%E4%B8%8B%E6%BD%9C%E6%B0%B4-cover.webp
tags: 建站经验
categories: 技术分享
abbrlink: cbccf131
date: 2024-07-30 15:21:16
updated: 2024-07-30 15:21:16
---
binlog日志文件，且binlog日志格式为row时记录所有数据库表结构变更（例如CREATE、ALTER TABLE…等操作）以及表数据修改（INSERT、UPDATE、DELETE…等操作）的二进制日志，会在日志中详细记录数据库表结构变更详情及表数据修改的详细内容。
因为binlog日志文件是二进制文件，没法用文本编辑器等直接打开查看，这时就需要mysql的自带的mysqlbinlog工具进行解码
# 如何开启binlog日志
修改mysql的my.cnf配置文件
一般默认是在/etc/my.cnf路径下

简单开启binlog demo
在mysqld下添加第一种方式

#第一种方式:

#开启binlog日志
log_bin=ON
#binlog日志的基本文件名
log_bin_basename=/var/lib/mysql/mysql-bin
#binlog文件的索引文件，管理所有binlog文件
log_bin_index=/var/lib/mysql/mysql-bin.index
#配置serverid
server-id=1

在mysqld下添加第二种方式

#第二种方式:
#此一行等同于上面log_bin三行,这里可以写绝对路径,也可以直接写mysql-bin(后者默认就是在/var/lib/mysql目录下)
log-bin=/var/lib/mysql/mysql-bin
#配置serverid
server-id=1

修改完配置后，重启mysql。执行SHOW VARIABLES LIKE 'log_bin'; Value 值为 ON即可。
# 使用mysqlbinlog命令导出对应时间内的binlog
```shell
mysqlbinlog --no-defaults --base64-output=decode-rows -vv --database=yyds --start-datetime="2024-06-27 14:09:00" --stop-datetime="2024-06-27 14:11:00" mysql-bin.000023 > 202406271410binlog.sql
```
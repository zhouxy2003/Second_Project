# HTTP 接口管理系统

本项目是用于管理和维护网络应用程序接口的软件系统。它集中管理接口文档、规范和测试，提高开发效率，确保接口准确性和稳定性。系统提供接口管理、自动化测试和权限管理等功能。用于在本地不依托后端模拟测试接口。



### 环境及版本说明

- vue：v2.6.14
- vue-router：v3.6.5
- vuex：v3.6.2
- element-ui：v2.15.13
- node：v18.16.1
- json-server：v0.17.3

- **文件解释**
  - DATA —  用于存放测试接口数据文件和启动脚本文件的文件夹
  - src — 用于存放组件和配置文件

### 使用指南

- <u>确保已经配置好了项目所需要的环境</u>

##### 项目安装

```
npm install
```

##### 启动接口

切换至DATA路径下  `cd DATA`

启动接口   `npm run mock`

##### 启动文件

```
npm run serve
```

##### 【生产模式】项目编译最小静态文件

```
npm run build
```

##### Lints and fixes files

```
npm run lint
```

##### 自定义配置
请参阅[配置参考](https://cli.vuejs.org/config/)。



### 主要功能

##### 项目管理

- 根据项目维度管理接口集合
- 针对每个项目设置管理、读写权限

##### 接口管理

- 添加、修改、删除接口
- 接口字段：名称、接口地址、请求方式等信息
- 接口变更记录功能

##### 接口 Mock 服务

- 根据接口描述提供自动的 mock 服务

  

### 代码结构说明

##### DATA数据目录

`db.json`存储接口数据

`package.json`提供mock服务

##### src 开发目录

`assets`存放静态资源文件

`DATA`存放 ` json-server` 启动接口的数据

`Bus`关于事件总线实例

`components` 存放组件文件

`hooks`利用钩子函数获取响应式数据

`router`存放路由文件

`App.vue`项目入口文件，用于形成页面

`main.js` 项目核心文件

##### public目录（请忽略）

用于存放不需要经过构建处理的静态资源文件，直接将其复制到最终构建目录中，并可以通过URL进行访问。

##### node_modules目录（请忽略）

用于存放第三方模块，存放项目依赖文件。

##### 其他

`README.md` 项目说明文档

`.gitignore` 忽略编译生成的中间文件

`babel.config.js`babel配置文件

`package-lock.json` 模块与模块之间的依赖关系文件

`package.json` 项目描述文件

`vue.config.js`可选配置文件



### 开发团队

第六届字节跳动青训营——**字节跳太猛队**

  - 如何提交问题和反馈
  - 提交代码流程
  - 许可证信息



<!--//以下可省略-->

### 项目背景

###### 现状：互联网快速发展，接口交互频繁、复杂

在当今互联网的快速发展中，应用程序和系统之间的交互变得越来越频繁和复杂。尤其是在分布式系统的架构中，不同模块之间的通信需要通过各种接口来完成数据交换和功能调用。随着系统的规模扩大和业务的复杂化，接口管理的重要性逐渐凸显。

###### 需求：高效的接口管理平台

一款高效的接口管理平台可以为开发人员、测试人员和运维人员提供统一的接口管理和监控平台，从而更好地管理和维护系统的接口。通过该平台，开发人员可以方便地添加、修改和删除接口，提供详细的接口信息，包括接口名称、请求地址、请求方式、请求参数和返回数据等。这样可以方便开发人员对接口的编辑和维护，同时也能提供给测试人员进行接口的测试和验证。

### 目标用户

###### 开发人员

- 管理接口：添加、修改、删除接口等操作

###### 测试人员

- 测试接口的可用性和稳定性

###### 运维人员

- 监控接口的运行状态，发现并解决问题
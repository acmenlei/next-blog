## 技术栈
**博客前台**：nextjs + typescript + antd

**博客后台管理系统**：vue2 + element-ui + echarts

**博客后端**：nodejs + mysql + redis

## 介绍
1.良好的UI界面风格
2.使用Next重构，对Vue版的改善，良好的SEO支持

## 项目仓库以及浏览地址
[前台博客浏览地址(暂时下线...)](http://106.12.143.215)

[后台博客管理系统浏览地址](https://codeleilei.gitee.io/vue-admin-top/#/login)

[后台博客管理系统仓库](https://github.com/Acmenlei/vue-admin-top.git)

[博客的后端仓库](https://github.com/Acmenlei/node-admin-backend.git)

## 启动步骤
### 启动前端
先安装依赖 然后执行以下命令
```shell
yarn dev 或者 npm run dev
```
### 启动后端
1. 启动后端之前请先启动`redis`, 后端依赖`redis`。
```shell
# 启动命令
redis-server
```
2. 导入必要的`mysql`结构，以及启动`mysql`，表结构在后端仓库自取
3. 完成以上操作后即可启动后端
```shell
yarn start
```
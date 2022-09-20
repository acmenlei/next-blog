<div>
  <h2 align="center">next-ssr-blog</h2>
  <p align="center">
    <a href="https://www.nextjs.cn">
      <img src="https://img.shields.io/badge/nextjs-%3E12.0-red" alt="nextjs"/>
    </a>
    <a href="https://www.tslang.cn/" target="_blank">
      <img src="https://img.shields.io/badge/typescript-%3E4.0.0-blue" alt="typescript">
    </a>
  </p>
</div>

## 技术栈
- **前台**：nextjs + typescript + antd

- **管理台**：vue2 + element-ui + echarts

- **服务端**：nodejs + mysql + redis

## 介绍
- 良好的UI界面风格
- 使用Next重构，对Vue版的改善，良好的SEO支持
- 需要一定的基础才能上手

## 配套仓库及演示
- [博客前台演示(暂时下线...)](http://106.12.143.215)

- [博客管理台演示](https://codeleilei.gitee.io/vue-admin-top/#/login)

- [博客管理台](https://github.com/Acmenlei/vue-admin-top.git)

- [博客服务端](https://github.com/Acmenlei/node-admin-backend.git)

## 启动步骤
### 启动前端
1. 安装依赖
```shell
yarn install 或者 npm install
```
2. 启动项目
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

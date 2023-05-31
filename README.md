<div>
  <h2>next-ssr-blog</h2>
  <p>
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
基于nextjs的博客网站，自己练手玩的项目，配套[后台管理系统](https://github.com/acmenlei/vue-admin-top)和[服务端](https://github.com/acmenlei/node-admin-backend)，博客一些常规功能都有，感兴趣的可以自己部署试试

## 项目启动
### 前台
1. 安装依赖
```shell
yarn install 或者 npm install
```
2. 启动项目
```shell
yarn dev 或者 npm run dev
```
### 后台
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

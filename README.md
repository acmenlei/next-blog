## 关于技术栈
**博客前台**：nextjs + typescript + antd

**博客后台管理系统**：vue2 + element-ui + echarts

**博客后端**：nodejs + mysql + redis

## 关于这个blog的一些改善
1. 之前该仓库是用Vue写的，现在用`next`进行了重构（`Vue版`的也不再使用了），主要是为了有更好的`SEO`支持，代码风格也更加规范一些
2. 功能减少了相册、`DEMO`案例等等、其余的功能都是差不多的，`UI风格`延续之前`Vue版`本的。
3. 完善了管理系统的功能，新增了权限管理与数据中台，文章编辑页面新增了富文本编辑器。

## 项目仓库以及浏览地址
[前台博客浏览地址](http://106.12.143.215)

[后台博客管理系统浏览地址](http://106.12.143.215:8080)

[后台博客管理系统仓库](https://github.com/Acmenlei/vue-admin-top.git)

[博客的后端仓库](https://github.com/Acmenlei/node-admin-backend.git)

## 开发模式
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

## 打包发布
1. 先打包
```shell
yarn build
```
2. 启动
```shell
yarn start
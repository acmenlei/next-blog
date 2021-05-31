# Vue2+Node博客平台（注意事项）

1. 目前暂时停止维护，项目是2020年4月写的，有什么问题不懂的可以加群讨论。
2. 后台（Node）在群文件：（qq群）700785102
3. 项目需要一些基础的Vue2和Node技术栈支撑 不要盲目上手

#### 一、首页功能

`lg`尺寸显示的背景：（PC端）
（具体ui布局已经更新了最新的，具体请拉取代码后查看或者浏览我的个人博客地址codelei.cn
![博客首页]( http://codeleilei.gitee.io/blog/index.png )）

`md`尺寸显示的背景：（手机端）

![博客首页](http://codeleilei.gitee.io/blog/md_index.png)

#### 二、 文章列表结构

> 使用响应式布局，lg尺寸的话左边显示文章，右边有最近文章。音乐播放器，文章页做的不是很漂亮，看看效果图吧：

![文章列表]( http://codeleilei.gitee.io/blog/article.png)

#### 三、 文章详情页

> 详情页的文章支持`markdown`语法解析，使用了`highlight`进行解析，个人觉得这个插件在使用过程还是有些问题，最大的痛点就是不支持代码块的行号显示， 文章支持分享，与用户评论回复，毕竟是多人博客嘛，这都是必须的。后续会继续完善，有更好建议的朋友欢迎来讨论，虚心接受。下面上图：

![详情页](http://codeleilei.gitee.io/blog/detail.png)

#### 四、 博客留言板

> 留言板的话我封装成了一个组件，因为在文章的评论中也使用到了一样的模板，封装的文件为`replyOrpublish`下的同名文件，详细的话可以看`props`参数,主要就是传入不同的后台地址。下面上效果图：

![博客留言板](http://codeleilei.gitee.io/blog/leavemessage.png)

- 挑选了一些比较常用的模块来展示，还有那么多内容就不多介绍了，感兴趣的朋友可以下载自己详细的去琢磨，觉得好用的话请给一个`star`，谢谢啦笔芯~♥
- 欢迎你们来博客玩耍~

#### 1. 依赖安装

```
npm install
```

#### 2. 项目启动

```
npm run serve
如果出现了 can't not find module core-js shipped proposals ... 错误，这是因为版本不兼容造成的，执行以下命令更新就好
npm update --depth 5 @babel/compat-data
```


#### 3. 项目打包

```
npm run build
```

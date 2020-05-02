<template>
  <div class="myinfo">
      <!-- 个人介绍结束 -->
          <p class="title"><Icon type="ios-contacts-outline" /> My Makefirend:</p>
          <Tabs class="tabs" value="name1"> 
        <TabPane label="联系方式" name="name1">
          <i class="iconfont icon-qq" style="color:skyblue;"></i>:755425595 
          <i class="iconfont icon-weixin" style="color:green;"></i>:x972761675
          <br>
          🙆‍♂️ 有问题欢迎小伙伴来学习讨论~
          <br>
          博客文章内容主要就是我在开发中遇到的一些常见的问题，记录下来让自己有个印象，应该也可以帮到你们，欢迎你们的光临，多多支持，over~
        </TabPane>
        <TabPane label="打游戏call我" name="name3">
          ps: 博主也是很热爱游戏的哈,欢迎小伙伴骚扰 \(￣︶￣*\)) 。。
          <br>
          <i class="iconfont icon--" style="color:yellow"></i>
          王者荣耀 ：vx, qq我都有,你喜欢怎么躺？
          <br>
          小伙伴们有什么好玩的游戏可以留言安利一下啦😁~
          <br>
          over!
        </TabPane>
        </Tabs>
  </div>
</template>

<script>

  export default {
    name:'myinfo',
  }

</script>
<style lang="scss" scoped>
.myinfo {
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
  .title {
    background: #fff;
    line-height:20px;
    padding:0.5rem;
    border-bottom:1.5px solid lightseagreen;
    font-size: .8rem;
  }
  .tabs {
    padding: .5rem;
    position: relative;
    z-index: 5;
    background: #fff;
    color: #333;
    .ivu-tabs-tabpane {
      font-size: .8rem;
    }

  }
}
</style>
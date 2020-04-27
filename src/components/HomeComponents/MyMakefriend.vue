<template>
  <div class="myinfo">
      <!-- 个人介绍结束 -->
          <h4 class="title">My Makefirend:</h4>
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
<style scoped>
.title {
    color:orange;margin:1rem 0 1rem 1rem;
    }
        .tabs {
          border-radius: .4rem;
          padding: 1rem;
           position: relative;
          z-index: 5;
          color: #333;
        background: rgb(255, 255, 255,.8);
        }
</style>
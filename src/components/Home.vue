<template>
<div id="Home">
  <!-- 遮罩层 -->
    <Maske/>
    <List style="background:#464643;">
          <ListItem>
            <h3 class="title">
              <i class="iconfont icon-dianzan"></i>博文推荐
              </h3>
          </ListItem>
      </List>
    <Card/>
</div>
</template>
<script>
import Card from './HomeComponents/Card'
import Maske from './HomeComponents/Maske'
    export default {
        name:'home',
        components:{
          Maske,Card
        }
    }
</script>
<style lang="scss" scoped>
#Home {
  width: 100%;
  .title {
    margin: 0 auto;
    padding: .3rem 1rem;
    background: rgb(88, 159, 240);
    border-radius: .2rem;
    font-size:1.2rem;
    color: white!important;
  }
  .page {
    position: relative;
    right: 4rem;
  }
}
</style>
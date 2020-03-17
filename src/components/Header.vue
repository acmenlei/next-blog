<template>
  <div id="Header">
     <Row type="flex">
      <!-- logo介绍 -->
        <Col class="logo" :xl="8" :lg="8" :md="8" :sm="24" :xs="24" order="1">
        <Logo-content/>
        </Col>
        <!-- 顶部导航菜单 -->
        <Col class="link_meta" :xl="16" :lg="16" :md="16" :sm="0" :xs="0" order="2">
          <Tabbar-link/>
        </Col>
    </Row>
  </div>
</template>
<script>
import TabbarLink from './HomeComponents/TabberLink'
import LogoContent from './HomeComponents/LogoContent'
  export default {
    name:'',
    props:{},
    data () {
      return {
      };
    },
    components: {TabbarLink,LogoContent},
  }

</script>
<style lang="scss" scoped>

</style>
<template>
<div id="Home">
  <!-- 遮罩层 -->
    <Maske/>
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
}
</style>
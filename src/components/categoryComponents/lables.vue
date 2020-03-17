<template>
  <div id="labledetail">
   <div  ref="lable" class="lable">
    {{lable}}
  </div>
  </div>
</template>
<script>
  export default {
    name:'lable',
    props:{
        lable:{
            type:String,default:'',reuqired:true
        }
    },
    mounted() {
      let color1 = parseInt(Math.random()*255)
      let color2 = parseInt(Math.random()*255)
      let color3 = parseInt(Math.random()*255)
      this.$refs.lable.style.backgroundColor=`rgba(${color1},${color2},${color3},0.6)`
    },
 
  }

</script>
<style lang="scss" scoped>
#labledetail  {
    .lable{
        display: block;
        width: 6rem;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color:white;
        border-radius: 0.2rem;
        margin:1rem;
        cursor: pointer;
        font-size: 1rem;
        float: left;
    }
}
</style>
<template>
  <div id="app">
    <Index/>
  </div>
</template>
<script>
import Index from './views/index'
export default {
  name: 'app',
  mounted() {
    this.initSize()
    window.addEventListener('resize',()=> {
      this.debounce(this.initSize, 500)()
    })
  },
  components:{
    Index
  },
  methods:{
    initSize() {
       let html = document.querySelector('html')
      if(window.innerWidth >= 992) {
        html.style.fontSize='16px';
      }else if(window.innerWidth >= 768) {
        html.style.fontSize='15px';
      }else if(window.innerWidth >= 576) {
        html.style.fontSize='14px';
      }else if(window.innerWidth < 576) {
        html.style.fontSize='10px';
      }else{
        html.style.fontSize='18px';
      }
    },
    debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout( () => {
            fun.call(that, _args)
        }, delay)
  }}}
}
</script>
<style lang="scss">
*{
  margin: 0;padding: 0;
}
</style>

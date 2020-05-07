<template>
  <div id="app">
    <Index/>
  </div>
</template>
<script>
import Index from "./views/index";
export default {
  name: "app",
  data() {
    return {
      isshow:true
    };
  },
  components: {
    Index
  },
  }
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@media screen and (max-width:1200px) {
    body,html {
      font-size:15px ;
    }
}
@media screen and (max-width:992px) {
    body,html {
      font-size:14px ;
    }
}
@media screen and (max-width:768px) {
    body,html {
      font-size:13px ;
    }
}
@media screen and (max-width:576px) {
    body,html {
      font-size:12px ;
    }
}
@media screen and (max-width:400px) {
    body,html {
      font-size:11px ;
    }
}
</style>
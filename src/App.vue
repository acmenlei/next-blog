<template>
  <div id="app">
    <Index/>
           <vue-particles
            color="#fff000"
            :particleOpacity="0.6"
            :particlesNumber="100"
            shapeType="star"
            :particleSize="4"
            linesColor="#fff"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="lizi"
      />
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
#app {
      .lizi {
         position: fixed;
         top:0;
         width: 100vw;
         height: 100vh;
     }
    background: #333;
}
</style>

<template>
  <div id="app">
    <Index />
           <vue-particles
           :class="{app_active:this.$route.name === 'home'}"
            color="#888"
            :particleOpacity="0.8"
            :particlesNumber="150"
            shapeType="circle"
            :particleSize="4"
            linesColor="#999"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.5"
            :linesDistance="150"
            :moveSpeed="1"
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
  mounted() {
    this.initSize();
    window.addEventListener("resize", () => {
      this.debounce(this.initSize, 500)();
    });
  },
  components: {
    Index
  },
  methods: {
    initSize() {
      let html = document.querySelector("html");
      if (window.innerWidth >= 992) {
        html.style.fontSize = "16px";
      } else if (window.innerWidth >= 768) {
        html.style.fontSize = "15px";
      } else if (window.innerWidth >= 576) {
        html.style.fontSize = "14px";
      } else if (window.innerWidth < 576) {
        html.style.fontSize = "10px";
      } else {
        html.style.fontSize = "18px";
      }
    },
    debounce(fun, delay) {
      return function(args) {
        let that = this;
        let _args = args;
        clearTimeout(fun.id);
        fun.id = setTimeout(() => {
          fun.call(that, _args);
        }, delay);
      };
    }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: cursive;
  box-sizing: border-box;
}
#app {
       .lizi {
         position: fixed;
         top:0;
          width: 100vw;
          height: 100vh;
     }
        background: #f2f2f2;
  .app_active {
    z-index: -999;
  }
}
</style>

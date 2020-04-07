<template>
  <div id="app">
    <div id="mydiv"></div>
    <Index />
  </div>
</template>
<script>
import Index from "./views/index";
import CanvasParticle from "./components/canvas-particle.js";
export default {
  name: "app",
  data() {
    return {
      config: {
        vx: 4,
        vy: 4,
        height: 2,
        width: 2,
        count: 210,
        color: "#f2f2f2",
        stroke: "#f2f2f2",
        dist: 6000,
        e_dist: 20000,
        max_conn: 10
      }
    };
  },
  mounted() {
    CanvasParticle(this.config);
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
  font-family: PingFangSC-Regular,'Roboto', Verdana, "Open Sans", "Helvetica Neue", "Helvetica", "Hiragino Sans GB", "Microsoft YaHei", "Source Han Sans CN", "WenQuanYi Micro Hei", Arial, sans-serif;
}
#app {
  #mydiv {
    position: sticky;
    top: 0;
  }
}
</style>

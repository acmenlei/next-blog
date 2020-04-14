<template>
<div class="Maskparent">
      <div ref="maske" id="Maske">
        <Center class="center"/>
      </div>
</div>
</template>
<script>
import Center from './Center'
  export default {
    name:'maske',
    data () {
      return {
      };
    },
    mounted() {
        /* 放射粒子star  */
      var Stars = function(args) {
    if (args === undefined) args = {};
    var _scope = this;
    this.stars = [];
    this.vel = args.vel || 1;
    this.radius = args.radius || 1;
    this.alpha = 0.5;
    this.starsCounter = args.stars || 300;
    var center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    var canvas, context;
    this.init = function() {
        canvas = document.createElement("canvas");
        document.querySelector('#Maske').appendChild(canvas);
        context = canvas.getContext("2d");
        context.lineCap = "round";
        this.start();
        this.resize();
        window.addEventListener("resize", this.resize.bind(this));
    }

    this.start = function() {
        this.stars = [];
        for (var i = 0; i < this.starsCounter; i++) {
          setTimeout(function(){
            _scope.stars.push(new Star());
          }, i*30);
        }
    }

    this.resize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
    }
    this.animate = function() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    this.render = function() {
        context.fillStyle = '#456';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "white";
        for (var i = 0; i < this.stars.length; i++) this.stars[i].update();
    }

    var Star = function() {
        this.x = center.x;
        this.y = center.y;
        this.init = function() {
            this.radius = Math.random() * _scope.radius;
            this.x = center.x;
            this.y = center.y;
            this.lineWidth = 0;
            this.vel = {
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5
            }
        }
        this.update = function() {
            this.vel.x *= 1.05;
            this.vel.y *= 1.05;
            this.lineWidth += 0.035;
            this.x0 = this.x;
            this.y0 = this.y;
            this.x += this.vel.x;
            this.y += this.vel.y;
            this.draw();
            if (this.isDead()) this.init();
        }
        this.draw = function() {
            context.beginPath();
            context.moveTo(this.x0, this.y0);
            context.lineTo(this.x, this.y);
            context.lineWidth = this.lineWidth;
            context.stroke();
        }
        this.isDead = function() {
            return (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height);
        }
        this.init();
        return this;
    }
    this.init();
    this.animate();
    return this;
}
new Stars();
/* 放射粒子end */
    },
    components: {
        Center
    }
  }
</script>
<style lang="scss" scoped>
#Maske {
    position: relative;
    top: 0;
    width: 100%;
    height: 100vh;
    transition: all 0.5s;
     canvas {
      position: absolute;
      top: 0;
    }
   .center{
       position: fixed;
       top:50%;
       left: 50%;
       z-index: 2;
       transform: translate(-50%,-50%);
   }
}
</style>
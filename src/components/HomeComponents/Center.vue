<template>
  <div id="center">
    <div class="stage">
        <div class="wrapper">
            <div class="slash"></div>
            <div class="sides">
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
            </div>
            <div class="text">
                <div class="text--backing">HELLOW</div>
                <div class="text--left">
                    <div class="inner">CODELEI</div>
                </div>
                <div class="text--right">
                    <div class="inner">CODELEI</div>
                </div>
            </div>
        </div>
    </div>
    <div class="loading">
        <span class="status online"></span>
        <span class="status invisible"></span>
        <span class="status idle"></span>
        <span class="status offline"></span>
    </div>
    <div class="navgation">
        <i v-for="(item, index) in navgation" @click="triggerPage(item.path)" :key="index" :class="item.icon">
            {{item.name}}
        </i>
    </div>
    <div class="talk-method">
        <i class="iconfont icon-weixin"> : x972761675</i>
        <i class="iconfont icon-qq"> : 755425595 || 972761675</i>
    </div>
</div>
</template>
<script>
  export default {
    name:'center',
    data () {
      return {
        navgation: [
            { name:' Login',icon:'iconfont icon-touxiang', path:'/login' },
            { name:' Article-List',icon:'iconfont icon-wenzhang', path:'/article' },
            { name:' Demo',icon:'iconfont icon-anli', path:'/demo' },
            { name:' LeaveMessage',icon:'iconfont icon-liuyan2', path:'/message' },
            { name:' Photos',icon:'iconfont icon-xiangce', path:'/about' },
            { name:' Github',icon:'iconfont icon-GitHub', path:'https://github.com/Acmenlei' },
        ]
      };
    },
    methods: {
        triggerPage(path) {
            if(path === 'https://github.com/Acmenlei') {
                window.location.href = path
            } else {
                this.$router.push(path)
            }
        }
    },
  }
</script>
<style lang="scss" scoped>
@import url('./lizi/trigger.css');
#center {
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   .navgation,
   .talk-method {
       margin: 2rem 0;
       white-space: nowrap;
       i {
           color: white;
           margin: 0.3rem;
           font-size: 0.9rem;
           transition: all 0.6s;
           cursor: pointer;
       }
       i:hover {
           color: rgb(66, 245, 135);
           opacity: .8;
       }
   }
   .talk-method {
       margin:0;
   }
   .loading {
       margin: 2rem 0 0 0;
    .status {
        position: relative;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin: 10px;
        }
        .status.online, .status.online:before {
        background: #72ff7d;
        }
        .status.offline, .status.offline:before {
        background: #ff4242;
        }
        .status.invisible, .status.invisible:before {
        background: #42e5ff;
        }
        .status.idle, .status.idle:before {
        background: #ffda72;
        }
        .status:before {
        content: '';
        display: block;
        position: absolute;
        left: -5px;
        top: -5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        animation: pulse 1.5s infinite ease-in;
        }
        @keyframes pulse {
        from {
            transform: scale(0.5);
            opacity: 1;
        }
        to {
            transform: scale(1.5);
            opacity: 0;
        }
        }
   }
   .container_img {
       margin-bottom: 2rem;
   }
   @font-face {
       font-family: '../../assets/font/font_title.ttf';
       src: url('../../assets/font/font_title.ttf');
   }
   h3 {
       font-family: '../../assets/font/font_title.ttf';
       margin-bottom: 4rem;
       color: #f2f2f2;
       font-size: 2rem;
   }
   @media screen and(max-width:568px) {
       .container_img {
           border-radius: 50%;
           width: 100px;
           height: 100px;
           overflow: hidden;
       }
       img {
           margin-left: -2rem;
       }
   }
}
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
}

</style>
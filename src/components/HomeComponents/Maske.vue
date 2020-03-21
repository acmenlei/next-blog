<template>
<div class="Maskparent">
      <div ref="maske" id="Maske">
        <Center class="center"/>
      </div>
    <div ref="container" class="container">
      <!-- 轮播 -->
      <swiper :options="swiperOption" ref="mySwiper">
       <swiper-slide><img src="../../assets/images/swiper1.jpeg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper2.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper3.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper4.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper5.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper6.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper7.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper8.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper9.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper10.jpg" alt=""></swiper-slide>
       <swiper-slide><img src="../../assets/images/swiper11.jpg" alt=""></swiper-slide>
      </swiper>
    </div>
</div>
</template>
<script>
import Center from './Center'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name:'maske',
    data () {
      return {
        swiperOption:{
          loop:true,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          }
        }
      };
    },
    components: {
        Center,swiper,swiperSlide
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
   .center{
       position: absolute;
       top: 50%;
       left: 50%;
       z-index: 2;
       transform: translate(-50%,-50%);
   }
}
@media screen and (max-width: 768px) { //如果屏幕宽度小于768像素，则使用大括号内的样式
    #Maske,
    .container {
            height: 46rem !important;
       }
}
@media screen and (max-width: 568px) { //如果屏幕宽度小于568像素，则使用大括号内的样式
    #Maske,
    .container {
            height: 30rem !important;
       }
}
.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: all 0.5s;
    img {
      width: 100%;
      height: 46rem;
      opacity: .8;
    }
}
</style>
<template>
<div class="Maskparent">
      <div ref="maske" id="Maske">
        <Center class="center"/>
        <!-- 输入框 -->
        <Input 
        v-model="value" 
        enter-button
        size="large"
        @on-search="searchArticle(value)"
        search placeholder="输入文章标签关键词搜索相关文章内容"
        class="search"
        />
      </div>
    <div ref="container" class="container">
      <!-- 轮播 -->
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide><img src="../../assets/images/index_img7.jpeg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img1.jpg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img2.jpg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img3.jpg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img5.jpg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img6.jpg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img8.jpg"></swiper-slide>
        <swiper-slide><img src="../../assets/images/index_img9.jpg"></swiper-slide>
      </swiper>
    </div>
</div>
</template>
<script>
import Center from './Center'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { PostMessage } from '../NetWork/request'
  export default {
    name:'maske',
    data () {
      return {
        value:"",
        swiperOption:{
          loop:true,
          autoplay: {
            delay: 10000,
          },
        }
      };
    },
    components: {
        Center,swiper,swiperSlide
    },
    methods:{
              searchArticle(value) {
          this.$Spin.show();
             if(!this.value) {
                if(this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                this.$Spin.hide();
                this.bus.$emit('searchover')
                }, 1000);
              }
            else {
            PostMessage('/note/getlableInfo',{lable:value})
            .then(res => {
                if(res.data.err == 0) {
                    res.data.message.forEach(element => {
                        element.content = element.content.toString().substring(0,300)
                    });
                    const Itemlist = res.data.message
                    this.bus.$emit('searchArticle',Itemlist)
                    this.$Spin.hide();
                } 
            })
            }
        },
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
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
   user-select: none;
   .center{
       position: absolute;
       top: 60%;
       left: 50%;
       transform: translate(-50%,-50%);
   }
   .search {
     width:62%;position:absolute;top:30%;z-index:99;
     left: 50%;transform: translate(-50%,-50%);
     max-width: 600px;
     transition: all 1s;
   }
}
@media screen and (max-width: 768px) { //如果屏幕宽度小于768像素，则使用大括号内的样式
    #Maske,
    .container {
            height: 46rem !important;
       }
}
.container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
    transition: all 0.5s;
    img {
      width: 100%;
      height: 46rem;
      opacity: .6;
    }
}
</style>
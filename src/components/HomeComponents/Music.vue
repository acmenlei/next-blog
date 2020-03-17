<template>
    <div id="music_container">
          <h4>放松心情</h4>
          <span class="introduce">谁还不是个优雅不失风度的人呢，看电脑累了吧，给你推荐一首好听的音乐，闭一下眼睛听首音乐放松放松吧。</span>
          <iframe 
        frameborder="no" border="0" marginwidth="0" 
        marginheight="0" class="musicBox"
        :src="music_link">
        </iframe>
        <i @click="getMusic(--music_index)" class="prev_Button iconfont icon-icon-arrow-left2"></i>
        <i @click="getMusic(++music_index)" class="next_Button iconfont icon-icon-arrow-right2"></i>
        </div>
</template>
<script>
import { getnotedetail } from '../NetWork/request'
  export default {
    name:'music',
    data () {
      return {
         music_link:'',
         music_index:1
      };
    },

    mounted() {
       this.$nextTick(() => {
          this.getMusic(this.music_index)
       })
    },

    methods: {
        getMusic(id) {
        getnotedetail(`/music/getmusic/${id}`)
        .then(res => {
         if(res.data.err == 0) {
            this.music_link = `//music.163.com/outchain/player?type=2&id=${res.data.data[0].music_id}&auto=0&height=66`
            this.music_index = res.data.data[0].id
         } else {
           this.$Message.error("网络出错了稍后重试吧!");
         }
        })
      },
    }
  }

</script>
<style lang="scss" scoped>
#music_container {
        position: relative;
        margin-top: 1rem;
        background: rgb(59, 59, 59);
        padding:1rem 1.5rem 0 1rem;
        .musicBox {
        height: 8rem;
        width: 100%;
        margin-bottom: 3rem;
      }
      .introduce {
        display: inline-block;
        padding: 1rem 0;
      }
      i {
        font-size: 1.5rem;
        margin:0 0.5rem;
        position: absolute;
        bottom: 1rem;
        color:oldlace;
        cursor: pointer;
        font-weight: bold;
      }
      .prev_Button {
        left: 40%;
      }
      .next_Button {
        right: 40%;
      }
      }
      i:hover {
        color: red!important;
      }
</style>
<template>
  <div id="categroy">
    <h3>~点击已存在的标签搜索对应的内容~</h3>
    <div class="lables">
          <lables 
          @click.native="getlableInfo(item)"
           v-for="(item, index) in lableList" 
           :key="index" 
           :lable="item" />
    </div>
      <div v-if="Itemlist.length">
        <h3 style="color:#999 !important;">搜索结果...</h3>
        <Card class="detail" v-for="(item, index) in Itemlist" :key="index" :bordered="false">
            <p style="color:orange !important;border:0;">{{item.title}}</p>
            <span class="lablecard" style="background:purple"># {{item.lable}}</span>
            <p style="color:lightblue !important">{{item.content}}</p>
            <p style="margin:1rem">{{item.time}}</p>
            <p> 
             <Tooltip placement="top" content="点击跳转到详情页查看">
            <Button type="primary" @click.native="Godetail(item.id,item)">阅读全文</Button>
            </Tooltip>
            </p>
      </Card>
      </div>
  </div>
</template>
<script>
import { getnotedetail,PostMessage } from './NetWork/request'
import lables from './categoryComponents/lables'
  export default {
    name:'category',
    data () {
      return {
        lableList:[],
         Itemlist:[],
      };
    },
    mounted() {
      getnotedetail('/note/getlables')
      .then(res => {
        if(res.data.err == 0) {
          var arr = []
          res.data.message.forEach(ele => {
            arr.push(ele.lable)
          })
            this.lableList = new Set(arr)
        }
      })
    },
    components:{
      lables
    },
    computed: {
       liked() {
        return function(id) {
          return localStorage.getItem(`like${id}`) == id
        }
      }
    },
    methods: {
       getlableInfo(lable) {
         this.$Spin.show();
            PostMessage('/note/getlableInfo',{lable:lable})
            .then(res => {
                if(res.data.err == 0) {
                    res.data.message.forEach(element => {
                        element.content = element.content.toString().substring(0,300)
                    });
                    this.Itemlist = res.data.message
                    this.$Spin.hide();
                } 
            })
       },
       Godetail(path,item) {
        this.$router.push(`/detail/${path}`)
        item.visited += 1
        PostMessage('/note/noteVisited',{visitedNum:item.visited,id:path})
      }
    },
  }
</script>
<style lang="scss" scoped>
#categroy {
    margin-top: 5rem;
    h3 {
      text-align: center;
      padding:2rem;
      color: orange ;
    }
    .lables {
      width: 80%;
      height: 10rem;
      margin: 0 auto;
      box-shadow: 0 0 5px rgb(44, 43, 43);
    }
    .lablecard { 
    text-align: center;
    width: 6rem;
    padding: .2rem;
    border-radius: .2rem;
    color: white!important;
    font-size: .9rem;
    display: inline-block;
  }
     .detail {
         background:transparent;
         margin-top:1rem;
         border:0;
     }
}
</style>
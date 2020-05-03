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
        <h3 style="color:#f2f2f2 !important;">搜索结果...</h3>
        <Card class="detail" v-for="(item, index) in Itemlist" :key="index" :bordered="false">
            <p style="color:orange;margin:0.5rem;border:0;">{{item.title}}</p>
            <span class="lablecard" style="background:purple"># {{item.lable}}</span>
            <p style="color:#333 !important">{{item.content}}</p>
            <p style="margin:1rem">{{item.time | dateFilter}}</p>
            <p> 
             <Tooltip placement="top" content="点击跳转到详情页查看">
            <Button type="primary" @click.native="Godetail(item.id,item.article_id,item)">阅读全文</Button>
            </Tooltip>
            </p>
      </Card>
      </div>
  </div>
</template>
<script>
import { getnotedetail,PostMessage } from '../components/NetWork/request'
import lables from '../components/categoryComponents/lables'
import moment from 'moment'
  export default {
    name:'category',
    data () {
      return {
        lableList:[],
         Itemlist:[],
      };
    },
    filters:{
      dateFilter(val) {
        return moment(val).format('YYYY-MM-DD');
      }
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
       Godetail(id,path,item) {
        this.$router.push(`/detail/${path}`)
        item.visited += 1
        PostMessage('/note/noteVisited',{visitedNum:item.visited,id:id})
      }
    },
  }
</script>
<style lang="scss" scoped>
#categroy {
    margin: 5rem auto 0 auto;
    h3 {
      text-align: center;
      padding:2rem;
      color: rgba(4, 226, 60, 0.8)!important ;
    }
    .lables {
      width: 85%;
      height: 10rem;
      background: transparent;
      margin: 0 auto;
      position: relative;
      z-index: 3;
    }
    .lablecard { 
    text-align: center;
    padding: 0.5rem;
    border-radius: .2rem;
    color: white!important;
    font-size: .9rem;
    display: inline-block;
  }
     .detail {
      background: rgb(255, 255, 255, .7);
         margin-top:1rem;
         border:0;
         position: relative;
         z-index: 5;
     }
}
</style>
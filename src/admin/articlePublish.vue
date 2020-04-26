<template>
  <div class="publish">
      <div class="container">
          <h2>文章内容编辑与发表</h2>
          <p>文章标题:</p>
        <Input v-model="articleDate.title" style="width:80%"  placeholder="请输入文章标题..." />
          <p><img v-show="articleDate.src" :src="articleDate.src" alt="笔记中的图片"/></p>
        <Upload action="http://39.107.50.117:3000/upload/imageUpload"
        :on-success="handleSuccess">
            <Button icon="ios-cloud-upload-outline">选择文章封面图片</Button>
        </Upload>
        <p>文章简介:</p>
        <Input v-model="articleDate.brief" style="width:80%" type="textarea" :rows="4" placeholder="请输入文章简介..." />
        <p>文章主体内容:</p>
        <Input v-model="articleDate.content" style="width:80%" type="textarea" :rows="8" placeholder="请输入文章主体内容..." />
        <p>文章类别:</p>
        <Select v-model="articleDate.categroy" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="event-Button">
            <Button @click.native="handelPublish" type="primary">发表</Button>
            <Button type="default">取消</Button>
        </div>
      </div>
  </div>
</template>

<script>
import { PostMessage } from '../components/NetWork/request'
  export default {
    name:'articlePublish',
    data () {
      return {
          articleDate:{
                src:'',
                title:'',
                brief:'',
                content:'',
                categroy:'',
          },
          cityList:[
                    {
                        value: 'javascript',
                        label: 'javascript'
                    },
                    {
                        value: 'Promise',
                        label: 'Promise'
                    },
                    {
                        value: 'es6',
                        label: 'es6'
                    },
                    {
                        value: 'Android',
                        label: 'Android'
                    },
                    {
                        value: 'Linux',
                        label: 'Linux'
                    },
                    {
                        value: 'nodejs',
                        label: 'nodejs'
                    },
                    {
                        value: 'jQuery',
                        label: 'jQuery'
                    },
                    {
                        value: 'Structure',
                        label: 'Structure'
                    }
          ],
      }
    },
    methods: {
        handleSuccess(res) {
            this.articleDate.src = res.url
        },
        handelPublish() {
            if(
                 !this.articleDate.src ||  
                 !this.articleDate.content ||  
                 !this.articleDate.title ||  
                 !this.articleDate.brief ||  
                 !this.articleDate.categroy  
            ) return this.$Message.error('请输入完整的文章信息!')
            const obj = this.articleDate
            const path = this.articleDate.categroy + Math.floor(Math.random()*2000000)
            obj.articlePath = path
            console.log(this.articleDate);
            PostMessage('/note/articlePublish', obj)
            .then(res =>{
                if(res.data.err == 0) {
                    this.$Message.success(res.data.message)
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        }
    }
  }

</script>
<style lang="scss">
    .publish {
        .container {
            position: relative;
            z-index: 99;
            img {
                width: 400px;
                height: 300px;
            }
        h2 {
            color: white;
            font-family: cursive;
            padding:2rem 0 1rem 0;
            white-space: nowrap;
        }
        p {
            color: white;
            margin: 1rem 0;
        }
        .event-Button {
            margin-top: 1rem;
            button {
                margin-right: 1rem;
            }
        }
        }
    }

</style>
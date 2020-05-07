<template>
  <div class="articleEditor">
      <div class="navgation">
       <Row>        
        <Col span="8">
            <Menu theme="dark" style="height:100vh;width:260px;"  active-name="1-2" :open-names="['1','2','3']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper" />
                        内容管理
                    </template>
                    <MenuItem @click.native="$router.push('/admin/article/upload/articleManage')" name="1-1">文章管理</MenuItem>
                    <MenuItem @click.native="$router.push('/admin/article/upload/articlePublish')" name="1-3">文章发表</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people" />
                        用户管理
                    </template>
                    <MenuItem @click.native="$router.push('/admin/article/upload/users')" name="2-1">用户列表管理</MenuItem>
                </Submenu>
                 <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        其他内容
                    </template>
                    <MenuItem @click.native="$router.push('/admin/article/upload/photos')" name="3-1">上传相册</MenuItem>
                    <MenuItem @click.native="$router.push('/admin/article/upload/images')" name="3-2">上传图片</MenuItem>
                    <MenuItem @click.native="$router.push('/admin/article/upload/demo')" name="3-3">发表Demo</MenuItem>
                </Submenu>
                <Submenu  name="4">
                    <template slot="title">
                        <Icon type="md-aperture" />
                        <span @click="exitSys">退出管理系统</span>
                    </template>
                </Submenu>
            </Menu>
        </Col>
    </Row>
      </div>
      <Modal
        v-model="ModelisShow"
        title="退出确认"
        @on-ok="handelOK">
        <p>确定要退出博客管理系统吗？</p>
    </Modal>
      <div class="childrenRouter">
          <router-view/>
      </div>
  </div>
</template>
<script>
import { getnotedetail } from '../components/NetWork/request'
  export default {
    name:'articleEditor',
    data() {
        return {
        ModelisShow:false
    }
    },
    methods:{
        exitSys() {
            this.ModelisShow = true
        },
        handelOK() {
            getnotedetail('/user/adminExit').then(res => {
                this.$Message.success(res.data.message);
                location.reload()
            })
        }
    }
  }
</script>
<style lang="scss" scoped>
    .articleEditor {
        width: 100vw;
        display: flex;
        flex-direction: row;
        .navgation {
            position: fixed;
            top: 0;
            z-index: 99;
        }
        .childrenRouter {
            flex: 1;
            z-index: 99;
            width: calc(100%-260px);
            margin-left: 260px;
            padding-left: 50px;
        }
    }
</style>
<template>
 <div class="articleManage">
     <h2>后台用户管理界面：</h2>
        <Table width="80%" border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="username">
            <strong>{{ row.username }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="error" size="small" @click="remove(index)">删除该用户</Button>
        </template>
    </Table>
        <Modal
        v-model="show"
        title="Title"
        :loading="loading"
        @on-ok="deleteUser">
        <p>确定要删除该用户吗？请谨慎操作。😀</p>
    </Modal>
 </div>
</template>
<script>
import { getnotedetail, PostMessage } from '../components/NetWork/request'
    export default {
        mounted() {
            this.getUserInfo()
        },
        data () {
            return {
                show: false,
                loading: true,
                index:0,
                columns12: [
                    {
                        title: '用户名',
                        slot: 'username',
                        width: 200,
                    },
                    {
                        title: '昵称',
                        key: 'name',
                        width: 200,
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width: 200,
                    },
                    {
                        title: '简介',
                        key: 'info',
                        width: 200,
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    }
                ],
                data6: []
            }
        },
        methods: {
            getUserInfo() {
                getnotedetail('/user/getUserInfo')
                .then(res => {
                    if(res.data.err === 0) {
                        this.data6 = res.data.message
                        this.$Message.success('数据拉取成功!')
                    } else {
                        this.$Message.error('数据拉取失败!')
                    }
                })
            },
            remove (index) {
                this.show = true
                this.index = index
            },
            deleteUser() {
                PostMessage('/user/deleteUserInfo', {username:this.data6[this.index].username})
                .then(res => {
                    if(res.data.err == 0) {
                        this.$Message.success(res.data.message)
                        this.show = false
                    }else {
                        this.$Message.error(res.data.message)
                    }
                }).catch(reason => {
                     this.$Message.error(reason.message)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.articleManage {
    padding-top: 5rem;
    padding-right: 15rem;
    position: relative;
    z-index: 99;
    h2 {
        margin-bottom: 1rem;
    }
}
</style>
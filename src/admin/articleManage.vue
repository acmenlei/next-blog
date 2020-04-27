<template>
 <div class="articleManage">
     <h2>文章列表详情信息：</h2>
        <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="title">
            <strong>{{ row.title }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
    <Page :page-size="3" @on-change="Pagechange" style="margin-top:2rem" :total="count" show-total />
 </div>
</template>
<script>
import { PageSizeChange } from '../components/NetWork/request'
    export default {
        mounted() {
            this.getPage(this.index)
        },
        data () {
            return {
                index:1,
                count:0,
                columns12: [
                    {
                        title: '文章标题',
                        slot: 'title'
                    },
                    {
                        title: '文章简介',
                        key: 'article_brief'
                    },
                    {
                        title: '文章分类',
                        key: 'lable'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data6: []
            }
        },
        methods: {
            Pagechange(index) {
                this.getPage(index)
            },
            getPage(index) {
                PageSizeChange('/page/getnotePage?page='+index)
                .then(res => {
                    if(res.data.err === 0) {
                        this.data6 = res.data.message.data
                        this.count = res.data.message.count
                        this.$Message.success('数据拉取成功!')
                    } else {
                        this.$Message.error('数据拉取失败!')
                    }
                })
            },
            show (index) {
                this.$router.push('/admin/article/upload/articleupdate/'+ this.data6[index].article_id)
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>
<style lang="scss" scoped>
.articleManage {
    padding-top: 4rem;
    padding-right: 15rem;
    position: relative;
    z-index: 99;
    h2 {
        margin-bottom: 1rem;
    }
}
</style>
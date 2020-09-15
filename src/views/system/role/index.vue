<!-- jiaos管理 -->
<template>
 <div>
    <el-button type="primary" @click="add">添加角色</el-button>
    <vlist @editmsg="editmsg"></vlist>
    <vinfo :info="info" ref="dialog"></vinfo>
 </div>
</template>

<script>
import vinfo from '@/views/system/role/vinfo'
import vlist from '@/views/system/role/vlist'
export default {
    data () {
        return {
            info:{
                isAdd:false,
                isShow:false
            }
        };
    },

    components: {
        vinfo,
        vlist
    },

    computed: {},

    methods: {
        add(){
            this.info.isShow = !this.info.isShow;
            this.info.isAdd = true;
        },
        editmsg(val){
            this.info.isShow = !this.info.isShow;
            this.info.isAdd = false;
            console.log(val);
            this.$refs.dialog.setinfo(val)
        }
    }
}

</script>
<style scoped>
</style>
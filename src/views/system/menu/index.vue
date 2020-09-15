<!-- 菜单管理 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加菜单</el-button>
     <vlist @editmsg="editmenu"></vlist>
     <vinfo :info="info" ref="dialog"></vinfo>
 </div>
</template>
 
<script>
import vinfo from './vinfo'
import vlist from './vlist'
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
    //  添加菜单方法
     add(){
         this.info.isAdd = this.info.isShow = true;
     },
     //修改时打开弹框,val为子组件打开的某条表单数据
     editmenu(val){
         this.info.isShow = !this.info.isShow;
         this.info.isAdd = false;
        //  获取到弹框的dom调用setinfo方法传值
         this.$refs.dialog.setinfo(val)
     }
 }
}

</script>
<style scoped>
</style>
<!-- 分类管理 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加商品分类</el-button>
     <clist @toggle="toggle"></clist>
     <cinfo :info="info" ref="form"></cinfo>
 </div>
</template>

<script>
import clist from './clist'
import cinfo from './cinfo'
export default {
 data () {  
 return {
     info:{
         isAdd:false,
         isShow:false,
     }
 };
 },

 components: {
     clist,
     cinfo
 },

 computed: {},

 methods: {
     add(){
         this.info.isShow = true;
         this.info.isAdd = true;
     },
     toggle(data){
         this.info.isAdd = false;
         this.info.isShow = true;
         this.$refs.form.setinfo(data)
     }
 }
}

</script>
<style scoped>
</style>
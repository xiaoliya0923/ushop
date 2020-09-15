<!-- 分类管理 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加商品分类</el-button>
     <clist></clist>
     <cinfo :info="info"></cinfo>
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
 }
}

</script>
<style scoped>
</style>
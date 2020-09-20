<!-- 商品管理 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加商品</el-button>
     <glist @openinfo='openinfo'></glist>
    <ginfo :info="info" ref="from"></ginfo>
 </div>
</template>

<script>
import ginfo from './ginfo'
import glist from './glist'
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
     ginfo,
     glist
 },

 computed: {},

 methods: {
     add(){
         this.info.isAdd = this.info.isShow = true;
     },
     openinfo(val){
         console.log(val);
         this.info.isAdd = false;
         this.info.isShow = true;
         this.$refs.from.setinfo(val)
     }
 }
}

</script>
<style scoped>
</style>
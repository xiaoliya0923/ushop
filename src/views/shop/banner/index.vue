<!-- 轮播图 -->
<template>
 <div>
      <el-button type="primary" @click="add">添加轮播图片</el-button>
     <blist @toggle="toggle"></blist>
     <binfo :info="info" ref="form"></binfo>
     
 </div>
</template>

<script>
import binfo from './binfo'
import blist from './blist'
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
     binfo,
     blist
 },

 computed: {},

 methods: {
     add(){
         this.info.isAdd = this.info.isShow = true
     },
     toggle(val){
         this.info.isAdd = false
         this.info.isShow = true
         this.$refs.form.setinfo(val)
     }
 }
}

</script>
<style scoped>
</style>
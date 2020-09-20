<!-- 规格管理 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加规格</el-button>
     <slist @specsinfo='specsinfo' ></slist>
     <sinfo :info='info' ref="form"></sinfo>
 </div>
</template>

<script>
import slist from './slist'
import sinfo from './sinfo'
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
     slist,
     sinfo
 },

 computed: {},

 methods: {
     add(){
         this.info.isShow = true;
         this.info.isAdd = true;
     },
     specsinfo(val){
         this.info.isShow = true;
         this.info.isAdd = false;
         console.log(val);
         this.$refs.form.setinfo(val)
     }
 }
}

</script>
<style scoped>
</style>
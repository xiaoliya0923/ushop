<!-- 秒杀 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加商品</el-button>
     <slist @openinfo='openinfo'></slist>
    <sinfo :info="info" ref="from"></sinfo>
 </div>
</template>

<script>
import sinfo from './sinfo'
import slist from './slist'
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
     sinfo,slist
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
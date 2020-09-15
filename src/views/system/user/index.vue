<!-- 用户管理 -->
<template>
 <div>
     <el-button type="primary" @click="add">添加管理员</el-button>
     <ulist @editmsg="editmsg" ></ulist>
     <uinfo :info='info' ref="usermsg"></uinfo>
    
 </div>
</template>

<script>
import uinfo from '@/views/system/user/uinfo'
import ulist from '@/views/system/user/ulist'
export default {
 data () {
 return {
     info:{
         isAdd:true,
         isShow:false
     }
 };
 },

 components: {
     uinfo,
     ulist
 },

 computed: {},

 methods: {
     add(){
         this.info.isAdd = true;
         this.info.isShow = true;
     },
     editmsg(data){
         this.info.isAdd = false;
        this.info.isShow = true;
        this.$refs.usermsg.setinfo(data);
     }
 }
}

</script>
<style scoped>
</style>
<!-- 会员管理 -->
<template>
 <div>
     <minfo :info="info" ref="form"></minfo>
     <mlist @openinfo="openinfo"></mlist>
 </div>
</template>

<script>
import minfo from './minfo'
import mlist from './mlist'
export default {
 data () {
 return {
     info:{
         isShow:false
     }
 };
 },

 components: {
     minfo,mlist
 },

 computed: {},

 methods: {
     edit(){

     },
     openinfo(val){
         this.info.isShow =true;
         this.$refs.form.setinfo(val)
     }
 }
}

</script>
<style scoped>
</style>
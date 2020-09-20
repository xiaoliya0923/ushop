<!-- 分类列表 -->
<template>
 <div class="table-bg">
     <el-table :data="categorylist" row-key="id" :tree-props="{children:'children'}">
         <el-table-column prop="id" label="ID" align="center"></el-table-column>
         <el-table-column prop="catename" label="分类名称" align="center"></el-table-column>
         <el-table-column label="分类图片">
             <template slot-scope="scope">
                 <img :src="scope.row.img | pixImg" style="width:80px" v-if="scope.row.img">
                 <span v-else>暂无图片</span>
             </template>
         </el-table-column>
         <el-table-column label="操作">
             <template slot-scope="scope">
                 <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                 <el-button type="danger" size="small" @click="del(scope.row.id)" circle icon="el-icon-delete"></el-button>
             </template>
         </el-table-column>
     </el-table>

 </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {getcategorylist,delcategory} from '@/request/category'
// import pixImg from '@/filter/index'
export default {
 data () {
    return {
       
    }; 
 },
    mounted(){
        this.getcategorylists();
    },
 components: {},

 computed: {
     ...mapGetters({
         categorylist:'category/categorylist'
     })
 },

 methods: {
     ...mapActions({
         getcategorylists:'category/getcategorylists'
     }),
     
     async del(id){
        this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async ()=>{
            let res = await delcategory(id);
            console.log(res);
            if(res.code == 200){
                this.$message.success(res.msg);
                this.getcategorylists();
            }else{
                this.$message.error((res.msg));
            }
        }).catch(()=>{})
     },
     edit(data){
         this.$emit('toggle',data)
     },
     
     
 }
}

</script>
<style scoped>
</style>
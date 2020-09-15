<!-- 菜单管理列表 -->
<template>
 <div class="table-bg">
     <el-table
    :data="menulists"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column prop="id" label="ID" align="center" width="180"></el-table-column>
    <el-table-column prop="title" label="菜单名称" align="center" width="180"></el-table-column>
    <el-table-column prop="url" label="菜单地址" align="center"></el-table-column>
    <el-table-column label="图标" align="center">
        <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
        </template>
    </el-table-column>
    <el-table-column label="类型" align="center" prop=type>
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
        <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
       </template> 
    </el-table-column>
    <el-table-column label="修改" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="small" circle icon="el-icon-edit" @click='edit(scope.row)'></el-button>
            <el-button type="danger" size="small" circle icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
        </template>
    </el-table-column>
  </el-table>
  
 </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {menuDel} from '@/request/menu'
export default { 
 data () {
 return {
     menulist: [],
        
 };
 },
created(){
    this.getmenulist();
},
mounted(){
  
},
 components: {},

 computed: {
     ...mapGetters({
         menulists:'menu/menulist'
     }),
     
 },

 methods: {
     ...mapActions({
         getmenulist:'menu/getmenulist'
     }),
    //  修改菜单信息
    edit(val){
        this.$emit('editmsg',val);
    },
    // 删除菜单信息
    async del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            let res = await menuDel(id);
            // 如果删除成功，弹出提示框并更新菜单列表
            if(res.code == 200){
                this.$message.success(res.msg);
                this.getmenulist()
            }else{
                // 删除失败，弹出提示框
                this.$message.error(res.msg)
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    }
 }
}

</script>
<style scoped>
</style>
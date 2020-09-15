<!-- 角色列表 -->
<template>
  <div class="table-bg">
    <el-table :data="rolelists" style="100%;margin-bottom:20px" row-key="id" border>
      <el-table-column prop="id" label="ID" align="center" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center" width="180"></el-table-column>

      <el-table-column label="状态" align="center" prop="type">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">已禁止</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
          <el-button type="danger" size="small" circle icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {roledel} from '@/request/role'
export default {
  data() {
    return {
      
    };
  },
  mounted() {

    if (!this.rolelists.length) {
        
      this.getrolelist();
    }
    
  },
  components: {},

  computed: {
    ...mapGetters({
      rolelists: "role/rolelists",
    }),
  },

  methods: {
    ...mapActions({
      getrolelist: "role/getrolelist",
    }),
    
    // 修改
    edit(val){
        console.log(val)
        this.$emit('editmsg',{...val})
    },
    async del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            let res = await roledel(id);
            // 如果删除成功，弹出提示框并更新菜单列表
            if(res.code == 200){
                this.$message.success(res.msg);
                this.getrolelist()
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
  },
};
</script>
<style scoped>
</style>
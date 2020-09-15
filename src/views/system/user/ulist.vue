<!-- 管理员列表 -->
<template>
 <div class="table-bg">
     <el-table :data='userlist' style="100%;margin-bottom:20px" row-key="id" border>
         <el-table-column prop="uid" label="UID" width="320" align="center"></el-table-column>
        <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>
        <el-table-column label="管理员角色" align="center">
            <template slot-scope="scope">
                <el-tag type="success">{{scope.row.rolename}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                  <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="primary" size="small" circle icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button type="danger" size="small" circle icon="el-icon-delete" @click="del(scope.row.uid)"></el-button>
            </template>
        </el-table-column>
     </el-table>
     <el-pagination
      @size-change="setsize"
      @current-change="setpage"
      :current-page="page"
      :page-sizes="[1,2,3,4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
</template>

<script>
// 获取管理员列表
import {getuserlist,deluser} from '@/request/user'
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    data () {
        return {
            
        };
    },
    created(){
        
    },
    mounted(){
        this.getusertotals();
        if(!this.userlist.length){
            this.getuserlists();
        }
        
    },
    components: {},

    computed: {
        ...mapGetters({
            userlist:'user/userlist',
            page:'user/page',
            size:'user/size',
            total:'user/total'
        })
    },
    
    methods: {
         ...mapMutations({
            SETPAGE:'user/SETPAGE'
        }),
        ...mapActions({
            getuserlists:'user/getuserlists',
            getusertotals:'user/getusertotals',
            setpage:'user/setpage',
            setsize:'user/setsize'
        }),
        edit(row){
            this.$emit('editmsg',row);
            console.log(row)
        },
        async del(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                let res = await deluser(id);
                if(res.code == 200){
                    this.$message.success(res.msg);
                    // 判断如果本页只有一条数据且不是第一页
                    if(this.userlist.length == 1 && this.page !=1){
                        console.log( this.page)
                        // 页码向前一页
                        this.SETPAGE(this.page-1)
                    }
                    // 删除后重新执行获取管理员列表的方法
                    this.getuserlists();
                }else{
                    this.$message.error(res.msg);
                }
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                })
            })
        }
    }
}

</script>
<style scoped>
</style>
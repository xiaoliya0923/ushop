<!-- 规格列表 -->
<template>
 <div class="table-bg">
     <el-table :data="specslist">
         <el-table-column prop="id" label="ID" width="120" align="center"></el-table-column>
         <el-table-column prop="specsname" label="规格名称" align="center"></el-table-column>
         <el-table-column label="规格值" align="center">
             <template slot-scope="scope">
                 <el-tag v-for="(item,index) in scope.row.attrs" :key="index" type="success">{{item}}</el-tag>
             </template>
         </el-table-column>
         <el-table-column label="状态">  
             <template slot-scope="scope">
                 <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
                 <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
             </template>
         </el-table-column>
         <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
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
      :total="total"
     ></el-pagination>
 </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations, mapState} from 'vuex'
import {delspece,allspecelist} from '@/request/spece'
export default {
    data () {
        return {
    
        };
    },

    components: {
        
    },
    mounted(){
        // 获取规格列表
        if(!this.specslist.length){
            this.getspecslist();
            
        }
        this.getallspecslist();
        console.log(this.total)
        
    },
    computed: {
        ...mapGetters({
            specslist:'spece/specslist',
            total:'spece/allspecslist',
            page:'spece/page',
            size:'spece/size',
            total:'spece/total'
        })
    },

    methods: {
        ...mapMutations({
            SETPAGE:'spece/SETPAGE'
        }),
        ...mapActions({
            getspecslist:'spece/getspecslist',
            getallspecslist:'spece/getallspecslist',
            setpage:'spece/setpage',
            setsize:'spece/setsize'
        }),
        
        edit(val){
            this.$emit('specsinfo',val)
        },
        async del(id){
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async ()=>{
                let res = await delspece(id);
                if(res.code == 200){
                    this.$message.success(res.msg); 
                    console.log(this.specslist.length);
                    console.log(this.page)
                    if(this.specslist.length == 1 && this.page !=1){
                        this.SETPAGE(this.page-1)
                    }
                    this.getspecslist();   
                }else{
                    this.$message.error(res.msg);
                }  
            }).catch(()=>{})

        },
    }
}

</script>
<style scoped>
</style>
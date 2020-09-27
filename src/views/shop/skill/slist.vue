<!--  -->
<template>
  <div class="table-bg">
    <el-table :data="skillslist">
      <el-table-column prop="title" label="活动名称" align="center"></el-table-column>
      <!-- <el-table-column prop="firstcatename" label="一级分类名称" align="center"></el-table-column>
      <el-table-column prop="secondcatename" label="二级分类名称" align="center"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" align="center"></el-table-column> -->
      <el-table-column label="开始时间" align="center">
          <template slot-scope="scope">
            <el-tag>{{scope.row.begintime*1 | timefil}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
          <template slot-scope="scope">
            <el-tag>{{scope.row.endtime*1 | timefil}}</el-tag>
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
              <el-button type="danger" size="small" @click="del(scope.row.id)" circle icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import {editskill,delskill} from '@/request/skill'
export default {
  data() {
    return {
     
    };
  },
  mounted() {
    if (!this.goodslist.length) {
      this.getgoodslist();
    }
    this.getskillslist()
    
  },
  computed: {
    ...mapGetters({
        // 商品列表
      goodslist: "goods/goodslist",
      skillslist:'skill/skillslist'
    }),
  },
  
  components: {},

  methods: {
    ...mapActions({
      getgoodslist: "goods/getgoodslist",
      //  秒杀列表
      getskillslist:'skill/getskillslist'

    }),
    edit(val){
        this.$emit('openinfo',val)
    },
    async del(id){
        this.$confirm('确认删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async ()=>{
            let res = await delskill(id);
            if(res.code == 200){
                this.$message.success(res.msg);
                this.getskillslist()
            }else{
                this.$message.error(res.msg)
            }
        }).catch(()=>{})
    }
  },
};
</script>
<style scoped>
</style>
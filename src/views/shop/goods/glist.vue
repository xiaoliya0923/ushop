<!--  -->
<template>
  <div class="table-bg">
    <el-table :data="goodslist">
      <el-table-column prop="id" label="ID" width="40" align="center"></el-table-column>
      <el-table-column prop="firstcatename" label="一级分类名称" align="center"></el-table-column>
      <el-table-column prop="secondcatename" label="二级分类名称" align="center"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" align="center"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img style="width:80px" :src="scope.row.img | pixImg" v-if="scope.row.img" alt />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column label="规格名" align="center">
        <template slot-scope="scope">
          <el-tag
            :key="index"
            v-for="(item,index) in specslist"
            v-if="item.id == scope.row.specsid"
            type="success"
          >
          {{item.specsname}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="规格值" align="center">
          <template slot-scope="scope">
              <el-tag v-for="(item,index) in scope.row.specsattr" :key="index" type="success">
                  {{item}}
              </el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center"></el-table-column>
      <el-table-column label="是否热卖">
          <template slot-scope="scope">
              <el-switch v-model="scope.row.ishot" :active-value="1" :inactive-value="2"></el-switch>
          </template>
      </el-table-column>
      <el-table-column label="是否新品">
          <template slot-scope="scope">
              <el-switch v-model="scope.row.isnew" :active-value="1" :inactive-value="2"></el-switch>
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
    <el-pagination
    background
    @size-change="set_size"
    @current-change="set_page"
    :current-page="page"
    :page-sizes="[2,4,6,8]"
    :page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    >

    </el-pagination>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
import {delgoods} from '@/request/goods'
export default {
  data() {
    return {
     
    };
  },
  mounted() {
    if (!this.goodslist.length) {
      this.getgoodslist();
    }
    
    if(!this.specslist.length){
        this.getspecslist()
    }
    
  },
  computed: {
    ...mapGetters({
        // 商品列表
      goodslist: "goods/goodslist",
      //  获取规格列表
       specslist:'spece/specslist',
       page:'goods/page',
       size:'goods/size',
       total:'goods/total'
    }),
  },
  
  components: {},

  methods: {
    ...mapActions({
      getgoodslist: "goods/getgoodslist",
      getspecslist:'spece/getspecslist',
      set_size:'goods/set_size',
      set_page:'goods/set_page',
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
            let res = await delgoods(id);
            if(res.code == 200){
                this.$message.success(res.msg);
                if(this.goodslist.length == 1 && this.page != 1){
                  this.set_page(this.page - 1)
                }
                this.getgoodslist();
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

<template>
  <div class="table-bg">
    <el-table :data="memberslist">
      <el-table-column prop="uid" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
     <el-table-column label="注册日期" align="center">
         <template slot-scope="scope">
                <el-tag>
                    {{parseInt(scope.row.addtime) | timefil}}
                </el-tag>
         </template>
     </el-table-column>
      <el-table-column label="修改">
        <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
    
  data() {
    return {
       
    };
  },
  mounted() {
    if (!this.memberslist.length) {
      this.getmemberslist();
    }
    
  },
  updated(){
      
      
  },
  computed: {
    ...mapGetters({
        // 商品列表
      memberslist: "member/memberslist",
    }),
  },
  
  components: {},

  methods: {
    ...mapActions({
      getmemberslist: "member/getmemberslist",
    }),
    edit(val){
        this.$emit('openinfo',val)
    },
    
  }
};
</script>
<style scoped>
</style>
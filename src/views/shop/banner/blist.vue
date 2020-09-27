<!-- 分类列表 -->
<template>
  <div class="table-bg">
    <el-table :data="bannerlist" row-key="id">
      <el-table-column
        prop="title"
        label="轮播图名称"
        align="center"
      ></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img
            :src="scope.row.img | pixImg"
            style="width: 80px"
            v-if="scope.row.img"
          />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { getbannerlist, delbanner } from "@/request/banner";

// import pixImg from '@/filter/index'
export default {
  data() {
    return {};
  },
  mounted() {
    this.getbannerlists();
  },
  components: {},

  computed: {
    ...mapGetters({
      bannerlist: "banner/bannerlist",
    }),
  },

  methods: {
    ...mapActions({
      getbannerlists: "banner/getbannerlists",
    }),

    async del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delbanner(id);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.getbannerlists();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    edit(data) {
      this.$emit("toggle", data);
    },
  },
};
</script>
<style scoped>
</style>
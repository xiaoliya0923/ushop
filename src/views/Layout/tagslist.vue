<!--  -->
<template>
  <div class="tagslist">
    <el-scrollbar class="scroll-bar">
      <el-tag class="item"
       v-for="(tag, index) in taglist"
       :key="index"
       closable
       size="small"
       effect='dark'
       :type="isActive(tag.path) ? '':'info'"
       @close="cleartag(tag.path,index)"
       > 
        <router-link :to="tag.path">{{tag.name}}</router-link>
       </el-tag>
    </el-scrollbar>
    <el-dropdown class="tagaction" split-button type="primary" size="mini">
      标签操作
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="DEL_ALL">关闭所有</el-dropdown-item>
        <el-dropdown-item @click.native="DEL_OTHER($route.fullPath)">关闭其他</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {mapGetters,mapMutations,mutations} from 'vuex'
export default {
  data() {
    return {
        // taglist:[1,2,3,4]
    };
  },

  components: {},
  watch:{
    // 监听当前路由信息
    $route:{
      immediate:true,
      deep:true,
      handler(newval){
        this.SET_TAGLIST(newval)
      }
    }
  },
  computed: {

    ...mapGetters({
      taglist:'tagslist/taglist'
    })
  },
  mounted(){
        console.log(this);
  },
  methods: {
    ...mapMutations({
      SET_TAGLIST:'tagslist/SET_TAGLIST',
      DEL_TAG:'tagslist/DEL_TAG',
      DEL_ALL:'tagslist/DEL_ALL',
      DEL_OTHER:'tagslist/DEL_OTHER'
    }),
    isActive(path){
      return path === this.$route.fullPath;
    },
    // 删除某一个标签
    cleartag(path,idx){
      console.log(11)
      // 如果删除的当前选中的
      // 如果删除的是首页且只有这一个标签，就禁止移除
      if(this.$route.fullPath == '/index' && JSON.parse(localStorage.getItem('tagslist')).length == 1 ){
        return false
      }else if(this.$route.fullPath == path){
          this.DEL_TAG({idx,isActive:true})
      }else{
          this.DEL_TAG({idx})
      }
      
    }
  },
};
</script>
<style scoped>
.tagslist {
  width: 100%;
  position: absolute;
  left: 0;
  top: 1px;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom:10px;
}
.tagslist .item {
  margin: 6px 4px 0;
}
.tagslist .item a {
  text-decoration: none;
  color: inherit;
  padding: 6px;
}
.tagaction {
  position: absolute;
  right: 10px;
  top: 6px;
}
</style>
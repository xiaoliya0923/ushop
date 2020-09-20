<!-- 侧边栏 -->
<template>
 <div>
     <h3 class="logo">小u商城后台</h3>
     <!-- default-active 为高亮显示的地方为地址栏对应的路由-->
     <!-- 菜单是否折叠和侧边栏一致 -->
     <el-menu
      :default-active="$route.path"
      :collapse = 'iscollapse'
      class="page-menu"
      background-color="#444" 
      text-color="#fff"
      router
     >
      <!-- 点击时切换到index对应的路由 -->
      <el-menu-item index="/index">
        <i class="el-icon-setting"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <template v-for="(item,index) in menus">
        <el-menu-item v-if="item.type == 2" :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="val.url" v-for="(val,idx) in item.children" :key='idx'>{{val.title}}</el-menu-item>
        </el-submenu>
        
      </template>
    </el-menu>
 </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
 data () {
 return {
 };
 },
  mounted(){
    // console.log(this.menus);
  },
 components: {},

 computed: {
     ...mapState(['iscollapse']),
     ...mapGetters({
       menus:'user/menus'
     })
 },

 methods: {}
}

</script>
<style scoped>
 .logo {
     line-height: 60px;
     text-align: center;
     color: #fff;
     background-color: #666;
     white-space: nowrap;
     overflow: hidden;
 }
 .page-menu {
   border-right: none;   
   /* background-color:#444; */
   
 }
</style>
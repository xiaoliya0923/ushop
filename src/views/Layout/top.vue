<!-- 顶部 -->
<template>
 <div class="header">
     <div class="lt">
         <!-- 按钮点击侧边栏展开或者折叠 -->
         <el-button 
            class="toggle-btn"
            icon="el-icon-s-unfold"
            type="primary"
            size:small
            v-if="iscollpase"
            @click="TOGGLE"
        ></el-button>
        <el-button
            class="toggle-btn"
            icon="el-icon-s-fold"
            type="primary"
            size:small
            v-else
            @click="TOGGLE"
        >
        </el-button>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
            <el-breadcrumb-item :to="{ path: '/index' }">后台首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.title != '后台首页'">{{$route.meta.title}}</el-breadcrumb-item>
            
        </el-breadcrumb>
        <!-- 点击返回上一步 -->
        <el-button
            size="small"
            icon="el-icon-back"
            circle
            v-if="$route.path!='/index'"
            @click="$router.go(-1)"
        >

        </el-button>
     </div>
     <div class="rt">
         <el-dropdown>
            <span class="el-dropdown-link">
                {{username}},你好<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="escfullscreen">
                    <i class="el-icon-full-screen"></i>
                   {{isfull?'退出全屏':'进入全屏'}}
                </el-dropdown-item>
                <el-dropdown-item @click.native="EXIT">
                    <i class="el-icon-switch-button"></i>
                    退出登录
                </el-dropdown-item>
                
            </el-dropdown-menu>
        </el-dropdown>
     </div>
 </div>
</template>

<script>
import {mapState,mapMutations, mapGetters} from 'vuex'
import screenfull from 'screenfull'
export default {
 data () {
 return {
    //  是否全屏
    isfull:false
 };
 },

 components: {},

 computed: {
     ...mapState({
         iscollpase:'iscollpase',
        
     }),
     ...mapGetters({
          username:'user/username'
     })
    
 },

 methods: {
      ...mapMutations({
          TOGGLE:'TOGGLE',
        EXIT:'user/EXIT'      
    }),
    // 退出全屏
    escfullscreen(){
        if(!screenfull.isEnabled){
            this.$message.warning('您的浏览器不支持全屏');
            return false;
        }
        this.isfull = !this.isfull;
        screenfull.toggle()
    }
 }
}

</script>
<style scoped>
.header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.toggle-btn {
    margin-right: 10px;
}
.lt {
    display: flex;
    align-items: center;
}
.crumb {
    margin-right: 10px;
}
</style>
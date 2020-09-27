<!-- 后台首页 -->
<template>
    <el-container class="page">
        <el-aside :width="iscollpase?'64px':'220px'" class="page-aside">
            <left></left>
        </el-aside>
        <el-container class="page-con">
            <el-header class="page-head">
                <top></top>
            </el-header>
            <el-main class="mains">
                <tagslist></tagslist>
                <div class="router">
                    <router-view></router-view>
                </div>
                
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import left from '@/views/Layout/left'
import top from '@/views/Layout/top'
import tagslist from '@/views/Layout/tagslist'
import {mapState} from 'vuex'
export default { 
 data () {
    return {
    };
 },

 components: {
     left,
     top,
     tagslist
 },
    
 computed: {
     // iscollpase 侧边栏是否折叠
        ...mapState(['iscollpase'])
 },

 methods: {}
}

</script>
<style scoped>
.page {
    width: 100vw;
    height: 100vh;
}
.page-aside {
    height: 100%;
    background-color: #444;
} 
.page-con {
    height: 100%;
    background-color: #f7f7f7;
}
.page-head {
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
.mains {
    position: relative;
}
.router{
    margin-top: 40px;
}
</style>
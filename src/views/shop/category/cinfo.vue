<!-- 分类管理信息 -->
<template>
 <div>
     <el-dialog :title="info.isAdd?'添加分类':'修改分类'" :visible.sync="info.isShow" width="40%" @close="close">
         <el-form :model="goodsinfo" label-width="100px" class="demo-ruleForm">
             <el-form-item label="上级目录">
                 <el-select v-model="goodinfo.pid" placeholder="请选择">
                     <el-option label="顶级目录" :value="0"></el-option>
                    <el-opation v-for="item in catelist" :key="item.id" :label="item.catename" :value="item.id"></el-opation>
                 </el-select>
             </el-form-item>
             <el-form-item label="分类名称" prop="catename">
                 <el-input v-model="goodsinfo.catename" placeholder="商品名称"></el-input>

             </el-form-item>
             <el-form-item label="分类图片">

             </el-form-item>
             <el-form-item label="状态">
                 <el-switch v-model="goodsinfo.status" :active-value="1" :inactive-value="2"></el-switch>
             </el-form-item>
             <el-form-item label="">
                 <el-button type="primary" @click="submit()">提交</el-button>
                 <el-button type="warning" @click="reset()">重置</el-button>
             </el-form-item>
         </el-form>
         
     </el-dialog>
 </div>
</template>

<script>
let goodsinfo = {
    pid:0,
    catename:'',
    img:'',
    status:1
}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isAdd:false,
                    isShow:false
                }
            }
        }
    },
    data () {
        return {
            goodsinfo:{...goodsinfo},
            catelist:[]
        };
    },

 components: {},

 computed: {},

 methods: {
     close(){

     }
 }
}

</script>
<style scoped>
</style>
<!-- 菜单管理信息 -->
<template>
 <div>
     <el-dialog :title="info.isAdd?'添加菜单':'修改菜单'" :visible.sync="info.isShow" width="40%" @close="close">
         <el-form :model="menuinfo" ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
             <el-form-item label="菜单类型" prop="resource">
                <el-radio-group v-model="menuinfo.type">
                    <el-radio :label="1">目录</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上级目录" prop="region" v-if="menuinfo.type==2">
                <el-select v-model="menuinfo.pid" placeholder="请选择">
                    <el-option label="顶级目录" :value="0"></el-option>
                    <el-option v-for="item in menulist" v-if="item.type==1" :key="item.id" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="menuinfo.type==2?'菜单名称':'目录名称'" prop="title">
                <el-input v-model="menuinfo.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
                <el-input v-model="menuinfo.icon" placeholder="请输入图标class"></el-input>
            </el-form-item>
            <el-form-item label="菜单地址" prop="url" v-if="menuinfo.type == 2">
                <el-input v-model="menuinfo.url" placeholder="请输入菜单地址"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="delivery">
                <el-switch v-model="menuinfo.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
            <el-form-item label=''>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
 </div>
</template>
 
<script>
import {menuAdd,menuEdit} from '@/request/menu'
import { mapGetters,mapActions } from 'vuex'
let menuinfo = {
    pid:0,
    title:'',
    icon:'',
    type:1,
    url:'',
    status:1
}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isAdd:true,
                    isShow:false
                }
            }
        }
    },
    data () {
        return {
            menuinfo:{...menuinfo},
            // 存原始表单的值，添加或修改成功后表单值为空
            resetinfo:{...menuinfo},
            rules:{
                title:[{required:true,message:'必填项',trigger:'blur'}],
                icon:[{required:true,message:'必填项',trigger:'blur'}],
                url:[{required:true,message:'必填项',trigger:'blur'}]
            }
        };
    },
    components: {},
    mounted(){
        if(!this.menulist.length){
            this.getmenulist()
        }
    },
    computed: {
        ...mapGetters({
                menulist:"menu/menulist"
            })
    },
    methods: {
        //  获取菜单列表的方法
        ...mapActions({
            getmenulist:'menu/getmenulist'
        }),
        setinfo(val){
            console.log(val);
            menuinfo = {...val};
            this.menuinfo = {...val};

        },
        //  提交
        async submit(){
            // 表单的必填项是否都填了
            await this.$refs.form.validate(async vaild=>{
                if(vaild){
                     let res;
                    // 判断如果是添加
                    if(this.info.isAdd){
                        res = await menuAdd(this.menuinfo);
                        console.log(res)
                    }else{
                        // 如果是修改
                        res = await menuEdit(this.menuinfo);
                        console.log(res);
                    }
                    if(res.code == 200){
                        // 添加或修改成功，就弹出成功的框
                        this.$message.success(res.msg);
                        // 如果添加或者修改成功，就执行一遍获取菜单列表的方法
                        this.getmenulist();
                        // 添加或修改成功，就关闭弹框
                        this.info.isShow = !this.info.isShow;
                        // 关闭弹框时，表单内容清空
                        this.menuinfo = this.resetinfo;
                    }else{
                        // 添加会修改失败，弹出失败的框
                        this.$message.error(res.msg);
                    }
                }
               
            })
            
            
        },
        //  重置
        reset(){
            // 点击重置表单数据初始化
            this.menuinfo = {...menuinfo};
        },
        close(){
            this.menuinfo = this.resetinfo;
        }
    },
}

</script>
<style scoped>

</style>
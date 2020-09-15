<!-- 角色信息 -->
<template>
 <div>
     <!-- <span>{{info.isAdd}}</span> -->
     <el-dialog :title="info.isAdd?'添加角色':'修改角色'" :visible.sync="info.isShow" width="40%"  @close="close">
         <el-form :model="roleinfo" ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
             <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="roleinfo.rolename" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色权限">
                <el-tree 
                :data="menulist"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :props="{children:'children',label:'title'}"
                :check-strictly="checkStrictly">
                </el-tree>
            </el-form-item>
            
            <el-form-item label="角色状态" prop="delivery">
                <el-switch v-model="roleinfo.status" :active-value="1" :inactive-value="2"></el-switch>
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
import {mapGetters,mapActions} from 'vuex'
import {roleadd,roleedit} from '@/request/role'
let defaultinfo = {
    rolename:'',
    menus:'',
    status:1
}
let resetItem = {...defaultinfo}
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
            roleinfo:{...defaultinfo},
            addreset:{...defaultinfo},
            rules:{  // 验证规则对象！
                rolename:[{required:true,message:"必填！",trigger:'blur'}],
            },
            checkStrictly:false
        };
    },

    components: {},

    computed: {
        ...mapGetters({
            menulist:'menu/menulist',
            rolelists:'role/rolelists'
        })
    },
    created(){
        console.log(this.menulist)
    },
    mounted(){ 
        // 如果权限列表为空，就加载菜单中的权限列表
        if(!this.menulist.length){
            this.getmenulist();
            console.log(this.roleinfo)
        }
        
    },
    methods: {
        // 获取要设置权限列表
        ...mapActions({
            // 菜单列表
           getmenulist:'menu/getmenulist',
            // 角色列表
           getrolelist:'role/getrolelist'
        }),
        // 数据回显
        setinfo(val){
            console.log(val);
            // 将权限节点，回显到树中去
            let idarr = val.menus.split(",");
            if(idarr[0]){
                this.checkStrictly = true; //父子权限不关联
                // 等到节点渲染完成在把数据渲染到树中
                this.$nextTick(()=>{
                    this.$refs.tree.setCheckedKeys(idarr);
                    this.checkStrictly = false; //回显完之后父子之间权限要关联
                })
                
            }
            defaultinfo = {...val}
            this.roleinfo = {...val};

        },
        async submit(){
            
            // 获取树形控件选中的节点
            let idarr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
            if(idarr.length){
                this.roleinfo.menus = idarr;
            }else{
                this.$message.warning('请选择权限');
                return;
            }
            // 表单验证
            this.$refs.form.validate(async valid=>{
                let res;
                if(valid){//验证通过
                    // 判断是添加还是修改
                    // console.log(this.roleinfo)
                    
                    if(this.info.isAdd){
                        console.log(this.roleinfo)
                        res = await roleadd(this.roleinfo)
                        console.log(res)
                    }else{
                        res = await roleedit(this.roleinfo)
                        console.log(res)
                    }
                }
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.info.isShow = false;
                    // 重新获取角色列表
                    this.getrolelist()
                    // 无论是添加成功还是修改成功，表单初始值都为空
                   this.close();
                    // 树没有被选中
                    this.$refs.tree.setCheckedKeys([]);
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
        close(){
            this.roleinfo = {...resetItem};
            this.$refs.tree.setCheckedKeys([]);
        },
        reset(){
            if(this.info.isAdd){
                this.roleinfo = {...resetItem};
                this.$refs.tree.setCheckedKeys([]);
            }else{
                // 点击重置也要重新走数据回显的方法
                this.setinfo(defaultinfo)
                
            }
        }
    }
}

</script>
<style scoped>
</style>
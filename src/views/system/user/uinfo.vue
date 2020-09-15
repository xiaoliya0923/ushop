<!-- 管理员信息 -->
<template>
    <el-dialog :title="info.isAdd?'添加管理员':'修改管理员'" :visible.sync="info.isShow" width="40%"  @close="close">
         <el-form :model="userinfo" ref="form" label-width="100px" class="demo-ruleForm" :rules="rules">
             <el-form-item label="管理员角色" prop="roleid">
                <el-select v-model="userinfo.roleid" placeholder="请选择角色">
                    <el-option v-for="item in rolelist"
                     :key="item.id"
                    :value="item.id"
                     :label="item.rolename">

                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="管理员名称" prop="username">
                <el-input v-model="userinfo.username" placeholder="请输入管理员名称"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" prop="password">
                <el-input v-model="userinfo.password" placeholder="请输入管理员密码"></el-input>
            </el-form-item>
            
            <el-form-item label="管理员状态" prop="status">
                <el-switch v-model="userinfo.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
            <el-form-item label=''>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
// 添加管理员
import {adduser,edituser} from '@/request/user'
import {mapActions, mapGetters, mapState} from 'vuex'
let defaultitem = {
    roleid:'',
    username:'',
    password:'',
    status:1
}
let resetitem = {...defaultitem}
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
        userinfo:{...defaultitem},
        rules:{
            roleid:[{required:true,message:'必填',trigger:'blur'}],
            username:[{required:true,message:'必填',trigger:'blur'}]
        }
    };
 },

 components: {},

 computed: {
     ...mapGetters({
         rolelist:'role/rolelists'
     })
    
 },
mounted(){
    console.log(this.rolelist)
    if(!this.rolelist.length){
        this.getrolelist()
    }
},
 methods: {
     ...mapActions({
         getrolelist:'role/getrolelist',
         getuserlists:'user/getuserlists'
     }),
    setinfo(val){
        console.log(val)
        val.password = '';
        defaultitem = {...val};
        this.userinfo = {...val};
    },
     async submit(){
        //  如果是添加管理员并且没有输入密码
        if(this.info.isAdd && !this.userinfo.password){
            this.$message.warning('请输入密码');
            return;
        }
        // 表单验证
        this.$refs.form.validate(async valid=>{
            if(valid){
                let res;
                // 添加管理员
                if(this.info.isAdd){
                    res = await adduser(this.userinfo);
                    console.log(res)
                }else{
                    // 修改管理员
                    res = await edituser(this.userinfo);
                    console.log(res);
                }
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.info.isShow = false;
                    this.getuserlists();
                    this.close()
                }else{
                    this.$message.error(res.msg)
                }
            }
        })
        
     },
     reset(){
         if(this.info.isAdd){
             this.userinfo = {...resetitem};
         }else{
             console.log(defaultitem)
             this.setinfo({...defaultitem});
         }
     },
     close(){
         this.userinfo = {...resetitem};
     }
 }
}

</script>
<style scoped>
</style>
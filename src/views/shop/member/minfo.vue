<!--  -->
<template>
 <el-dialog title='修改会员' :visible.sync="info.isShow"   width="68%">
     <el-form :model="forminfo" ref="form" label-width="100px" :rules="rules">
        <el-row>
            <el-col :span='12' :offset="5">
                <el-form-item label="用户id">
                    <el-input v-model="forminfo.uid" placeholder="请输入用户id"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="forminfo.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="forminfo.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="forminfo.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
         
         <el-row>
             <el-col :span="8" :offset="7">
                 <el-button type="primary" @click="submit">提交</el-button>
                 <el-button type="warning" @click="reset">重置</el-button>
             </el-col>
         </el-row>
     </el-form>
 </el-dialog>   
</template>

<script>

import {mapActions,mapGetters} from 'vuex';
// 提交修改表单的方法
import {editmember} from '@/request/member'
// import { delete } from 'vue/types/umd';
let defaultinfo = {
    uid:'',
    nickname:'',
    phone:'',
    password:'',
    status:1

}
let resetinfo = {...defaultinfo}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isShow:false
                }
            }
        }
    },
    data () {
        return {
            forminfo:{...defaultinfo},
            filelist:[],
            // 表单的验证规则对象
            rules:{}
        };
    },

    components: {
        
    },
    mounted(){
        this.getmemberslist();
    },
    computed: {
        ...mapGetters({
            //  获取会员列表
            memberslist:'member/memberslist',
            
        })
        
    },
 
    methods: {
        ...mapActions({
            getmemberslist:'member/getmemberslist',
        }),
        // 数据回显
        setinfo(val){
            
            defaultinfo = {...val};
            this.forminfo = {...val};

        },
        async submit(){
            this.$refs.form.validate(async valid=>{
                if(valid){ //验证通过
                    let res;
                    res = await editmember(this.forminfo);
                    if(res.code == 200){
                        this.$message.success(res.msg);
                        this.info.isShow = false;
                        this.getmemberslist();
                    }else{
                        this.$message.error(res.msg);
                    }

                }
            })

        },
        reset(){
            this.setinfo({...defaultinfo})
            
        }
    }
}

</script>
<style scoped>
</style>
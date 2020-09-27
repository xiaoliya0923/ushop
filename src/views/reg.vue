<!--  -->
<template>
    <el-row class="reg-bg">
        <el-col :span="8" class="login-box">
            <h2>注册</h2>
             <el-form ref="form" :model="forminfo" :rules='rules'>
                 <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号" v-model="forminfo.phone">
                        <template slot="prepend">
                            <i class="el-icon-phone-outline"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-input placeholder="请输入昵称" v-model="forminfo.nickname">
                        <template slot="prepend">
                            <i class="el-icon-user"></i>
                        </template>
                    </el-input>
                </el-form-item>
                 <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="forminfo.password">
                        <template slot="prepend">
                            <i class="el-icon-lock"></i>
                        </template>
                    </el-input>
                </el-form-item>
                 <el-form-item >
                    <el-button class="login-btn" type="primary" @click="reg">立即注册</el-button>
                </el-form-item>
            </el-form> 
        </el-col>
    </el-row>

 
</template>

<script>
import {reg} from '@/request/reg'
export default {
 data () {
 return {
     forminfo:{
         phone:'',
         nickname:'',
         password:''
     },
     rules:{
        nickname:[{required:true,message:'必填',trigger:'blur'}],
        phone:[{required:true,message:'必填',trigger:'blur'}],
        password:[{required:true,message:'必填',trigger:'blur'}]
    }
 };
 },

 components: {},

 computed: {},

 methods: {

     reg(){
        this.$refs.form.validate(async valid=>{
            
            let res = await reg(this.forminfo);
            if(res.code == 200){
                this.$message.success(res.msg);
                this.forminfo = {}
            }else{
                this.$message.error(res.msg);
            }
        })
        
     }
 }
}

</script>
<style scoped>
.reg-bg {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/img/bg.jpeg');
    background-size: 100vw 100vh;
}
.login-box {
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.2);
    padding: 30px 40px;
    border-radius: 5px;
    border: 1px solid #eee;
}
h2 {
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
}
.login-btn {
    display: block;
    width: 100%;
}
</style>
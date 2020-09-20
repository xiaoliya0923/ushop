<!-- 登录 -->
<template>
    <el-row class="login-bg">
        <el-col :span="8" class="login-box">
            <h3>小u商城管理系统</h3>
            <el-form ref="form" :model="forminfo" :rules='rules'>
                <el-form-item prop="username">
                    <el-input placeholder="请输入账号" v-model="forminfo.username">
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
                    <el-button class="login-btn" type="primary" @click="login">立即登录</el-button>
                </el-form-item>
            </el-form> 
            
        </el-col>
    </el-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
 data () {
    return {
        forminfo:{
            username:'oxygen',
            password:'1234'
        },
        rules:{
            username:[{required:true,message:'必填',trigger:'blur'}],
            password:[{required:true,message:'必填',trigger:'blur'}]
        }
    };
 },

 components: {},

 computed: {},

 methods: {
     ...mapActions({
         userlogin:'user/userlogin'
     }),
     login(){
         this.$refs.form.validate(async valid=>{
            if(valid){
                this.userlogin(this.forminfo)
            }
        })
         
     }
 }
}

</script>
<style scoped>
.login-bg {
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
h3 {
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
}
.login-btn {
    display: block;
    width: 100%;
}
</style>
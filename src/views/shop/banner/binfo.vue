<!-- 分类管理信息 -->
<template>
 <div>
    <el-dialog :title="info.isAdd?'添加分类':'修改分类'" :visible.sync="info.isShow" width="40%" @close="close">
         <el-form :model="bannerinfo" label-width="100px" class="demo-ruleForm" :rules='rules' ref='form'>
             <el-form-item label="轮播图名称" prop="title">
                 <el-input v-model="bannerinfo.title" placeholder="商品名称"></el-input>

             </el-form-item>
             <el-form-item label="轮播图图片">
                 <el-upload
                    action=""
                    :auto-upload="false"
                    list-type="picture-card"
                    :limit="1"
                    :on-preview="see"
                    :on-change="change"
                    :on-remove="remove"
                    :file-list="filelist"
                >
                <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
             </el-form-item>
             <el-form-item label="状态">
                 <el-switch v-model="bannerinfo.status" :active-value="1" :inactive-value="2"></el-switch>
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
import {mapGetters,mapActions} from 'vuex'
import {addbanner,editbanner} from '@/request/banner'
let bannerinfo = {
    title:'',
    img:'',
    status:1
}
let defaultinfo = {...bannerinfo}
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
            dialogImageUrl:'',
            dialogVisible:false,
            bannerinfo:{...bannerinfo},
            filelist:[],
            rules:{
                title:[{required:true,message:'必填',trigger:'blur'}]
            }
        };
    },

 components: {},
mounted(){
    if(!this.bannerlist){
        this.getbannerlists()
    }
},
 computed: {
     ...mapGetters({
         bannerlist:'banner/bannerlist'
     })
 },

 methods: {
     ...mapActions({
         getbannerlists:'banner/getbannerlists'
     }),
     see(file){
         this.dialogVisible = true;
         this.dialogImageUrl = file.url //// JS 生成的预览地址！
     },
     change(file,filelist){
         this.bannerinfo.img = file.raw;
     },
     remove(file,filelist){
         this.bannerinfo.img = ''
     },
     close(){
         this.bannerinfo = {...defaultinfo};
         this.filelist = []
     },
     async submit(){
         //addcategory
         this.$refs.form.validate(async valid=>{
             if(valid){
                 let res;
                //  获取formdata类型
                let fd = new FormData();
                for(let k in bannerinfo){
                    fd.append(k,this.bannerinfo[k])
                }
                if(this.info.isAdd){
                    // 添加
                    res = await addbanner(fd);
                }else{
                    res = await editbanner(fd);
                }
                if(res.code == 200){
                    this.$message.success(res.msg);
                    this.info.isShow = false;
                    this.getbannerlists();
                    this.close()
                }else{
                    this.$message.error(res.msg)
                }
             }
         })
     },
    //  数据回显
    setinfo(data){
        console.log(data)
        if(data.img){
            this.filelist = [{
                name:data.name,
                url:this.$host + data.img
            }]
        }
        data.children?delete data.children:''
        bannerinfo = {...data}
       this.bannerinfo = {...data};
    },
    // 重置
    reset(){
        // 添加
        if(this.info.isAdd){
            this.bannerinfo = {...defaultinfo};
            this.filelist = []
        }else{
            // 修改
            this.setinfo({...bannerinfo})
        }
        
    }
 }
}

</script>
<style scoped>
</style>
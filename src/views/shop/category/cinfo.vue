<!-- 分类管理信息 -->
<template>
 <div>
    <el-dialog :title="info.isAdd?'添加分类':'修改分类'" :visible.sync="info.isShow" width="40%" @close="close">
         <el-form :model="goodsinfo" label-width="100px" class="demo-ruleForm" :rules='rules' ref='form'>
             <el-form-item label="上级目录">
                 <el-select v-model="goodsinfo.pid" placeholder="请选择">
                     <el-option label="顶级目录" :value="0"></el-option>
                    <el-option v-for="item in categorylist" :key="item.id" :label="item.catename" :value="item.id"></el-option>
                 </el-select>
             </el-form-item>
             <el-form-item label="分类名称" prop="catename">
                 <el-input v-model="goodsinfo.catename" placeholder="商品名称"></el-input>

             </el-form-item>
             <el-form-item label="分类图片">
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
import {mapGetters,mapActions} from 'vuex'
import {addcategory,editcategory} from '@/request/category'
let goodsinfo = {
    pid:0,
    catename:'',
    img:'',
    status:1
}
let defaultinfo = {...goodsinfo}
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
            goodsinfo:{...goodsinfo},
            filelist:[],
            rules:{
                catename:[{required:true,message:'必填',trigger:'blur'}]
            }
        };
    },

 components: {},
mounted(){
    if(!this.categorylist){
        this.getcategorylists()
    }
},
 computed: {
     ...mapGetters({
         categorylist:'category/categorylist'
     })
 },

 methods: {
     ...mapActions({
         getcategorylists:'category/getcategorylists'
     }),
     see(file){
         this.dialogVisible = true;
         this.dialogImageUrl = file.url //// JS 生成的预览地址！
     },
     change(file,filelist){
         this.goodsinfo.img = file.raw;
     },
     remove(file,filelist){
         this.goodsinfo.img = ''
     },
     close(){
         this.goodsinfo = {...defaultinfo};
         this.filelist = []
     },
     async submit(){
         //addcategory
         this.$refs.form.validate(async valid=>{
             if(valid){
                 let res;
                //  获取formdata类型
                let fd = new FormData();
                for(let k in goodsinfo){
                    fd.append(k,this.goodsinfo[k])
                }
                if(this.info.isAdd){
                    // 添加
                    res = await addcategory(fd);
                }else{
                    res = await editcategory(fd);
                }
                if(res.code == 200){
                    this.$message.success(res.msg);
                    this.info.isShow = false;
                    this.getcategorylists();
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
        goodsinfo = {...data}
       this.goodsinfo = {...data};
    },
    // 重置
    reset(){
        // 添加
        if(this.info.isAdd){
            this.goodsinfo = {...defaultinfo};
            this.filelist = []
        }else{
            // 修改
            this.setinfo({...goodsinfo})
        }
        
    }
 }
}

</script>
<style scoped>
</style>
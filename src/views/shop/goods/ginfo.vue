<!--  -->
<template>
 <el-dialog :title="info.isAdd ? '添加商品':'修改商品'" @close="close"  :visible.sync="info.isShow"   width="68%">
     <el-form :model="forminfo" ref="form" label-width="100px" :rules="rules">
         <el-tabs v-model="activeName">
             <el-tab-pane label="基本信息" name="first"> 
                 <el-row>
                     <el-col :span='12' :offset="5">
                         <el-form-item label="一级分类">
                             <el-select v-model='forminfo.first_cateid' placeholder="请选择商品一级分类"  @change="topChange">
                                 <el-option v-for="item in categorylist" :key='item.id' :label="item.catename" :value="item.id"></el-option>
                             </el-select>
                         </el-form-item>
                         <el-form-item label="二级分类">
                            <el-select v-model="forminfo.second_cateid" placeholder='请选择商品二级分类'>
                                <el-option v-for="item in secondlist" :key="item.id" :label="item.catename" :value="item.id"></el-option>
                            </el-select>
                         </el-form-item>
                         <el-form-item label="商品名称">
                             <el-input v-model="forminfo.goodsname" placeholder="请输入商品名称"></el-input>
                         </el-form-item>
                         <el-form-item label="商品价格">
                             <el-input v-model="forminfo.price" placeholder="请输入商品价格"></el-input>
                         </el-form-item>
                         <el-form-item label="市场价格">
                             <el-input v-model="forminfo.market_price" placeholder="请输入市场价格"></el-input>
                         </el-form-item>
                         <el-form-item label="商品图片">
                             <el-upload
                                action=""
                                :auto-upload="false"
                                list-type="picture-card"
                                :limir="1"
                                :on-preview="see"
                                :on-change="change"
                                :on-remove="remove"
                                :file-list="filelist"
                            >
                                <i slot="default" class="el-icon-plus"></i>
                             </el-upload>
                             <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                                 <img width="100%" :src="dialogImageUrl" alt=""/>
                             </el-dialog>
                         </el-form-item>
                         <el-form-item label="商品规格">
                             <el-select v-model="forminfo.specsid" placeholder="请输入商品规格" @change="speceChange">
                                 <el-option v-for="item in specslist" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
                             </el-select>
                         </el-form-item>
                         <el-form-item label="商品属性值">
                             <el-select v-model="forminfo.specsattr" placeholder="请输入商品规格属性值" multiple>
                                 <el-option v-for="item in specsattrlist" :key="item" :label="item" :value="item"></el-option>
                             </el-select>
                         </el-form-item>

                     </el-col>
                 </el-row>
             </el-tab-pane>
             <el-tab-pane label="详细描述" name="second">
                 <el-row>
                     <el-col :span="8">
                         <el-form-item label="是否新品">
                             <el-switch v-model="forminfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
                         </el-form-item>
                     </el-col>
                     <el-col :span="8">
                         <el-form-item label="是否热卖">
                             <el-switch v-model="forminfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
                         </el-form-item>
                     </el-col>
                     <el-col :span="8">
                         <el-form-item label="状态">
                             <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
                         </el-form-item>
                     </el-col>
                     <el-col>
                         <vue-wangeditor id="editor" v-model="forminfo.description" width="100%" height="400" ref="wangeditor"></vue-wangeditor>
                         <br>
                         <br>
                         <br>
                     </el-col>
                 </el-row>

             </el-tab-pane>
         </el-tabs>
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
// 导入文本编辑器
import vueWangeditor from 'vue-wangeditor'
import {mapActions,mapGetters} from 'vuex';
// 提交修改表单的方法
import {addgoods,editgoods} from '@/request/goods'
// import { delete } from 'vue/types/umd';
let defaultinfo = {
    first_cateid:'',
    second_cateid:'',
    goodsname:'',
    price:'',
    market_price:'',
    img:'',
    description:'',
    specsid:'',
    specsattr:'',
    isnew:1,
    ishot:1,
    status:1,

}
let resetinfo = {...defaultinfo}
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
            forminfo:{...defaultinfo},
            activeName:'first',
            // 商品二级分类
            secondlist:[],
            // 规格属性
            specsattrlist:[],
            // 查看图片
            dialogVisible:false,
            // 弹框图片的地址
            dialogImageUrl:'',
            // 上传的文件列表
            filelist:[],
            // 表单的验证规则对象
            rules:{}
        };
    },

    components: {
        // 文本编辑器组件
        vueWangeditor
    },
    mounted(){
        this.getcategorylists();
        this.getspecslist();
    },
    computed: {
        ...mapGetters({
            //  获取商品分类列表
            categorylist:'category/categorylist',
            //  获取规格列表
            specslist:'spece/specslist'
        })
        
    },

    methods: {
        ...mapActions({
            getcategorylists:'category/getcategorylists',
            getspecslist:'spece/getspecslist',
            getgoodslist:'goods/getgoodslist'
        }),
        // 商品一级分类改变时
        topChange(id){
            console.log(id);
            this.secondlist = [];
            this.forminfo.second_cateid = '';
            // id为一级分类的id，根据id遍历对应一级分类,获取一级分类的二级分类
            this.categorylist.forEach(val=>{
                if(val.id == id){
                    if(val.children == undefined){
                        this.secondlist = []
                    }else{
                    this.secondlist = val.children;
                    }
                }
            })
        },
        // 商品规格发生变化时
        speceChange(id){
            console.log(id);
            this.specsattrlist = [],
            this.forminfo.specsattr = '';
            this.specslist.forEach((val)=>{
                if(val.id == id){
                    this.specsattrlist = val.attrs;
                }
            })
        },
        // 上传图片
        see(file){
            // 展示大图
            this.dialogVisible = true;
            //js生成的预览地址
            this.dialogImageUrl = file.url;
        },
        change(file,filelist){
            // 文件的地址为file.raw
            this.forminfo.img = file.raw;
            // console.log(this.forminfo.img)
        },
        // 移除图片时
        remove(file,filelist){
            //图片的信息为空
            this.forminfo.img = '';
        },
        // 数据回显
        setinfo(val){
            if(val.img){
                this.filelist = [{
                    name:val.catename,
                    url:this.$host+val.img
                }]
            }
            console.log(val);
            val.children?delete val.children:''
            // 回显示先调用一次一级分类的id和规格分类的id展示出二级分类和规格属性列表
            this.topChange(val.first_cateid)
            this.speceChange(val.specsid)
            // 后端返回的多余的值
            "firstcatename" in val ? delete val.firstcatename:''
            "secondcatename" in val ? delete val.secondcatename:''
            
            this.$nextTick(()=>{
                this.$refs.wangeditor.setHtml(val.description)
            })
            defaultinfo = {...val};
            this.forminfo = {...val};

        },
        async submit(){
            // 文本编辑器输入的内容
            this.forminfo.description = this.$refs.wangeditor.getHtml()
            this.$refs.form.validate(async valid=>{
                if(valid){ //验证通过
                    let res;
                    // 提交FormData类型
                    let fd = new FormData();
                    for(let k in this.forminfo){
                        fd.append(k,this.forminfo[k])
                    }
                    if(this.info.isAdd){
                        // 添加方法
                        res = await addgoods(fd);
                    }else{
                        //修改
                        res = await editgoods(fd);
                    }
                    if(res.code == 200){
                        this.$message.success(res.msg);
                        this.info.isShow = false;
                        this.getgoodslist();
                        this.close()
                    }else{
                        this.$message.error(res.msg);
                    }

                }
            })

        },
        reset(){
            if(this.info.isAdd){
                this.forminfo = {...resetinfo};
                this.$refs.wangeditor.setHtml('')
            }else{
                this.setinfo({...defaultinfo})
            }
        },
        close(){
            this.forminfo = {...resetinfo};
            this.filelist = [];
            this.$refs.wangeditor.setHtml('');
        }
    }
}

</script>
<style scoped>
</style>
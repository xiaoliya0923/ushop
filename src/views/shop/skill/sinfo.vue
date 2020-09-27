<!--  -->
<template>
 <el-dialog :title="info.isAdd ? '添加商品':'修改商品'" @close="close"  :visible.sync="info.isShow"   width="80%">
     <el-form :model="forminfo" ref="form" label-width="200px" :rules="rules" class="tabline">
         <el-tabs>
                 <el-row>
                     <el-col :span='16' :offset="3">
                         <el-form-item label="活动名称">
                             <el-input v-model="forminfo.title" placeholder="请输入商品名称"></el-input>
                         </el-form-item>
                         <el-form-item label="活动时间">
                             <el-date-picker
                                v-model="forminfo.begintime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            到
                            <el-date-picker
                                v-model="forminfo.endtime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                         </el-form-item>
                         <el-form-item label="一级分类">
                             <el-select v-model='forminfo.first_cateid' placeholder="请选择商品一级分类"  @change="topChange">
                                 <el-option v-for="item in categorylist" :key='item.id' :label="item.catename" :value="item.id"></el-option>
                             </el-select>
                         </el-form-item>
                         <el-form-item label="二级分类">
                            <el-select v-model="forminfo.second_cateid" placeholder='请选择商品二级分类' @change="secondchange">
                                <el-option v-for="item in secondlist" :key="item.id" :label="item.catename" :value="item.id"></el-option>
                            </el-select>
                         </el-form-item>
                         <el-form-item label="商品名称">
                            <el-select v-model="forminfo.goodsid" placeholder='请输入商品名称'>
                                <el-option v-for="item in goodlist" :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
                            </el-select>
                         </el-form-item>

                     </el-col>
                 </el-row>
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
import {mapActions,mapGetters} from 'vuex';
// 提交修改表单的方法
import {addskill,editskill} from '@/request/skill'
import {getFxGoods} from '@/request/goods'
let defaultinfo = {
    title:'',
    begintime:'',
    endtime:'',
    first_cateid:'',
    second_cateid:'',
    goodsid:'',
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
            // 商品二级分类
            secondlist:[],
            // 商品列表
            goodlist:[],
            // 表单的验证规则对象
            rules:{}
        }
    },
    components: {
    
    },
    mounted(){
        this.getcategorylists();
        this.getgoodslist();
        this.getskillslist()
    },
    computed: {
        ...mapGetters({
            //  获取商品分类列表
            categorylist:'category/categorylist',
            // 获取商品列表
            goodslist: "goods/goodslist",
        })
        
    },

    methods: {
        ...mapActions({
            getcategorylists:'category/getcategorylists',
            getgoodslist:'goods/getgoodslist',
            getskillslist:'skill/getskillslist'
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
        async secondchange(id){
            // console.log(id)
            // this.goodlist = [];
            // this.forminfo.goodsid = '';
            // // id为二级分类的id，根据id遍历对应二级分类,获取二级分类的商品分类
            // console.log(this.secondlist)
            // this.goodlist = this.goodslist.filter(val=>{
            //     if(val.second_cateid == id){
            //         return val;
            //     }
            // })
            // console.log(this.goodlist)
            let res = await getFxGoods(this.forminfo.first_cateid,this.forminfo.second_cateid)
            this.goodlist = res;
            console.log(res)
        },
        // 数据回显
        setinfo(val){
            // 时间戳转换为正常时间格式
            val.begintime = new Date(val.begintime*1);
            val.endtime = new Date(val.endtime*1);
            // 回显示先调用一次一级分类的id和规格分类的id展示出二级分类和规格属性列表
            this.topChange(val.first_cateid)
            this.secondchange(val.second_cateid)
            defaultinfo = {...val};
            this.forminfo = {...val};
        },
        async submit(){
            this.$refs.form.validate(async valid=>{
                if(valid){ //验证通过
                    console.log(this.forminfo)
                    let starttime = Date.parse(new Date(this.forminfo.begintime))
                    let overtime = Date.parse(new Date(this.forminfo.endtime))
                    // let forminfos = {...this.forminfo};
                    this.forminfo.begintime = starttime;
                    this.forminfo.endtime = overtime;
                    // console.log(forminfos)
                    let res;
                    if(this.info.isAdd){
                        // 添加方法
                        res = await addskill(this.forminfo);
                    }else{
                        //修改
                        res = await editskill(this.forminfo);
                    }
                    if(res.code == 200){
                        this.$message.success(res.msg);
                        this.info.isShow = false;
                        this.getskillslist();
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
            }else{
                this.setinfo({...defaultinfo})
            }
        },
        close(){
            this.forminfo = {...resetinfo};
        }
    }
}

</script>
<style scoped>
.tabline{
    border-top: 1px solid ;
    padding: 20px;
}
</style>
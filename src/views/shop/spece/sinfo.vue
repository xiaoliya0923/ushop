<!-- 规格信息 -->
<template>
 <el-dialog :title='info.isAdd?"添加规格":"修改规格"' :visible.sync="info.isShow" width="40%" @close="close">
     <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
         <el-form-item label="属性名" prop="specsname">
             <el-input v-model="forminfo.specsname"></el-input>
         </el-form-item>
         <el-form-item label="属性值" prop="username">
             <label v-for="(item,index) in list" :key="index">
                 <el-input style="display:inline-block;width:160px;margin-bottom:10px;" v-model="item.value" placeholder="请输入属性值"></el-input>
                 <el-button type="primary" @click="addattr" v-if="index==0">添加属性</el-button>
                 <el-button type="danger" v-else @click="delattr(index)">删除属性</el-button>
             </label>
         </el-form-item>
         <el-form-item label="状态">
             <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
         </el-form-item>
         <el-form-item label="">
             <el-button type="primary" @click="submit">提交</el-button>
             <el-button type="warning" @click="reset">重置</el-button>
         </el-form-item>
     </el-form>
 </el-dialog>
</template>

<script>
import {addspece,editspece} from '@/request/spece'
import {mapActions} from 'vuex'
let defaultinfo = {
    specsname:'',
    attrs:'',
    status:1
}
let resetinfo = {...defaultinfo};
export default {
    props:{
        info:{
            type:Object,
            default(){
                return{
                    isAdd:true,
                    isShow:false
                }
            }
        }
    },
    data () {
        return {
            forminfo:{...defaultinfo},
            list:[{value:''}],
            rules:{
                specsname:[{required:true,message:"必填！",trigger:'blur'}]

            }
        };
    },

    components: {},

    computed: {
        
    },

    methods: {
        ...mapActions({
            getspecslist:'spece/getspecslist'
        }),
        // 添加属性
        addattr(){
            this.list.push({value:''})
        },
        // 删除属性
        delattr(i){
            this.list.splice(i,1)
        },
        // 数据回显
        setinfo(val){
            console.log(val);
            // ????????
            this.list = val.attrs.map(v=>({
                value:v
            }))
            
            this.forminfo = {...val};
            defaultinfo = {...val};
        },
        async submit(){
            if(!this.list.every(val=>val.value)){
                this.$message.warning('请输入属性值');
                return
            }
            // 把list里的值给forminfo的attrs
            this.forminfo.attrs = this.list.map(val=>val.value);
            // 上传的值数组中的所有元素放入一个字符串用逗号隔开
            this.forminfo.attrs = this.forminfo.attrs.join(',');
            console.log(this.forminfo);
            this.$refs.form.validate(async valid=>{
                if(valid){
                    let res;
                    if(this.info.isAdd){
                        res = await addspece(this.forminfo);
                    }else{
                        res = await editspece(this.forminfo);
                    }
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.info.isShow = false;
                        this.getspecslist();
                    }else{
                        this.$message.error(res.msg)
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
            this.list = [{value:''}]
        }
    }
}

</script>
<style scoped>
</style>
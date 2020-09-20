import $axios from '@/common/http'

// 获取规格列表
export async function getspecelist(page=1,size=10){
    let res = await $axios.get('/specslist',{
        params:{
            page,
            size
            
        }
    });
    if(res.code == 200 && res.list){
        return res.list
    }else{
        return []
    }
}

// 添加规格
export async function addspece(data){
   return await $axios.post('/specsadd',data)
}

// 修改规格
export async function editspece(data){
   return await $axios.post('/specsedit',data)
}
//获取规格总条数
export async function allspecelist(){
   return await $axios.get('/specscount')
}

// 删除规格
export async function delspece(id){
    return await $axios.post('/specsdelete',{id})
}
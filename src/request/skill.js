import $axios from '@/common/http'


// 秒杀列表
export async function getskilllist(){
    let res = await $axios.get('/secklist');
    if(res.code == 200 && res.list){
        return res.list
    }else{
        return []
    }
} 

// 秒杀添加
export async function addskill(data){
    return await $axios.post('/seckadd',data);
}

// 秒杀修改
export async function editskill(data){
    return await $axios.post('/seckedit',data)
}
// 秒杀删除
export  async function delskill(id){
    return await $axios.post('/seckdelete',{id})
}
import $axios from '@/common/http'

// 列表
 export async function getbannerlist(){
    let res = await $axios.get('/bannerlist');
    if(res.code==200 && res.list){
        console.log(res.list)
        return res.list
    }else{
        return []
    }
 }


//  添加
export function addbanner(data){
   return $axios.post('/banneradd',data)
}

// 修改
export function editbanner(data){
    return $axios.post('/banneredit',data)
}

// 删除
export function delbanner(id){
   return $axios.post('/bannerdelete',{id});
}
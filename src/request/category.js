import $axios from '@/common/http'

// 列表
 export async function getcategorylist(){
    let res = await $axios.get('/catelist?istree=1');
    if(res.code==200 && res.list){
        return res.list
    }else{
        return []
    }
 }


//  添加
export function addcategory(data){
   return $axios.post('/cateadd',data)
}

// 修改
export function editcategory(data){
    return $axios.post('/cateedit',data)
}

// 删除
export function delcategory(id){
   return $axios.post('/catedelete',{id});
}
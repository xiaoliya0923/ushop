import $axios from '@/common/http' //封装好的axios

// 获取角色
export async function getrolelists(){
    let res = await $axios.get('/rolelist');
    console.log(res)
    // return res
    if(res.code == 200 && res.list){
        return res
    }else{
        return []
    }

}
// 添加角色
export function roleadd(data){

    return $axios.post('/roleadd',data);
}
// 修改角色
export function roleedit(data){
    return $axios.post('/roleedit',data)
}
// 删除角色
export function roledel(id){
    return $axios.post('/roledelete',{id})
}
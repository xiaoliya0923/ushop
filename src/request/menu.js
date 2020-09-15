import $axios from '@/common/http' //封装好的axios


// 获取菜单列表
export async function getMenu(){
    let res = await $axios.get('/menulist?istree=1')
    if(res.code==200 && res.list){
        // console.log(res.list)
        return res.list
    }else{
        console.log(33333)
        return [];
    }
}
// 添加菜单列表 add为添加的数据
export function menuAdd(data){
    return $axios.post('/menuadd',data)
    
}

//修改菜单列表 data为修改的数据
export function menuEdit(data){
    return $axios.post('/menuedit',data)
    
}

//删除菜单列表 id为要删除的id
export function menuDel(id){
    return $axios.post('/menudelete',{id});
    
    
}

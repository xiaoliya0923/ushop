import $axios from '@/common/http'

// 列表
 export function getcategorylist(){
    let res = $axios.get('/catelist');
    if(res.code==200 && res.list){
        return res.list
    }else{
        return []
    }
 }


//  添加
export function addcategory(data){
    $axios.post('/cateadd',data)
}

// 修改
export function editcategory(data){
    $axios.post('/cateedit',data)
}

// 删除
export function delcategory(id){
    $axios.post('/catedelete',{id});
}
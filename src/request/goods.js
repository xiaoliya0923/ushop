import $axios from '@/common/http'


// 商品列表
export async function getgoodslist(page=1,size=10){
    let res = await $axios.get('/goodslist',{
        params:{
            size,page
        }
    });
    if(res.code == 200 && res.list){
        return res.list
    }else{
        return []
    }
} 

// 商品添加
export async function addgoods(data){
    return await $axios.post('/goodsadd',data);
}

// 商品总数
export async function countgoods(){
    let res = await $axios.get('/goodscount');
    return res.list[0].total
}
// 商品修改
export async function editgoods(data){
    return await $axios.post('/goodsedit',data)
}
// 商品删除
export  async function delgoods(id){
    return await $axios.post('/goodsdelete',{id})
}
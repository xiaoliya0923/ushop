import $axios from '@/common/http'


// 会员列表
export async function memberlist(){
    let res = await $axios.get('/memberlist');
    if(res.code == 200 && res.list){
        return res.list
    }else{
        return []
    }
} 

// 会员修改
export async function editmember(data){
    return await $axios.post('/memberedit',data)
}

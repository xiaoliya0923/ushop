import $axios from '@/common/http'

// 注册
export async function reg(data){
    let res = await $axios.post('/register',data)
    if(res.code == 200){
        return res
    }else{
        return res.msg
    }
}
import $axios from '@/common/http'

// 获取管理员列表
export async function getuserlist(page=1,size=10){
    let res = await $axios.get('/userlist',{
        params:{
            size,
            page
        }
    });
    if(res.code == 200 && res.list){
        return res.list
    }else{
        return []
    }
}

// 添加管理员
export async function adduser(val){
    return await $axios.post('/useradd',val);
    
}

// 管理员总数
export async function countuser(){
    await $axios.get('/usercount')
}

// 管理员修改
export async function edituser(val){
    await $axios.post('/useredit',val)
}

// 管理员删除
export async function deluser(uid){
    
   return await $axios.post('/userdelete',{uid});
}


//管理员总数
export async function getusertotal(){
    let res = await $axios.get('/usercount');
    return res.list[0].total
}

// 管理员登录
export async function loginuser(data){
   return await $axios.post('/userlogin',data);

}
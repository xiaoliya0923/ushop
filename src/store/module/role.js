// 获取角色列表的方法
import {getrolelists} from '@/request/role'
export default {
    namespaced:true,
    state:{
        rolelist:[]
    },
    getters:{
        rolelists:state=>state.rolelist
    },
    mutations:{
        GETROLTLIST(state,val){

            state.rolelist = val
            // console.log(state.rolelist)
        }
    },
    actions:{
        // 获取列表的方法
        async getrolelist({commit}){
            let res = await getrolelists();

            // console.log(res);
            // console.log(2346);

            commit('GETROLTLIST',res.list)
        }
    }
}
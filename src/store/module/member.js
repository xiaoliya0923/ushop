import {memberlist} from '@/request/member'
export default {
    namespaced:true,
    state:{
        memberslist:[]
    },
    getters:{
        memberslist:state=>state.memberslist,
    },
    mutations:{
        GETMEMBERSLIST(state,data){
            state.memberslist = data
        }
    },
    actions:{
        // 获取会员列表
        async getmemberslist({commit}){
            let res = await memberlist();
            console.log(res);
            commit('GETMEMBERSLIST',res)

        }
        
    }
}
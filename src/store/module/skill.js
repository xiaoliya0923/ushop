import {getskilllist} from '@/request/skill'
export default {
    namespaced:true,
    state:{
        skillslist:[],
    },
    getters:{
        skillslist:state=>state.skillslist,
    },
    mutations:{
        GETSKILLSLIST(state,data){
            state.skillslist = data
        },
    },
    actions:{
        // 获取商品列表
        async getskillslist({commit}){
            let res = await getskilllist();
            console.log(res);
            commit('GETSKILLSLIST',res)

        }
    }
}
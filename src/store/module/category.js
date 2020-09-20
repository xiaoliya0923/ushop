import {getcategorylist} from '@/request/category'
export default {
    namespaced:true,
    state:{
        categorylist:[]
    },
    getters:{
        categorylist:state=>state.categorylist
    },
    mutations:{
        GETCATEGORYLIST(state,data){
            state.categorylist = data
        }
    },
    actions:{
        async getcategorylists({commit}){
            let res = await getcategorylist();
            console.log(res)
            commit('GETCATEGORYLIST',res)
        } 
    }
}
import {getbannerlist} from '@/request/banner'
export default {
    namespaced:true,
    state:{
        bannerlist:[]
    },
    getters:{
        bannerlist:state=>state.bannerlist
    },
    mutations:{
        GETBANNERLISTS(state,data){
            state.bannerlist = data
        }
    }, 
    actions:{
        async getbannerlists({commit}){
            let res = await getbannerlist();
            console.log(res)
            commit('GETBANNERLISTS',res)
        } 
    }
}
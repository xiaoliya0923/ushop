export default {
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
        async getcategorylist({commit},data){
            await getcategorylist();
            commit('GETCATEGORYLIST',data)
        }
    }
}
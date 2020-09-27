import {getspecelist,allspecelist} from '@/request/spece'

export default {
    namespaced:true,
    state:{
        specslist:[],
        size:1,
        page:1,
        allspecslist:0
    },
    getters:{
        specslist:state=>state.specslist,
        allspecslist:state=>state.allspecslist,
        size:state=>state.size,
        page:state=>state.page,
        total:state=>state.allspecslist
    },
    mutations:{
        GETSPECSLIST(state,val){
            state.specslist = val
        },
        GETALLSPECELIST(state,val){
            state.allspecslist = val
        },
        SETPAGE(state,val){
            state.page = val;
        },
        SETSIZE(state,val){
            state.size = val;
        }
    },
    actions:{
        // 页码发生变化时
        setpage({commit,dispatch},data){
            commit('SETPAGE',data);
            dispatch('getspecslist');
        },
        // 每页展示的条数发生变化时
        setsize({commit,dispatch},data){
            commit('SETSIZE',data);
            dispatch('getspecslist')
        },
        // 获取规格列表
        async getspecslist({commit,state}){
            let res = await getspecelist(state.page,state.size);
            console.log(res);
            commit('GETSPECSLIST',res)
        },
        // 获取列表总数
        async getallspecslist({commit}){
            let res = await allspecelist();
            console.log(res.list[0].total);
            commit('GETALLSPECELIST',res.list[0].total)
        }
    }
}
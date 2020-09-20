import {getgoodslist,countgoods} from '@/request/goods'
export default {
    namespaced:true,
    state:{
        goodslist:[],
        page:1,
        size:2,
        total:0
    },
    getters:{
        goodslist:state=>state.goodslist,
        page:state=>state.page,
        size:state=>state.size,
        total:state=>state.total
    },
    mutations:{
        GETGOODSLIST(state,data){
            state.goodslist = data
        },
        SET_PAGE(state,data){
            state.page = data
        },
        SET_SIZE(state,data){
            state.size = data
        },
        SET_total(state,data){
            state.total = data
        }
    },
    actions:{
        // 获取商品列表
        async getgoodslist({commit,state,dispatch}){
            let res = await getgoodslist(state.page,state.size);
            console.log(res);
            res.forEach(val => {
                val.specsattr = val.specsattr? val.specsattr.split(','):[]
            });
            commit('GETGOODSLIST',res)
            dispatch('set_total')
        },
        // 每页条数发生变化时
        set_size({commit,dispatch},data){
            commit('SET_SIZE',data)
            dispatch('getgoodslist')
        },
        //页码发生变化时
        set_page({commit,dispatch},data){
            commit('SET_PAGE',data)
            dispatch('getgoodslist')
        },
        // 商品总数
        async set_total({commit}){
            let res = await countgoods();
            // console.log(res)
            commit('SET_total',res)
        }
    }
}
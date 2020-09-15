// 获取菜单列表，引入菜单列表的方法
import {getMenu} from '@/request/menu'
export default {
    namespaced:true,
    state:{
        menulist:[],//菜单列表
    },
    getters:{
        menulist:state => state.menulist
    },
    mutations:{
        MENULIST(state,data){
            state.menulist = data
        },
        
    },
    actions:{
        // 获取菜单列表
        async getmenulist({commit}){
            let res =await getMenu();
            // console.log(res)
            commit('MENULIST',res)
        },
        
    }
}
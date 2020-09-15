import Vue from 'vue'
import Vuex from 'vuex'
 Vue.use(Vuex)



 //导入菜单模块store
import menu from './module/menu'
import role from './module/role'
import user from './module/user'
import category from './module/category'
 let store = new Vuex.Store({
     state:{
        iscollpase:false, //侧边栏是否折叠
     },
     getters:{

     },
     mutations:{
        //  是否折叠函数
        TOGGLE(state){
            console.log(11)
           state.iscollpase = !state.iscollpase
        }
     },
     actions:{
        
     },
     modules:{
        menu,role,user,category
     }
 })
 export default store
// 获取管理员列表的方法
import {getuserlist} from '@/request/user'
// 获取管理员总数
import { getusertotal } from '@/request/user';
// 获取登录接口
import {loginuser} from '@/request/user'
import {Message} from 'element-ui'
import router from '@/router'
let userinfo = localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{}
export default {
    namespaced:true,
    state:{
        userlist:[],
        page:1, //页码
        size:1, //每页多少条
        total:0,//管理员总数
        userinfo:userinfo
    },
    getters:{
        userlist:state=>state.userlist,
        page:state=>state.page,
        size:state=>state.size,
        total:state=>state.total,
        menus:state=>state.userinfo.menus,
        menus_url:state=>state.userinfo.menus_url,
        username:state=>state.userinfo.username
    },
    mutations:{
        GETUSERLISTS(state,val){
            state.userlist = val
        },
        SETPAGE(state,val){
            state.page = val;
        },
        SETSIZE(state,val){
            state.size = val;
        },
        USERTOTAL(state,val){
            state.total = val
        },
        USERINFO(state,val){
            state.userinfo = val;
            localStorage.setItem('userinfo',JSON.stringify(val));
        },
        // 退出登录
        EXIT(state){
            localStorage.removeItem('userinfo');
            state.userinfo = {};
            router.push('/login');
        }

    },
    actions:{
        // 获取管理员列表
        async getuserlists({commit,dispatch,state}){
            let res = await getuserlist(state.page,state.size);
            // console.log(res);
            commit('GETUSERLISTS',res);
            dispatch('getusertotals')
        },
        // 获取管理员总数
        async getusertotals({commit}){
            let res = await getusertotal();
            commit('USERTOTAL',res)
        },
        // 页码发生变化时
        setpage({commit,dispatch},data){
            commit('SETPAGE',data);
            dispatch('getuserlists');
        },
        // 每页展示的条数发生变化时
        setsize({commit,dispatch},data){
            commit('SETSIZE',data);
            dispatch('getuserlists');
        },
        // 管理员登录
        async userlogin({commit},data){
           let res = await loginuser(data);
           if(res.code == 200){
                Message.success = '登录成功';
                // 个人信息存储
                commit('USERINFO',res.list);
                router.push('/');
           }else{
               Message.error(res.msg);
           }
           console.log(res)
        },
        exit({commit,dispatch}){
            commit('EXIT');
            // 去调用头部标签栏的删除方法
            commit('tagslist/DEL_ALL',null,{root:true})
        }
    }
}
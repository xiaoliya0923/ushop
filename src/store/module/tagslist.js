// 获取菜单列表
import router from '@/router'
// 获取本地存储的tab列表
let taglist = localStorage.getItem('tagslist')?JSON.parse(localStorage.getItem('tagslist')):[]
export default {
    namespaced: true,
    state: {
        taglist:taglist
    },
    getters:{ 
        taglist:state=>state.taglist
    },
    mutations:{
        // 设置标签列表
        SET_TAGLIST(state,route){
            // route为当前地址完整路由信息
            // 判断当前要添加的路由是否存在，存在就不能重复添加
            let isExit = state.taglist.some(val=>val.path==route.fullPath)
            if(!isExit){
                state.taglist.push({
                    name:route.meta.title,
                    path:route.fullPath
                });
            }
            localStorage.setItem('tagslist',JSON.stringify(state.taglist));
        },
        // 删除某一个标签
        DEL_TAG(state,{idx,isActive}){
            if(isActive){
                // 如果要删除的是当前选中的,跳转到前一个标签
                state.taglist.splice(idx,1);
                // 如果删除掉地址栏还有标签
                if(state.taglist.length){
                    // 删除掉的是第一个，调到后一个标签
                    if(idx == 0){
                        router.push(state.taglist[idx].path)
                    }else{
                        // 如果删除掉的不是第一个标签,就展示前一个
                        router.push(state.taglist[idx-1].path)
                    }
                }else{
                    // 如果删除掉地址栏就没有标签了
                    router.push('/');
                }
                // taglist = state.taglist;
                

            }else{
                // 删除的不是选中的，就删除
                state.taglist.splice(idx,1);
            }
            localStorage.setItem('tagslist',JSON.stringify(state.taglist));
        },
        // 删除所有标签
        DEL_ALL(state){
            state.taglist = [];
            localStorage.removeItem('tagslist');
            router.push('/');
            
        },
        // 删除其他标签
        DEL_OTHER(state,path){
            console.log(path);
            state.taglist = state.taglist.filter(val=>val.path == path);
            localStorage.setItem('tagslist',JSON.stringify(state.taglist));
        }
    },
    actions:{

    }
}
import Vue from 'vue'
import Router from 'vue-router'
// 这段代码为了解决 element-ui 同路由强制跳转到同路由报错问题，原因是 element-ui和路由的版本冲突！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import store from '@/store'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path:'/login',
      component:()=>import('@/views/login'),
      meta:{title:'登录'}
    },
    {
      path:'/reg',
      component:()=>import('@/views/reg'),
      meta:{title:'注册'}
    },
    {
      path:'/',
      component:()=>import('@/views/Layout'),
      meta:{title:'xx管理系统'},
      redirect:'/index',
      children:[
        {
          path:'/index',
          component:()=>import('@/views/index'),
          meta:{title:'后台首页'}
        },
        {
          path:'/menu',
          component:()=>import('@/views/system/menu'),
          meta:{title:'菜单管理'}
        },
        {
          path:'/role',
          component:()=>import('@/views/system/role'),
          meta:{title:'角色管理'}
        },
        {
          path:'/user',
          component:()=>import('@/views/system/user'),
          meta:{title:'管理员管理'}
        },
        {
          path:'/banner',
          component:()=>import('@/views/shop/banner'),
          meta:{
            title:'轮播图管理'
          }
        },
        {
          path:'/category',
          component:()=>import('@/views/shop/category'),
          meta:{title:'分类管理'}
        },
        {
          path:'/goods',
          component:()=>import('@/views/shop/goods'),
          meta:{title:'商品管理'}
        },
        {
          path:'/member',
          component:()=>import('@/views/shop/member'),
          meta:{title:'会员管理'}
        },
        {
          path:'/skill',
          component:()=>import('@/views/shop/skill'),
          meta:{title:'秒杀管理'}
        },
        {
          path:'/spece',
          component:()=>import('@/views/shop/spece'),
          meta:{title:'规格管理'}
        }
      ]
    }
  ]
})



router.beforeEach((to,from,next)=>{
  // 判断要去的是不是注册页
  if(to.path == '/reg'){
    document.title = to.meta.title;
    next()
  }else if(to.path == '/login'){
    // 判断要去的是不是登录页
    document.title = to.meta.title;
    next()
  }else{
    // 不是登录页，判断是否登录
    if(localStorage.getItem('userinfo')){
      let whitelist = store.getters['user/menus_url'];
      whitelist.push('/index');
      // 判断要去的地址是否在白名单中
      if(whitelist.includes(to.path)){
        document.title = to.meta.title;
        next()
      }
    }else{ //没有登录就去登录页
      next('/login')
    }
  }

  

})
export default router

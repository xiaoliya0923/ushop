// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';  // 导入element-ui
import 'element-ui/lib/theme-chalk/index.css'; // 导入element-ui 样式
Vue.use(ElementUI); // 安装了element-ui
Vue.config.productionTip = false


// 图片前缀路径过滤器
import pixImgFilter from './filter'
for(let k in pixImgFilter){
  Vue.filter(k,pixImgFilter[k])
  
}

if(process.env.NODE_ENV == 'development'){
  // 开发环境
  Vue.prototype.$host = 'http://localhost:3030';
}
// 生产环境
if(process.env.NODE_ENV == 'production'){
  Vue.prototype.$host = ''
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import axios from 'axios'
import router from '../router';
// 创建一个axios实例
let $axios = axios.create({
    // 跨域设置时如果设置成api就自动跳http://localhost:3030/api
    baseURL:'/api',
    timeout:3000
})

//请求拦截器
$axios.interceptors.request.use(function (config) {
    // console.log(config)
    // 如果要去的是登录页
    if(config.url == '/userlogin'){
        return config;
    }else{
        let userinfo = JSON.parse(localStorage.getItem('userinfo'));
        config.headers.authorization = userinfo.token;
        return config
    }
    
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    // 403表示token过期
    if(response.data.code == 403){
        router.push('/login');
        return response.data;
    }else{
        return response.data;
    }
    
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//暴露axios实例
export default $axios

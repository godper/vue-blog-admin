
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import ElementUI from 'element-ui';

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://localhost:3000';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (store.state.token) {
        config.headers.token = store.state.token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 只返回数据
    var res = response.data;
    if (res.newtoken) {
        //更新token
        store.commit('refreshToken',res.newtoken)
    }
    if (res.status > 60000) {
        //token无效 清除缓存信息
        store.commit('userLogOut')
    }
    if (res.status > 40000) {
        //请求失败信息
        ElementUI.Message.error(res.msg);
    }
    return res;
}, function (error) {
    console.log(error)
    return Promise.reject(error)
})


export default {
    axios
}
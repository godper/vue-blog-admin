import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import base from './base'
Vue.use(base);
// use
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  store,
  axios,
  router,
  render: h => h(App)
}).$mount('#app')

/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-07 11:04:23
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-07 15:33:52
 */
import Vue from 'vue'
import App from './App.vue'
import cookie from 'vue-cookie'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'

import router from './router'
import './registerServiceWorker'
import '../public/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.filter('currency', function (value) {
  if (typeof value == "number") {
      var number = value.toFixed(2);
      return '￥' + number;
  }
})

Vue.config.productionTip = false;
Vue.prototype.$cookie = cookie;
Vue.use(ElementUI);
Vue.use(VueLazyLoad, {
    error: require('./assets/logo.jpg'),//图片加载失败时候显示的图片
    loading: require('./assets/loading.gif')//图片还未加载完成时候的loading图片
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

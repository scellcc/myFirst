import Vue from 'vue'
import App from './views/app'
import router from './router'
import * as filters from './filters'
import Request from '@/utils/request'
import store from '@/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 定义全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 定义全局http请求
Vue.prototype.request = Request

// 设置title标签
Vue.directive('title', {
  inserted: function(el) {
    document.title = el.dataset.title
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

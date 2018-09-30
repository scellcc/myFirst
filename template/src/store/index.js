import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isTopNav: true,
    title: '主页'
  }
})

export default store

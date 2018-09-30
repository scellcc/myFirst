import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'
Vue.use(Router)

import Layout from '@/views/layout/Layout'

const routers = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/book',
      children: [
        { path: 'index', component: () => import('@/views/index/Index'), meta: { title: '主页', isTopNav: true }},
        { path: 'book', component: () => import('@/views/book/Index'), meta: { title: '书籍详情', isTopNav: false }}
      ]
    }
  ]
})

routers.beforeEach((to, from, next) => {
  Store.state.isTopNav = to.meta.isTopNav
  Store.state.title = to.meta.title
  next()
})

export default routers

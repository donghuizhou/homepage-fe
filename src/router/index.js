import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from 'admin/login/login'                        // admin login
import AdminMain from 'admin/main/main'                           // admin main

import HomePage from 'homePage/index/index'                       // homePage index

import NotFound from 'components/404/404'                         // 404
import FuckBrowser from 'components/fuckBrowser/fuckBrowser'      // fuckBrowser

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/admin', name: 'adminLogin', component: AdminLogin },
    { path: '/admin/main', name: 'main', component: AdminMain },
    { path: '/homePage', name: 'homePage', component: HomePage },
    { path: '/fuckBrowser', name: 'fuckBrowser', component: FuckBrowser },
    { path: '/404', component: NotFound },
    { path: '*', redirect: {path: '/404'} }
  ]
})

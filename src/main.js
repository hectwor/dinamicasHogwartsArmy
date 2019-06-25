// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Contar from './components/Contar'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
  { path: '/dinamicas', component: Contar }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})

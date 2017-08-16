import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import AdvancedSearch from '@/views/AdvancedSearch'
import Search from '@/views/Search'
import PatentInfo from '@/views/PatentInfo'

Vue.use(Router)

import state from '../state'

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/AdvancedSearch',
      name: 'AdvancedSearch',
      component: AdvancedSearch,
      meta: { requiresAuth: true }
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      meta: { requiresAuth: true }
    },
    {
      path: '/PatentInfo/:id',
      name: 'PatentInfo',
      component: PatentInfo,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to.matched)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!state.get('isLogin')) {
      next({
        path: '/Login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router

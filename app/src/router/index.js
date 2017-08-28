import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import AdvancedSearch from '@/views/AdvancedSearch'
import Search from '@/views/Search'
import CategoryNav from '@/views/CategoryNav'
import PatentInfo from '@/views/PatentInfo'
import ValueDegree from '@/views/ValueDegree'
import ApplicantInfo from '@/views/ApplicantInfo'
import PotentialBuyer from '@/views/PotentialBuyer'
import Favor from '@/views/Favor'
import UserManagement from '@/views/UserManagement'

Vue.use(Router)

import state from '../state'

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Home'
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
      path: '/PatentInfo',
      name: 'PatentInfo',
      component: PatentInfo,
      meta: { requiresAuth: true }
    },
    {
      path: '/ValueDegree',
      name: 'ValueDegree',
      component: ValueDegree,
      meta: { requiresAuth: true }
    },
    {
      path: '/ApplicantInfo',
      name: 'ApplicantInfo',
      component: ApplicantInfo,
      meta: { requiresAuth: true }
    },
    {
      path: '/PotentialBuyer',
      name: 'PotentialBuyer',
      component: PotentialBuyer,
      meta: { requiresAuth: true }
    },
    {
      path: '/CategoryNav',
      name: 'Category',
      component: CategoryNav,
      meta: { requiresAuth: true }
    },
    {
      path: '/Favor',
      name: 'Favor',
      component: Favor,
      meta: { requiresAuth: true }
    },
    {
      path: '/UserManagement',
      name: 'UserManagement',
      component: UserManagement,
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

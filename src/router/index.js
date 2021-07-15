// Copyright(c) 2021 TECHaas.com. All rights reserved. 
//
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router

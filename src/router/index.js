import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import ShopCart from '@/components/ShopCart/ShopCart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart
    }
  ]
})

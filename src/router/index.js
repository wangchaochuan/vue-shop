/*
 * @Descripttion: 
 * @version: 
 * @Author: wangchaochuan
 * @Date: 2019-11-07 11:51:48
 * @LastEditors: wangchaochuan
 * @LastEditTime: 2019-11-08 06:46:11
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Address from '../views/Address'
import ShoppingCart from '../views/ShoppingCart'
import ConfirmOrder from '../views/ConfirmOrder'
import Payment from '../views/Payment'
import Success from '../views/Success'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/shoppingCart',
        name: 'shoppingCart',
        component: ShoppingCart
    },
    {
        path: '/address',
        name: 'address',
        component: Address
    },
    {
        path: '/confirmOrder',
        name: 'confirmOrder',
        component: ConfirmOrder
    },
    {
        path: '/payment',
        name: 'payment',
        component: Payment
    },
    {
        path: '/success',
        name: 'success',
        component: Success
    },
    {
        path: '*',
        redirect: {name: 'home'}
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path != '/') {
        const userName = Vue.prototype.$cookie.get('userName');
        if (!userName) {
            Vue.prototype.$message('您没有访问当前页面的权限,请先登录!');
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router
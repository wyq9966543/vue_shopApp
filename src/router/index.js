
import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from "../pages/MSite/MSite";
import Order from "../pages/Order/Order";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";
import Login from "../pages/Login/Login";
import MessageLogin from "../pages/Login/MessageLogin/MessageLogin";
import PasswordLogin from "../pages/Login/PasswordLogin/PasswordLogin";

//声明使用插件
Vue.use(VueRouter)
//解决在路由跳转的时候同一个路由多次添加不被允许的问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new VueRouter({
    //所有路由
    routes: [
        {
            path: '/msite',
            component: MSite,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/',
            redirect:'/msite'
        },
        
        {
            path: '/login',
            component: Login,
            children: [
                {
                    path: '/login/messageLogin',
                    component: MessageLogin
                },
                {
                    path: '/login/passwordLogin',
                    component: PasswordLogin
                },
                {
                    path: '/',
                    component: MessageLogin
                }
            ]
        },
    ]
})
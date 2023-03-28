import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router"
import Index from '@/views/Index/Index.vue'
import { get } from "lodash"

// 基础模块路由配置
type RouteRecordRawExt = RouteRecordRaw & {children?: RouteRecordRawExt[]}

let giAllRouters: RouteRecordRawExt[] = []

export const initRouter: () => Router = () => {
    let routes: RouteRecordRawExt[] = [
        {path: '/', redirect: '/index'},
        {
            path: '/index',
            name: 'index',
            component: Index,
            meta: {
                title: lpk('page.index.Title'),
                requireAuth: false,
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('@/views/Index/Home.vue'),
                    meta: {
                        requireAuth: false,
                    }
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/views/My/My.vue'),
                    meta: {
                        title: lpk('page.my.Title'),
                    }
                }
            ]
        },
        // 登陆路由
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login/Login.vue'),
            meta: {
                title: lpk('page.login.Title'),
                requireAuth: false,
            }
        },
        // 注册路由
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Login/Register.vue'),
            meta: {
                title: lpk('page.register.Title'),
                requireAuth: false,
            }
        },
        // page not found
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: () => import('@/views/NotFound.vue'),
        }
    ]

    const iRouter = createRouter({
        history: createWebHistory(),
        routes
    })

    iRouter.afterEach((to, from, failure) => {
        const title = get(to, 'meta.title', '') as string
        title && (document.title = title)
    })
    return iRouter
}

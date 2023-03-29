import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router"
import Index from '@/views/Index/Index.vue'
import { get } from "lodash"
import { ROUTER_VIEW_KEY } from "@/utils/Constants"


// 基础模块路由配置
type RouteRecordRawExt = RouteRecordRaw & {children?: RouteRecordRawExt[]}

let giAllRoutes: RouteRecordRawExt[] = []

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
                hostRouterViewKey: ROUTER_VIEW_KEY.Index,
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
    ]

    // 聚合业务模块路由信息
    routes = routes.concat(app.getAllBModRoutes())

    // page not found
    routes.push({
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    })
    
    giAllRoutes = routes
    gatherBelongToRoute()
    console.log(routes);
    

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


//! 收集所有"宿主RouterView"对应的各业务模块注册的"属于子路由"
const gatherBelongToRoute = () => {
    const _Do = (hostRoute: RouteRecordRawExt, giRoutes: RouteRecordRawExt[]) => {
        const stHoldRouterViewKey = get(hostRoute, 'meta.hostRouterViewKey')
        if (!stHoldRouterViewKey || !giRoutes.length){
            return
        }

        for (let i=0; i<giRoutes.length;){
            const iFindItem = giRoutes[i]
            // 宿主路由为将要查找路由数组中的一员, 则停止查找
            if (hostRoute == iFindItem){
                i++
                continue;
            }

            if (stHoldRouterViewKey == get(iFindItem, 'meta.belongToRouterViewKey')){
                hostRoute.children = hostRoute.children || []
                hostRoute.children.push(iFindItem)
                giRoutes.splice(i, 1)
            } else {
                iFindItem.children && (_Do(hostRoute, iFindItem.children))
                i++
            }
        }
    }

    giAllRoutes.map(item => _Do(item, giAllRoutes))
}
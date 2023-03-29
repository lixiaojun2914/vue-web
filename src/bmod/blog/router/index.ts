import sysCfg from "../config/sysCfg"
import { RouteRecordRaw } from "vue-router"
import { ROUTER_VIEW_KEY } from "@/utils/Constants"

export const initRoutes = () => {
    const stPath = `/${sysCfg.module}`
    const giRoutes: RouteRecordRaw[] = [
        {
            name: `${sysCfg.module}Index`,
            path: stPath,
            meta: {
                title: lpk('Blog'),
                requireAuth: false,
                belongToRouterViewKey: ROUTER_VIEW_KEY.Index,
            },
            component: () => import('../views/Index/Index.vue')
        },
        {
            name: 'articleDetail',
            path: `${stPath}/article/detail/:id`,
            meta: {
                requireAuth: false,
            },
            component: () => import('../views/article/Detail/ArticleDetail.vue')
        },
        {
            name: 'editArticle',
            path: `${stPath}/edit`,
            meta: {
                title: lpk('page.blog.article.edit'),
            },
            component: () => import('../views/article/Edit/EditArticle.vue')
        }
    ]
    app.registerBModRoute(giRoutes)
}
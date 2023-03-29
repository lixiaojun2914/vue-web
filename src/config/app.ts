import { RouteRecordRaw } from 'vue-router'
import sysCfg, {ISysCfg, ISysCfgBModItem} from './syscfg'
import appCtl from '@/controller/AppCtl'
import { isArray } from 'lodash'

// 存放所有业务模块对应的路由信息
let giAllBModRoutes: RouteRecordRaw[] = []
interface IBModRouterOper{
    registerBModRoute(mixRoute: RouteRecordRaw[] | RouteRecordRaw): void
    getAllBModRoutes(): RouteRecordRaw[];
}

const routeBModRouterOper: IBModRouterOper = {
    registerBModRoute(mixRoute) {
        if(!mixRoute) {
            return
        }
        if(isArray(mixRoute)) {
            giAllBModRoutes = giAllBModRoutes.concat(mixRoute)
            return
        }
        giAllBModRoutes.push(mixRoute)
    },
    getAllBModRoutes() {
        return giAllBModRoutes
    },
}

const app = {
    // 业务模块路由相关操作
    ...routeBModRouterOper,

    getConfig<T>(key: keyof ISysCfg): T {
        return sysCfg[key] as unknown as T
    },

    //! 判断是否启用了制定的业务模块
    checkBmodIsEnable(stModName: string) {
        const bmodNames: ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>('bmodNames')
        if(bmodNames.find(item => item.name == stModName && item.enable)) {
            return true
        }
        return false
    },
    getAppCtl() {
        return appCtl
    }
}

export type IApp = typeof app

export default app
import sysCfg from "./config/sysCfg"
import { initRoutes } from "./router"

const stModuleName = sysCfg.module

export const entryInit = async () => {
    // 如果未启用，终止初始化
    if(!app.checkBmodIsEnable(stModuleName)){
        return
    }
    // 初始化当前状态语言包
    app.getAppCtl().mergeLpk(import.meta.glob('./locales/*', {eager: true}))

    console.log(lpk('Blog'))
    // 初始化当前模块配置信息

    // 初始化当前模块状态管理信息

    // 初始化当前模块路由信息
    initRoutes()
}

export default {}
import { App } from 'vue'
import app from "./app";
import Tools from "@/utils/Tools";
import { lpk, initLpk } from "./lpk";
import { initLoginUserInfo } from '@/controller/AppCtl' 
import { includeBooleanAttr } from "@vue/shared";

// 声明全局变量相关类型
type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax' | 'sddd'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

const iGlobalVars: IGlobalVars = {
    app, // 全局应用对象，包含全局数据和操作方法
    Tools, // 全局工具库支持
    lpk,    // 全局语言包支持
}

Object.keys(iGlobalVars).forEach(stKey => {
    (window as any)[stKey as IGlobalVarsKey] = iGlobalVars[stKey as IGlobalVarsKey]
})

export const initApp = async () => {
    // 初始化基础业务相关信息
    await initLoginUserInfo()
    initLpk()

    // ...

    // 业务模块初始化
    const iAllEntry: GlobalType.IRcord = import.meta.glob('@/bmod/*/entry.ts', {eager: true})
    for(const path in iAllEntry) {
        const iEntryFile =  iAllEntry[path]
        iEntryFile && iEntryFile.entryInit && await iEntryFile.entryInit()
    } 
}

// 注册全局组件
export const initGlobalComponents = (uiApp: App<Element>) => {
    const iALLGlobalComponents: GlobalType.IRcord = import.meta.glob('@/components/*/src/*.vue', {eager: true})
    Object.keys(iALLGlobalComponents).map((path: string)=> {
        const paths = path.split('/')
        const stCmpName = paths[paths.length - 3]
        uiApp.component(stCmpName, iALLGlobalComponents[path].default)
    })
}
import { App } from 'vue'
import app from "./app";
import Tools from "@/utils/Tools";
import { lpk, initLpk } from "./lpk";
import { initLoginUserInfo } from '@/controller/AppCtl' 
import { initTheme } from './theme'

// 声明全局变量相关类型
type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
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

    // 初始化样式主题
    // 方法1. 针对不同的主题书写不同的样式文件，根据当前主题，到server端加载样式文件
    // 方法2. 通过SCSS变量和mixin实现主题定制
    // 方法3. 通过CSS变量实现主题定制
    initTheme()

    // 初始化语言包
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
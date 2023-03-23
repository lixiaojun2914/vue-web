import app from "./app";
import Tools from "@/utils/Tools";
import { lpk, initLpk } from "./lpk";

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
    initLpk()
}
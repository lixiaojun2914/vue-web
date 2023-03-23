import { get, isArray } from "lodash"
import { LOCALE_OPTIONS } from "@/utils/Constants"

const stLocalStorageName = 'locale' // 存储语言环境字段名称
const tblLpk: Record<string, string | string[]> = {} // 缓存语言包内容

export const initLpk = () => {
    mergeLpk(import.meta.glob('@/locales/*', {eager: true}))
}

export const getLocale: () => string = () => {
    const stDefaultLocale = 'zh-CN'
    let stLanguage: string | undefined

    // 1. 优先从登录者自定义信息中获取语言环境
    stLanguage = get(app.getAppCtl().getLoginUser(), 'cust.locale')

    // 2. 其次从本地存储中获取
    stLanguage = stLanguage || Tools.LocalStorage.getItem(stLocalStorageName)

    // 3. 最终使用默认语言包
    stLanguage = stLanguage || stDefaultLocale

    return stLanguage
}

type ILpkFile = {
    [path: string]: {
        default: Record<string, string|string[]>
    }
}

export const mergeLpk = (importLpkFiles: ILpkFile) => {
    const stLocaleLanguage = getLocale()
    for(const path in importLpkFiles) {
        if(path.indexOf(stLocaleLanguage)==-1) {
            continue
        }

        const {default: iLpkFileItem} = importLpkFiles[path]
        for(const stLpkKey in iLpkFileItem) {
            tblLpk[stLpkKey] = iLpkFileItem[stLpkKey]
        }
    }
}

export type IFnLpk = (key: string, option?: {index?: number, default?: string}) => string
export const lpk: IFnLpk = (key, option={}) => {
    const mixValue = tblLpk[key]
    if(isArray(mixValue)) {
        if(!mixValue.length) {
            return option.default || key
        }
        return mixValue[option.index || 0] || key
    }

    return mixValue || option.default || key
}

export const changeLocale = (stLocale: string) => {
    if(!LOCALE_OPTIONS.find(stLocalItem => stLocalItem==stLocale)) {
        return
    }
    // 1. 如果用户已登陆， 那么调用用户自定义语言环境
    // 2. 在本地缓存最新的语言包
    Tools.LocalStorage.setItem(stLocalStorageName, stLocale)

    // 3. 重新加载页面
    document.location.reload()
}
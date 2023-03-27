import { THEME_OPTIONS } from '@/utils/Constants'
import { get } from 'lodash'
// 系统主题定义

const stThemeStorageName: string = 'theme' // 存储主题字段名称
const stDefaultTheme: string = THEME_OPTIONS[0] // 默认主题
let stCurTheme: string  = ''


export const initTheme = () => {
    changeTheme(getTheme(), false)
}

// 切换主题
export const changeTheme = (stArgTheme: string, bIsNeedSave: boolean = true) => {
    // 不支持的主题以及正在使用的主题直接返回
    if(!THEME_OPTIONS.find(stThemeItem => stArgTheme == stThemeItem)) {
        return
    }

    document.documentElement.setAttribute('data-theme', stArgTheme)


    if(!bIsNeedSave || stArgTheme == stCurTheme) {
        return
    }

    stCurTheme = stArgTheme

    // 1. 如果用户已登陆，更新用户自定义的主题
    // 2. 在本地保存主题
    Tools.LocalStorage.setItem(stThemeStorageName, stCurTheme)
}

// 获取当前正在使用的主题
export const getTheme = (): string => {
    if(stCurTheme) {
        return stCurTheme
    }

    const iLoginUser = app.getAppCtl().getLoginUser()

    // 优先从登陆者的自定义信息中获取
    stCurTheme = get(iLoginUser, 'cust.theme', stCurTheme)
    // 其次从本地存储中获取
    stCurTheme = stCurTheme || Tools.LocalStorage.getItem(stThemeStorageName)
    // 最终使用默认主题
    stCurTheme = stCurTheme || stDefaultTheme
    
    return stCurTheme
}
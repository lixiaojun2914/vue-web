import mdlUserApi, { IUser } from "@/api/UserApi"
import { mergeLpk, changeLocale } from "@/config/lpk"
import { changeTheme } from "@/config/theme"
import { LOGIN_TOKEN } from "@/utils/Constants"

let iLoginUser: IUser = {} as IUser

export const initLoginUserInfo = async () => {
    if(Tools.Cookie.getItem(LOGIN_TOKEN)) {
        iLoginUser = await mdlUserApi.getSelfInfo()
        console.log('iLoginUser: ', iLoginUser)
    }
}

export default {
    getLoginUser() {
        return iLoginUser
    },
    changeLocale,
    mergeLpk,
    changeTheme,
}
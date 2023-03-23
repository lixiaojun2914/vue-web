import { IUser } from "@/api/UserApi"
import { changeLocale } from "@/config/lpk"

let iLoginUser: IUser = {} as IUser

export default {
    getLoginUser() {
        return iLoginUser
    },
    changeLocale
}
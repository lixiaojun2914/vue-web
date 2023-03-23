import cookies from "js-cookie"

const iTools = {
    Router: { // 路由操作

    },
    Store: { // 状态管理

    },
    LocalStorage: { // 本地存储
        setItem(key: string, value: any) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        getItem(key: string): any {
            const stValue = localStorage.getItem(key)
            try {
                return JSON.parse(stValue as string)
            } catch (e) {
                return stValue
            }
        },
        removeItem(key: string) {
            localStorage.removeItem(key)
        }
    },
    Cookie: { // Cookie操作
        setItem(key: string, value: any) {
            cookies.set(key, value, {expires: 30})
        },
        getItem(key: string, defaultValue?: any) {
            const stValue = cookies.get(key) || defaultValue
            try {
                return JSON.parse(stValue)
            } catch (e) {
                return stValue
            }
        },
        removeItem(key: string) {
            cookies.remove(key)
        }
    },
    Time: {

    },
    Dom: {

    },
}

export type ITools = typeof iTools

export default iTools
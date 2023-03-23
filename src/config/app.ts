import sysCfg, {ISysCfg, ISysCfgBModItem} from './syscfg'
import appCtl from '@/controller/AppCtl'

const app = {
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
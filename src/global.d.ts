import { IApp } from "@/config/app";
import { ITools } from "@/utils/Tools";
import { IFnLpk } from "@/config/lpk";

declare global{
    declare namespace GlobalType{
        type IKey = string | number;
        type IRcord = Record<IKey, any>;
    }

    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk
    

    interface Window{
        app: IApp
        Tools: ITools
        lpk: IFnLpk
    }
}


declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp
        Tools: ITools
        lpk: IFnLpk
    }
}

export {

}
export interface ISysCfgBModItem{
    name: string; // 模块名称
    enable: boolean; // 是否启用   
}

export interface ISysCfg {
    baseUrl: string; // 主机地址 和 监听端口
    bmodNames: ISysCfgBModItem[];
}

const iSysCfg: ISysCfg = {
    baseUrl: 'http://127.0.0.1:8080',
    bmodNames:[{
        name: 'blog',
        enable: true,
    }]
}

export default iSysCfg
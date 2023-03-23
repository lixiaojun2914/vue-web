import { createApp } from 'vue'
import App from './App.vue'
import { initApp } from '@/config/init'

import 'normalize.css/normalize.css'
import './assets/fonts/iconfont.css'
import './assets/styles/global.scss'


(async()=>{
    // 初始化系统配置信息
    // 1. 全局变量app， 语言包lpk，ajax，tools定义
    // 2. 异步加载基础模块配置信息
    // 3. 异步加载业务模块，并完成初始化
    initApp()

    // 初始化UI
    const uiApp = createApp(App)

    // 注册全局组件

    // 向根组建绑定全局对象 
    uiApp.config.globalProperties.app = window.app
    uiApp.config.globalProperties.Tools = window.Tools
    uiApp.config.globalProperties.lpk = window.lpk
    
    // 初始化状态管理与路由并渲染根组件

    uiApp.mount('#app')
})()
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Wellcome from './pages/Wellcome'
import Chat from './pages/Chat'
import { createRouter, createWebHistory } from 'vue-router'


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Wellcome },
  { path: '/chat', component: Chat },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
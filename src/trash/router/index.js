import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from "@/components/MainWindow.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheWelcome
  },
  // 添加更多的路由
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
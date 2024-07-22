import {createRouter, createWebHashHistory} from 'vue-router'
import {DataAnalysis, Document, HomeFilled, MapLocation} from "@element-plus/icons-vue";

const routes = [{
    path: '', meta: {
        needLogin: true
    }, component: () => import('@/view/layout/index.vue'), children: [{
        path: '/Purpose', name: 'Purpose', icon: HomeFilled, component: () => import('@/view/overview/Overview.vue')
    }, {
        path: '/Model', name: 'Model', icon: DataAnalysis, component: () => import('@/view/performance/Performance.vue')
    }, {
        path: '/Plan', name: 'Plan', icon: MapLocation, component: () => import('@/view/settings/Settings.vue')
    }, {
        path: '/Organized', name: 'Organized', icon: Document, children: [{
            path: 'Interact', name: 'Interact', component: () => import('@/view/logging/SystemLog.vue')
        }, {
            path: 'Diffuse', name: 'Diffuse', component: () => import('@/view/logging/ModuleLog.vue')
        }]
    }]
}, {
    path: '/login', name: 'Login', component: () => import('@/view/login/index.vue')
},]

const router = createRouter({
    history: createWebHashHistory(), routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        const token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
})

export default router
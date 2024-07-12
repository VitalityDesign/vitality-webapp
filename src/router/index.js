import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
    path: '/', redirect: '/overview'
}, {
    path: '/', children: [{
        path: 'overview', component: () => import('@/view/overview/Overview.vue')
    }, {
        path: 'performance', component: () => import('@/view/performance/Performance.vue')
    }, {
        path: 'settings', component: () => import('@/view/settings/Settings.vue')
    }, {
        path: 'logging', children: [{
            path: 'system', component: () => import('@/view/logging/SystemLog.vue')
        }, {
            path: 'module', component: () => import('@/view/logging/ModuleLog.vue')
        }]
    }]
}]

const router = createRouter({
    history: createWebHashHistory(), routes
})

export default router
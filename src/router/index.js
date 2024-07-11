import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
    path: '/', redirect: '/overview'
}, {
    path: '/', children: [{
        path: 'overview', component: () => import('@/components/pages/PageOverview.vue')
    }, {
        path: 'performance', component: () => import('@/components/pages/PagePerformance.vue')
    }, {
        path: 'settings', component: () => import('@/components/pages/PagePerformance.vue')
    }, {
        path: 'logging', children: [{
            path: '/', component: () => import('@/components/pages/PagePerformance.vue'),
        }, {
            path: 'system', component: () => import('@/components/pages/PagePerformance.vue')
        }, {
            path: 'module', component: () => import('@/components/pages/PagePerformance.vue')
        }]
    }]
}]

const router = createRouter({
    history: createWebHashHistory(), routes
})

export default router
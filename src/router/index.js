import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
    path: '/', name: 'Home', meta: {
        needLogin: true
    }, component: () => import('@/view/layout/index.vue'), children: [{
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
import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/index.vue')
        },
        {
            path: '/normal-list',
            component: () => import('../views/normal-list.vue')
        },
        {
            path: '/virtual-list',
            component: () => import('../views/virtual-list.vue')
        },
        {
            path: '/waterfall-normal-list',
            component: () => import('../views/waterfall-normal-list.vue')
        },
        {
            path: '/waterfall-virtual-list',
            component: () => import('../views/waterfall-virtual-list.vue')
        }
    ]
});

export default router;

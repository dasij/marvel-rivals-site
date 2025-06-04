import { createRouter, createWebHistory } from 'vue-router'
import HeroList from '@/views/HeroList.vue'
import HeroDetail from '@/views/HeroDetail.vue'
import MainPage from '@/components/MainPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage
    },
    {
        path: '/heroes',
        name: 'HeroList',
        component: HeroList
    },
    {
        path: '/heroes/:id',
        name: 'HeroDetail',
        component: HeroDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
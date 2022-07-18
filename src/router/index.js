import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import SelectCity from "../views/SelectCity";

const routes = [
    {
        path: '/',
        redirect: {
            name: 'home',
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path:'/select-city',
        name: 'select-city',
        component: SelectCity
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

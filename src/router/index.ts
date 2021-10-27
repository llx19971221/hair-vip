import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("@/page/Home/index.vue")
const Login = () => import("@/page/Login.vue")
const NotFound = () => import("@/page/404.vue")
const Member = () => import("@/page/Home/Member/index.vue")
export const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: 'member',
                name: 'member',
                component: Member,
                zhName: "会员",
                icon: "user"
            },
            // {
            //     path: 'member1',
            //     name: 'member2',
            //     component: Member,
            //     zhName: "会员3",
            //     icon: "user"
            // },
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: Login
            // },
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: Login
            // },
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: Login
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router
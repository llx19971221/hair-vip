import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("@/page/Home/index.vue")
const Login = () => import("@/page/Login.vue")
const NotFound = () => import("@/page/404.vue")
const Member = () => import("@/page/Home/Member/index.vue")
const FullMember = () => import("@/page/Home/Member/FullMember.vue")
export const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: '',
                name: 'member',
                component: Member,
                zhName: "会员",
                icon: "postcard",
                children: [
                    {
                        path: '',
                        name: "fullMember",
                        component: FullMember,
                        zhName: "正式会员",
                        icon: "",
                        children: [
                            
                        ]
                    }, 
                ]
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
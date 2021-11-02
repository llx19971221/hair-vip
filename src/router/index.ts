import { createRouter, createWebHistory } from "vue-router"

const Home = () => import("@/page/Home/index.vue")
const Login = () => import("@/page/Login.vue")
const NotFound = () => import("@/page/404.vue")
const Member = () => import("@/page/Home/Member/index.vue")
const FullMember = () => import("@/page/Home/Member/FullMember.vue")
const Goods = () => import("@/page/Home/Goods/Goods.vue")
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
            {
                path: 'goods',
                name: 'goods',
                component: Goods,
                zhName: "商品管理",
                icon: "goods"
            },
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
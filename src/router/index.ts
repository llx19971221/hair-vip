import { createRouter, createWebHistory } from "vue-router"
const publicPath = process.env.NODE_ENV === "production" ? "/" : "/"
const Home = () => import("@/page/Home/index.vue")
const Login = () => import("@/page/Login.vue")
const NotFound = () => import("@/page/404.vue")
const Member = () => import("@/page/Home/Member/index.vue")
const FullMember = () => import("@/page/Home/Member/FullMember.vue")
const Goods = () => import("@/page/Home/Goods/Goods.vue")
const Achievement = () => import("@/page/Home/Achievement/index.vue")
const AchievementDetail = () => import("@/page/Home/Achievement/detail.vue")
export const routes = [
    {
        path: publicPath,
        name: "home",
        component: Home,
        children: [
            {
                path: '',
                name: 'member',
                component: Member,
                zhName: "会员",
                icon: "postcard",
                meta: { index: '0' },
                children: [
                    {
                        path: '',
                        name: "fullMember",
                        component: FullMember,
                        zhName: "正式会员",
                        icon: "",
                        meta: { index: '0-0' },
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
                meta: { index: '1' },
                icon: "goods"
            },
            {
                path: 'achievement',
                name: 'achievement',
                component: Achievement,
                zhName: "劳动业绩",
                meta: { index: '2' },
                icon: "money"
            },
            {
                path: 'achievementDetail/:kind/:date',
                name: 'achievementDetail',
                component: AchievementDetail,
                zhName: "劳动详情",
                meta: { index: '2' },
                icon: "money"
            }
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
        path: publicPath + 'login',
        name: 'login',
        component: Login
    },
    {
        path: publicPath + ':pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(publicPath),
    routes,
});

export default router
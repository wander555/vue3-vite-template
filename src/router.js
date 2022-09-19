import { createRouter, createWebHashHistory } from "vue-router";
import { useIndexStore } from "@/store";

const routes = [{
        path: "/",
        redirect: "/tabBar", //默认显示
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录",
            keepAlive: true,
        },
        component: () => import("@/views/Login/login.vue"),
    },
    {
        path: "/tabBar",
        name: "tabBar",
        meta: {
            title: "首页",
            keepAlive: true,
            // requiresAuth: true,
        },
        component: () => import("@/views/TabBar/tabBar.vue"),

        children: [{
                path: "/1",
                name: "tabBar1",
                meta: {
                    title: "tabBar1",
                    keepAlive: true,
                    // requiresAuth: true,
                },
                component: () => import("@/views/Form/validForm.vue"),
            },

            {
                path: "/2",
                name: "tabBar2",
                meta: {
                    title: "tabBar2",
                    keepAlive: true,
                    // requiresAuth: true,
                },
                component: () => import("@/views/List/listInfo.vue"),
            },

            {
                path: "/3",
                name: "tabBar3",
                meta: {
                    title: "tabBar3",
                    keepAlive: true,
                    // requiresAuth: true,
                },
                component: () => import("@/views/MyInfo/myInfo.vue"),
            },
        ],
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        //store
        const indexStore = useIndexStore();
        //这里判断用户是否登录，验证本地存储是否有token
        if (!indexStore.userInfo.name) {
            // 判断当前的token是否存在
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

export default router;
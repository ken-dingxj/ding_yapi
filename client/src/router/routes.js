/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-02-16 21:22:06
 * @LastEditTime: 2020-03-17 15:36:29
 * @LastEditors: dingxuejin
 */
import { lazy } from "react";

const Home = lazy(() => import("@/pages/home/home"));
const Login = lazy(() => import("@/pages/login/login"));
const Group = lazy(() => import("@/pages/group/group"));
const User = lazy(() => import("@/pages/user/user"));

export default {
    home: {
        path: "/",
        component: Home
    },
    login: {
        path: "/login",
        component: Login
    },
    group: {
        path: "/group",
        component: Group
    },
    user: {
        path: "/user/:id",
        component: User
    }
};

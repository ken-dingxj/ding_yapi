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

export default {
    home: {
        path: "/",
        component: Home
    },
    login: {
        path: "/login",
        component: Login
    }
};

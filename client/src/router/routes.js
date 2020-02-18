/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-02-16 21:22:06
 * @LastEditTime: 2020-02-16 21:22:06
 * @LastEditors: dingxuejin
 */
import {lazy} from 'react';

const Home = lazy(() => import('@/pages/Home'));

export default[
    {
        path:'/',
        component:NotFound
    }
]
    

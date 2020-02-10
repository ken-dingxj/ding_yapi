/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:15:53
 * @LastEditTime : 2020-02-09 22:36:29
 * @LastEditors  : dingxuejin
 */
import React from 'react';
import {Router,Route} from 'react-router-dom';
import Home from '@/pages/home/home';
import Group from '@/pages/group/group';
import Header from '@/components/header/header';
import {requireAuthentication} from '@/components/authenticatedComponent/authenticatedComponent';
import {history} from '@/router'

//方案一
 let AppRoute={
    home:{
        path:'/',
        component:Home
    },
    group:{
        path:'/group',
        component: Group
    }
//     project: {
//         path: '/project/:id',
//         component: Project
//     }
 }
class App extends React.PureComponent{
    render(){
        return (
          <Router history={history}>
            <Header></Header>
            {Object.keys(AppRoute).map(key=>{
                let item = AppRoute[key];
                return key === 'login'?
                  <Route key={key} path={item.path} component={item.component} />
                :key === 'home'?
                  <Route key={key} exact path={item.path} component={item.component} />
                :<Route key={key} path={item.path} component={item.component}/>
            })}  
          </Router>
        )
    }
}

export default App;
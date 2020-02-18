/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:15:53
 * @LastEditTime: 2020-02-17 21:43:48
 * @LastEditors: dingxuejin
 */
import React from 'react';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Home from '@/pages/home/home';
import Footer from '@/components/footer/footer';
import {requireAuthentication} from '@/components/authenticatedComponent/authenticatedComponent';

//方案一
 let AppRoute={
    home:{
        path:'/',
        component:Home
    }
 }
class App extends React.PureComponent{
    render(){
        return (
          <Router>
            {Object.keys(AppRoute).map(key=>{
                let item = AppRoute[key];
                return key === 'login'?
                  <Route key={key} path={item.path} component={item.component} />
                :key === 'home'?
                  <Route key={key} exact path={item.path} component={item.component} />
                :<Route key={key} path={item.path} component={item.component}/>
            })}  
            <Footer></Footer>
          </Router>
        )
    }
}

export default App;
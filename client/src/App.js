/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:15:53
 * @LastEditTime : 2020-01-28 23:01:14
 * @LastEditors  : dingxuejin
 */
import React from 'react';
import {Router,Switch,Route} from 'react-router-dom';
import Home from '@/pages/home/home';
import {history} from '@/router'

class App extends React.PureComponent{
    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path='/' component={Home}></Route>  
                </Switch>
            </Router>
        )
    }
}

export default App;
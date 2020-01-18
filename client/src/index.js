/*
 * @Description: 主入口
 * @Author: dingxuejin
 * @Date: 2020-01-02 09:35:29
 * @LastEditTime : 2020-01-02 17:55:30
 * @LastEditors  : dingxuejin
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '@/global.scss';
import App from '@/App';
import { Provider } from 'react-redux';
import store from '@/stores'

ReactDOM.render(
    <Provider store={store}>
       <App/>
    </Provider>,
    document.getElementById('app')
  );



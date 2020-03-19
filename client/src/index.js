/*
 * @Description: 主入口
 * @Author: dingxuejin
 * @Date: 2020-01-02 09:35:29
 * @LastEditTime: 2020-03-17 17:31:31
 * @LastEditors: dingxuejin
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/App';
import { Provider } from 'react-redux';
import store from '@/stores'
import './style/common.scss'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
    document.getElementById('app')
  );



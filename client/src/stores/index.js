/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:06:18
 * @LastEditTime : 2020-01-02 13:21:39
 * @LastEditors  : dingxuejin
 */
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;
/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-17 16:55:01
 * @LastEditTime: 2020-03-19 18:45:20
 * @LastEditors: dingxuejin
 */
import React from "react";
import { Spin } from 'antd';
import './loading.scss'
class Loading extends React.PureComponent {
  render() {
      return(
        <div className="loading">
            <Spin size="large"></Spin>
        </div>
      )
  }
}
export default Loading;

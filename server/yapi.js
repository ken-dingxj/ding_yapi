/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-06 09:28:38
 * @LastEditTime: 2020-03-07 09:02:27
 * @LastEditors: dingxuejin
 */
const path = require('path');
const config = require('./config');
const WEBROOT = path.resolve(__dirname, '..'); //路径
const WEBCONFIG = config;
const WEBROOT_RUNTIME = path.resolve(__dirname, '../..');
const WEBROOT_LOG = path.join(WEBROOT_RUNTIME, 'log');

let insts = new Map();

/**
 * 获取一个model实例，如果不存在则创建一个新的返回
 * @param {*} m class
 * @example
 * yapi.getInst(groupModel, arg1, arg2)
 */
function getInst(m, ...args) {
  if (!insts.get(m)) {
    insts.set(m, new m(args));
  }
  return insts.get(m);
}

let r = {
    path: path,
    WEBROOT: WEBROOT,//项目根路径
    WEBCONFIG:WEBCONFIG,//配置文件
    WEBROOT_LOG:WEBROOT_LOG,//日志输出目录
    getInst:getInst
  };

  module.exports = r;
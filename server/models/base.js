/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-02-27 23:49:36
 * @LastEditTime: 2020-03-09 11:17:00
 * @LastEditors: dingxuejin
 */
const mongoose = require("mongoose");
const yapi = require("../yapi.js");
class baseModel {
  constructor() {
    this.schema = new mongoose.Schema(this.getSchema());
    this.name = this.getName();
    this.model = yapi.db(this.name, this.schema);
  }
  /**
   * 可通过覆盖此方法生成其他自增字段
   */
  getPrimaryKey() {
    return "_id";
  }
  /**
   * 获取collection的schema结构
   */
  getSchema() {
    yapi.commons.log("Model Class need getSchema function", "error");
  }
  getName() {
    yapi.commons.log("Model Class need name", "error");
  }
}

module.exports = baseModel;

/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-03 01:49:07
 * @LastEditTime: 2020-03-21 11:40:19
 * @LastEditors: dingxuejin
 */
const baseModel = require('./base.js');


class userModel extends baseModel {
    getName() {
      return 'user';
    }
    getSchema() {
      return {
        username: {
          type: String,
          required: true
        },
        password: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        passsalt: String,
        study: { type: Boolean, default: false },
        role: String,
        add_time: Number,
        up_time: Number,
        type: { type: String, enum: ['site', 'third'], default: 'site' } //site用户是网站注册用户, third是第三方登录过来的用户
      };
    }
    /**
     * 根据邮箱查找
     * @param {*} email 
     */
    findByEmail(email) {
      return this.model.findOne({ email: email });
    }
    /**
     * 根据用户名查找
     * @param {*} username 
     */
    findByUsername(username) {
      return this.model.findOne({ username: username });
    }
    /**
     * 用户保存
     * @param {y} data 
     */
    save(data){
      let user=new this.model(data);
      return user.save();
    }
    /**
     * 根据邮箱查找用户
     * @param {*} email
     */
    checkRepeat(email) {
      return this.model.countDocuments({
        email: email
      });
    }
}

module.exports = userModel;
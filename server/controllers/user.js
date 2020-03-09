/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-06 23:41:01
 * @LastEditTime: 2020-03-07 09:30:59
 * @LastEditors: dingxuejin
 */
const userModel = require('../models/user.js');
const baseController = require('./base.js');
const yapi = require('../yapi.js');

class userController extends baseController {
    constructor(ctx){
        super(ctx);
    }
    /**
   * 用户登录接口
   * @interface /user/login
   * @method POST
   * @category user
   * @foldnumber 10
   * @param {String} email email名称，不能为空
   * @param  {String} password 密码，不能为空
   * @returns {Object}
   * @example ./api/user/login.json
   */
    async login(ctx) {
      //登录
      let userInst = yapi.getInst(userModel); //创建user实体
      let email = ctx.request.body.email;
      let password = ctx.request.body.password;
      
      if (!email) {
        return (ctx.body = yapi.commons.resReturn(null, 400, 'email不能为空'));
      }
      if (!password) {
        return (ctx.body = yapi.commons.resReturn(null, 400, '密码不能为空'));
      }
      let result = await userInst.findByEmail(email)
      console.log(result);
      
    }
}

module.exports = userController;
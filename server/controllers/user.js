/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-03-06 23:41:01
 * @LastEditTime: 2020-03-13 23:47:17
 * @LastEditors: dingxuejin
 */
const userModel = require("../models/user.js");
const baseController = require("./base.js");
const yapi = require("../yapi.js");
const enmu = require("../utils/enmu");
const jwt = require('jsonwebtoken');
class userController extends baseController {
  constructor(ctx) {
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
    //邮箱不能为空
    if (!email) {
      return (ctx.body = yapi.commons.resReturn(null, enmu.emailIsNotNull));
    }
    //密码不能为空
    if (!password) {
      return (ctx.body = yapi.commons.resReturn(null, enmu.passwordIsNotNull));
    }
    //邮箱登录
    let result = await userInst.findByEmail(email);
    //用户名登录
    if(!result){
      result=await userInst.findByUsername(email);
    }
    //用户不存在
    if (!result) {
      return (ctx.body = yapi.commons.resReturn(null, enmu.userIsNotExit));
    } else if (
      yapi.commons.generatePassword(password, result.passsalt) ===
      result.password
    ) {
      //登录成功
      this.setLoginCookie(result._id, result.passsalt);
      
      let userInfo = {
        username: result.username,
        role: result.role,
        uid: result._id,
        email: result.email,
        add_time: result.add_time,
        up_time: result.up_time,
        type: "site",
        study: result.study
      };
      return (ctx.body = yapi.commons.resReturn(
        userInfo,
        enmu.success,
        "登录"
      ));
    } else {
      //密码错误
      return (ctx.body = yapi.commons.resReturn(null, enmu.passwordErr));
    }
  }
  setLoginCookie(uid,passsalt){
    let token = jwt.sign({ uid: uid }, passsalt, { expiresIn: '7 days' });
    this.ctx.cookies.set('_yapi_token', token, {
      expires: yapi.commons.expireDate(7),
      httpOnly: true
    });
    this.ctx.cookies.set('_yapi_uid', uid, {
      expires: yapi.commons.expireDate(7),
      httpOnly: true
    });
  }
}

module.exports = userController;

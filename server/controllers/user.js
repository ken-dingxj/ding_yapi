/*
 * @Description:
 * @Author: dingxuejin
 * @Date: 2020-03-06 23:41:01
 * @LastEditTime: 2020-03-29 15:31:53
 * @LastEditors: dingxuejin
 */
const userModel = require("../models/user.js");
const baseController = require("./base.js");
const yapi = require("../yapi.js");
const enmu = require("../utils/enmu");
const jwt = require('jsonwebtoken');

const groupModel = require('../models/group.js');
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

  async handlePrivateGroup(uid) {
    var groupInst = yapi.getInst(groupModel);
    await groupInst.save({
      uid: uid,
      group_name: 'User-' + uid,
      add_time: yapi.commons.time(),
      up_time: yapi.commons.time(),
      type: 'private'
    });
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

  /**
   * 退出登录接口
   * @interface /user/logout
   * @method GET
   * @category user
   * @foldnumber 10
   * @returns {Object}
   */

  async logout(ctx) {
    ctx.cookies.set('_yapi_token', null);
    ctx.cookies.set('_yapi_uid', null);
    ctx.body = yapi.commons.resReturn(null, enmu.success,"登出");
  }
  
 /**
   * ldap登录
   * @interface /user/login_by_ldap
   * @method
   * @category user
   * @foldnumber 10
   * @param {String} email email名称，不能为空
   * @param  {String} password 密码，不能为空
   * @returns {Object}
   *
   */

  async getLdapAuth(ctx) {
    
  }
  
  /**
   * 用户注册接口
   * @interface /user/reg
   * @method POST
   * @category user
   * @foldnumber 10
   * @param {String} email email名称，不能为空
   * @param  {String} password 密码，不能为空
   * @param {String} [username] 用户名
   * @returns {Object}
   */
  async reg(ctx) {
    if (yapi.WEBCONFIG.closeRegister) {
      //禁止注册
      return (ctx.body = yapi.commons.resReturn(null, enmu.disableReg));
    }
    let userInst = yapi.getInst(userModel);
    let params = ctx.request.body; //获取请求的参数,检查是否存在用户名和密码
    
    params = yapi.commons.handleParams(params, {
      username: 'string',
      password: 'string',
      email: 'string'
    });

    if (!params.email) {
      //邮箱不能为空
      return (ctx.body = yapi.commons.resReturn(null,enmu.emailIsNotNull));
    }
    
    if (!params.password) {
      return (ctx.body = yapi.commons.resReturn(null,enmu.passwordErr));
    }

    let checkRepeat = await userInst.checkRepeat(params.email); //然后检查是否已经存在该用户
    if (checkRepeat > 0) {
      return (ctx.body = yapi.commons.resReturn(null, enmu.isExitemail));
    }

    let passsalt = yapi.commons.randStr();
    let data = {
      username: params.username,
      password: yapi.commons.generatePassword(params.password, passsalt), //加密
      email: params.email,
      passsalt: passsalt,
      role: 'member',
      add_time: yapi.commons.time(),
      up_time: yapi.commons.time(),
      type: 'site'
    };
    
    if (!data.username) {
      data.username = data.email.substr(0, data.email.indexOf('@'));
    }
    
    try{
      let user=await userInst.save(data);
      this.setLoginCookie(user._id, user.passsalt);
      await this.handlePrivateGroup(user._id, user.username, user.email);
      ctx.body = yapi.commons.resReturn(
          null,
          enmu.success,
          "注册"
      );
      yapi.commons.sendMail({
        to: user.email,
        contents: `<h3>亲爱的用户：</h3><p>您好，感谢使用DApi可视化接口平台,您的账号 ${
          params.email
        } 已经注册成功</p>`
      });
    }catch(e){
      ctx.body = yapi.commons.resReturn(null, 401, e.message);
    }
    return null;
  }

  /**
   * 根据用户uid头像
   * @interface /user/avatar
   * @method GET
   * @param {*} uid
   * @category user
   * @returns {Object}
   * @example
   */
  async avatar(ctx) {
    try{
      
    }catch(err){
      
    }
  }
}

module.exports = userController;

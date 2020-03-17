const path = require("path");
const yapi = require("../yapi.js");
const sha1 = require("sha1");

exports.resReturn = (data, num, errmsg) => {
  num = num || 0;

  return {
    errcode: num,
    errmsg: errmsg || "成功！",
    data: data
  };
};

exports.log = (msg, type) => {
  if (!msg) {
    return;
  }
  type = type || "log";
  let f;
  switch (type) {
    case "log":
      f = console.log; // eslint-disable-line
      break;
    case "warn":
      f = console.warn; // eslint-disable-line
      break;
    case "error":
      f = console.error; // eslint-disable-line
      break;
    default:
      f = console.log; // eslint-disable-line
      break;
  }
  f(type + ":", msg);

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  let logfile = path.join(yapi.WEBROOT_LOG, year + "-" + month + ".log");
};

/**
 *
 * @param {*} router router
 * @param {*} baseurl base_url_path
 * @param {*} routerController controller
 * @param {*} path  routerPath
 * @param {*} method request_method , post get put delete ...
 * @param {*} action controller action_name
 * @param {*} ws enable ws
 */
exports.createAction = (
  router,
  baseurl,
  routerController,
  action,
  path,
  method,
  ws
) => {
  router[method](baseurl + path, async ctx => {
    let inst = new routerController(ctx);
    try {
      await inst.init(ctx);
      ctx.params = Object.assign(
        {},
        ctx.request.query,
        ctx.request.body,
        ctx.params
      );
      await inst[action].call(inst, ctx);
    } catch (err) {
      ctx.body = this.resReturn(null, 40011, "服务器出错...");
      this.log(err, "error");
    }
  });
};

exports.generatePassword = (password, passsalt) => {
  return sha1(password + sha1(passsalt));
};

exports.time = () => {
  return Date.parse(new Date()) / 1000;
};

exports.randStr = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};

exports.resReturn = (data,option,customMsg) => {
  let code = option.code || -10000;
  customMsg = customMsg || "";
  return {
    code: code,
    msg: customMsg+option.msg,
    data: data,
    success:option.success
  };
};
exports.expireDate = day => {
  let date = new Date();
  date.setTime(date.getTime() + day * 86400000);
  return date;
};

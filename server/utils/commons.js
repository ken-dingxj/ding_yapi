const path = require("path");
const yapi = require("../yapi.js");
const sha1 = require("sha1");
const enmu = require("../utils/enmu");

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
      ctx.body = this.resReturn(null, enmu.systemErr);
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

function trim(str) {
  if (!str) {
    return str;
  }

  str = str + '';

  return str.replace(/(^\s*)|(\s*$)/g, '');
}

function ltrim(str) {
  if (!str) {
    return str;
  }

  str = str + '';

  return str.replace(/(^\s*)/g, '');
}

function rtrim(str) {
  if (!str) {
    return str;
  }

  str = str + '';

  return str.replace(/(\s*$)/g, '');
}

exports.trim = trim;
exports.ltrim = ltrim;
exports.rtrim = rtrim;

/**
 * 处理请求参数类型，String 字符串去除两边空格，Number 使用parseInt 转换为数字
 * @params Object {a: ' ab ', b: ' 123 '}
 * @keys Object {a: 'string', b: 'number'}
 * @return Object {a: 'ab', b: 123}
 */
exports.handleParams = (params, keys) => {
  if (!params || typeof params !== 'object' || !keys || typeof keys !== 'object') {
    return false;
  }
  for (var key in keys) {
    var filter = keys[key];
    if (params[key]) {
      switch (filter) {
        case 'string':
          params[key] = trim(params[key] + '');
          break;
        case 'number':
          params[key] = !isNaN(params[key]) ? parseInt(params[key], 10) : 0;
          break;
        default:
          params[key] = trim(params + '');
      }
    }
  }
  return params;
};

/**
 * 发送邮件
 * @param {*} options 
 * @param {*} cb
 */
exports.sendMail = (options, cb) => {
  if (!yapi.mail) return false;
  options.subject = options.subject ? options.subject + '-DApi 平台' : 'DApi 平台';

  cb = cb || function(err) {
      if (err) {
        yapi.commons.log('send mail ' + options.to + ' error,' + err.message, 'error');
      } else {
        yapi.commons.log('send mail ' + options.to + ' success');
      }
    };
  try {
    console.log();
    
    yapi.mail.sendMail(
      {
        from: yapi.WEBCONFIG.mail.from,
        to: options.to,
        subject: options.subject,
        html: options.contents
      },
      cb
    );
  } catch (e) {
    yapi.commons.log(e.message, 'error');
    console.error(e.message); // eslint-disable-line
  }
};
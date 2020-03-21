const fs = require("fs-extra");
const yapi = require("./yapi.js");
const commons = require('./utils/commons');
const dbModule = require("./db");
const userModel = require("./models/user.js");
const mongoose = require("mongoose");

yapi.commons = commons;
yapi.connect = dbModule.connect();

function type(val){
  return Object.prototype.toString.call(val)
}

function install(val) {
  switch(type(val)){
    case "[object Array]":
      for(let item of val){
        type(item)==="[object Function]"?item():""
      }
    break;
    case "[object Function]":
      val()
      break;
  }
}
/**
 * 创建用户表,并初始化超级管理员
 */
function installUserTable() {
  let userInst = yapi.getInst(userModel);
  let passsalt = yapi.commons.randStr();
  let result = userInst.save({
    username: yapi.WEBCONFIG.adminAccount.substr(
      0,
      yapi.WEBCONFIG.adminAccount.indexOf("@")
    ),
    email: yapi.WEBCONFIG.adminAccount,
    password: yapi.commons.generatePassword("dj123456", passsalt),
    passsalt:passsalt,
    role: "admin",
    add_time: yapi.commons.time(),
    up_time: yapi.commons.time()
  });
  yapi.connect
    .then(function() {
      let userCol = mongoose.connection.db.collection("user");
      userCol.createIndex({
        username: 1
      });
      userCol.createIndex(
        {
          email: 1
        },
        {
          unique: true
        }
      );

      result.then(
        function() {
        //   fs.ensureFileSync(yapi.path.join(yapi.WEBROOT_RUNTIME, "init.lock"));
          console.log(
            `初始化管理员账号成功,账号名："${yapi.WEBCONFIG.adminAccount}"，密码："dj123456"`
          ); // eslint-disable-line
          process.exit(0);
        },
        function(err) {
          throw new Error(
            `初始化管理员账号 "${yapi.WEBCONFIG.adminAccount}" 失败, ${err.message}`
          ); // eslint-disable-line
        }
      );
    })
    .catch(function(err) {
      throw new Error(err.message);
    });
}
/**
 * 创建组织表
 */
function installGroupTable() {
    let result=yapi.connect
    .then(async function() {
      let groupCol = mongoose.connection.db.collection('group');
      let res=await  Promise.all([
        groupCol.createIndex({
          uid: 1
        }),groupCol.createIndex({
          group_name: 1
        })
      ])
      return res
    }).catch(function(err) {
      throw new Error(err.message);
    });
    result.then((res)=>{
      console.log("创建group成功");
      process.exit(0);
    })
}
//单个表创建
install(installGroupTable);
//多个表创建
// install([installUserTable,installGroupTable]);
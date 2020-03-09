const fs = require("fs-extra");
const yapi = require("./yapi.js");
const commons = require('./utils/commons');
const dbModule = require("./db");
const userModel = require("./models/user.js");
const mongoose = require("mongoose");

yapi.commons = commons;
yapi.connect = dbModule.connect();

function install() {
  setupSql();
}
function setupSql() {
  let userInst = yapi.getInst(userModel);
  let passsalt = yapi.commons.randStr();
  let result = userInst.save({
    username: yapi.WEBCONFIG.adminAccount.substr(
      0,
      yapi.WEBCONFIG.adminAccount.indexOf("@")
    ),
    email: yapi.WEBCONFIG.adminAccount,
    password: yapi.commons.generatePassword("ymfe.org", passsalt),
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
            `初始化管理员账号成功,账号名："${yapi.WEBCONFIG.adminAccount}"，密码："ymfe.org"`
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

install();

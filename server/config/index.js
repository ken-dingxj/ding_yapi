/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-02-27 23:08:01
 * @LastEditTime: 2020-03-21 14:32:46
 * @LastEditors: dingxuejin
 */
const config={
    "port": "3001",
    "adminAccount": "admin@admin.com",
    "db": {
      "servername": "127.0.0.1",
      "DATABASE": "yapi",
      "port": 27017,
      "user": "ding",
      "pass": "adminadmin"
    },
    "mail": {
      "enable": true,
      "host": "smtp.qq.com",
      "from": "1443979304@qq.com",
      "secureConnection": "true", // 使用SSL方式（安全方式，防止被窃取信息）
      "auth" : {
          "user" : '1443979304@qq.com',
          "pass" : 'usuaiodthknggbbb'
      },
    },
    "closeRegister":false //禁止注册配置项
  }
  
  module.exports=config;
/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-02-27 23:08:01
 * @LastEditTime: 2020-03-07 10:05:07
 * @LastEditors: dingxuejin
 */
const config={
    "port": "3001",
    "adminAccount": "admin@admin.com",
    "db": {
      "servername": "127.0.0.1",
      "DATABASE": "test",
      "port": 27017,
      "user": "ding",
      "pass": "adminadmin"
    },
    "mail": {
      "enable": true,
      "host": "smtp.163.com",
      "port": 465,
      "from": "***@163.com",
      "auth": {
        "user": "***@163.com",
        "pass": "*****"
      }
    }
  }
  module.exports=config;
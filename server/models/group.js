/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-21 13:03:49
 * @LastEditTime: 2020-03-21 13:36:24
 * @LastEditors: dingxuejin
 */
const yapi = require('../yapi.js');
const baseModel = require('./base.js');

class groupModel extends baseModel {
    getName() {
        return 'group';
    }
    getSchema() {
        return {
          uid: String,
          group_name: String,
          group_desc: String,
          add_time: Number,
          up_time: Number,
          type: { type: String, default: 'public', enum: ['public', 'private'] },
          members: [
            {
              uid: Number,
              role: { type: String, enum: ['owner', 'dev'] },
              username: String,
              email: String
            }
          ],
    
          custom_field1: {
            name: String,
            enable: { type: Boolean, default: false }
          }
        };
    }
    save(data) {
        let m = new this.model(data);
        return m.save();
      }
}

module.exports = groupModel;
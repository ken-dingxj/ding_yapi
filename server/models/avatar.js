/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-29 15:23:24
 * @LastEditTime: 2020-03-29 15:30:44
 * @LastEditors: dingxuejin
 */
const yapi = require('../yapi.js');
const baseModel = require('./base.js');

class avatarModel extends baseModel {
    getName() {
        return 'avatar';
    }
    getSchema() {
        return {
          uid: { type: Number, required: true },
          basecode: String,
          type: String
        };
    }

    get(uid) {
        return this.model.findOne({
          uid: uid
        });
    }

    up(uid, basecode, type) {
        return this.model.update(
          {
            uid: uid
          },
          {
            type: type,
            basecode: basecode
          },
          {
            upsert: true
          }
        );
    }
}

module.exports = avatarModel;
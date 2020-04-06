/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-03-06 23:40:53
 * @LastEditTime: 2020-03-29 15:32:46
 * @LastEditors: dingxuejin
 */
class baseController {
    constructor(ctx){
        this.ctx = ctx;
    }
    async init(){}
    getUid() {
        return parseInt(this.$uid, 10);
      }
}

module.exports = baseController;
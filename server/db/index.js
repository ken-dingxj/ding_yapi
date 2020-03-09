/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-02-26 22:55:55
 * @LastEditTime: 2020-03-09 11:11:11
 * @LastEditors: dingxuejin
 */
const mongoose = require('mongoose');
const yapi = require('../yapi.js');
const config = require('../config');
const autoIncrement = require('./mongoose-auto-increment');

function model(model,schema){
    if(schema instanceof mongoose.Schema === false){
        schema = new mongoose.Schema(schema);
    }

    schema.set('autoIndex', false);

    return mongoose.model(model, schema, model);
}

function connect(callback){
    mongoose.Promise = global.Promise;
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    let options = {useNewUrlParser: true, useCreateIndex: true};
    if (config.db.user) {
        options.user = config.db.user;
        options.pass = config.db.pass;
    }

    options = Object.assign({}, options, config.db.options)

    var connectString = '';

    if(config.db.connectString){
        connectString = config.db.connectString;
    }else{
        connectString = `mongodb://${config.db.servername}:${config.db.port}/${config.db.DATABASE}`;
        if (config.db.authSource) {
        connectString = connectString + `?authSource=${config.db.authSource}`;
        }
    }
    let db = mongoose.connect(
        connectString,
        options,
        function(err) {
          if (err) {
            console.log(err + ', mongodb Authentication failed', 'error');
          }
        }
    );

    db.then(
        function() {
            console.log('mongodb load success...');
    
          if (typeof callback === 'function') {
            callback.call(db);
          }
        },
        function(err) {
            console.log(err + 'mongodb connect error', 'error');
        }
    );
    
    autoIncrement.initialize(db);
    return db;
}
yapi.db = model;
module.exports = {
    model: model,
    connect: connect
};
const koaRouter = require("koa-router");
const router = koaRouter();
const { createAction } = require('./utils/commons.js');

const userController = require("./controllers/user.js");

let INTERFACE_CONFIG = {
  user: {
    prefix: "/user/",
    controller: userController
  }
};

let routerConfig = {
  user: [
    {
      action: "login",
      path: "login",
      method: "post"
    }
  ]
};

for (let ctrl in routerConfig) {
  let actions = routerConfig[ctrl];
  actions.forEach(item => {
    let routerController = INTERFACE_CONFIG[ctrl].controller;
    let routerPath = INTERFACE_CONFIG[ctrl].prefix + item.path;
    createAction(
      router,
      "/api",
      routerController,
      item.action,
      routerPath,
      item.method
    );
  });
}

module.exports = router;

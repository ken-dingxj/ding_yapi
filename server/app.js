const yapi = require('./yapi.js');
const commons = require('./utils/commons');
yapi.commons = commons;
const dbModule = require('./db');
yapi.connect = dbModule.connect(); 

const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const websockify = require('koa-websocket');
const app = websockify(new Koa());

const router = require('./router.js');

app.use(koaBody({ multipart: true, jsonLimit: '2mb', formLimit: '1mb', textLimit: '1mb' }));
app.use(router.routes());
app.use(router.allowedMethods());


app.use(async (ctx, next) => {
    if (/^\/(?!api)[a-zA-Z0-9\/\-_]*$/.test(ctx.path)) {
      ctx.path = '/';
      await next();
    } else {
      await next();
    }
});

app.use(koaStatic(yapi.path.join(yapi.WEBROOT, 'static'), { index: "index.html", gzip: true }));

app.listen(yapi.WEBCONFIG.port);
commons.log(
    `服务已启动，请打开下面链接访问: \nhttp://127.0.0.1${
      yapi.WEBCONFIG.port == '80' ? '' : ':' + yapi.WEBCONFIG.port
    }/`
);
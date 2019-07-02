const Koa = require('koa');
const static = require('koa-static');
const mount = require('koa-mount');
const view = require('koa-view');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const enforceHttps = require('koa-sslify');

const app = new Koa();
const router = new Router();

// 中间件
// app.use(enforceHttps());

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';
app.use(mount('/static', static(path.join(__dirname, staticPath))));

app.use(view(__dirname + '/views'));
// app.use(async ctx => {
//     ctx.body = 'hello world';
// })
router.get('/home', async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, './views/index.html'));
  // 默认是html  此渲染更新html需要重启服务
  // await ctx.render('index');
});
router.get('/login', async (ctx, next) => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.resolve(__dirname, './views/login.html'));
});
app.use(router.routes());
app.use(router.allowedMethods());

// SSL options
// var options = {
//   key: fs.readFileSync('./ssl/server.key'), //ssl文件路径
//   cert: fs.readFileSync('./ssl/server.pem') //ssl文件路径
// };
// HTTP Server && HTTPS Server
app.listen(3000);
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
// const PORT = 8000;
// const SSLPORT = 8001;

// httpServer.listen(PORT, () => {
//   console.log('HTTP Server is running on: http://localhost:%s', PORT);
// });
// httpsServer.listen(SSLPORT, () => {
//   console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
// });

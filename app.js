const Koa = require('koa');
const static = require('koa-static');
const mount = require('koa-mount');
const view = require('koa-view');
const Router = require('koa-router');
const Fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'
app.use(mount('/static', static(
    path.join(__dirname, staticPath)
)))

app.use(view(__dirname + '/views'));
// app.use(async ctx => {
//     ctx.body = 'hello world';
// })
router.get('/', async (ctx, next) => {
    // ctx.type = 'text/html';
    // ctx.body = Fs.createReadStream(
    //     path.resolve(__dirname, './www/index.html')
    // );
    // 默认是html
    await ctx.render('index');
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
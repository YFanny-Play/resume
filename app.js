const Koa = require('koa');
const Router = require('koa-router');
const Fs = require('fs');
const Path = require('path');

const app = new Koa();
const router = new Router();

// app.use(async ctx => {
//     ctx.body = 'hello world';
// })
router.get('/', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = Fs.createReadStream(
        Path.resolve(__dirname, './www/index.html')
    );
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
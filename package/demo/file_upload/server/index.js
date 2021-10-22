const Koa = require('koa');
const Router = require('koa-router');
const fileRouter = require('./router/file.js');
const koaBody = require('koa-body');

const app = new Koa();

app.use(koaBody({multipart: true}));

const router = new Router();
router.use('/api', fileRouter.routes());
app.use(router.routes());

app.listen(8888);
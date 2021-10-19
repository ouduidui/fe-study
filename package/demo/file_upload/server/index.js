const Koa = require('koa');
const Router = require('koa-router');
const fileRouter = require('./router/file.js');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const router = new Router();
router.use('/api', fileRouter.routes());
app.use(router.routes());

app.use(bodyParser);

app.listen(8888);
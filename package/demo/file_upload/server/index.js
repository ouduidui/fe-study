const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')
const chunkHandler = require('./handler/chunkHandler')
const mergeHandler = require('./handler/mergeHandler')

const app = new Koa();
app.use(koaBody({multipart: true}));

const router = new Router();

router.get('/', (ctx) => {


  ctx.body = {
    code: 1,
    message: 'Hello World'
  }
})

router.post('/api/upload', async (ctx) => {
  const res = await chunkHandler(ctx.request);
  ctx.body = {
    code: 1,
    message: 'Hello World'
  }
})

router.post('/api/merge', async (ctx) => {
  await mergeHandler(ctx.request.body.filename);
  ctx.body = {
    code: 1,
    message: 'Hello World'
  }
})

app.use(router.routes())

app.listen(8888)

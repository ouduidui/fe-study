const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')
const chunkHandler = require('./handler/chunkHandler')
const mergeHandler = require('./handler/mergeHandler')
const verifyHandler = require('./handler/verifyHandler')

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
  const isSuccess = await chunkHandler(ctx.request);
  ctx.body = isSuccess ?  {code: 1, message: '上传成功'} : {code: -1, message: '上传失败'}
})

router.post('/api/merge', async (ctx) => {
  await mergeHandler(ctx.request.body);
  ctx.body = {
    code: 1,
    message: '合并成功'
  }
})

router.post('/api/verify', async (ctx) => {
  const res = verifyHandler(ctx.request.body);
  ctx.body = res ? {code: 1, message: '已存在该文件'} : {code: 0, message: '不存在该文件'};

})

app.use(router.routes())

app.listen(8888)

const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const chunkHandler = require('./handler/chunkHandler');
const mergeHandler = require('./handler/mergeHandler');
const verifyHandler = require('./handler/verifyHandler');

const app = new Koa();
// 解析multipart
app.use(koaBody({ multipart: true }));

const router = new Router();

// 测试接口
router.get('/', (ctx) => {
  ctx.body = {
    code: 1,
    message: 'Hello World'
  };
});

// 上传接口
router.post('/api/upload', async (ctx) => {
  // chunk存储处理
  const isSuccess = await chunkHandler(ctx.request);
  ctx.body = isSuccess ? { code: 1, message: '上传成功' } : { code: -1, message: '上传失败' };
});

// 合并接口
router.post('/api/merge', async (ctx) => {
  // 合并操作
  await mergeHandler(ctx.request.body);
  ctx.body = {
    code: 1,
    message: '合并成功'
  };
});

// 验证接口
router.post('/api/verify', async (ctx) => {
  const { type, count } = verifyHandler(ctx.request.body);
  ctx.body = {
    code: type, // 0 无上传过    1 已经上传过    2 存在chunks
    data: {
      count: count
    },
    message: type === 0 ? '不存在该文件' : '已存在该文件'
  };
});

app.use(router.routes());

app.listen(8888);

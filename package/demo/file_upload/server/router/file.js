const Router = require('koa-router');

const router = new Router();

router.post('/file/v1', async (ctx) => {
  // const file = ctx.req.body;
  console.log(ctx.req.body);
  
  ctx.body = {code: 1}
})

module.exports = router;
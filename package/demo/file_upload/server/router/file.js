const Router = require("koa-router");
const { awaitWrap } = require("../utils/awaitWrap.js");
const { saveFile } = require("../utils/saveFile.js");

const router = new Router();

router.post("/file/v1", async (ctx) => {
  const [err, data] = await awaitWrap(
    saveFile(ctx.request.files.file, ctx.request.body.name)
  );

  if (err) {
    ctx.body = { code: -1, message: err.message };
  } else {
    ctx.body = { code: 1, message: data };
  }
});

module.exports = router;

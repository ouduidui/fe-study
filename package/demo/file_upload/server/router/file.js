const Router = require("koa-router");
const { awaitWrap } = require("../utils/awaitWrap.js");
const { saveFile, saveSliceFile } = require("../utils/saveFile.js");

const router = new Router();

router.post("/file", async (ctx) => {
  const [err, data] = await awaitWrap(
    saveFile(ctx.request.files.file, ctx.request.body.name)
  );

  if (err) {
    ctx.body = { code: -1, message: err.message };
  } else {
    ctx.body = { code: 1, message: data };
  }
});

router.post("/slice", async (ctx) => {
  const {hash, name, index} = ctx.request.body;
  const [err, data] = await awaitWrap(
    saveSliceFile(ctx.request.files.file, hash, index, name)
  );

  if (err) {
    ctx.body = { code: -1, message: err.message };
  } else {
    ctx.body = { code: 1, message: data };
  }
});

router.post("/merge", async (ctx) => {
  const {hash, filename} = ctx.request.body;


  ctx.body = { code: 1 };
});

module.exports = router;

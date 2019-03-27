// koa.js app
//
import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();

router
  .get("/api/convert/:id", async (context, next) => {
    context.body = { success: true };
  })
  .get("/", async (context, next) => {
    context.body = { success: true };
  });

app.use(router.routes());
app.use(router.allowedMethods());


export default app;


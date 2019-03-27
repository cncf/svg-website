// koa.js app
//
import Koa from 'koa';
import Router from 'koa-router';
import parse from 'co-body';
import autoCropSvg from 'svg-autocrop';
import _ from 'lodash';
const app = new Koa();
const router = new Router();

var queue = {};

router
  .post("/api/convert/:id", async (context, next) => {
    var body = await parse.text(context.req);
    queue[context.params.id] = {id: context.params.id, body: body, status: 'new'};
    context.body = { success: true };
  })
  .get("/api/convert/:id", async (context, next) => {
    const id = context.params.id;
    const item = queue[id];
    if (!item) {
      context.body =  { status: 'not_found' };
    } else {
      context.body = { status: item.status, result: item.result };
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

async function processQueue() {
  var items = _.values(queue);
  var active = _.find(queue, {status: 'active'});
  if (active) {
    console.info('there is active ', active.id);
    return;
  } else {
    const first = _.find(queue, {status: 'new'});
    if (!first) {
      return;
    }
    console.info('processing', first.id);
    first.status = 'active';
    const result = await autoCropSvg(first.body);
    first.status = 'finished';
    console.info('finished', first.id);
    first.result = result;
  }
}
setInterval(processQueue, 1000);


export default app;


import Koa from 'koa'

import { handleErrors, utils, parseBody, validateContentType } from './middleware/app.js'
import router from './routers/index.js'

const app = new Koa()

app
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.header.origin || '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    ctx.set('Access-Control-Allow-Methods', 'PATCH, DELETE')
    ctx.set('Access-Control-Allow-Credentials', 'true')

    await next()
  })
  .use(utils)
  .use(handleErrors)
  .use(validateContentType)
  .use(parseBody)
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', e => {
    console.log('error:', e)
  })

export default app

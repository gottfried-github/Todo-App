import mongoose from 'mongoose'

import Koa from 'koa'

import { handleErrors, utils, parseBody, validateContentType } from './middleware/app.js'
import router from './routers/index.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  const app = new Koa()

  app
    .use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.set('Access-Control-Allow-Headers', 'Content-Type')
      ctx.set('Access-Control-Allow-Methods', 'PATCH, DELETE')

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
    .listen(process.env.HTTP_PORT, () => {
      console.log(`server is running at port ${process.env.HTTP_PORT}`)
    })
}

main()

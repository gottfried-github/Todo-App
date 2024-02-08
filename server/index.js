import mongoose from 'mongoose'

import Koa from 'koa'

import { handleErrors, utils } from './middleware/index.js'
import router from './router.js'

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
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.HTTP_PORT, () => {
      console.log(`server is running at port ${process.env.HTTP_PORT}`)
    })
}

main()

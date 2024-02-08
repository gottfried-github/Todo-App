import mongoose from 'mongoose'

import Koa from 'koa'

import router from './router.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  const app = new Koa()

  app
    .use(async (ctx, next) => {
      try {
        await next()
      } catch (e) {
        if (!e.expose) {
          console.log(e)

          return
        }

        console.log(e)

        ctx.body = e
      }
    })
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.HTTP_PORT, () => {
      console.log(`server is running at port ${process.env.HTTP_PORT}`)
    })
}

main()

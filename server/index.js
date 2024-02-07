import mongoose from 'mongoose'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { CONTENT_TYPE } from './constants.js'
// import router from './router.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  const app = new Koa()

  app
    .use(async (ctx, next) => {
      if (
        !('content-type' in ctx.request.headers) ||
        ctx.request.headers['content-type'] !== CONTENT_TYPE
      ) {
        ctx.status = 415

        ctx.body = {
          message: `only ${CONTENT_TYPE} content-type is supported`,
        }

        return
      }

      await next()
    })
    .use(
      bodyParser({
        enableTypes: 'json',
      })
    )
    .use(ctx => {
      ctx.body = {
        message: 'some response',
      }
    })
    .listen(process.env.HTTP_PORT, () => {
      console.log(`server is running at port ${process.env.HTTP_PORT}`)
    })

  /*
  http
    .createServer(async (req, res) => {
      res.on('error', error => {
        console.log(`Server, res error event occured - error:`, error)

        res.statusCode = 500
        res.setHeader('Content-Type', CONTENT_TYPE)

        res.end(JSON.stringify(error))
      })

      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      res.setHeader('Content-Type', CONTENT_TYPE)

      router(req, res)
    })
    .listen(process.env.HTTP_PORT, () => {
      console.log(`server listening on port ${process.env.HTTP_PORT}`)
    })
  */
}

main()

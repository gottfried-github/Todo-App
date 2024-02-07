import mongoose from 'mongoose'

import Koa from 'koa'

import router from './router.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  const app = new Koa()

  app
    .use(router.routes())
    .use(router.allowedMethods())
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

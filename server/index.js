import http from 'http'
import mongoose from 'mongoose'

import { CONTENT_TYPE } from './constants.js'
import router from './router.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

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
    .listen(process.env.HTTP_PORT)
}

main()

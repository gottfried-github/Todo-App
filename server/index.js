import http from 'http'
import mongoose from 'mongoose'

import { CONTROLLERS } from './controllers-mapper.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  http.createServer((req, res) => {
    if (!(req.url in CONTROLLERS)) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify({ data: { message: "endpoint doesn't exist" } }))
    }

    if ('GET' == req.method) {
    }
  })
}

import http from 'http'
import mongoose from 'mongoose'

import { CONTROLLERS } from './controllers-mapper.js'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')

    if ('GET' == req.method) {
      if (!(req.url in CONTROLLERS.GET)) {
        res.statusCode = 404

        return res.end(JSON.stringify({ message: "endpoint doesn't exist or wrong HTTP method" }))
      }

      const _res = CONTROLLERS.GET[req.url]()

      res.statusCode = _res.status

      return res.end(JSON.stringify(_res.data))
    } else if ('POST' === req.method) {
      if (!(req.url in CONTROLLERS.POST)) {
        res.statusCode = 404

        return res.end(JSON.stringify({ message: "endpoint doesn't exist or wrong HTTP method" }))
      }

      if ('application/json' !== req.headers['content-type']) {
        res.statusCode = 400

        return res.end(
          JSON.stringify({ message: "server only supports 'application/json' content-type" })
        )
      }

      const dataRawChunks = []

      req
        .on('data', chunk => {
          dataRawChunks.push(chunk)
        })
        .on('end', () => {
          const body = Buffer.concat(body).toString()

          const _res = CONTROLLERS.POST[req.url](body)

          res.statusCode = _res.status

          res.end(JSON.stringify(_res.data))
        })
    } else {
      res.statusCode = 404

      return res.end(
        JSON.stringify({
          data: { message: `server doesn't support the ${req.method} HTTP method` },
        })
      )
    }
  })
}

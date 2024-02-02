import http from 'http'
import { Buffer } from 'buffer'
import mongoose from 'mongoose'

import { CONTROLLERS } from './controllers-mapper.js'

const CONTENT_TYPE = 'application/json'

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION)

  http.createServer((req, res) => {
    res.on('error', error => {
      res.setHeader('Content-Type', CONTENT_TYPE)

      res.end(JSON.stringify(error))
    })

    res.setHeader('Content-Type', CONTENT_TYPE)

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

      if (CONTENT_TYPE !== req.headers['content-type']) {
        res.statusCode = 400

        return res.end(
          JSON.stringify({ message: `server only supports ${CONTENT_TYPE} content-type` })
        )
      }

      const dataRawChunks = []

      return req
        .on('error', error => {
          res.statusCode = 500

          res.end(JSON.stringify(error))
        })
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

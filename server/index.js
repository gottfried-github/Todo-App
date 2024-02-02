import http from 'http'
import { Buffer } from 'buffer'
import mongoose from 'mongoose'

import { CONTROLLERS } from './controllers-mapper.js'

const CONTENT_TYPE = 'application/json'

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

      res.setHeader('Content-Type', CONTENT_TYPE)
      res.setHeader('Access-Control-Allow-Origin', '*')

      if ('GET' == req.method) {
        if (!(req.url in CONTROLLERS.GET)) {
          res.statusCode = 404

          return res.end(JSON.stringify({ message: "endpoint doesn't exist or wrong HTTP method" }))
        }

        let _res = null

        try {
          _res = await CONTROLLERS.GET[req.url]()
        } catch (e) {
          console.log(`Server, 'GET' ${req.url}, controller errored - error:`, e)

          res.statusCode = 500

          return res.end(JSON.stringify(e))
        }

        // console.log(`Server, GET ${req.url}, _res:`, _res)

        res.statusCode = _res.status

        try {
          return res.end(JSON.stringify(_res.data))
        } catch (e) {
          console.log(
            `Server, 'GET' ${req.url}, trying to send response from controller, res.end errored - error:`,
            e
          )

          res.statusCode = 500

          return res.end(JSON.stringify(e))
        }
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
            console.log(`Server, req error event occured - error:`, error)

            res.statusCode = 500

            res.end(JSON.stringify(error))
          })
          .on('data', chunk => {
            dataRawChunks.push(chunk)
          })
          .on('end', async () => {
            let body = null

            if (dataRawChunks.length) {
              body = Buffer.concat(dataRawChunks).toString()
            }

            let _res = null

            try {
              if (body) {
                _res = await CONTROLLERS.POST[req.url](JSON.parse(body))
              } else {
                _res = await CONTROLLERS.POST[req.url]()
              }
            } catch (e) {
              console.log(`Server, 'POST' ${req.url}, controller errored - error:`, e)

              res.statusCode = 500

              return res.end(JSON.stringify(e))
            }

            res.statusCode = _res.status

            try {
              res.end(JSON.stringify(_res.data))
            } catch (e) {
              console.log(
                `Server, 'POST' ${req.url}, trying to send response from controller, res.end errored - error:`,
                e
              )

              res.statusCode = 500

              res.end(JSON.stringify(e))
            }
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
    .listen(process.env.HTTP_PORT)
}

main()

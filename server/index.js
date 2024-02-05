import http from 'http'
import mongoose from 'mongoose'

import { CONTENT_TYPE } from './constants.js'
import { parseUrl } from './utils/utils.js'

import create from './controllers/create.js'
import update from './controllers/update.js'
import deleteById from './controllers/deleteById.js'
import deleteDone from './controllers/deleteDone.js'
import getAll from './controllers/getAll.js'

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

      const params = parseUrl(req.url)

      if (!params) {
        res.statusCode = 404

        return res.end(JSON.stringify({ message: "endpoint doesn't exist" }))
      }

      req.params = params

      if ('GET' == req.method) {
        return getAll(req, res)
      } else if ('PUT' === req.method) {
        if (req.params.id) {
          res.statusCode = 400

          return res.end(
            JSON.stringify({
              message: 'PUT with an existing item is not supported. Use PATCH instead',
            })
          )
        }

        return create(req, res)
      } else if ('PATCH' === req.method) {
        if (!req.params.id) {
          res.statusCode = 400

          return res.end(JSON.stringify({ message: 'no item specified' }))
        }

        return update(req, res)
      } else if ('DELETE' === req.method) {
        if (!req.params.id) {
          let _res = null

          try {
            _res = await deleteDone()
          } catch (e) {
            console.log(`Server, 'DELETE' ${req.url}, controller errored - error:`, e)

            res.statusCode = 500

            return res.end(JSON.stringify(e))
          }

          res.statusCode = _res.status

          try {
            res.end(JSON.stringify(_res.data))
          } catch (e) {
            console.log(
              `Server, 'DELETE' ${req.url}, trying to send response from controller, res.end errored - error:`,
              e
            )

            res.statusCode = 500

            res.end(JSON.stringify(e))
          }
        } else {
          let _res = null

          try {
            _res = await deleteById(params.id)
          } catch (e) {
            console.log(`Server, 'DELETE' ${req.url}, controller errored - error:`, e)

            res.statusCode = 500

            return res.end(JSON.stringify(e))
          }

          res.statusCode = _res.status

          try {
            res.end(JSON.stringify(_res.data))
          } catch (e) {
            console.log(
              `Server, 'DELETE' ${req.url}, trying to send response from controller, res.end errored - error:`,
              e
            )

            res.statusCode = 500

            res.end(JSON.stringify(e))
          }
        }
      } else if ('OPTIONS' === req.method) {
        res.statusCode = 200

        res.end()
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

import { parseUrl } from './utils/utils.js'

import create from './controllers/create.js'
import update from './controllers/update.js'
import deleteById from './controllers/delete.js'
import deleteDone from './controllers/deleteDone.js'
import getAll from './controllers/getAll.js'

export default function router(req, res) {
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
      return deleteDone(req, res)
    } else {
      return deleteById(req, res)
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
}

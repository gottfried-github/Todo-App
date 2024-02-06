import mongoose from 'mongoose'

import { CONTENT_TYPE } from '../constants.js'
import { parseBody } from '../utils/utils.js'
import Todo from '../models/todo.js'

export default async function update(req, res) {
  return parseBody(req, async body => {
    if (!body) {
      res.statusCode = 400

      return res.end(JSON.stringify({ message: 'no item data specified' }))
    }

    if (CONTENT_TYPE !== req.headers['content-type']) {
      res.statusCode = 400

      return res.end(
        JSON.stringify({ message: `server only supports ${CONTENT_TYPE} content-type` })
      )
    }

    try {
      const _res = await Todo.updateOne({ _id: req.params.id }, body, {
        runValidators: true,
      })

      if (_res.matchedCount === 0) {
        res.statusCode = 404

        return res.end()
      }

      res.statusCode = 200

      return res.end()
    } catch (e) {
      if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError) {
        res.statusCode = 400

        return res.end(JSON.stringify(e))
      }

      res.statusCode = 500

      res.end(JSON.stringify(e))
    }
  })
}

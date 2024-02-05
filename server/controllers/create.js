import mongoose from 'mongoose'

import { CONTENT_TYPE } from '../constants.js'
import { parseBody } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function create(req, res) {
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

    let item = new Todo(JSON.parse(body))

    try {
      item = await item.save()
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        res.statusCode = 400

        return res.end(JSON.stringify(e))
      }

      console.log(`Server, create, database errored - error:`, e)

      res.statusCode = 500

      return res.end(JSON.stringify(e))
    }

    res.statusCode = 201

    res.end(JSON.stringify(item))
  })
}

import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function deleteById(req, res) {
  try {
    const _res = await Todo.deleteOne({ _id: req.params.id })

    if (0 === _res.deletedCount) {
      res.statusCode = 404

      return res.end()
    }

    res.statusCode = 200

    return res.end(JSON.stringify({ deletedCount: _res.deletedCount }))
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      res.statusCode = 400

      return res.end(JSON.stringify(e))
    }

    res.statusCode = 500
    return res.end(JSON.stringify(e))
  }
}

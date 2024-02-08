import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function deleteById(ctx) {
  try {
    const _res = await Todo.deleteOne({ _id: ctx.params.id })

    if (_res.deletedCount === 0) {
      ctx.status = 404

      ctx.body = {}

      return
    }

    ctx.status = 200

    ctx.body = { deletedCount: _res.deletedCount }
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      ctx.throw(400, 'validation error', e)
    }

    ctx.throw(500, 'database errored', e)
  }
}

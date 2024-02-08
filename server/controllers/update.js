import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function update(ctx) {
  try {
    const _res = await Todo.updateOne({ _id: ctx.params.id }, ctx.request.body, {
      runValidators: true,
    })

    if (_res.matchedCount === 0) {
      ctx.status = 404

      ctx.body = {}

      return
    }

    ctx.status = 200

    ctx.body = {}
  } catch (e) {
    if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation failed', e)
    }

    ctx.throw(500, 'database errored', e)
  }
}

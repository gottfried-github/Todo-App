import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function update(ctx) {
  try {
    const _res = await Todo.updateOne({ _id: ctx.params.id }, ctx.request.body.item, {
      runValidators: true,
    })

    if (_res.matchedCount === 0) {
      ctx.throw(404, 'no item matched given id')
    }

    const { items, counters } = await Todo.getAll(
      ctx.request.body.status || null,
      ctx.request.body.sort || null
    )

    ctx.send(200, { items, counters }, 'successfully updated')
  } catch (e) {
    if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation failed', e)
    }

    ctx.throw(500, 'database errored', e)
  }
}

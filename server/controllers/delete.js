import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function deleteById(ctx) {
  try {
    const _res = await Todo.deleteOne({ _id: ctx.params.id })

    if (_res.deletedCount === 0) {
      ctx.throw(404, 'no documents have been deleted')
    }

    const { items, counters } = await Todo.getAll(
      ctx.request.body.status || null,
      ctx.request.body.sort || null
    )

    ctx.send(200, { deletedCount: _res.deletedCount, items, counters })
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      ctx.throw(400, 'validation error', e)
    }

    ctx.throw(500, 'database errored', e)
  }
}

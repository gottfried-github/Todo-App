import mongoose from 'mongoose'

import Todo from '../../../models/todo.js'

export default async function update(ctx) {
  try {
    const _res = await Todo.updateOne(
      { _id: ctx.params.id, userId: ctx.request.body.userId },
      ctx.request.body.body,
      {
        runValidators: true,
      }
    )

    if (_res.matchedCount === 0) {
      ctx.throw(404, 'no item with given id for the current user')
    }

    ctx.send(200, null, 'successfully updated')
  } catch (e) {
    if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation failed', e)
    }

    if (e.status) {
      throw e
    }

    ctx.throw(500, 'database errored', e)
  }
}

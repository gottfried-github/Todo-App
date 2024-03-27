import mongoose from 'mongoose'

import { ITEM_UPDATE } from '../../../events/index.js'
import Todo from '../../../models/todo.js'

export default async function update(ctx) {
  try {
    const _res = await Todo.updateOne(
      { _id: ctx.params.id, user: ctx.request.body.userId },
      ctx.request.body.body,
      {
        runValidators: true,
      }
    )

    if (_res.matchedCount === 0) {
      ctx.throw(404, 'no item with given id for the current user')
    }

    const item = await Todo.findOne({ _id: ctx.params.id, user: ctx.request.body.userId }).populate(
      'user',
      {
        id: 1,
        userName: 1,
      }
    )
    ctx.socketSend(ITEM_UPDATE, item)

    ctx.send(200, item, 'successfully updated')
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

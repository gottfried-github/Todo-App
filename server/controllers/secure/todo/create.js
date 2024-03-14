import mongoose from 'mongoose'

import User from '../../../models/user.js'
import Todo from '../../../models/todo.js'

export default async function create(ctx) {
  try {
    const item = await Todo.create({ ...ctx.request.body, userId: ctx.state.user.id })

    const user = await User.findById(ctx.state.user.id)

    if (user.teamId) {
      ctx.socketSend(item, user.teamId)
    }

    ctx.send(201, item)
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation error', e)
    }

    ctx.throw(500, 'database errored', e)
  }
}

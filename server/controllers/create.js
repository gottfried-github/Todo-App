import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function create(ctx) {
  try {
    const item = await Todo.create(ctx.request.body.item)
    const { items, counters } = await Todo.getAll(ctx.request.body.status || null)

    ctx.send(201, { item, items, counters })
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation error', e)
    }

    ctx.throw(500, 'database errored', e)
  }
}

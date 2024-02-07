import mongoose from 'mongoose'

import Todo from '../models/todo.js'

export default async function create(ctx) {
  try {
    const item = await Todo.create(ctx.request.body)

    ctx.status = 201

    ctx.body = item
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      ctx.status = 400

      ctx.body = e

      return
    }

    console.log(`Server, create, database errored - error:`, e)

    ctx.status = 500

    ctx.body = e
  }
}

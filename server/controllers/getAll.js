import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  try {
    const items = await Todo.find().sort({ createdAt: 1 })

    ctx.status = 200

    ctx.body = items
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

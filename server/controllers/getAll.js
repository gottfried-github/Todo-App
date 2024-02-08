import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  try {
    const items = await Todo.find().sort({ createdAt: 1 })

    await ctx.send(200, items)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

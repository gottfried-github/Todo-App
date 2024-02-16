import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  const filter = {}

  if (ctx.query?.status) {
    filter.status = parseInt(ctx.query.status)
  }

  try {
    const items = await Todo.find(filter).sort({ createdAt: 1 })

    await ctx.send(200, items)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  let status = null

  if (ctx.query?.status) {
    status = parseInt(ctx.query.status)
  }

  try {
    const res = await Todo.getAll(status)

    await ctx.send(200, res)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

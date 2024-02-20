import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  let status = null
  let sort = null

  if (ctx.query?.status) {
    status = parseInt(ctx.query.status)
  }

  if (
    (ctx.query?.sortField && !ctx.query?.sortOrder) ||
    (ctx.query?.sortOrder && !ctx.query?.sortField)
  ) {
    ctx.throw(400, 'both sortField and sortOrder must be specified')
  }

  if (ctx.query?.sortField) {
    sort = {
      field: ctx.query.sortField,
      order: parseInt(ctx.query.sortOrder),
    }
  }

  try {
    const res = await Todo.getAll(status, sort)

    await ctx.send(200, res)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

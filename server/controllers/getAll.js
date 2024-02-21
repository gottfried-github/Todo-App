import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  let status = null
  let sort = null
  let pagination = null

  if (ctx.query?.status) {
    status = parseInt(ctx.query.status)
  }

  if (
    (ctx.query?.sortField && !ctx.query?.sortOrder) ||
    (ctx.query?.sortOrder && !ctx.query?.sortField)
  ) {
    ctx.throw(400, 'both sortField and sortOrder must be specified')
  }

  if ((ctx.query?.page && !ctx.query?.pageSize) || (ctx.query?.pageSize && !ctx.query?.page)) {
    ctx.throw(400, 'both page and pageSize must be specified')
  }

  if (ctx.query?.sortField) {
    sort = {
      field: ctx.query.sortField,
      order: parseInt(ctx.query.sortOrder),
    }
  }

  if (ctx.query?.page) {
    pagination = {
      page: parseInt(ctx.query.page),
      pageSize: parseInt(ctx.query.pageSize),
    }
  }

  try {
    const res = await Todo.getAll(status, sort, pagination)

    await ctx.send(200, res)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

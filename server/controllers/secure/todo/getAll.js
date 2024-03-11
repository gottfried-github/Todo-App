import TodoService from '../../../services/todo.js'

export default async function getAll(ctx) {
  const sort = {}

  if (ctx.query?.sortField && ctx.query?.sortOrder) {
    sort[ctx.query.sortField] = parseInt(ctx.query.sortOrder)
  }

  try {
    const res = await TodoService.getAll(
      ctx.state.user.id,
      ctx.query?.status ? parseInt(ctx.query.status) : null,
      sort,
      ctx.query?.page && ctx.query?.pageSize
        ? {
            page: parseInt(ctx.query.page),
            pageSize: parseInt(ctx.query.pageSize),
          }
        : null
    )

    await ctx.send(200, res)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

import Todo from '../models/todo.js'

export default async function deleteDone(ctx) {
  try {
    const _res = await Todo.deleteDone()

    const { items, counters } = await Todo.getAll(ctx.request.body.status || null)

    ctx.send(200, { deletedCount: _res.deletedCount, items, counters })
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

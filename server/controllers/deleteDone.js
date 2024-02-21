import Todo from '../models/todo.js'

export default async function deleteDone(ctx) {
  try {
    const _res = await Todo.deleteDone()

    ctx.send(200, { deletedCount: _res.deletedCount })
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

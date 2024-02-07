import Todo from '../models/todo.js'

export default async function deleteDone(ctx) {
  try {
    const _res = await Todo.deleteDone()

    ctx.status = 200

    ctx.body = { deletedCount: _res.deletedCount }
  } catch (e) {
    console.log(`Server, deleteDone ${req.url}, database errored - error:`, e)

    ctx.status = 500

    ctx.body = e
  }
}

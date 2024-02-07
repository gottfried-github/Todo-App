import Todo from '../models/todo.js'

export default async function getAll(ctx) {
  try {
    const items = await Todo.find().sort({ createdAt: 1 })

    ctx.status = 200

    ctx.body = items
  } catch (e) {
    console.log(`Server, 'GET' ${req.url}, controller errored - error:`, e)

    ctx.status = 500

    ctx.body = e
  }
}

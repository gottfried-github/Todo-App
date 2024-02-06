import Todo from '../models/todo.js'

export default async function getAll(req, res) {
  try {
    const items = await Todo.find().sort({ createdAt: 1 })

    res.statusCode = 200

    return res.end(JSON.stringify(items))
  } catch (e) {
    console.log(`Server, 'GET' ${req.url}, controller errored - error:`, e)

    res.statusCode = 500

    return res.end(JSON.stringify(e))
  }
}

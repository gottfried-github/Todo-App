import Todo from '../models/todo.js'

export default async function getAll(req, res) {
  let items = null

  try {
    items = await Todo.find().sort({ timeCreated: 1 })
  } catch (e) {
    console.log(`Server, 'GET' ${req.url}, controller errored - error:`, e)

    res.statusCode = 500

    return res.end(JSON.stringify(e))
  }

  res.statusCode = 200

  res.end(JSON.stringify(items))
}

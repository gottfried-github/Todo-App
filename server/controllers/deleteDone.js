import Todo from '../models/todo.js'

export default async function deleteDone(req, res) {
  let _res = null

  try {
    _res = await Todo.deleteDone()

    res.statusCode = 200

    return res.end(JSON.stringify({ deletedCount: _res.deletedCount }))
  } catch (e) {
    console.log(`Server, deleteDone ${req.url}, database errored - error:`, e)

    res.statusCode = 500

    res.end(JSON.stringify(e))
  }
}

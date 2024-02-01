import Todo from '../models/todo.js'

export default async function deleteById(id) {
  const res = await Todo.deleteOne({ _id: id })

  return res
}

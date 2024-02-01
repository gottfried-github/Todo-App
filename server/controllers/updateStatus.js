import Todo from '../models/todo.js'

export default async function updateStatus(id) {
  await Todo.findById(id).toggleStatus()
}

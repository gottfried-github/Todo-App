import Todo from '../models/todo.js'

export default async function deleteDone() {
  const res = await Todo.deleteDone()

  return res
}

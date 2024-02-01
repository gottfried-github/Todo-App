import Todo from '../models.js'

export default async function updateName({ id, name }) {
  const todo = await Todo.findById(id)

  return todo.updateName(name)
}

import Todo from '../models.js'

export default async function create(data) {
  const todo = new Todo(data)

  await todo.save()

  return todo
}

import Todo from '../models.js'

export default async function getAll() {
  return Todo.find().sort({ timeCreated: 1 }).exec()
}

import { ResponseData } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function getAll() {
  let res = null

  try {
    res = await Todo.find().sort({ timeCreated: 1 })
  } catch (e) {
    return new ResponseData(500, e)
  }

  return new ResponseData(200, res)
}

import Todo from '../models/todo.js'
import { ResponseData } from '../utils/utils.js'

export default async function deleteDone() {
  let res = null

  try {
    res = await Todo.deleteDone()
  } catch (e) {
    return new ResponseData(500, e)
  }

  return new ResponseData(200, res)
}

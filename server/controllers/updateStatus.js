import mongoose from 'mongoose'
import { ResponseData } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function updateStatus(id) {
  let item = null

  try {
    item = await Todo.findById(id)
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return new ResponseData(400, e)
    } else {
      return new ResponseData(500, e)
    }
  }

  if (!item) {
    return new ResponseData(404)
  }

  try {
    await item.toggleStatus()
  } catch (e) {
    return new ResponseData(500, e)
  }

  return new ResponseData(200, item)
}

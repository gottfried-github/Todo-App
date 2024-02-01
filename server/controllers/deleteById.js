import mongoose from 'mongoose'
import { ResponseData } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function deleteById(id) {
  let res = null

  try {
    res = await Todo.deleteOne({ _id: id })
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return new ResponseData(400, e)
    } else {
      return new ResponseData(500, e)
    }
  }

  if (0 === res.deletedCount) {
    return new ResponseData(404)
  }

  return new ResponseData(200, res)
}

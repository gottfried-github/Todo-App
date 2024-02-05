import mongoose from 'mongoose'
import { ResponseData } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function update(id, fields) {
  try {
    const res = await Todo.updateOne({ _id: id }, fields, { runValidators: true })

    if (res.matchedCount === 0) {
      return new ResponseData(404)
    }

    return new ResponseData(200)
  } catch (e) {
    if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError) {
      return new ResponseData(400, e)
    }

    return new ResponseData(500, e)
  }
}

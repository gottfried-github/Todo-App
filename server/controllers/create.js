import mongoose from 'mongoose'
import { ResponseData } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function create(data) {
  const todo = new Todo(data)

  try {
    await todo.save()
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return new ResponseData(400, e)
    } else {
      return new ResponseData(500, e)
    }
  }

  return new ResponseData(201, todo)
}

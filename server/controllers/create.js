import mongoose from 'mongoose'
import { Response } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function create(data) {
  const todo = new Todo(data)

  try {
    await todo.save()
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return new Response(400, e)
    } else {
      return new Response(500, e)
    }
  }

  return new Response(201, todo)
}

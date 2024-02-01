import mongoose from 'mongoose'
import { Response } from '../utils/utils.js'

import Todo from '../models/todo.js'

export default async function updateStatus(id) {
  let item = null

  try {
    item = await Todo.findById(id)
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return new Response(400, e)
    } else {
      return new Response(500, e)
    }
  }

  if (!item) {
    return new Response(404)
  }

  try {
    await item.toggleStatus()
  } catch (e) {
    return new Response(500, e)
  }

  return new Response(200, item)
}

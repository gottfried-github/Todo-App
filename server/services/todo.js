import Todo from '../models/todo.js'

export default {
  getAll: async (status, sort, pagination) => {
    const filter = {}

    if (status) {
      filter.status = status
    }

    let items = null

    if (!pagination) {
      items = await Todo.find(filter).sort(sort)
    } else {
      items = await Todo.find(filter)
        .sort(sort)
        .skip(pagination.page * pagination.pageSize)
        .limit(pagination.pageSize)
    }

    const counters = {
      all: await Todo.countDocuments(),
      done: await Todo.countDocuments({ status: 1 }),
      notDone: await Todo.countDocuments({ status: 2 }),
    }

    return { items, counters }
  },
  deleteDone: async () => {
    return Todo.deleteMany({ status: 1 })
  },
}

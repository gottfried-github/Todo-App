import Todo from '../models/todo.js'

export default {
  getAll: async (userId, status, sort, pagination) => {
    const filter = { userId }

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
      all: await Todo.countDocuments({ userId }),
      done: await Todo.countDocuments({ status: 1, userId }),
      notDone: await Todo.countDocuments({ status: 2, userId }),
    }

    return { items, counters }
  },
  deleteDone: async userId => {
    return Todo.deleteMany({ status: 1, userId })
  },
}

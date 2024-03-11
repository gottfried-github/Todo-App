import Todo from '../models/todo.js'
import User from '../models/user.js'

export default {
  getAll: async (userId, status, sort, pagination) => {
    const filter = {}

    const user = await User.findById(userId)

    if (user.teamId) {
      const users = await User.find({ teamId: user.teamId })
      filter.userId = { $in: users }
    } else {
      filter.userId = userId
    }

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
      all: await Todo.countDocuments({ userId: filter.userId }),
      done: await Todo.countDocuments({ ...filter, status: 1 }),
      notDone: await Todo.countDocuments({ ...filter, status: 2 }),
    }

    return { items, counters }
  },
  deleteDone: async userId => {
    return Todo.deleteMany({ status: 1, userId })
  },
}

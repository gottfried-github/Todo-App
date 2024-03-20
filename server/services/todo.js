import Todo from '../models/todo.js'
import User from '../models/user.js'

export default {
  getAll: async (userId, status, sort, pagination) => {
    const filter = {}

    const user = await User.findById(userId)

    if (user.teamId) {
      const users = await User.find({ teamId: user.teamId })
      filter.user = { $in: users }
    } else {
      filter.user = userId
    }

    if (status) {
      filter.status = status
    }

    let items = null

    if (!pagination) {
      items = await Todo.find(filter).sort(sort).populate('user', {
        id: 1,
        userName: 1,
      })
    } else {
      items = await Todo.find(filter)
        .sort(sort)
        .skip(pagination.page * pagination.pageSize)
        .limit(pagination.pageSize)
        .populate('user', {
          id: 1,
          userName: 1,
        })
    }

    const counters = {
      all: await Todo.countDocuments({ user: filter.user }),
      done: await Todo.countDocuments({ ...filter, status: 1 }),
      notDone: await Todo.countDocuments({ ...filter, status: 2 }),
    }

    return { items, counters }
  },
  deleteDone: async userId => {
    return Todo.deleteMany({ status: 1, user: userId })
  },
}

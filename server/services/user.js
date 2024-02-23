import User from '../models/user.js'

import { generateHash } from '../utils/utils.js'

export default {
  create: data => {
    const passwordData = generateHash(data.password)

    return User.create({ ...data, password: passwordData })
  },
}

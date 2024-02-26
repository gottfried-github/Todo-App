import User from '../models/user.js'

import { generateHash, isEqualHash } from '../utils/utils.js'

export default {
  create: data => {
    const passwordData = generateHash(data.password)

    return User.create({ ...data, password: passwordData })
  },
  /**
   *
   * @param {String} identifier email or username
   * @returns
   *    `null` if not found
   *    `false` if password is incorrect
   *    `user` - else
   */
  getAndValidate: async (identifier, password) => {
    console.log('UserService.getAndValidate, identifier:', identifier)
    let user = await User.findOne({ userName: identifier })

    if (!user) {
      user = await User.findOne({ email: identifier })
    }

    console.log('UserService.getAndValidate, user, user.password:', user, user.password)

    if (!user) return null

    if (!isEqualHash(user.password, password)) return false

    return user
  },

  exists: async ({ email, userName }) => {
    const user = await User.find({ email, userName })

    return !!user
  },
}

import User from '../../../models/user.js'

export default async function users(ctx) {
  try {
    const users = await User.find(
      {
        teamId: { $exists: false },
      },
      {
        id: 1,
        userName: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
      }
    )

    ctx.send(200, users)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

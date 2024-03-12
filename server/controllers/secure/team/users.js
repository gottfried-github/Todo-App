import User from '../../../models/user.js'

export default async function users(ctx) {
  try {
    const users = await User.find(
      {
        teamId: { $exists: false },
      },
      {
        password: 0,
        refreshToken: 0,
      }
    )

    ctx.send(200, users)
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

import User from '../../../models/user.js'

export default async function users(ctx) {
  const users = await User.find({
    teamId: { $exists: false },
  })

  ctx.send(200, users)
}

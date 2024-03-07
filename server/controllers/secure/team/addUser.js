import User from '../../../models/user.js'

export default async function addUser(ctx) {
  const res = await User.updateOne({ _id: ctx.params.userId }, { teamId: ctx.params.teamId })

  ctx.send(200, null, 'successfully added the user to the team')
}

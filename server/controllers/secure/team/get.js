import User from '../../../models/user.js'
import Team from '../../../models/team.js'

export default async function get(ctx) {
  const team = Team.findById(ctx.params.teamId)
  const users = User.find({ teamId: team._id })

  ctx.send(200, { ...team, members: users })
}

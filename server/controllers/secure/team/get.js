import User from '../../../models/user.js'
import Team from '../../../models/team.js'

export default async function get(ctx) {
  try {
    const team = await Team.findById(ctx.params.teamId)

    if (!team) {
      ctx.send(404, "specified team doesn't exist")
      return
    }

    const users = await User.find({ teamId: team._id })

    const usersFiltered = users.filter(user => user._id !== ctx.state.user.id)

    ctx.send(200, { data: team, members: usersFiltered })
  } catch (e) {
    ctx.throw(500, 'database errored', e)
  }
}

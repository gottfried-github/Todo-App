import User from '../../../models/user'
import Team from '../../../models/team'

export default async function create(ctx) {
  const team = await Team.create(ctx.request.body)

  const user = await User.updateOne({ _id: ctx.state.user.id }, { teamId: team._id })
}

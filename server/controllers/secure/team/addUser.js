import mongoose from 'mongoose'

import User from '../../../models/user.js'
import Team from '../../../models/team.js'

export default async function addUser(ctx) {
  try {
    const team = Team.findById(ctx.params.teamId)

    if (!team) {
      ctx.throw(404, "specified team doesn't exist")
    }

    const user = await User.findById(ctx.params.userId)

    if (!user) {
      ctx.throw(404, "given user doesn't exist")
    }

    if (user.teamId) {
      ctx.throw(403, 'user already belongs to a team')
    }

    await User.updateOne(
      { _id: ctx.params.userId },
      { teamId: ctx.params.teamId },
      {
        runValidators: true,
      }
    )

    ctx.send(200, null, 'successfully added the user to the team')
  } catch (e) {
    if (e instanceof mongoose.Error.CastError || e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation failed', e)
    }

    if (e.status) {
      throw e
    }

    ctx.throw(500, e)
  }
}

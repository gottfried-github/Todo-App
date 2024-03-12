import mongoose from 'mongoose'

import User from '../../../models/user.js'
import Team from '../../../models/team.js'

export default async function create(ctx) {
  try {
    const user = await User.findById(ctx.state.user.id)

    if (user.teamId) {
      ctx.throw(403, 'user already belongs to a team')
    }

    const team = await Team.create({ ...ctx.request.body, author: ctx.state.user.id })
    const userUpdRes = await User.updateOne({ _id: ctx.state.user.id }, { teamId: team._id })

    if (!userUpdRes.matchedCount || !userUpdRes.modifiedCount) {
      ctx.throw(
        500,
        "either the user doesn't exist in the database or it wasn't updated for some reason",
        userUpdRes
      )
    }

    ctx.send(201, team)
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      ctx.throw(400, 'validation error', e)
    }

    if (e.status) {
      throw e
    }

    ctx.throw(500, 'database errored', e)
  }
}

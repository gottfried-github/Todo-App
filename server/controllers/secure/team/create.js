import mongoose from 'mongoose'

import User from '../../../models/user.js'
import Team from '../../../models/team.js'

export default async function create(ctx) {
  try {
    const team = await Team.create(ctx.request.body)
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

    ctx.throw(500, 'database errored', e)
  }
}

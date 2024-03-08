import mongoose from 'mongoose'

import User from '../../../models/user.js'
import Team from '../../../models/team.js'

export default async function deleteTeam(ctx) {
  try {
    await mongoose.connection.transaction(async session => {
      await User.updateMany({ teamId: ctx.params.teamId }, { $unset: { teamId: 1 } })

      await Team.deleteOne({ _id: ctx.params.teamId })
    })

    ctx.send(200, null, 'successfully deleted the team')
  } catch (e) {
    if (e.status) {
      throw e
    }

    ctx.throw(500, 'database errored when trying to delete the team')
  }
}

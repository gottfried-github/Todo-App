import User from '../../../models/user.js'

export default async function deleteUser(ctx) {
  try {
    const res = await User.updateOne(
      { _id: ctx.params.userId, teamId: ctx.params.teamId },
      { $unset: { teamId: 1 } }
    )

    if (!res.matchedCount) {
      ctx.throw(404, "the user doesn't belong to the given team")
    }

    ctx.socketDisconnect([ctx.params.userId])

    ctx.send(200, null, 'successfully removed user from the team')
  } catch (e) {
    if (e.status) {
      throw e
    }

    ctx.throw(500, 'database errored', e)
  }
}

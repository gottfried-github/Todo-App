import User from '../../../models/user.js'

export default async function signout(ctx) {
  if (!ctx.cookies.get('jwt')) {
    ctx.throw(400, 'no refresh token')
  }

  const refreshToken = ctx.cookies.get('jwt')

  // Is refreshToken in the database?
  const user = await User.findOne({ refreshToken })

  if (!user) {
    ctx.cookies.set('jwt')
    res.send(200, 'user is not signed in')
    return
  }

  // Delete refreshToken in the database
  user.refreshToken = ''

  try {
    await foundUser.save()
    ctx.cookies.set('jwt')
    ctx.send(200, 'signed out')
  } catch (e) {
    ctx.throw(500, 'database errored')
  }
}

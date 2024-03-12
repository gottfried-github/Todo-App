import jwt from 'jsonwebtoken'
import User from '../../../models/user.js'

export default async function signout(ctx) {
  if (!ctx.cookies.get('jwt')) {
    ctx.throw(400, 'no refresh token')
  }

  const refreshToken = ctx.cookies.get('jwt')

  try {
    const tokenDecoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (e, token) => {
        if (e) {
          reject(e)
        }

        resolve(token)
      })
    })

    const user = await User.findById(tokenDecoded.id)
    if (!user) {
      ctx.cookies.set('jwt')
      ctx.send(200, null, 'user is not signed in')
      return
    }

    // Delete refreshToken in the database
    user.refreshToken = null

    try {
      await user.save()
      ctx.cookies.set('jwt')
      ctx.send(200, null, 'signed out')
    } catch (e) {
      ctx.throw(500, 'database errored')
    }
  } catch (e) {
    if (e.status) {
      throw e
    }

    ctx.throw(401, 'refresh token is invalid')
  }
}

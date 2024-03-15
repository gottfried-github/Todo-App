import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const authorize = async (ctx, next) => {
  if (!ctx.headers?.authorization?.startsWith('Bearer ')) {
    ctx.throw(401, "authorization header is absent or it's not Bearer")
  }

  const token = ctx.headers.authorization.split(' ')[1]

  try {
    const tokenDecoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, token) => {
        if (err) {
          reject(err)
        }

        resolve(token)
      })
    })

    ctx.state.user = tokenDecoded

    const user = await User.findById(ctx.state.user.id)

    ctx.state.user.teamId = user.teamId.toString() || null

    await next()
  } catch (e) {
    if (e.status) {
      throw e
    }

    ctx.throw(401, 'invalid token')
  }
}

export const validateBody = async (ctx, next) => {
  if (!Object.keys(ctx.request.body).length) {
    ctx.status = 400

    ctx.body = { message: 'no data specified' }

    return
  }

  await next()
}

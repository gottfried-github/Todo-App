import jwt from 'jsonwebtoken'

import User from '../../../models/user.js'

export default async function refresh(ctx) {
  if (!ctx.cookies.get('jwt')) {
    ctx.throw(401, 'no refresh token')
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
      ctx.throw(403, 'no user matches the refresh token')
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE),
      }
    )

    ctx.send(200, { accessToken })
  } catch (e) {
    ctx.throw(401, 'refresh token is invalid')
  }
}

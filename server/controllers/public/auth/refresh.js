import jwt from 'jsonwebtoken'

import User from '../../../models/user.js'

export default async function refresh(ctx) {
  if (!ctx.cookies.get('jwt')) {
    ctx.throw(401, 'no refresh token')
  }

  const refreshToken = ctx.cookies.get('jwt')
  let tokenDecoded = null

  try {
    tokenDecoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (e, token) => {
        if (e) {
          reject(e)
        }

        resolve(token)
      })
    })
  } catch (e) {
    ctx.throw(401, 'refresh token is invalid')
  }

  const user = await User.findById(tokenDecoded.id)
  if (!user) {
    ctx.throw(403, 'no user matches the refresh token')
  }

  if (
    Date.now() - user.refreshToken.createdAt.getTime() >=
    parseInt(process.env.JWT_REFRESH_EXPIRE) * 1000
  ) {
    ctx.throw(401, 'refresh token has expired')
  }

  const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE),
  })

  const refreshTokenNew = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRE),
  })

  ctx.cookies.set('jwt', refreshTokenNew, {
    httpOnly: true,
    // secure: true,
    // sameSite: 'none',
    maxAge: parseInt(process.env.JWT_REFRESH_EXPIRE) * 1000,
  })

  ctx.send(200, {
    accessToken,
    user: {
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })
}

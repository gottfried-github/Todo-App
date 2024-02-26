import jwt from 'jsonwebtoken'

import User from '../../../models/user.js'

export default async function refresh(ctx) {
  if (!ctx.cookies.get('jwt')) {
    ctx.throw(401, 'no refresh token')
  }

  const refreshToken = ctx.cookies.get('jwt')

  const user = await User.findOne({ refreshToken })
  if (!user) {
    ctx.throw(403, 'no user matches the refresh token')
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, e => {
    if (e) {
      ctx.throw(403, 'refresh token is invalid')
    }

    const accessToken = jwt.sign({ userName: user.userName }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE),
    })

    ctx.send(200, { accessToken })
  })
}

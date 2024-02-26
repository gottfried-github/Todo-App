import jwt from 'jsonwebtoken'

import UserService from '../../../services/user.js'

export default async function signin(ctx) {
  const user = await UserService.getAndValidate(ctx.body.indentifier, ctx.body.password)

  if (user === null) {
    ctx.throw(404, "user with given user name doesn't exist")
  }

  if (user === false) {
    ctx.throw(400, 'incorrect password')
  }

  const accessToken = jwt.sign({ userName: user.userName }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE / 1000,
  })

  const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE / 1000,
  })

  user.refreshToken = refreshToken

  try {
    await user.save()
  } catch (e) {
    ctx.throw(500, 'database threw an error')
  }

  ctx.cookies.set('jwt', refreshToken, {
    httpOnly: true,
    // secure: true,
    // sameSite: 'none',
    maxAge: process.env.JWT_REFRESH_EXPIRE,
  })

  ctx.send(200, { accessToken })
}

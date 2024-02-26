import jwt from 'jsonwebtoken'

import UserService from '../../../services/user.js'

export default async function signin(ctx) {
  const user = await UserService.getAndValidate(
    ctx.request.body.identifier,
    ctx.request.body.password
  )

  if (user === null) {
    ctx.throw(404, "user with given user name doesn't exist")
  }

  if (user === false) {
    ctx.throw(400, 'incorrect password')
  }

  const accessToken = jwt.sign({ userName: user.userName }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE),
  })

  const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRE),
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
    maxAge: parseInt(process.env.JWT_REFRESH_EXPIRE) * 1000,
  })

  ctx.send(200, { accessToken })
}

import jwt from 'jsonwebtoken'

import UserService from '../../../services/user.js'

export default async function signup(ctx) {
  try {
    const user = await UserService.create(ctx.request.body)

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRE),
      }
    )

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRE),
    })

    user.refreshToken = {
      token: refreshToken,
      createdAt: new Date(),
    }

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

    ctx.send(201, {
      accessToken,
      user: {
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        teamId: user.teamId || null,
      },
    })
  } catch (e) {
    // 11000 === unique index violation
    if (e.code === 11000) {
      const errors = {}

      if ('userName' in e.keyPattern) {
        errors.userName = { message: 'given user name already exists' }
      } else if ('email' in e.keyPattern) {
        errors.email = { message: 'given email already exists' }
      }

      if (!Object.keys(errors).length) {
        ctx.throw(500, 'unexpected unique index violation', e)
      }

      ctx.throw(400, null, { errors })
    }

    if (e.status) {
      throw e
    }

    ctx.throw(500, 'database errored while creating user', e)
  }
}

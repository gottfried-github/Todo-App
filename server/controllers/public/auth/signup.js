import UserService from '../../../services/user.js'

export default async function signup(ctx) {
  try {
    await UserService.create(ctx.request.body)
    ctx.send(201, 'successfully signed up')
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

    ctx.throw(500, 'database errored while creating user', e)
  }
}

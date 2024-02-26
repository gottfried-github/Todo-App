import UserService from '../../../services/user.js'

export default async function signup(ctx) {
  try {
    await UserService.create(ctx.body)
    ctx.send(201, 'successfully signed up')
  } catch (e) {
    // I should respond with 4** if error is a duplicate field
    ctx.throw(500, 'database errored while creating user')
  }
}

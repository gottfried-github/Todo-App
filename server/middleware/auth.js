export async function validateUser(ctx, next) {
  if (!ctx.body.userName || !ctx.body.password) {
    ctx.throw(400, 'user name and password must be provided', {
      errors: {
        userName: !ctx.body.userName ? 'the field is required' : null,
        password: !ctx.body.password ? 'the field is required' : null,
      },
    })
  }

  await next()
}

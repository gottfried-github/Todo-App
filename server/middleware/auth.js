export async function validateSignup(ctx, next) {
  if (
    !ctx.request.body.userName ||
    !ctx.request.body.password ||
    !ctx.request.body.firstName ||
    !ctx.request.body.lastName ||
    !ctx.request.body.email
  ) {
    ctx.throw(400, 'user name and password must be provided', {
      errors: {
        userName: !ctx.request.body.userName ? 'the field is required' : null,
        password: !ctx.request.body.password ? 'the field is required' : null,
        firstName: !ctx.request.body.firstName ? 'the field is required' : null,
        lastName: !ctx.request.body.lastName ? 'the field is required' : null,
        email: !ctx.request.body.email ? 'the field is required' : null,
      },
    })
  }

  await next()
}

export async function validateSignin(ctx, next) {
  if (!ctx.request.body.identifier || !ctx.request.body.password) {
    ctx.throw(400, 'user name and password must be provided', {
      errors: {
        identifier: !ctx.request.body.identifier ? 'the field is required' : null,
        password: !ctx.request.body.password ? 'the field is required' : null,
      },
    })
  }

  await next()
}

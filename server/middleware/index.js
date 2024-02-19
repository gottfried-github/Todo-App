import bodyParser from 'koa-bodyparser'

export const parseBody = bodyParser({
  enableTypes: 'json',
})

export const validateContentType = async (ctx, next) => {
  if (
    'content-length' in ctx.request.headers &&
    parseInt(ctx.request.headers['content-length']) > 0 &&
    (!('content-type' in ctx.request.headers) ||
      ctx.request.headers['content-type'] !== 'application/json')
  ) {
    ctx.status = 415

    ctx.body = {
      message: 'only application/json content-type is supported',
    }

    return
  }

  await next()
}

export const validateBody = async (ctx, next) => {
  if (!Object.keys(ctx.request.body).length) {
    ctx.status = 400

    ctx.body = { message: 'no item data specified' }

    return
  }

  await next()
}

export const handleErrors = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (!e.expose) {
      ctx.status = e.status || 500
      ctx.body = { message: 'internal server error' }

      ctx.app.emit('error', e)

      return
    }

    ctx.status = e.status
    ctx.body = e
  }
}

export const utils = async (ctx, next) => {
  ctx.send = async (status, data, message) => {
    ctx.status = status || 200

    const body = data || (message && { message }) || {}
    if (message && !body.message) {
      body.message = message
    }

    ctx.body = body
  }

  await next()
}

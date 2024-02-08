import bodyParser from 'koa-bodyparser'

import { CONTENT_TYPE } from '../constants.js'

export const parseBody = bodyParser({
  enableTypes: 'json',
})

export const validateContentType = async (ctx, next) => {
  if (
    !('content-type' in ctx.request.headers) ||
    ctx.request.headers['content-type'] !== CONTENT_TYPE
  ) {
    ctx.status = 415

    ctx.body = {
      message: `only ${CONTENT_TYPE} content-type is supported`,
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
      console.log(e)

      ctx.status = e.status
      ctx.body = {}

      return
    }

    console.log(e)

    ctx.status = e.status
    ctx.body = e
  }
}

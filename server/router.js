import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

import { CONTENT_TYPE } from './constants.js'

import create from './controllers/create.js'
import update from './controllers/update.js'
import deleteById from './controllers/delete.js'
import deleteDone from './controllers/deleteDone.js'
import getAll from './controllers/getAll.js'

const parseBody = bodyParser({
  enableTypes: 'json',
})

const validateContentType = async (ctx, next) => {
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

const router = new Router({
  prefix: '/todos',
})

router.get('/', ctx => {
  console.log('router.get')

  ctx.body = {
    message: 'GET / request received',
  }
})

router.post('/', validateContentType, parseBody, ctx => {
  console.log('router.post, request body', ctx.request.body)

  ctx.body = {
    message: 'POST / request received',
  }
})

router.patch('/:id', validateContentType, parseBody, ctx => {
  console.log('router.patch, ctx.params, request.body', ctx.params, ctx.request.body)

  ctx.body = {
    message: 'PATCH /:id request received',
  }
})

router.delete('/:id', ctx => {
  console.log('router.delete, ctx.params', ctx.params)

  ctx.body = {
    message: 'DELETE /:id request received',
  }
})

router.delete('/', ctx => {
  console.log('router.delete')

  ctx.body = {
    message: 'DELETE / request received',
  }
})

export default router

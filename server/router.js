import Router from '@koa/router'
import { parseBody, validateContentType, validateBody } from './middleware/index.js'

import create from './controllers/create.js'
import update from './controllers/update.js'
import deleteById from './controllers/delete.js'
import deleteDone from './controllers/deleteDone.js'
import getAll from './controllers/getAll.js'

const router = new Router({
  prefix: '/todos',
})

router.all(['/', '/:id'], async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')

  await next()
})

router.get('/', async ctx => {
  console.log('router.get')

  // await create(ctx)

  ctx.body = {
    message: 'GET / request received',
  }
})

router.post('/', validateContentType, parseBody, validateBody, async ctx => {
  console.log('router.post, request body', ctx.request.body)

  await create(ctx)

  // ctx.body = {
  //   message: 'POST / request received',
  // }
})

router.patch('/:id', validateContentType, parseBody, validateBody, ctx => {
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

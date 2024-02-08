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
  ctx.set('Access-Control-Allow-Methods', 'PATCH, DELETE')

  await next()
})

router.get('/', getAll)
router.post('/', validateContentType, parseBody, validateBody, create)
router.patch('/:id', validateContentType, parseBody, validateBody, update)
router.delete('/:id', deleteById)
router.delete('/', deleteDone)

export default router

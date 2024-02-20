import Router from '@koa/router'
import { validateBody } from './middleware/index.js'

import create from './controllers/create.js'
import update from './controllers/update.js'
import deleteById from './controllers/delete.js'
import deleteDone from './controllers/deleteDone.js'
import getAll from './controllers/getAll.js'

const router = new Router({
  prefix: '/todos',
})

router.get('/', getAll)
router.post('/', validateBody, create)
router.patch('/:id', validateBody, update)
router.delete('/:id', deleteById)
router.delete('/', deleteDone)

export default router

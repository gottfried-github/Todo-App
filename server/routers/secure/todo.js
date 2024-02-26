import Router from '@koa/router'
import { validateBody, authorize } from '../../middleware/todo.js'

import create from '../../controllers/secure/todo/create.js'
import update from '../../controllers/secure/todo/update.js'
import deleteById from '../../controllers/secure/todo/delete.js'
import deleteDone from '../../controllers/secure/todo/deleteDone.js'
import getAll from '../../controllers/secure/todo/getAll.js'

const router = new Router()

router.use(authorize)
router.get('/', getAll)
router.post('/', validateBody, create)
router.patch('/:id', validateBody, update)
router.delete('/:id', deleteById)
router.delete('/', deleteDone)

export default router

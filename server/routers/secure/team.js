import Router from '@koa/router'
import { validateBody } from '../../middleware/common.js'

import create from '../../controllers/secure/team/create.js'
import addUser from '../../controllers/secure/team/addUser.js'
import get from '../../controllers/secure/team/get.js'
import users from '../../controllers/secure/team/users.js'

const router = new Router()

router.post('/', validateBody, create)
router.post('/:teamId/users/:userId', validateBody, addUser)
router.get('/:teamId', get)
router.get('/users', users)

export default router

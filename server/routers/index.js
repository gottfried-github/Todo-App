import Router from '@koa/router'

import Todo from './secure/todo.js'
import Auth from './public/auth.js'

const router = new Router()

router.use('/todos', Todo.routes(), Todo.allowedMethods())
router.use('/auth', Auth.routes(), Auth.allowedMethods())

export default router

import Router from '@koa/router'

import { validateSignup, validateSignin } from '../../middleware/auth.js'

import Signup from '../../controllers/public/auth/signup.js'
import Signin from '../../controllers/public/auth/signin.js'
import Signout from '../../controllers/public/auth/signout.js'
import Refresh from '../../controllers/public/auth/refresh.js'

const router = new Router()

router.post('/signup', validateSignup, Signup)
router.post('/signin', validateSignin, Signin)
router.get('/refresh', Refresh)
router.delete('/', Signout)

export default router

import create from './controllers/create.js'
import updateStatus from './controllers/updateStatus.js'
import updateName from './controllers/updateName.js'
import deleteById from './controllers/deleteById.js'
import deleteDone from './controllers/deleteDone.js'
import getAll from './controllers/getAll.js'

export const CONTROLLERS = {
  '/todos/create': create,
  '/todos/updateStatus': updateStatus,
  '/todos/updateName': updateName,
  '/todos/deleteById': deleteById,
  '/todos/deleteDone': deleteDone,
  '/todos/getAll': getAll,
}

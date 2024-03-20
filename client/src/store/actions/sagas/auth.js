import { createAction } from 'redux-actions'

export const types = {
  signup: 'sagaAuth/signup',
  signin: 'sagaAuth/signin',
  signout: 'sagaAuth/signout',
  signedIn: 'sagaAuth/signedIn',
}

export const creators = {
  signup: createAction(types.signup),
  signin: createAction(types.signin),
  signout: createAction(types.signout),
  signedIn: createAction(types.signedIn),
}

import { createAction } from 'redux-actions'

export const types = {
  setToken: 'storeAuth/setToken',
  unsetToken: 'storeAuth/unsetToken',
  setError: 'storeAuth/setError',
  unsetError: 'storeAuth/unsetError',
  setErrorSignup: 'storeAuth/setErrorSignup',
  unsetErrorSignup: 'storeAuth/unsetErrorSignup',
  setErrorSignin: 'storeAuth/setErrorSignin',
  unsetErrorSignin: 'storeAuth/unsetErrorSignin',
  setIsLoading: 'storeAuth/setIsLoading',
  setUserData: 'storeAuth/setUserData',
  setErrorSocket: 'storeAuth/setErrorSocket',
  unsetErrorSocket: 'storeAuth/unsetErrorSocket',
}

export const creators = {
  setToken: createAction(types.setToken),
  unsetToken: createAction(types.unsetToken),
  setError: createAction(types.setError),
  unsetError: createAction(types.unsetError),
  setErrorSignup: createAction(types.setErrorSignup),
  unsetErrorSignup: createAction(types.unsetErrorSignup),
  setErrorSignin: createAction(types.setErrorSignin),
  unsetErrorSignin: createAction(types.unsetErrorSignin),
  setIsLoading: createAction(types.setIsLoading),
  setUserData: createAction(types.setUserData),
  setErrorSocket: createAction(types.setErrorSocket),
  unsetErrorSocket: createAction(types.unsetErrorSocket),
}

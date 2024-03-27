import { createAction } from 'redux-actions'

export const types = {
  // saga
  sagaSignup: 'sagaAuth/signup',
  sagaSignin: 'sagaAuth/signin',
  sagaSignout: 'sagaAuth/signout',
  sagaSignedIn: 'sagaAuth/signedIn',

  // store
  storeSetToken: 'storeAuth/setToken',
  storeUnsetToken: 'storeAuth/unsetToken',
  storeSetError: 'storeAuth/setError',
  storeUnsetError: 'storeAuth/unsetError',
  storeSetErrorSignup: 'storeAuth/setErrorSignup',
  storeUnsetErrorSignup: 'storeAuth/unsetErrorSignup',
  storeSetErrorSignin: 'storeAuth/setErrorSignin',
  storeUnsetErrorSignin: 'storeAuth/unsetErrorSignin',
  storeSetIsLoading: 'storeAuth/setIsLoading',
  storeUnsetIsLoading: 'storeAuth/unsetIsLoading',
  storeSetUserData: 'storeAuth/setUserData',
  storeSetErrorSocket: 'storeAuth/setErrorSocket',
  storeUnsetErrorSocket: 'storeAuth/unsetErrorSocket',
}

export const creators = {
  // saga
  sagaSignup: createAction(types.sagaSignup),
  sagaSignin: createAction(types.sagaSignin),
  sagaSignout: createAction(types.sagaSignout),
  sagaSignedIn: createAction(types.sagaSignedIn),

  // store
  storeSetToken: createAction(types.storeSetToken),
  storeUnsetToken: createAction(types.storeUnsetToken),
  storeSetError: createAction(types.storeSetError),
  storeUnsetError: createAction(types.storeUnsetError),
  storeSetErrorSignup: createAction(types.storeSetErrorSignup),
  storeUnsetErrorSignup: createAction(types.storeUnsetErrorSignup),
  storeSetErrorSignin: createAction(types.storeSetErrorSignin),
  storeUnsetErrorSignin: createAction(types.storeUnsetErrorSignin),
  storeSetIsLoading: createAction(types.storeSetIsLoading),
  storeUnsetIsLoading: createAction(types.storeUnsetIsLoading),
  storeSetUserData: createAction(types.storeSetUserData),
  storeSetErrorSocket: createAction(types.storeSetErrorSocket),
  storeUnsetErrorSocket: createAction(types.storeUnsetErrorSocket),
}

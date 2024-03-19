import { createAction } from '@reduxjs/toolkit'

export const signup = createAction('sagaAuth/signup')
export const signin = createAction('sagaAuth/signin')
export const signout = createAction('sagaAuth/signout')
export const tokenSet = createAction('sagaAuth/tokenSet')

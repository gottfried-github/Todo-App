import { type RootState } from './store'

export default {
  selectToken: (state: RootState) => state.auth.token,
  selectError: (state: RootState) => state.auth.errorAuth,
  selectErrorSignup: (state: RootState) => state.auth.errorSignup,
  selectErrorSignin: (state: RootState) => state.auth.errorSignin,
  selectIsLoading: (state: RootState) => state.auth.isLoading,
  selectUserData: (state: RootState) => state.auth.userData,
}

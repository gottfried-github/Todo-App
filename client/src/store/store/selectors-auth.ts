import { type State } from './store'

export default {
  selectToken: (state: State) => state.auth.token,
  selectError: (state: State) => state.auth.error,
  selectErrorSignup: (state: State) => state.auth.errorSignup,
  selectErrorSignin: (state: State) => state.auth.errorSignin,
  selectIsLoading: (state: State) => state.auth.isLoading,
  selectUserData: (state: State) => state.auth.userData,
}

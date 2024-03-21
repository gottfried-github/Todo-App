export default {
  selectToken: state => state.auth.token,
  selectError: state => state.auth.error,
  selectErrorSignup: state => state.auth.errorSignup,
  selectErrorSignin: state => state.auth.errorSignin,
  selectIsLoading: state => state.auth.isLoading,
  selectUserData: state => state.auth.userData,
}

import { useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import sliceAuth from './store/store/slice-auth'

import SignupComponent from './components/auth/Signup/Signup'
import SigninComponent from './components/auth/Signin/Signin'
import AuthPage from './pages/Auth'
import Cabinet from './pages/Cabinet'
import LoadingScreen from './components/auth/LoadingScreen'

const routerPublic = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/signin" />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        path: 'signup',
        element: <SignupComponent />,
      },
      {
        path: 'signin',
        element: <SigninComponent />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])

const routerProtected = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/cabinet" />,
  },
  {
    path: '/cabinet',
    element: <Cabinet />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])

export default function Router() {
  const token = useSelector(state => sliceAuth.selectors.selectToken(state))
  const isLoading = useSelector(state => sliceAuth.selectors.selectIsLoading(state))

  const component = isLoading ? (
    <LoadingScreen />
  ) : (
    <RouterProvider router={token ? routerProtected : routerPublic} />
  )

  return component
}

import { useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import selectorsAuth from './store/store/selectors-auth'

import Signup from './pages/Signup'
import Signin from './pages/Signin'
import AuthPage from './pages/Auth'

import Cabinet from './pages/Cabinet'
import Todos from './components/todo/Todos'
import Team from './pages/Team'

import LoadingScreen from './pages/LoadingScreen'

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
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
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
    element: <Cabinet />,
    children: [
      {
        index: true,
        element: <Todos />,
      },
      {
        path: 'teams',
        element: <Team />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])

export default function Router() {
  const token = useSelector(state => selectorsAuth.selectToken(state))
  const isLoading = useSelector(state => selectorsAuth.selectIsLoading(state))

  const component = isLoading ? (
    <LoadingScreen />
  ) : (
    <RouterProvider router={token ? routerProtected : routerPublic} />
  )

  return component
}

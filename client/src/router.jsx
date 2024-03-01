import { useSelector } from 'react-redux'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import sliceAuth from './store/store/slice-auth'

import Protected from './components/auth/Protected'
import SignupComponent from './components/auth/Signup/Signup'
import SigninComponent from './components/auth/Signin/Signin'
import AuthPage from './pages/Auth'
import Cabinet from './components/Cabinet'

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
    element: (
      <Protected>
        <Cabinet />
      </Protected>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
])

export default function Router() {
  const token = useSelector(state => sliceAuth.selectors.selectToken(state))

  return <RouterProvider router={token ? routerProtected : routerPublic} />
}

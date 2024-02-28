import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'

import Protected from './components/auth/Protected'
import SignupComponent from './components/auth/Signup/Signup'
import SigninComponent from './components/auth/Signin/Signin'
import AuthPage from './pages/Auth'
import Cabinet from './components/Cabinet'

const routes = [
  {
    path: '/',
    element: <Navigate to="/cabinet" />,
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
    path: '/cabinet',
    element: (
      <Protected>
        <Cabinet />
      </Protected>
    ),
  },
]

export default function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

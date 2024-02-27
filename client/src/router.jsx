import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Root from './components/Root'
import SignupComponent from './components/auth/Signup/Signup'
import AuthPage from './pages/Auth'
import Cabinet from './components/Cabinet'

const routes = [
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
    children: [
      {
        path: 'signup',
        element: <SignupComponent />,
      },
    ],
  },
  {
    path: '/cabinet',
    element: <Cabinet />,
  },
]

export default function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

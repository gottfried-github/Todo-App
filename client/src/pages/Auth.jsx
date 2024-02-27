import { Outlet } from 'react-router-dom'

import Layout from '../components/auth/Layout'

export default function Auth() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

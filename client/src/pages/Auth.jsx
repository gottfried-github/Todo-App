import { Outlet } from 'react-router-dom'

import PageLayout from '../components/auth/PageLayout'

export default function Auth() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

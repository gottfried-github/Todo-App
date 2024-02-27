import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import sliceAuth from '../store/store/slice-auth'

export default function Root() {
  const navigate = useNavigate()

  const token = useSelector(state =>
    sliceAuth.selectors.selectToken({ [sliceAuth.reducerPath]: state })
  )

  useEffect(() => {
    if (token) {
      navigate('/cabinet')
    } else {
      navigate('/auth/signup')
    }
  }, [token, navigate])
}

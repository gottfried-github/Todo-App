import { useState } from 'react'
import { useDispatch } from 'react-redux'
import sliceAuth from './store/slice-auth'

/**
 * @description has nothing to do with the store
 */
export const useSignup = () => {
  const [state, setState] = useState({
    status: 'idle',
    send: async data => {
      try {
        const res = await instance.post('/auth/signup', data)

        setState({ status: 'success', body: res.data })
      } catch (e) {
        setState({ status: 'error', error: e })
      }
    },
  })

  return state
}

/**
 * @description dispatches `setToken`
 */
export const useSignin = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    status: 'idle',
    send: async data => {
      try {
        const res = await instance.post('/auth/signin', data)

        dispatch(sliceAuth.actions.setToken(res.data.accessToken))
        setState({ status: 'success' })
      } catch (e) {
        setState({ status: 'error', error: e })
      }
    },
  })

  return state
}

/**
 * @description dispatches `unsetToken`
 */
export const useSignout = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    status: 'idle',
    send: async data => {
      try {
        await instance.post('/auth/signin', data)

        dispatch(sliceAuth.actions.unsetToken())
        setState({ status: 'success' })
      } catch (e) {
        setState({ status: 'error', error: e })
      }
    },
  })

  return state
}

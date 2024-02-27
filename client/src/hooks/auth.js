import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from '../store/http'
import sliceAuth from '../store/store/slice-auth'

/**
 * @description has nothing to do with the store
 */
export const useSignup = () => {
  const [state, setState] = useState({
    status: 'idle',
    error: null,
    reset: () => {
      setState({ ...state, status: 'idle', error: null })
    },
    send: async data => {
      try {
        await axios.post('/auth/signup', data)

        setState({ ...state, status: 'success', error: null })
      } catch (e) {
        console.log('useSignup, axios errorer, e:', e)
        setState({
          ...state,
          status: 'error',
          error: { errors: e.response.data.errors },
        })
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
        const res = await axios.post('/auth/signin', data)

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
        await axios.post('/auth/signin', data)

        dispatch(sliceAuth.actions.unsetToken())
        setState({ status: 'success' })
      } catch (e) {
        setState({ status: 'error', error: e })
      }
    },
  })

  return state
}

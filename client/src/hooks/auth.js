import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
    error: null,
    reset: () => {
      setState({ ...state, status: 'idle', error: null })
    },
    send: async data => {
      try {
        const res = await axios.post('/auth/signin', data)

        console.log('useSignin, axios responded, res:', res)

        dispatch(sliceAuth.actions.setToken(res.data.accessToken))
        setState({ ...state, status: 'success', error: null })
      } catch (e) {
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

export const useRoot = () => {
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

export const useProtected = () => {}

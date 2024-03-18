import axios from 'axios'

import { unauthorizedResponse as actionUnauthorizedResponse } from './actions/auth'
import { tokenSet as actionTokenSet } from './actions/auth'
import { store } from './store/store'
import sliceAuth from './store/slice-auth'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  transformRequest: [data => JSON.stringify(data)],
  transformResponse: [data => (data ? JSON.parse(data) : null)],
})

instance.interceptors.request.use(
  config => {
    const token = store.getState().auth.token

    if (!token) return config

    config.headers = { ...config.headers, authorization: `Bearer ${token}` }

    return config
  },
  e => {
    return Promise.reject(e)
  }
)

instance.interceptors.response.use(
  res => {
    console.log('axios response intercetor, res:', res)
    return res
  },
  async e => {
    console.log('axios response interceptor, e:', e)

    if (e.response.status !== 401) {
      return Promise.reject(e)
    }

    store.dispatch(actionUnauthorizedResponse())

    if (e.config.url === '/auth/refresh') {
      store.dispatch(sliceAuth.actions.unsetToken())

      return Promise.reject(e)
    }

    let resRefresh = null

    try {
      resRefresh = await instance.get('/auth/refresh')
    } catch (e) {
      if (![401, 403].includes(e.response.status)) {
        return Promise.reject(e)
      }

      store.dispatch(sliceAuth.actions.unsetToken())
    }

    store.dispatch(sliceAuth.actions.setToken(resRefresh.data.accessToken))

    // hasSocketConnected is set by the previous successful socket connection
    store.dispatch(sliceAuth.actions.unsetHasSocketConnected())

    const unsubscribe = store.subscribe(async () => {
      const state = store.getState()
      if (!state.auth.hasSocketConnected) return

      // make the HTTP request
      try {
        const resOriginal = await instance({
          ...e.config,
          transformRequest: null,
          headers: {
            ...e.config.headers,
            Authorization: `Bearer ${resRefresh.data.accessToken}`,
          },
        })

        Promise.resolve(resOriginal)
      } catch (e) {
        Promise.reject(e)
      } finally {
        unsubscribe()

        store.dispatch(sliceAuth.actions.unsetHasSocketConnected())
      }
    })

    store.dispatch(actionTokenSet())
  }
)

export default instance

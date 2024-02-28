import axios from 'axios'

import store from './store/store'
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

    if (e.config.url === '/auth/refresh') {
      store.dispatch(sliceAuth.actions.setToken(''))
      return
    }

    try {
      const res = await instance.get('/auth/refresh')

      store.dispatch(sliceAuth.actions.setToken(res.data.accessToken))
    } catch (e) {
      if (![401, 403].includes(e.response.status)) {
        return Promise.reject(e)
      }

      store.dispatch(sliceAuth.actions.setToken(''))
    }
  }
)

export default instance

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
  /*
  adapter: config => {
    console.log('axios, config.adapter')
    return new Promise((resolve, reject) => {
      console.log('axios, config.adapter, promise handler')
      if (config.url.startsWith('/todos') && store.getState().auth.token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${store.getState().auth.token}`,
        }
      }

      // config.adapter = null
      // config.transformRequest = null
      // config.transformResponse = null

      axios({
        method: config.method,
        baseURL: config.baseURL,
        url: config.url,
        headers: config.headers,
        data: config.data,
        transformResponse: null,
      })
        .then(res => {
          console.log('adapter-called instance, res:', res)
          settle(resolve, reject, res)
        })
        .catch(e => {
          console.log('adapter-called instance, e:', e)
          settle(resolve, reject, e.response)
        })
    })
  },
  */
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

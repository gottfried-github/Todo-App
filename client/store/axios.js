import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
axios.defaults.transformRequest = [data => JSON.stringify(data)]
axios.defaults.transformResponse = [data => (data ? JSON.parse(data) : null)]

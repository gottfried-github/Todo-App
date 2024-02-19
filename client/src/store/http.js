import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  transformRequest: [data => JSON.stringify(data)],
  transformResponse: [data => (data ? JSON.parse(data) : null)],
})

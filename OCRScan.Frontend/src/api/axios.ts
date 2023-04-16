import axios from 'axios'

const environment = process.env.NODE_ENV

export const BASE_URL =
  environment === 'production' ? '/api' : 'http://localhost:5555/api'

export const Axios = axios.create({
  baseURL: BASE_URL,
})

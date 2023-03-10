import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

const headers = {
  'Access-Control-Allow-Origin': '*',
}

const axiosInstance = axios.create({
  baseURL,
  headers,
})

export default axiosInstance

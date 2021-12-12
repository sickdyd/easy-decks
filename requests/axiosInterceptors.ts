import { isDevelopment } from '@src/utils/environment'
import axios from 'axios'

axios.interceptors.request.use((config) => {
  isDevelopment && console.log('outgoing request ->', config.url)

  return config
})

axios.interceptors.response.use((response) => {
  isDevelopment && console.log('incoming response -> ', response)

  return response
})

export const fetcher = <T>(url: string): Promise<T> =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.error(error))

export default axios

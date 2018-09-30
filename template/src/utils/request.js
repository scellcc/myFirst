import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000,
  withCredentials: true // request timeout
})
console.log(process.env)
// request interceptor
// service.interceptors.request.use(config => {
//   // Do something before request is sent

// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      alert(res.msg)
      return
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service

import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const { userToken } = store.state
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken.token}`
  }
  return config
},
function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
},
function (error) {
  return Promise.reject(error)
})

export default request

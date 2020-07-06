import axios from 'axios'
import { Message } from 'element-ui'
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api'
//创建axios实例并且赋值给service
const service = axios.create({
  baseURL: BASEURL
  // timeout: 1000,
})
//axiso文档中的拦截器部分代码(http://www.axios-js.com/zh-cn/docs/)
// 添加请求拦截器(一般在请求头里面加token等)
service.interceptors.request.use(
  config => {
    config.headers['Token']=1122
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    let data = response.data
    if (data.resCode !== 0) {
      Message.error(data.message)
      return Promise.reject(data)
    } else {
      return response
    }
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service

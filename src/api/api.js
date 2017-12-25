/*
 * 存放后端接口
 */
import axios from 'axios'
/*
 * 登录
 */
export let isLogin = params => axios.get('/users/isLogin', { params })
export let userLogin = (params) => axios.post('/users/login', params)
export let userLogout = (params) => axios.put('/users/logout', params)

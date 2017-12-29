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
/**
 * 文章相关
 */
export let getArticles = params => axios.get('/articles/getArticles', { params })
export let getComments = params => axios.get('/articles/getComments', { params })
export let changeStatus = params => axios.put('/articles/changeStatus', params)
export let delArticle = params => axios.delete('/articles/delArticle', { params })

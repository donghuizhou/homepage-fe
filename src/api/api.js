/*
 * 存放后端接口
 */
import axios from 'axios'

export const baseUrl = 'http://192.168.31.121:3000'     // 后端接口前缀
/*
 * 登录相关
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
export let getCategories = params => axios.get('/articles/getCategories', { params })
export let createArticle = params => axios.post('/articles/createArticle', params)
export let previewArticle = params => axios.get('/articles/previewArticle', { params })
export let editArticle = params => axios.put('/articles/editArticle', params)
/**
 * 图片上传
 */
export let uploadImg = (params, options) => axios.post('/articles/uploadImg', params, {options})

/*
 * 一些工具函数
 */

 // 时间戳转字符串
export let timeConvert = val => {
  if (val) {
    let t = new Date(val * 1000)
    let year = t.getFullYear().toString().padStart(2, '0')
    let month = (t.getMonth() + 1).toString().padStart(2, '0')
    let day = t.getDate().toString().padStart(2, '0')
    let hour = t.getHours().toString().padStart(2, '0')
    let min = t.getMinutes().toString().padStart(2, '0')
    let seconds = t.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${min}:${seconds}`
  } else {
    return '--'
  }
}

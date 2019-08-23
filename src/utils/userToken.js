const USER_KEY = 'userToken'
// 储存本地数据
export const saveUser = (data) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}
// 获取本地数据
export const getUser = () => {
  JSON.parse(localStorage.getItem(USER_KEY))
}
// 删除本地token数据

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY)
}

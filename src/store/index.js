import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, saveUser } from '@/utils/userToken'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userToken: null
    // userToken: JSON.parse(localStorage.getItem('userToken')) // 初始化就得到Token值
    userToken: getUser()

  },
  mutations: {
    setUser (state, data) {
      state.userToken = data
      // 把token值储存到本地储存，防止页面刷新丢失Token
      // localStorage.setItem('userToken', JSON.stringify(state.userToken))
      saveUser(state.userToken)
      console.log(state)
    }
  },
  actions: {

  }
})

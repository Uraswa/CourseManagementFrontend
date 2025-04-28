import {createStore} from 'vuex'

export default createStore({
  state: {
    user_id: 0,
    is_admin: false,
    userNickname: "Gosha dudar"
  },
  mutations: {
    setUserInfo(state, {user_id, is_admin}) {

      state.user_id = user_id
      state.is_admin = is_admin
    }
  },
  actions: {
    setUserInfo({commit}, userInfo) {
      commit('setUserInfo', userInfo)
    }
  }
})

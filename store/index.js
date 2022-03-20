export const state = () => ({
  image: {
    id: null,
    image: '',
  },
  request: {
    message: null,
    status: null,
  },
})

export const actions = {
  resetRequest({ commit }) {
    commit('resetRequest')
  },

  async uploadImage({ commit }, payload) {
    try {
      const { error, data } = await this.$axios.post('/', payload)

      commit('setImageInfo', data)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
    }
  },

  async deleteUploadedImage({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(`/delete/${payload}`)
      commit('setDeleteUploadedImage', 'Delete Successfully')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
    }
  },

  // User Registration
  async userRegister({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/users/register/', payload)

      // commit('setStatusMsg', 'Registration successful!')
      // setTimeout(() => {
      //   commit('setStatusMsg', null)
      // }, 5000)
      this.$router.push('/login')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },

  // User Login
  async userLogin({ commit }, payload) {
    try {
      const { data, error } = await this.$auth.loginWith('local', {
        data: payload,
      })

      this.$auth.setUser(data.user)

      await this.$auth.setUserToken(data.access, data.refresh)
      // commit('setStatusMsg', 'Login successful')
      // setTimeout(() => {
      //   commit('setStatusMsg', null)
      // }, 5000)
      this.$router.push('/')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.detail)
      setTimeout(() => {
        commit('setErrorMsg', null)
      }, 5000)
    }
  },
}

export const getters = {
  getImage: (state) => state.image,
  getRequest: (state) => state.request,
}

// mutations
export const mutations = {
  setImageInfo: (state, payload) => {
    state.image = payload
    state.request.message = 'Uploaded Successfully!'
    state.request.status = 'success'
  },

  resetRequest: (state) => {
    state.request.message = null
    state.request.status = null
  },

  setDeleteUploadedImage: (state, payload) => {
    state.request.message = payload
    state.request.status = 'success'
  },

  setErrorMsg: (state, payload) => {
    state.request.message = payload
    state.request.status = 'error'
  },
}

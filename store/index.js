export const state = () => ({
  image: null,
  request: {
    message: null,
    status: null,
  },
  pins: [],
  comments: [],
})

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchPins')
  },

  // async uploadImage({ commit }, filename, file) {
  //   // try {
  //   //   const { error, data } = await this.$axios.post('/uploads/', payload)

  //   //   commit('setImageInfo', data)

  //   //   if (error) throw error
  //   // } catch ({ response }) {
  //   //   commit('setErrorMsg', response.data.error)
  //   // }
  //   try {
  //     const { data, error } = await this.$supabase.storage
  //       .from('test-bucket')
  //       .upload(`/${filename}`, file)

  //     const downloadUrl = await this.$supabase.storage
  //       .from('test-bucket')
  //       .download(filename)

  //     // eslint-disable-next-line no-console
  //     console.log(data)
  //     console.log(downloadUrl)

  //     // commit('setImageInfo', data)
  //     if (error) throw error
  //   } catch ({ response }) {
  //     commit('setErrorMsg', response.data.error)
  //   }
  // },

  // async deleteUploadedImage({ commit }, payload) {
  //   try {
  //     const { error } = await this.$axios.delete(`/delete/${payload}`)
  //     commit('setDeleteUploadedImage', 'Delete Successfully')

  //     if (error) throw error
  //   } catch ({ response }) {
  //     commit('setErrorMsg', response.data.error)
  //   }
  // },

  // User Registration
  async userRegister({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/users/register/', payload)

      commit('setStatusMsg', 'Registration successful!')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
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
      commit('setStatusMsg', 'Login successful')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      this.$router.push('/')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.detail)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async userLogout({ commit }) {
    try {
      await this.$auth.logout()
      commit('setStatusMsg', 'Logout successful')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      this.$router.push('/login')
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  // Fetch Pins
  async fetchPins({ commit }) {
    try {
      const { error, data } = await this.$axios.get('/pins/')
      // eslint-disable-next-line no-console
      // console.log(data)

      commit('setPins', data)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async createPin({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/pins/create/', payload)
      // eslint-disable-next-line no-console
      // console.log(data)
      commit('setStatusMsg', 'Pin created successfully')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)

      this.$router.push('/')
      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async commentPin({ commit }, payload) {
    try {
      const { data, error } = await this.$axios.post(
        `/pins/comment/${payload.pin_id}/`,
        payload
      )
      // eslint-disable-next-line no-console
      console.log(data)

      commit('setStatusMsg', 'Comment created successfully')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      // this.$router.push('/')
      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async deleteComment({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(
        `/pins/comment/${payload.pin_id}/${payload.comment}/`
      )
      // eslint-disable-next-line no-console
      // console.log(data)

      commit('setStatusMsg', 'Comment deleted successfully')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      // this.$router.push('/')
      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },
}

export const getters = {
  getImage: (state) => state.image,
  getRequest: (state) => state.request,
  getPins: (state) => state.pins,
  getSinglePin: (state) => (id) => {
    return state.pins.find((pin) => pin.id === id)
  },
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

  setStatusMsg: (state, payload) => {
    state.request.message = payload
    state.request.status = 'success'
  },

  setErrorMsg: (state, payload) => {
    state.request.message = payload
    state.request.status = 'error'
  },

  setPins: (state, payload) => {
    state.pins = payload
  },
}

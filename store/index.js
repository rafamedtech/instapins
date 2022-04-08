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

  // User Registration
  async userRegister({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/users/register/', payload)

      commit('setStatusMsg', 'User created successfully')
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
      // eslint-disable-next-line no-console
      // console.log(this.$auth.user)
      // console.log(data.user)

      await this.$auth.setUserToken(data.access, data.refresh)
      commit('setStatusMsg', `Welcome back ${this.$auth.user.username}!`)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      this.$router.go(-1)

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

      commit('setPins', data)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async createPin({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/pins/create/', payload)

      commit('setStatusMsg', 'Pin created successfully')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)

      commit('setRemoveImageInfo')

      this.$router.push('/')
      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async deletePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(`/pins/delete/${payload}/`)

      commit('setStatusMsg', 'Pin deleted successfully')
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
      const { error } = await this.$axios.post(
        `/pins/comment/${payload.pin}/`,
        payload
      )
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
        `/pins/comment/${payload.pin}/${payload.comment}/`
      )
      // eslint-disable-next-line no-console
      // console.log(data)

      commit('setStatusMsg', 'Comment deleted!')
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

  async likePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.post(
        `/pins/like/${payload.id}/`,
        payload
      )
      // eslint-disable-next-line no-console
      // console.log(data)

      // commit('setStatusMsg', 'Pin liked successfully')
      // setTimeout(() => {
      //   commit('resetRequest')
      // }, 5000)
      // this.$router.push('/')
      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async unlikePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(`/pins/like/${payload.id}/`, {
        data: payload,
      })

      // eslint-disable-next-line no-console
      // console.log(data)

      // commit('setStatusMsg', 'Pin unliked successfully')
      // setTimeout(() => {
      //   commit('resetRequest')
      // }, 5000)
      // this.$router.push('/')
      if (error) throw error
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async uploadImage({ commit }, payload) {
    try {
      const { error } = await this.$supabase.storage
        .from('test-bucket')
        .upload(payload.filename, payload.file)
      // eslint-disable-next-line no-console

      commit('setStatusMsg', 'Image uploaded successfully')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      // this.$router.push('/')
      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }

    // Get the Public URL for the uploaded file
    try {
      const { publicURL, error } = await this.$supabase.storage
        .from('test-bucket')
        .getPublicUrl(payload.filename)

      commit('setImageInfo', publicURL)
      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async deleteUpload({ commit }, payload) {
    try {
      const { error } = await this.$supabase.storage
        .from('test-bucket')
        .remove([payload.filename])

      commit('setRemoveImageInfo')

      commit('setStatusMsg', 'Image deleted successfully')
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }
  },

  async uploadAvatar({ commit }, payload) {
    try {
      const { error } = await this.$supabase.storage
        .from('test-bucket')
        .upload(payload.filename, payload.file)
      // eslint-disable-next-line no-console

      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
      // this.$router.push('/')
      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }

    try {
      const { data, error } = await this.$axios.put('/users/', {
        avatar: `https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/${payload.filename}`,
      })
      // eslint-disable-next-line no-console
      // console.log(data)
      commit('setStatusMsg', data.message)

      await this.$auth.fetchUser()
      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
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

  setRemoveImageInfo: (state) => {
    state.image = ''
    state.request.message = 'Image deleted successfully!'
    state.request.status = 'success'
  },

  resetRequest: (state) => {
    state.request.message = null
    state.request.status = null
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

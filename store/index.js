export const state = () => ({
  image: null,
  request: {
    message: null,
    status: null,
  },
})

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('pins/fetchPins')
  },

  // User Registration
  async userRegister({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/users/register/', payload)

      commit('setStatusMsg', 'User created successfully')
      setTimeout(() => {
        commit('resetRequest', null)
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
      // console.log(this.$auth.user)

      commit('setStatusMsg', `Welcome back ${this.$auth.user.username}!`)
      setTimeout(() => {
        commit('resetRequest', null)
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

  // User Logout
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

  // Upload a new profile image
  async uploadAvatar({ commit }, payload) {
    try {
      const { error } = await this.$supabase.storage
        .from('instapins')
        .upload(payload.filename, payload.file)

      setTimeout(() => {
        commit('resetRequest', null)
      }, 5000)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error)
      setTimeout(() => {
        commit('resetRequest')
      }, 5000)
    }

    try {
      const { data, error } = await this.$axios.put('/users/user/', {
        avatar: `https://geqogioegammsiznrksj.supabase.co/storage/v1/object/public/instapins/${payload.filename}`,
      })

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

// Getters
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

  resetRequest: (state, payload) => {
    state.request.message = payload
    state.request.status = payload
  },

  setStatusMsg: (state, payload) => {
    state.request.message = payload
    state.request.status = 'success'
  },

  setErrorMsg: (state, payload) => {
    state.request.message = payload
    state.request.status = 'error'
  },
}

export const state = () => ({
  image: null,
  comments: [],
  pins: [],
})

export const actions = {
  // Fetch Pins
  async fetchPins({ commit }) {
    try {
      const { error, data } = await this.$axios.get('/pins/')

      commit('setPins', data)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', { root: true })
      }, 5000)
    }
  },

  // Create a new Pin
  async createPin({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/pins/create/', payload)

      commit('setStatusMsg', 'Pin created successfully', { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)

      // commit('setRemoveImageInfo')
      this.$router.push('/')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Update an existing Pin
  async updatePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.put(
        `/pins/details/${payload.id}/edit/`,
        payload
      )

      commit('setStatusMsg', 'Pin updated successfully')
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
      this.$router.push('/profile')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Delete a Pin
  async deletePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(`/pins/delete/${payload}/`)

      commit('setStatusMsg', 'Pin deleted successfully', { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
      this.$router.push('/')

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Comment a Pin
  async commentPin({ commit }, payload) {
    try {
      const { error } = await this.$axios.post(
        `/pins/comment/${payload.pin}/`,
        payload
      )

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Delete comment from a Pin
  async deleteComment({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(
        `/pins/comment/${payload.pin}/${payload.comment}/`
      )

      commit('setStatusMsg', 'Comment deleted!')
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Like a Pin
  async likePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.post(
        `/pins/like/${payload.id}/`,
        payload
      )

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Unlike a Pin
  async unlikePin({ commit }, payload) {
    try {
      const { error } = await this.$axios.delete(`/pins/like/${payload.id}/`, {
        data: payload,
      })

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Upload an image from user's device
  async uploadImage({ commit }, payload) {
    try {
      const { error } = await this.$supabase.storage
        .from('test-bucket')
        .upload(payload.filename, payload.file)

      commit('setStatusMsg', 'Image uploaded successfully', { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
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
      commit('setErrorMsg', error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },

  // Delete an image uploaded from user's device
  async deleteUpload({ commit }, payload) {
    try {
      const { error } = await this.$supabase.storage
        .from('test-bucket')
        .remove([payload.filename])

      commit('setRemoveImageInfo')
      commit('setStatusMsg', 'Image deleted successfully', { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error, { root: true })
      setTimeout(() => {
        commit('resetRequest', null, { root: true })
      }, 5000)
    }
  },
}

// Getters
export const getters = {
  getImage: (state) => state.image,
  getPins: (state) => state.pins,
  getSinglePin: (state) => (id) => {
    return state.pins.find((pin) => pin.id === id)
  },
  getMessages: (state) => state.messages,
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

  setPins: (state, payload) => {
    state.pins = payload
  },
}

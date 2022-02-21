export const state = () => ({
  image: null,
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
      const { error } = await this.$axios.post('/', payload)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
    }
  },

  async getImageInfo({ commit }, payload) {
    try {
      const { data, error } = await this.$axios.get(`/${payload}`)

      commit('setImageInfo', data)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
    }
  },
}

export const getters = {
  getImage(state) {
    return state.image
  },
  getRequest(state) {
    return state.request
  },
}

// mutations
export const mutations = {
  setImageInfo(state, { image }) {
    state.image = image
    state.request.message = 'Uploaded Successfully!'
    state.request.status = 'success'
  },

  resetRequest(state) {
    state.request.message = null
    state.request.status = null
  },

  setErrorMsg(state, payload) {
    state.request.message = payload
    state.request.status = 'error'
  },
}

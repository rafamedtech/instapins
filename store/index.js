export const state = () => ({
  image: null,
  request: {
    message: null,
    status: null,
  },
  isLoading: false,
})

export const actions = {
  isLoading({ commit }, payload) {
    commit('setIsLoading', payload)
  },

  async uploadImage({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/', payload)
      console.log(payload)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      payload = null
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
  getIsLoading(state) {
    return state.isLoading
  },
}

// mutations
export const mutations = {
  setImageInfo(state, { image }) {
    state.image = image
    state.request.message = 'Uploaded Successfully!'
    state.request.status = 'success'
  },
  setIsLoading(state, payload) {
    setTimeout(() => {
      state.isLoading = payload
    }, 2000)
    state.isLoading = false
  },
  setErrorMsg(state, payload) {
    state.request.message = payload
    state.request.status = 'error'
  },
}

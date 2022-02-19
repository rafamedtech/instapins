export const state = () => ({
  image: null,
  request: {
    message: null,
    status: null,
  },
  isLoading: false,
})

export const actions = {
  async getImage({ commit }, payload) {
    const { data } = await this.$axios.get(`/${payload}`)

    commit('setImage', data)
  },

  isLoading({ commit }, payload) {
    commit('setIsLoading', payload)
  },

  async uploadImage({ commit }, payload) {
    try {
      const { error } = await this.$axios.post('/', payload)

      if (error) throw error
    } catch ({ response }) {
      commit('setErrorMsg', response.data.error)
      payload = null
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
  setImage(state, payload) {
    state.image = payload
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

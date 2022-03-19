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

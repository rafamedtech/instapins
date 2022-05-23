export const state = () => ({
  image: null,
  users: [],
  threads: [],
  thread: null,
})

export const actions = {
  // Websockets connection
  websocketConnection({ commit }, thread) {
    if (process.client) {
      //   console.log('Starting Connection')

      const connection = new WebSocket(
        `ws://localhost:8000/ws/${
          thread.id
        }/?token=${this.$auth.strategy.token.get()}`
      )

      connection.onopen = (event) => {
        console.log(event)
        console.log('Connection Opened')
      }

      connection.onmessage = (event) => {
        const data = JSON.parse(event)
        console.log(`Data: ${data}`)
        console.log('Message Received')
        // console.log(event.data)
      }
    }
  },

  async fetchUsers({ commit }) {
    try {
      const { data, error } = await this.$axios.get('/users/')

      commit('setUsers', data)
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  },

  // Fetch Threads
  async fetchThreads({ commit }) {
    try {
      const { error, data } = await this.$axios.get('/messages/')

      commit('setThreads', data)

      if (error) throw error
    } catch (error) {
      commit('setErrorMsg', error, { root: true })
      setTimeout(() => {
        commit('resetRequest', { root: true })
      }, 5000)
    }
  },

  newThread({ commit }, payload) {
    commit('setThread', payload)
  },
}

export const getters = {
  getUsers: (state) => state.users,
  // Get all threads
  allThreads: (state) => state.threads,
  getThread: (state) => state.thread,
}

export const mutations = {
  // Set all threads
  setThreads: (state, payload) => (state.threads = payload),
  setThread: (state, payload) => state.threads.unshift(payload),
  setUsers: (state, payload) => (state.users = payload),
}

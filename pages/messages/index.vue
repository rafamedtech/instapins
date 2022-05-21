<template>
  <main class="container">
    <button
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <h1 class="mb-5 ml-2 text-4xl text-primary md:ml-4">Messages</h1>

    <section
      v-if="threads.length > 0"
      class="relative mb-8 flex h-[40rem] items-center gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <MessageList :threads="threads" activechat @user-selected="openChat" />
      <div
        v-if="!currentThread"
        class="mx-auto hidden w-1/2 items-center justify-center text-gray-500 md:flex md:flex-col md:gap-4"
      >
        <NoMessages :size="36" fill-color="#5481bb" />
        <span>Click any chat to see the conversation</span>
        <button @click="newMessageModal">
          <NewMessage
            :size="36"
            fill-color="white"
            class="absolute right-4 bottom-4 mx-auto hidden h-16 w-16 rounded-full bg-primary p-2 md:grid md:place-items-center"
          />
        </button>
      </div>

      <Chat v-else :thread="currentThread && currentThread" />
    </section>

    <section
      v-else
      class="m-4 mb-8 flex h-80 w-auto flex-col items-center justify-center gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <p class="text-2xl text-gray-600">No messages yet</p>
      <span class="text-gray-500">Start chatting with your friends</span>
      <button
        class="rounded-lg bg-primary px-3 py-3 text-center text-white shadow-md"
        @click="newMessageModal"
      >
        Send message
      </button>
    </section>

    <!-- New message CTA on mobile -->
    <button v-if="threads.length" @click="newMessageModal">
      <NewMessage
        :size="36"
        fill-color="white"
        class="absolute right-4 bottom-4 mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary p-2 md:hidden"
      />
    </button>

    <!-- New message form -->
    <section
      v-if="newMessage"
      class="absolute inset-0 min-h-screen w-screen bg-black/60 py-10"
    >
      <div class="container h-full">
        <div class="absolute inset-0 z-0" @click="modal = false"></div>
        <section
          class="m-4 mb-8 flex max-w-[768px] flex-col gap-4 rounded-[32px] bg-white p-4 pt-8 shadow-pinterest md:mx-auto"
        >
          <h1 class="ml-2 text-4xl text-primary md:ml-4">New Message</h1>
          <form
            class="relative flex w-full flex-col gap-4 p-4"
            @submit.prevent="newThread"
          >
            <div class="flex flex-col gap-2 md:w-1/2">
              <label for="message-to" class="text-primary">To:</label>
              <input
                id="message-to"
                v-model="receiver"
                type="text"
                class="z-10 w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                autocomplete="off"
                @focus="modal = true"
              />
            </div>

            <!-- autocomplete component -->
            <div
              v-if="filteredUsers && modal"
              class="absolute top-28 z-10 rounded-lg bg-white shadow-pinterest"
            >
              <ul class="w-48 text-center text-primary">
                <li
                  v-for="(user, index) in filteredUsers"
                  :key="index"
                  class="cursor-pointer border-b py-2"
                  @click="setUser(user.username)"
                >
                  {{ user.username }}
                </li>
              </ul>
            </div>
            <div class="flex flex-col gap-2">
              <label for="message-content" class="text-primary"
                >Your message:</label
              >
              <textarea
                id="message-content"
                v-model="message"
                type="text"
                class="min-h-[150px] w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
            <div class="flex items-center justify-end">
              <button
                class="mx-4 flex gap-x-2 text-gray-500 hover:text-red-600"
                @click="newMessageModal"
              >
                Cancel
              </button>
              <input
                type="submit"
                value="Send"
                class="w-40 cursor-pointer self-end rounded-lg bg-primary px-3 py-3 text-center text-white shadow-md hover:bg-primary/75"
              />
            </div>
          </form>
        </section>
      </div>
    </section>
  </main>
</template>

<script>
import MessageOffOutline from 'icons/MessageOffOutline.vue'
import MessagePlusOutline from 'icons/MessagePlusOutline.vue'
import ArrowLeft from 'icons/ArrowLeft.vue'

export default {
  components: {
    NoMessages: MessageOffOutline,
    NewMessage: MessagePlusOutline,
    BackIcon: ArrowLeft,
  },
  middleware: 'auth',

  data: () => ({
    chatActive: false,
    currentThread: null,
    receiver: '',
    // users: [],
    filteredUsers: [],
    message: '',
    newMessage: false,
    modal: false,
  }),
  // async fetch() {
  //   this.users = await this.$axios.$get('/users/')
  // },
  computed: {
    users() {
      return this.$store.getters['chat/getUsers']
    },
    threads() {
      return this.$store.getters['chat/allThreads']
    },
    getCurrentThread() {
      return this.$store.getters['chat/getThread']
    },
  },
  watch: {
    receiver() {
      this.searchUsers()
    },
  },
  mounted() {
    this.searchUsers()
  },
  methods: {
    newMessageModal() {
      this.newMessage = !this.newMessage
    },
    openChat(thread) {
      this.currentThread = thread
      this.chatActive = true
    },

    newThread() {
      // this.$store.dispatch('chat/newThread', {
      //   id: 1,
      //   username: this.receiver,
      //   message: this.message,
      // })
      this.$store.dispatch('chat/fetchUsers')
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(({ username }) => {
        return username.toLowerCase().startsWith(this.receiver.toLowerCase())
        // return user.includes(this.receiver)
      })
    },

    setUser(user) {
      if (this.filteredUsers.length === 0) {
        this.filteredUsers = this.users
      }
      this.receiver = user
      this.modal = false
    },
    // async fetchThreads() {
    //   const { data } = await this.$axios.get('/messages/')
    //   this.threads = data
    //   console.log(data)
    // },
  },
}
</script>

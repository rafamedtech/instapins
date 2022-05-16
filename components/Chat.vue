<template>
  <div>
    <div class="chats-container">
      <h2 class="mb-5 ml-2 text-center text-2xl text-primary md:ml-4">
        Conversation with {{ thread.username }}
      </h2>
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="ml-2 md:ml-4"
      >
        <div>
          <span
            class="username"
            :class="
              message.username !== $auth.user.username
                ? 'text-primary'
                : 'text-gray-500'
            "
            >{{
              message.username === $auth.user.username
                ? 'You'
                : message.username
            }}:
          </span>
          <span class="message">{{ message.message }}</span>
        </div>
      </div>
    </div>
    <form
      v-if="$auth.loggedIn"
      class="mt-5 flex w-full flex-wrap items-center justify-evenly gap-4 md:justify-start md:gap-2 md:p-4 lg:flex-nowrap"
    >
      <!-- <img
        class="h-16 w-16 rounded-full object-cover"
        :src="$auth.user.avatar"
        alt=""
      /> -->
      <input
        v-model="myMessage"
        class="w-auto rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        type="text"
        placeholder="Add a Message"
      />
      <input
        class="m-auto w-32 cursor-pointer self-end rounded-lg bg-primary px-3 py-3 text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-400"
        type="submit"
        value="Send"
        :disabled="!myMessage"
        :title="!myMessage ? 'Please enter a Message' : 'Send Message'"
      />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
      // required: true,
      default: () => {},
    },
  },
  data: () => ({
    connection: null,
    myMessage: '',
    messages: [
      {
        username: 'johndoe',
        message: 'Hello, how are you?',
      },
      {
        username: 'rafamed',
        message: 'I am fine, thank you',
      },
    ],
  }),
  created() {
    if (process.client) {
      //   console.log('Starting Connection')
      //   console.log(this.$route.path)

      this.connection = new WebSocket(
        `ws://localhost:8000/ws/${this.thread.id}/`
      )
      //   this.connection = new WebSocket(`ws://localhost:8000${this.$route.path}`)

      this.connection.onopen = (event) => {
        console.log(event.data)
        console.log('Connection Opened')
      }

      this.connection.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log(`Data: ${data}`)
        // console.log('Message Received')
        // console.log(event.data)
      }
    }
  },
  methods: {
    sendMessage() {
      this.connection.send(this.myMessage)
      this.myMessage = ''
    },
  },
}
</script>

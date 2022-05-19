<template>
  <div class="flex h-full w-full flex-col justify-between">
    <div class="chats-container">
      <h2 class="mb-5 ml-2 text-center text-2xl text-primary md:ml-4">
        Conversation with {{ thread.username }}
      </h2>
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="ml-2 md:ml-4"
      >
        <span
          class="username"
          :class="
            message.username !== $auth.user.username
              ? 'text-primary'
              : 'text-gray-500'
          "
          >{{
            message.username === $auth.user.username ? 'You' : message.username
          }}:
        </span>
        <span class="message">{{ message.message }}</span>
      </div>
    </div>
    <form
      v-if="$auth.loggedIn"
      class="mt-5 flex w-full flex-wrap items-center justify-evenly gap-4 md:justify-between md:gap-2 md:p-4 lg:flex-nowrap"
      @submit.prevent="sendMessage"
    >
      <!-- <img
        class="h-16 w-16 rounded-full object-cover"
        :src="$auth.user.avatar"
        alt=""
      /> -->
      <input
        v-model="myMessage"
        class="w-[400px] rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
        type="text"
        placeholder="Add a Message"
      />
      <input
        class="w-32 cursor-pointer self-end rounded-lg bg-primary px-3 py-3 text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-400"
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
    return this.$store.dispatch('chat/websocketConnection', {
      id: 1,
      thread: this.thread,
    })
  },
  methods: {
    sendMessage() {
      this.connection.send(
        JSON.stringify({
          message: this.myMessage,
          username: this.$auth.user.username,
          receiver: this.thread.username,
        })
      )
      this.myMessage = ''
    },
  },
}
</script>

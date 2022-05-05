<template>
  <div>
    <section
      class="mb-8 flex flex-col items-start gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <div v-for="(messageItem, index) in messages" :key="index">
        <div>
          <p>{{ messageItem.username }}: {{ messageItem.message }}</p>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <input
          v-model="message"
          type="text"
          class="rounded-md p-2 shadow-pinterest"
        />
        <input type="submit" value="Send" />
      </form>
    </section>
  </div>
</template>

<script>
// import Pusher from 'pusher-js'
export default {
  data() {
    return {
      message: '',
      // messages: [],
    }
  },
  computed: {
    messages() {
      return this.$store.getters.getMessages
    },
  },
  mounted() {
    this.$store.dispatch('chatInit', this.$route.params.slug)
    // Pusher.logToConsole = true
    // const pusher = new Pusher('0063487306c9680a49b1', {
    //   cluster: 'us3',
    // })
    // const channel = pusher.subscribe('myunsplash')
    // channel.bind('message', function (data) {
    //   this.messages.push(data)
    // })
  },
  methods: {
    async onSubmit() {
      await this.$axios.post('/messages/', {
        message: this.message,
        username: this.$auth.user.username,
      })

      this.message = ''
    },
  },
}
</script>

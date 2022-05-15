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
      class="relative mb-8 flex items-center gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <MessageList />
      <div
        class="mx-auto hidden w-1/2 items-center justify-center text-gray-500 md:flex md:flex-col md:gap-4"
      >
        <NoMessages :size="36" fill-color="#5481bb" />
        <span>Click any chat to see the conversation</span>
        <nuxt-link :to="{ path: 'messages/new' }">
          <NewMessage
            :size="36"
            fill-color="white"
            class="absolute right-4 bottom-4 mx-auto hidden h-16 w-16 rounded-full bg-primary p-2 md:grid md:place-items-center"
          />
        </nuxt-link>
      </div>
    </section>

    <section
      v-else
      class="mb-8 flex h-80 w-full flex-col items-center justify-center gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <p class="text-2xl text-gray-600">No messages yet</p>
      <span class="text-gray-500">Start chatting with your friends</span>
      <nuxt-link
        :to="{ path: 'messages/new' }"
        class="rounded-lg bg-primary px-3 py-3 text-center text-white shadow-md"
        >Send message</nuxt-link
      >
    </section>

    <!-- New message CTA on mobile -->
    <nuxt-link :to="{ path: 'messages/new' }">
      <NewMessage
        :size="36"
        fill-color="white"
        class="absolute right-4 bottom-4 mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary p-2 md:hidden"
      />
    </nuxt-link>
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
    newMessage: false,
    threads: [],
  }),
}
</script>

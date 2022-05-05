<template>
  <main class="container">
    <button
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <h1 class="mb-5 ml-2 text-4xl text-gray-500 md:ml-4">Messages</h1>
    <section
      class="mb-8 flex items-center gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <div class="w-full p-4 md:w-1/2 md:border-r-2 md:border-gray-300">
        <nuxt-link v-for="(item, index) in 4" :key="index" to="/" class="w-1/2">
          <div class="flex items-center gap-2">
            <img
              src="https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png"
              alt=""
              class="mr-2 h-12 w-12 rounded-full object-cover"
            />
            <span to="/" class="text-sm text-blue-500">Rafael Valenzuela</span>
          </div>
          <span class="block text-center text-sm text-gray-500"
            >This is a test message</span
          >
          <hr class="mt-4 divide-neutral-700" />
        </nuxt-link>
      </div>
      <div
        class="hidden w-1/2 items-center justify-center text-gray-500 md:flex md:flex-col md:gap-4"
      >
        <NoMessages :size="36" />
        <span>Click any chat to see the conversation</span>
      </div>
    </section>
  </main>
</template>

<script>
import MessageOffOutline from 'icons/MessageOffOutline.vue'
import ArrowLeft from 'icons/ArrowLeft.vue'
export default {
  components: {
    NoMessages: MessageOffOutline,
    BackIcon: ArrowLeft,
  },
  middleware: 'auth',
  data: () => ({
    newMessage: false,
  }),
}
</script>

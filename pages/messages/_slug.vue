<template>
  <main class="container">
    <button
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <h1 class="mb-5 ml-2 hidden text-4xl text-primary md:ml-4 md:block">
      Messages
    </h1>
    <section
      class="rounded-pinterest mb-8 flex items-center gap-4 p-4 shadow-pinterest"
    >
      <MessageList class="hidden md:block" />
      <Chat />
    </section>
  </main>
</template>

<script>
import ArrowLeft from 'icons/ArrowLeft.vue'
export default {
  components: {
    BackIcon: ArrowLeft,
  },
  data() {
    return {
      message: '',
    }
  },

  created() {},
  methods: {
    onSubmit() {},
  },
}
</script>

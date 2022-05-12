<template>
  <main class="container">
    <button
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <h1 class="mb-5 ml-2 text-4xl text-primary md:ml-4">New Message</h1>

    <section
      class="mx-auto mb-8 flex max-w-[768px] items-center gap-4 rounded-[32px] p-4 shadow-pinterest"
    >
      <form class="flex w-full flex-col gap-4 p-4">
        <div class="flex flex-col gap-2 md:w-1/2">
          <label for="message-to" class="text-primary">To:</label>
          <input
            id="message-to"
            type="text"
            class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="message-content" class="text-primary"
            >Your message:</label
          >
          <textarea
            id="message-content"
            type="text"
            class="min-h-[300px] w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 md:h-80"
          />
        </div>
        <input
          type="submit"
          value="Send"
          class="w-40 cursor-pointer self-end rounded-lg bg-primary px-3 py-3 text-center text-white shadow-md hover:bg-primary/75"
        />
      </form>
    </section>
  </main>
</template>

<script>
import ArrowLeft from 'icons/ArrowLeft.vue'
export default {
  components: {
    BackIcon: ArrowLeft,
  },
}
</script>

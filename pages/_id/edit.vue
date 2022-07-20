<template>
  <main class="container">
    <button
      type="button"
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <section
      class="mx-2 flex h-auto flex-col rounded-[32px] p-4 shadow-pinterest md:mx-4 md:flex-row md:gap-x-8"
    >
      <article
        class="absolute inset-0 z-50 grid h-screen w-screen place-items-center overflow-hidden bg-[#2C394B]/75 transition-all"
        :class="{ hidden: !isLoading }"
      >
        <transition name="fade">
          <Modal v-if="isLoading" :message="modalMsg" />
        </transition>
      </article>
      <article
        class="mx-auto w-full items-center justify-center rounded-xl md:my-10 md:w-[400px] md:py-0"
      >
        <figure class="h-full w-full overflow-hidden rounded-xl py-4">
          <img
            :src="pin.url"
            :alt="pin.title"
            class="h-auto w-full rounded-xl"
          />
        </figure>
      </article>

      <!-- Edit entry form -->
      <form
        class="mx-auto flex w-full flex-col gap-y-8 py-4 md:w-1/2"
        @submit.prevent="updatePin"
      >
        <label class="hidden" for="title"></label>
        <input
          id="title"
          v-model="pin.title"
          type="text"
          placeholder="Add a title"
          class="border-b-2 bg-transparent text-4xl text-gray-500 focus:outline-none"
          required
        />
        <label class="hidden" for="description"></label>
        <textarea
          id="description"
          v-model="pin.description"
          placeholder="Tell us about your pin"
          class="h-40 w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          required
        ></textarea>

        <div class="flex w-full items-center justify-end gap-x-4">
          <button
            type="button"
            class="text-gray-500 hover:text-red-500"
            @click="$router.go(-1)"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="cursor-pointer rounded-lg bg-primary px-3 py-3 text-white shadow-md hover:bg-primary/75"
          >
            Update pin
          </button>
        </div>
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

  middleware: 'auth',

  data: () => ({
    pin: {
      title: '',
      description: '',
      image: '',
    },
    isLoading: false,
    modalMsg: '',
  }),

  head() {
    return {
      title: `Editing ${this.pin.title} | Instapins`,
    }
  },

  computed: {
    request() {
      return this.$store.getters.getRequest
    },
  },

  mounted() {
    this.getSinglePin()
  },
  methods: {
    async getSinglePin() {
      try {
        const { data, error } = await this.$axios(
          `/pins/details/${this.$route.params.id}/`
        )
        console.log(data)
        this.pin = data
        if (error) throw error
      } catch (error) {
        console.log(error)
      }
    },

    updatePin() {
      const formData = new FormData()
      formData.append('title', this.pin.title)
      formData.append('description', this.pin.description)

      this.$store.dispatch('pins/updatePin', this.pin)
    },
  },
}
</script>

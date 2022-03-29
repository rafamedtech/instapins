<template>
  <main class="container">
    <section
      class="container flex h-auto min-h-[500px] flex-col rounded-[32px] p-4 shadow-pinterest md:flex-row"
    >
      <article
        class="mx-auto my-10 w-[402px] flex-col items-center justify-center rounded-xl"
      >
        <!-- class="mx-auto my-10 h-[469px] w-[402px] flex-col rounded-xl bg-white shadow-pinterest" -->
        <!-- :class="request.status === 'success' ? 'pb-9 pt-4' : 'py-9'" -->
        <!-- <Dropzone /> -->
        <figure
          v-if="pin.image"
          class="h-full w-full overflow-hidden rounded-xl"
        >
          <img :src="pin.image" alt="" class="h-full w-full object-cover" />
        </figure>
        <div
          v-else
          class="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-500 bg-gray-300"
        >
          <p class="text-gray-600">No preview available</p>
        </div>
      </article>

      <!-- New entry form -->
      <article class="mx-auto flex flex-col gap-y-8 py-4 md:w-1/2">
        <input
          v-model="pin.title"
          type="text"
          placeholder="Add a title"
          class="border-b-2 text-4xl focus:outline-none"
        />
        <textarea
          v-model="pin.description"
          placeholder="Tell us about your pin"
          class="h-40 w-full rounded-[16px] border border-gray-400 p-4 text-gray-500"
        ></textarea>
        <input
          v-if="uploadedImage"
          type="text"
          class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500"
          :value="uploadedImage"
        />
        <input
          v-else
          v-model="pin.image"
          type="text"
          placeholder="Add your image url or upload a new one"
          class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500"
        />
        <div class="flex w-full items-center justify-end gap-x-4">
          <button class="text-gray-500 hover:text-red-500">Cancel</button>
          <input
            type="submit"
            value="Create pin"
            class="cursor-pointer rounded-lg bg-green-600 px-3 py-3 text-white shadow-md hover:bg-green-600/75"
            @click="createPin"
          />
        </div>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  data: () => ({
    pin: {
      title: '',
      description: '',
      image: '',
    },
  }),
  computed: {
    request() {
      return this.$store.getters.getRequest
    },
    uploadedImage() {
      return this.$store.getters.getImage
    },
  },
  methods: {
    createPin() {
      const formData = new FormData()
      formData.append('title', this.pin.title)
      formData.append('description', this.pin.description)
      formData.append('url', this.pin.image)
      this.$store.dispatch('createPin', formData)
    },
  },
}
</script>

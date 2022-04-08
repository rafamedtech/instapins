<template>
  <main class="my-12">
    <section
      class="container mb-4 flex flex-col-reverse items-center gap-y-4 md:mb-8 md:flex-row md:justify-between md:px-4 lg:p-0"
    >
      <h1 class="text-4xl text-[#5481bb]">All Pins</h1>
      <SearchBar v-if="$route.path === '/'" @search="searchPins" />
    </section>
    <div
      v-if="pins.length"
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-4 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-0"
    >
      <PinCard v-for="(pin, index) in pins" :key="index" :pin="pin" />
    </div>
    <div
      v-else
      class="container grid place-items-center px-2 pb-28 md:px-4 lg:px-0"
    >
      <i class="text-2xl text-gray-500">No pins yet</i>
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    pins: [],
  }),
  computed: {
    getPins() {
      return this.$store.getters.getPins
    },
  },

  created() {
    this.$store.dispatch('fetchPins')
    this.pins = this.getPins
  },

  methods: {
    searchPins(input) {
      // eslint-disable-next-line no-console

      this.pins = this.getPins.filter((pin) => {
        return pin.title.toLowerCase().includes(input.toLowerCase())
      })
    },
  },
}
</script>

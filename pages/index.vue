<template>
  <main class="my-12">
    <div
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-1 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-8 xl:px-0"
    >
      <PinCard v-for="(pin, index) in pins" :key="index" :pin="pin" />
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    pins() {
      return this.$store.getters.getPins
    },
  },

  created() {
    this.$store.dispatch('fetchPins')
  },
}
</script>

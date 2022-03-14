<template>
  <div
    class="group relative block max-w-sm cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl shadow-xl"
  >
    <nuxt-link :to="`/${image.id}`" class="cursor-zoom-in">
      <img
        class="w-full transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
        :src="image.src"
        @click="test"
      />
    </nuxt-link>

    <p
      class="absolute bottom-2 left-2 hidden self-end text-white group-hover:block"
    >
      {{ image.label }}
    </p>
    <button
      class="absolute top-2 right-2 hidden self-start rounded-lg border border-red-500 p-1 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white group-hover:block"
    >
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
  },

  methods: {
    test() {
      console.log('test')
    },
  },
}
</script>

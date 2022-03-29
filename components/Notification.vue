<template>
  <article
    class="absolute right-4 top-6 animate-bounce rounded-md bg-white/80 p-4 shadow-lg"
  >
    <div
      v-if="request.status === 'success'"
      class="flex items-center gap-x-2 text-gray-500"
    >
      <p>{{ request.message }}</p>
      <CheckCircle :size="36" fill-color="#219653" />
    </div>
    <div v-else class="flex items-center gap-x-2 text-gray-500">
      <CloseCircle :size="36" fill-color="#C30000" />
      <p>{{ request.message }}</p>
    </div>
  </article>
</template>

<script>
import CloseCircle from 'icons/CloseCircle.vue'
import CheckCircle from 'icons/CheckCircle.vue'

export default {
  components: {
    CloseCircle,
    CheckCircle,
  },

  props: {
    request: {
      type: Object,
      required: true,
    },
  },
}
</script>

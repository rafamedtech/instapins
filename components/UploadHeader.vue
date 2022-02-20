<template>
  <article class="flex flex-col items-center">
    <CloseCircle
      v-if="request.status === 'error'"
      :size="48"
      fill-color="#C30000"
    />
    <CheckCircle
      v-if="request.status === 'success'"
      :size="48"
      fill-color="#219653"
    />

    <h1 v-if="request.status" class="text-base">
      {{ request.message }}
    </h1>

    <h1 v-else class="text-lg">Upload your image</h1>
    <span
      :class="!request.status ? '' : 'opacity-0'"
      class="text-[10px] text-[#828282]"
      >File should be Jpeg, Png,...</span
    >
  </article>
</template>

<script>
import CloseCircle from 'vue-material-design-icons/CloseCircle.vue'
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
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

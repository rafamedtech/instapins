<template>
  <div
    class="flex h-[143px] w-[400px] flex-col items-start justify-center gap-8 rounded-xl bg-white pl-8 shadow-lg"
  >
    <span class="text-md">{{ message }}</span>
    <div
      v-if="confirmation"
      class="flex w-full items-center justify-end gap-x-4 pr-4"
    >
      <button class="text-gray-500 hover:text-red-500" @click="closeModal">
        Cancel
      </button>
      <button
        class="cursor-pointer rounded-lg bg-primary px-3 py-3 text-white shadow-md hover:bg-primary/75"
        @click="
          () => {
            onAction()
            closeModal()
          }
        "
      >
        Accept
      </button>
    </div>
    <span
      v-else
      class="loading-animation relative h-[6px] w-[340px] overflow-hidden rounded-lg bg-[#f2f2f2] after:absolute after:inset-0 after:w-32 after:translate-x-2 after:rounded-lg after:bg-[#2F80ED] after:content-['']"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Uploading',
    },
    confirmation: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    onAction() {
      this.$emit('onAction')
    },
  },
}
</script>

<template>
  <div
    class="flex h-[143px] w-[400px] flex-col items-start justify-center gap-8 rounded-xl bg-white pl-8 shadow-lg"
  >
    <span class="text-md">{{ message }}</span>
    <span
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
  },
}
</script>

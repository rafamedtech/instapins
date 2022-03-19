<template>
  <div class="">
    <section
      class="mx-auto mt-20 h-[469px] w-[402px] flex-col rounded-xl bg-white shadow-pinterest"
      :class="request.status === 'success' ? 'pb-9 pt-4' : 'py-9'"
    >
      <Dropzone />
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    request() {
      return this.$store.getters.getRequest
    },
  },
}
</script>

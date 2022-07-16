<template>
  <div>
    <AppHeader />
    <Notification v-if="request.status" :request="request" />
    <transition name="slide-fade">
      <Nuxt />
    </transition>
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

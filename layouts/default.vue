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

<style>
@import url('https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap');

.logo {
  font-family: 'Comforter Brush', cursive;
}
</style>

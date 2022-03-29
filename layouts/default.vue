<template>
  <div>
    <Header />
    <Notification v-if="request.status" :request="request" />
    <Nuxt />
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

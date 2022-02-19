<template>
  <div class="grid h-screen place-items-center bg-[#FAFAFB]">
    <transition name="fade">
      <Loading v-if="isLoading" />
    </transition>
    <UploadCard />
  </div>
</template>

<script>
import UploadCard from '@/components/UploadCard'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading,
    UploadCard,
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading
    },
  },
}
</script>

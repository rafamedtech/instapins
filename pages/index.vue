<template>
  <div class="grid h-screen place-items-center bg-[#FAFAFB]">
    <section
      class="h-[469px] w-[402px] flex-col rounded-xl bg-white py-9 shadow-lg"
    >
      <Dropzone />
    </section>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'

export default {
  components: {
    Dropzone,
  },
}
</script>

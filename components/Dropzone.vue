<template>
  <section
    class="flex h-full flex-col items-center justify-around rounded-xl bg-white"
  >
    <article
      v-if="isLoading"
      name="fade"
      class="absolute grid h-screen w-screen place-items-center bg-[#FAFAFB]"
    >
      <Loading class="absolute" />
    </article>
    <Header :request="request ? request : { message: 'Upload your image' }" />
    <article
      class="flex h-[219px] w-[338px] flex-col items-center justify-evenly rounded-xl border-[2px] border-dashed border-[#97BEF4] bg-[#F6F8FB]"
      :class="{ 'active-dropzone': active }"
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="drop"
    >
      <img
        class="h-[89px] w-[114px] rounded-md"
        src="@/assets/upload.PNG"
        alt=""
      />
      <span class="text-[12px] text-[#BDBDBD]"
        >Drag & Drop your image here</span
      >
    </article>

    <span class="text-[12px] text-[#BDBDBD]">or</span>
    <label
      class="cursor-pointer rounded-lg bg-[#5481bb] px-4 py-2 text-xs text-white"
      for="dropzone"
      >Choose a file</label
    >
    <input id="dropzone" class="hidden" type="file" @change="onFileChange" />
  </section>
</template>

<script>
import Loading from './Loading.vue'
export default {
  components: { Loading },
  data() {
    return {
      active: false,
      file: null,
      isLoading: false,
    }
  },
  computed: {
    request() {
      return this.$store.getters.getRequest
    },
  },
  methods: {
    uploadImage() {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('title', this.file.name)
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1500)
      this.$store.dispatch('uploadImage', formData)
    },
    onFileChange(e) {
      this.file = e.target.files[0]
      this.uploadImage()
    },
    toggleActive() {
      this.active = !this.active
    },
    drop(e) {
      this.toggleActive()
      this.file = e.dataTransfer.files[0]
      this.uploadImage()
    },
  },
}
</script>

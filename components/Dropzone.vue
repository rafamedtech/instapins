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

    <UploadHeader
      :request="request ? request : { message: 'Upload your image' }"
    />

    <article
      v-if="request.status === 'success'"
      class="h-[219px] w-[338px] rounded-xl"
    >
      <img
        v-if="request.status"
        class="h-full w-full rounded-xl"
        src="https://images.unsplash.com/photo-1609280070617-2b4e553205ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
        alt=""
      />
    </article>

    <article
      v-else
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

    <article
      v-if="request.status === 'success'"
      class="relative flex flex-col items-center gap-2"
    >
      <input
        class="h-[34px] w-[338px] rounded-lg bg-[#F6F8FB] py-[11px] pl-2 text-[8px] text-[#4F4F4F] text-inherit"
        type="text"
        :value="uploadedImage"
      />
      <button
        class="absolute right-0 top-0 h-[34px] cursor-pointer rounded-lg bg-[#2F80ED] px-4 py-2 text-xs text-white"
        @click="copyToClipboard"
      >
        Copy Link
      </button>
      <span v-if="copy" class="absolute bottom-2 text-sm"
        >Text copied to clipboard</span
      >
    </article>

    <article v-else class="flex flex-col items-center gap-2">
      <span class="text-[12px] text-[#BDBDBD]">or</span>
      <label
        class="cursor-pointer rounded-lg bg-[#5481bb] px-4 py-2 text-xs text-white"
        for="dropzone"
        >Choose a file</label
      >
      <input id="dropzone" class="hidden" type="file" @change="onFileChange" />
    </article>
  </section>
</template>

<script>
import Loading from './Loading.vue'
import UploadHeader from './UploadHeader.vue'
export default {
  components: { Loading, UploadHeader },
  data() {
    return {
      active: false,
      file: null,
      isLoading: false,
      copy: false,
    }
  },
  computed: {
    request() {
      return this.$store.getters.getRequest
    },
    uploadedImage() {
      return this.$store.getters.getImage
    },
  },

  methods: {
    uploadImage() {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('title', this.file.name)
      this.isLoading = true
      this.$store.dispatch('uploadImage', formData)
      setTimeout(() => {
        if (this.request.status !== 'error') {
          this.$store.dispatch('getImageInfo', this.file.name)
        }
        this.isLoading = false
      }, 2000)
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
    copyToClipboard() {
      const el = document.createElement('textarea')
      el.classList.add('hidden')
      el.value = this.uploadedImage
      document.body.appendChild(el)
      el.select()
      navigator.clipboard.writeText(el.value)
      document.body.removeChild(el)
      this.copy = true
      setTimeout(() => {
        this.copy = false
      }, 2000)
    },
  },
}
</script>

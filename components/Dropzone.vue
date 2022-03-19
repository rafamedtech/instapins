<template>
  <section
    class="flex h-full flex-col items-center justify-between rounded-xl bg-white"
  >
    <article
      v-if="isLoading"
      name="fade"
      class="absolute top-0 z-50 grid h-screen w-screen place-items-center bg-[#FAFAFB]"
    >
      <Loading class="absolute" :message="loadingMsg" />
    </article>

    <div
      v-if="request.status === 'success'"
      class="flex w-full justify-between px-4"
    >
      <div
        class="flex cursor-pointer flex-col items-center justify-center"
        @click="clearUpload"
      >
        <Cached :size="36" fill-color="#2C394B" />
        <span class="text-[10px]">New upload</span>
      </div>
      <div class="flex items-center gap-x-2">
        <div class="flex cursor-pointer flex-col items-center justify-center">
          <FilePlus fill-color="#2C394B" :size="36" />
          <span class="text-[10px]">New Pin</span>
        </div>
        <div
          class="flex cursor-pointer flex-col items-center justify-center"
          @click="deleteUpload"
        >
          <CloseCircle :size="36" fill-color="#C30000" />
          <span class="text-[10px]">Delete</span>
        </div>
      </div>
    </div>

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
        :src="image.image"
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
        src="@/assets/upload.png"
        alt=""
      />
      <span class="text-[12px] text-[#BDBDBD]"
        >Drag & Drop your image here</span
      >
    </article>

    <article
      v-if="request.status === 'success'"
      class="relative mt-4 flex flex-col items-center gap-2"
    >
      <input
        class="h-[34px] w-[338px] rounded-lg bg-[#F6F8FB] py-[11px] pl-2 text-[8px] text-[#4F4F4F] text-inherit"
        type="text"
        :value="uploadedImage.image"
      />
      <button
        class="absolute right-0 top-0 h-[34px] cursor-pointer rounded-lg bg-[#2F80ED] px-4 py-2 text-xs text-white"
        @click="copyToClipboard"
      >
        Copy Link
      </button>
      <span
        :class="copy ? 'opacity-1' : 'opacity-0'"
        class="absolute -bottom-8 text-[12px] text-green-600 transition"
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
import Cached from 'vue-material-design-icons/Cached.vue'
import FilePlus from 'vue-material-design-icons/FilePlus.vue'
import CloseCircle from 'vue-material-design-icons/CloseCircle.vue'

export default {
  components: {
    Cached,
    FilePlus,
    CloseCircle,
  },
  data() {
    return {
      active: false,
      file: null,
      isLoading: false,
      loadingMsg: null,
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
    image() {
      return this.$store.getters.getImage
    },
  },

  methods: {
    uploadImage() {
      this.loadingMsg = 'Uploading image...'
      this.$store.dispatch('resetRequest')
      const formData = new FormData()
      formData.append('image', this.file, this.file.name)
      formData.append('title', this.file.name)
      this.isLoading = true
      this.$store.dispatch('uploadImage', formData)

      setTimeout(() => {
        if (this.request.status !== 'error') {
          this.isLoading = false
        }
      }, 3000)
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

    clearUpload() {
      this.$store.dispatch('resetRequest')
    },

    deleteUpload() {
      this.loadingMsg = 'Deleting...'
      this.isLoading = true
      this.$store.dispatch('deleteUploadedImage', this.image.id)
      this.$store.dispatch('resetRequest')
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
  },
}
</script>

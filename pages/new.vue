<template>
  <main class="container">
    <button
      type="button"
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <h1 class="px-4 pb-4 text-4xl text-primary">Create a new pin</h1>
    <section
      class="mx-2 flex h-auto min-h-[500px] flex-col rounded-[32px] p-4 shadow-pinterest md:mx-4 md:flex-row md:gap-x-8"
    >
      <article
        class="absolute inset-0 z-50 grid min-h-screen w-screen justify-items-center overflow-hidden bg-[#2C394B]/75 p-4 transition-all"
        :class="{ hidden: !isLoading }"
      >
        <transition name="fade">
          <Modal v-if="isLoading" :message="modalMsg" />
        </transition>
      </article>

      <!-- Show the preview of the image or default -->
      <article
        class="mx-auto w-full items-center justify-center rounded-xl md:my-10 md:w-[400px] md:py-0"
      >
        <figure
          v-if="
            (uploadedImage || pin.image) &&
            validation === 'Valid file extension'
          "
          class="h-full w-full overflow-hidden rounded-xl py-4"
        >
          <img
            :src="uploadedImage ? uploadedImage : pin.image"
            alt=""
            class="h-auto w-full rounded-xl"
          />
        </figure>
        <div
          v-else
          class="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-xl border-2 border-dashed border-primary bg-[#F6F8FB] py-4"
        >
          <ImageOff :size="48" fill-color="gray" />
          <p class="text-gray-600">No preview available</p>
        </div>
      </article>

      <!-- New entry form -->
      <form
        class="mx-auto flex w-full flex-col gap-y-8 py-4 md:w-1/2"
        @submit.prevent="createPin"
      >
        <label class="hidden" for="title"></label>
        <input
          id="title"
          v-model="pin.title"
          type="text"
          placeholder="Add a title"
          class="border-b-2 bg-transparent text-4xl text-gray-500 focus:outline-none"
          required
        />
        <label class="hidden" for="description"></label>
        <textarea
          id="description"
          v-model="pin.description"
          placeholder="Tell us about your pin"
          class="h-40 w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          required
        ></textarea>
        <div class="relative flex items-center gap-4">
          <div v-if="uploadedImage" class="relative w-full">
            <Close
              class="absolute -right-2 -top-2 cursor-pointer"
              fill-color="red"
              title="Delete image"
              @click="deleteUploadedImage"
            />
            <label class="hidden" for="uploaded"></label>
            <input
              id="uploaded"
              type="text"
              class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              :value="uploadedImage"
              readonly
              @change="imageValidation"
            />
          </div>

          <input
            v-else
            id="pin-image"
            v-model="pin.image"
            type="text"
            placeholder="Add your image url or upload a new file"
            class="focus:ring-gray-500' w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1"
            :class="{
              'focus:ring-red-500':
                validation === 'Invalid file extension' && pin.image !== '',
              'border-green-500':
                validation === 'Valid file extension' && pin.image !== '',
            }"
            required
            @input="imageValidation"
          />
          <label class="hidden" for="pin-image"></label>

          <label
            for="upload"
            class="grid cursor-pointer place-items-center rounded-xl bg-gray-500 p-2 text-xs text-gray-100 hover:opacity-75"
            ><UploadIcon /> Upload</label
          >
          <input id="upload" type="file" class="hidden" @change="onUpload" />
          <span
            v-if="validation && pin.image !== ''"
            class="absolute -bottom-10 left-4"
            :class="{
              'text-red-500': validation === 'Invalid file extension',
              'text-green-500': validation === 'Valid file extension',
            }"
            >{{ validation }}</span
          >
        </div>
        <div class="flex w-full items-center justify-end gap-x-4">
          <button
            class="text-gray-500 hover:text-red-500"
            @click="$router.go(-1)"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="cursor-pointer rounded-lg bg-primary px-3 py-3 text-white shadow-md hover:bg-primary/75"
          >
            Create pin
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import ImageOffOutline from 'icons/ImageOffOutline.vue'
import TrayArrowUp from 'icons/TrayArrowUp.vue'
import CloseCircle from 'icons/CloseCircle.vue'
import ArrowLeft from 'icons/ArrowLeft.vue'

export default {
  components: {
    ImageOff: ImageOffOutline,
    UploadIcon: TrayArrowUp,
    Close: CloseCircle,
    BackIcon: ArrowLeft,
  },

  middleware: 'auth',

  data: () => ({
    pin: {
      title: '',
      description: '',
      image: null,
    },
    validation: null,
    isLoading: false,
    modalMsg: '',
  }),

  head() {
    return {
      title: 'Create a new pin | Instapins',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to your account',
        },
      ],
    }
  },

  computed: {
    request() {
      return this.$store.getters.getRequest
    },
    uploadedImage() {
      return this.$store.getters['pins/getImage']
    },
  },

  methods: {
    createPin() {
      const formData = new FormData()
      formData.append('title', this.pin.title)
      formData.append('description', this.pin.description)
      if (this.uploadedImage) {
        formData.append('url', this.uploadedImage)
      } else {
        formData.append('url', this.pin.image)
      }

      this.$store.dispatch('pins/createPin', formData)
    },

    onUpload(e) {
      if (this.uploadedImage) {
        this.deleteUploadedImage()
      }
      const file = e.target.files[0]
      this.modalMsg = 'Uploading image...'
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false
      }, 3000)

      setTimeout(() => {
        this.$store.dispatch('pins/uploadImage', {
          filename: `${Date.now()}-${file.name}`,
          file,
        })
      }, 2000)

      this.validation = 'Valid file extension'
    },

    deleteUploadedImage() {
      const url = this.uploadedImage.replace(
        'https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/media/',
        ''
      )

      this.modalMsg = 'Deleting image...'
      this.isLoading = true

      setTimeout(() => {
        if (this.request.status !== 'error') {
          this.isLoading = false
        }
      }, 3000)

      setTimeout(() => {
        this.$store.dispatch('pins/deleteUpload', {
          filename: url,
        })
      }, 2500)

      this.validation = null
    },

    imageValidation() {
      if (
        this.pin.image !== '' &&
        !this.pin.image.match(/\.(jpe?g|png|gif)$/)
      ) {
        this.validation = 'Invalid file extension'
      } else {
        this.validation = 'Valid file extension'
      }
    },
  },
}
</script>

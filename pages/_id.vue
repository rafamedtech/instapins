<template>
  <main class="container">
    <section
      class="container relative flex h-full flex-col rounded-[32px] p-4 shadow-pinterest md:flex-row"
    >
      <figure
        class="mb-4 h-full overflow-hidden rounded-[16px] shadow-pinterest md:mb-0 md:w-1/2"
      >
        <img class="w-full" :src="pin.url" alt="" />
      </figure>
      <div class="absolute right-4 top-4 z-50 flex flex-col items-center">
        <Heart
          :size="48"
          :fill-color="liked ? 'red' : 'gray'"
          class="cursor-pointer"
          @click="like"
        />
        <span class="text-sm text-gray-600">{{ pin.likes.length }}</span>
      </div>
      <article
        class="flex flex-col items-center justify-between gap-y-8 px-4 md:w-1/2"
      >
        <div
          class="flex flex-col items-center justify-between gap-y-8 px-4 md:w-1/2"
        >
          <h1 class="w-[20ch] text-center text-3xl text-[#5481bb]">
            {{ pin.title }}
          </h1>
          <span class="text-sm text-gray-500"
            >Uploaded by
            <span class="text-green-600">{{ pin.owner }}</span></span
          >
          <p class="w-2/3 px-4 text-xs md:w-[50ch]">
            {{ pin.description }}
          </p>
        </div>
        <div class="w-full">
          <h2 class="ml-4 mb-2 text-center text-2xl font-bold text-[#5481bb]">
            Comments
          </h2>
          <div
            v-for="comment in pin.comments"
            :key="comment.id"
            class="flex flex-col"
          >
            <section class="flex w-full items-center gap-x-4 p-4">
              <img
                class="w-14 rounded-full"
                src="https://i.pinimg.com/75x75_RS/cc/7d/cb/cc7dcb6084a47b14d532c0ecc49c9108.jpg"
                alt=""
              />
              <article
                class="relative w-full rounded-[16px] border border-gray-400 p-4 text-gray-500"
              >
                <Close
                  v-if="$auth.loggedIn"
                  class="absolute right-2 top-2 cursor-pointer"
                  @click="deleteComment(comment.id)"
                />
                <span class="font-extrabold">{{ comment.username }}</span>
                <p class="text-xs text-gray-500">
                  {{ comment.comment }}
                </p>
              </article>
            </section>
          </div>

          <!-- Comment form -->
          <form
            v-if="$auth.loggedIn"
            class="flex items-center gap-x-4 p-4"
            @submit.prevent="commentPin"
          >
            <img
              class="w-14 rounded-full"
              src="https://i.pinimg.com/75x75_RS/cc/7d/cb/cc7dcb6084a47b14d532c0ecc49c9108.jpg"
              alt=""
            />
            <input
              v-model="myComment"
              class="w-full rounded-[16px] border border-gray-400 p-4"
              type="text"
              placeholder="Add a comment"
            />
            <input
              class="m-auto w-32 cursor-pointer self-end rounded-lg bg-green-600 px-3 py-3 text-white shadow-md"
              type="submit"
              value="Send"
            />
          </form>
          <div v-else class="mx-auto flex w-1/2 flex-col">
            <p class="text-center text-gray-500">
              You must be logged in to comment
            </p>
            <nuxt-link
              :to="{ path: '/login' }"
              class="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-md hover:bg-green-600/75"
            >
              Login
            </nuxt-link>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import HeartOutline from 'icons/HeartOutline.vue'
import Close from 'icons/Close.vue'
export default {
  components: {
    Heart: HeartOutline,
    Close,
  },
  data: () => ({
    liked: false,
    myComment: '',
    openModal: false,
  }),

  computed: {
    pin() {
      return this.$store.getters.getSinglePin(this.$route.params.id)
    },
  },

  created() {
    this.checkIfLiked()
  },

  methods: {
    checkIfLiked() {
      if (this.pin.likes.length) {
        const { username } = this.pin.likes.find((like) => {
          return like.username === this.$auth.user
        })

        if (username === this.$auth.user) {
          this.liked = true
        }
      }
    },

    async like() {
      // console.log(this.pin)
      this.liked = !this.liked

      if (this.liked) {
        this.$store.dispatch('likePin', this.pin)
        setTimeout(() => {
          this.$store.dispatch('fetchPins')
        }, 100)
        return
      }

      await this.$store.dispatch('unlikePin', this.pin)
      setTimeout(() => {
        this.$store.dispatch('fetchPins')
      }, 100)
    },

    async commentPin() {
      await this.$store.dispatch('commentPin', {
        pin: this.$route.params.id,
        comment: this.myComment,
      })
      this.myComment = ''
      await this.$store.dispatch('fetchPins')
    },
    async deleteComment(id) {
      // eslint-disable-next-line no-console
      console.log(this.myComment)
      await this.$store.dispatch('deleteComment', {
        pin: this.$route.params.id,
        comment: id,
      })
      await this.$store.dispatch('fetchPins')
    },
  },
}
</script>

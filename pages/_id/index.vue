<template>
  <main class="container">
    <button
      type="button"
      class="mx-4 mb-6 flex gap-x-2 text-gray-500"
      @click="$router.go(-1)"
    >
      <BackIcon fill-color="#5481bb" /> Back
    </button>
    <section
      class="relative mx-2 mb-5 flex h-full flex-col rounded-[32px] p-4 shadow-pinterest md:mx-4 md:flex-row"
    >
      <figure
        class="mb-4 h-full overflow-hidden rounded-[16px] shadow-pinterest md:mb-0 md:w-1/2"
      >
        <img class="w-full" :src="pin.url" alt="pin image" />
      </figure>
      <div
        v-if="$auth.loggedIn"
        class="relative z-50 mb-4 md:absolute md:right-4 md:top-4"
      >
        <div
          v-if="$auth.user.username !== pin.owner"
          class="flex flex-col items-center"
        >
          <Heart
            :size="48"
            :fill-color="liked ? 'red' : 'gray'"
            class="text-white"
            :class="$auth.loggedIn ? 'cursor-pointer' : 'cursor-not-allowed'"
            :title="
              $auth.loggedIn ? 'Like' : 'You must be logged in to like pins'
            "
            @click="$auth.loggedIn ? like() : null"
          />

          <span class="text-sm text-gray-600">{{ pin.likes.length }}</span>
        </div>

        <nuxt-link
          v-else
          class="block rounded-lg p-1 text-white transition-all duration-300"
          :to="`/${pin.id}/edit/`"
          aria-label="Edit pin"
        >
          <Edit :size="32" fill-color="gray" />
        </nuxt-link>
      </div>
      <article
        class="flex flex-col items-center justify-between gap-y-8 md:w-1/2 md:px-4"
      >
        <div
          class="flex flex-col items-center justify-between gap-y-8 px-4 md:w-1/2"
        >
          <h1 class="w-[20ch] text-center text-3xl text-primary">
            {{ pin.title }}
          </h1>
          <span class="text-center text-sm text-gray-500"
            >Uploaded by
            <span class="text-green-600">{{ pin.owner }}</span></span
          >
          <p class="w-full px-8 text-xs md:w-[50ch]">
            {{ pin.description }}
          </p>
        </div>
        <div class="w-full">
          <h2 class="ml-4 mb-2 text-center text-2xl font-bold text-primary">
            Comments
          </h2>

          <div v-if="pin.comments.length" class="flex flex-col">
            <section
              v-for="comment in pin.comments"
              :key="comment.id"
              class="flex w-full items-center gap-x-4 p-4"
            >
              <img
                class="h-16 w-16 rounded-full bg-gray-200 object-cover"
                :src="
                  comment.username.avatar
                    ? comment.username.avatar
                    : require('@/assets/user-default.png')
                "
                alt="user avatar"
              />
              <article
                class="group relative w-[80%] rounded-[16px] border border-gray-400 p-4 text-gray-500"
              >
                <Close
                  v-if="
                    $auth.loggedIn &&
                    $auth.user.username === comment.username.username
                  "
                  class="absolute right-2 top-2 hidden cursor-pointer group-hover:block"
                  @click="deleteComment(comment.id)"
                />
                <span class="font-extrabold text-primary">{{
                  comment.username.username
                }}</span>
                <p class="text-xs text-gray-500">
                  {{ comment.comment }}
                </p>
              </article>
            </section>
          </div>
          <div v-else>
            <p class="ml-4 mb-2 text-center text-gray-400">No comments yet</p>
          </div>

          <hr class="ml-4 mb-2 divide-x-2" />

          <!-- Comment form -->
          <form
            v-if="$auth.loggedIn"
            class="flex w-full flex-wrap items-center justify-evenly gap-4 md:justify-start md:gap-2 md:p-4 lg:flex-nowrap"
            @submit.prevent="commentPin"
          >
            <img
              class="h-16 w-16 rounded-full object-cover"
              :class="!$auth.user.avatar && 'bg-gray-200'"
              :src="
                $auth.user.avatar
                  ? $auth.user.avatar
                  : require('@/assets/user-default.png')
              "
              alt="user avatar"
            />
            <label class="hidden" for="comment"></label>
            <input
              id="comment"
              v-model="myComment"
              class="w-auto rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              type="text"
              placeholder="Add a comment"
            />
            <button
              class="m-auto w-32 cursor-pointer self-end rounded-lg bg-primary px-3 py-3 text-white shadow-md disabled:cursor-not-allowed disabled:bg-gray-400"
              type="submit"
              :disabled="!myComment"
              :title="!myComment ? 'Please enter a comment' : 'Send comment'"
            >
              Send
            </button>
          </form>

          <!-- If the user is not logged in -->
          <div v-else class="mx-auto flex w-1/2 flex-col">
            <p class="ml-4 mb-2 text-center text-gray-500">
              You must be logged in to comment
            </p>
            <nuxt-link
              :to="{ path: '/login' }"
              class="ml-4 mb-2 rounded-lg bg-primary px-3 py-3 text-center text-white shadow-md hover:bg-primary/75"
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
import ArrowLeft from 'icons/ArrowLeft.vue'
import LeadPencil from 'icons/LeadPencil.vue'

export default {
  components: {
    Heart: HeartOutline,
    BackIcon: ArrowLeft,
    Edit: LeadPencil,
    Close,
  },
  data: () => ({
    liked: false,
    myComment: '',
    openModal: false,
  }),

  computed: {
    pin() {
      return this.$store.getters['pins/getSinglePin'](this.$route.params.id)
    },
  },

  mounted() {
    if (this.$auth.loggedIn) {
      this.checkIfLiked()
    }
  },

  methods: {
    checkIfLiked() {
      if (this.pin.likes.length) {
        this.liked = this.pin.likes.some((like) => {
          return like.username === this.$auth.user.username
        })
      }
    },

    async like() {
      this.liked = !this.liked

      if (this.liked) {
        await this.$store.dispatch('pins/likePin', this.pin)
        setTimeout(() => {
          this.$store.dispatch('pins/fetchPins')
        }, 100)
        return
      }

      await this.$store.dispatch('pins/unlikePin', this.pin)
      setTimeout(() => {
        this.$store.dispatch('pins/fetchPins')
      }, 100)
    },

    async commentPin() {
      await this.$store.dispatch('pins/commentPin', {
        pin: this.$route.params.id,
        comment: this.myComment,
      })
      this.myComment = ''
      await this.$store.dispatch('pins/fetchPins')
    },
    async deleteComment(id) {
      // eslint-disable-next-line no-console
      console.log(this.myComment)
      await this.$store.dispatch('pins/deleteComment', {
        pin: this.$route.params.id,
        comment: id,
      })
      await this.$store.dispatch('pins/fetchPins')
    },
  },
}
</script>

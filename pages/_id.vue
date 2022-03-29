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
      <Heart
        :size="48"
        :fill-color="liked ? 'red' : 'gray'"
        class="absolute right-4 top-4 z-50 cursor-pointer"
        @click="like"
      />
      <article class="flex flex-col items-center gap-y-8 p-4 md:w-1/2">
        <h1 class="w-[20ch] text-center text-3xl text-[#5481bb]">
          {{ pin.title }}
        </h1>
        <span class="text-sm text-gray-500"
          >Uploaded by <span class="text-green-600">{{ pin.owner }}</span></span
        >
        <p class="w-2/3 px-4 text-xs">
          {{ pin.description }}
        </p>

        <div>
          <h2 class="ml-4 mb-2 text-2xl font-bold text-[#5481bb]">Comments</h2>
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
                  class="absolute right-2 top-2 cursor-pointer"
                  @click="deleteModal()"
                />
                <span class="font-extrabold">{{ comment.username }}</span>
                <p class="text-xs text-gray-500">
                  {{ comment.comment }}
                </p>
              </article>
            </section>
          </div>

          <!-- Comment form -->
          <form class="flex gap-x-4 p-4" @submit.prevent="commentPin">
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
              class="mr-4 w-32 cursor-pointer self-end rounded-lg bg-green-600 px-3 py-3 text-white shadow-md"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </article>
    </section>
    <article
      class="absolute inset-0 z-50 grid h-screen w-screen place-items-center overflow-hidden bg-[#2C394B]/75 transition-all"
      :class="{ hidden: !openModal }"
    >
      <transition name="fade">
        <Modal
          v-if="openModal"
          confirmation
          message="Are you sure to delete?"
          @onAction="deleteComment"
          @closeModal="deleteModal"
        />
      </transition>
    </article>
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
  methods: {
    like() {
      this.liked = !this.liked
    },
    commentPin() {
      this.$store.dispatch('commentPin', {
        pin_id: this.$route.params.id,
        comment: this.myComment,
      })
      this.myComment = ''
      this.$store.dispatch('fetchPins')
    },
    deleteModal(id) {
      this.myComment = id
      this.openModal = !this.openModal
    },
    deleteComment() {
      // eslint-disable-next-line no-console
      console.log(this.myComment)
      this.$store.dispatch('deleteComment', {
        pin_id: this.$route.params.id,
        comment: this.myComment,
      })
      this.$store.dispatch('fetchPins')
    },
  },
}
</script>

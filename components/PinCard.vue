<template>
  <div
    class="group relative block max-w-sm cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl shadow-xl"
  >
    <nuxt-link :to="{ path: `/${pin.id}` }" class="cursor-zoom-in">
      <img
        class="w-full transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
        :src="pin.url"
        alt="Pin image"
      />
    </nuxt-link>

    <p
      class="absolute bottom-2 left-2 hidden self-end text-white group-hover:block"
    >
      {{ pin.title }}
    </p>

    <div
      v-if="$auth.loggedIn"
      class="absolute top-2 right-2 hidden self-start group-hover:block"
    >
      <nuxt-link
        v-if="$auth.user.username === pin.owner && $route.path === '/profile'"
        :to="`/${pin.id}/edit`"
        class="block rounded-lg p-1 text-white transition-all duration-300 hover:bg-primary"
      >
        <Edit :size="32" />
      </nuxt-link>

      <button
        v-if="$auth.user.username === pin.owner && $route.path === '/profile'"
        class="rounded-lg p-1 text-white transition-all duration-300 hover:bg-red-500"
      >
        <Delete :size="32" @click="deletePin" />
      </button>
    </div>

    <button
      v-if="$auth.loggedIn && $route.path !== '/profile'"
      class="absolute top-2 right-2 hidden self-start rounded-lg p-1 transition-all duration-300 hover:text-white group-hover:block"
    >
      <Heart
        :size="48"
        :fill-color="liked ? 'red' : 'gray'"
        class="text-white"
        title="Like"
        @click="like"
      />
    </button>
  </div>
</template>

<script>
import HeartOutline from 'icons/HeartOutline.vue'
import DeleteEmpty from 'icons/DeleteEmpty.vue'
import LeadPencil from 'icons/LeadPencil.vue'
export default {
  components: {
    Heart: HeartOutline,
    Delete: DeleteEmpty,
    Edit: LeadPencil,
  },
  props: {
    pin: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    liked: false,
  }),

  created() {
    this.checkIfLiked()
  },

  methods: {
    checkIfLiked() {
      if (this.$auth.user) {
        if (this.pin.likes.length) {
          if (
            this.pin.likes.find((like) => {
              return like.username === this.$auth.user.username
            })
          ) {
            const { username } = this.pin.likes.find((like) => {
              return like.username === this.$auth.user.username
            })

            if (username === this.$auth.user.username) {
              this.liked = true
            }
          }
        }
      }
    },
    async like() {
      this.liked = !this.liked

      if (this.liked) {
        this.$store.dispatch('pins/likePin', this.pin)
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

    deletePin() {
      this.$store.dispatch('pins/deletePin', this.pin.id)
    },
  },
}
</script>

<template>
  <header
    class="container mb-6 flex flex-col items-center justify-between gap-y-4 p-4 shadow-nav md:flex-row"
  >
    <nuxt-link :to="{ path: '/' }" class="logo text-5xl text-gray-500"
      >My unsplash</nuxt-link
    >
    <div class="flex flex-col gap-x-4 gap-y-2 md:flex-row">
      <div v-if="$route.path === '/'" class="relative flex items-center">
        <SearchIcon class="absolute mx-2" fill-color="gray" />
        <input
          class="h-10 rounded-lg border border-gray-400 bg-transparent py-6 pl-8 pr-4 placeholder:pl-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
          type="text"
          placeholder="Search by name"
        />
      </div>
      <div class="flex w-[250px] justify-around gap-x-4 md:w-auto">
        <nuxt-link
          v-if="$route.path !== '/new' && $auth.user"
          :to="{ path: '/new' }"
          class="h-12 w-auto rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-md"
        >
          New Pin
        </nuxt-link>
        <nuxt-link
          v-if="!$auth.user && $route.path !== '/login'"
          :to="{ path: '/login' }"
          class="rounded-lg bg-green-600 px-3 py-3 text-center text-white shadow-md"
        >
          Login
        </nuxt-link>
        <figure
          v-if="$auth.loggedIn"
          class="group relative h-12 w-12 rounded-full md:w-12"
        >
          <img
            class="h-full w-full rounded-full object-cover"
            :src="$auth.user.avatar"
            alt=""
          />
          <div
            class="invisible absolute -bottom-24 -left-28 z-50 m-4 rounded-lg bg-white py-4 px-8 shadow-pinterest transition-all group-hover:visible"
          >
            <ul class="flex flex-col gap-y-4">
              <li>
                <nuxt-link
                  :to="{ path: '/profile' }"
                  class="text-gray-500 hover:text-blue-500"
                  >Profile</nuxt-link
                >
              </li>
              <button
                v-if="$auth.loggedIn"
                class="text-gray-500 hover:text-blue-500"
                @click="logoutModal"
              >
                Logout
              </button>
            </ul>
          </div>
        </figure>
      </div>
    </div>
    <article
      class="absolute inset-0 z-50 grid h-screen w-screen place-items-center overflow-hidden bg-[#2C394B]/75 transition-all"
      :class="{ hidden: !openModal }"
    >
      <transition name="fade">
        <Modal
          v-if="openModal"
          confirmation
          message="Are you sure to logout?"
          @onAction="logout"
          @closeModal="logoutModal"
        />
      </transition>
    </article>
  </header>
</template>

<script>
import Magnify from 'icons/Magnify.vue'
export default {
  components: {
    SearchIcon: Magnify,
  },
  data: () => ({
    openModal: false,
  }),
  methods: {
    logoutModal() {
      this.openModal = !this.openModal
    },
    logout() {
      return this.$store.dispatch('userLogout')
    },
  },
}
</script>

<template>
  <header
    class="container mb-6 flex flex-col items-center justify-between py-4 shadow-nav md:flex-row"
  >
    <div class="flex items-center gap-x-8">
      <nuxt-link :to="{ path: '/' }" class="logo text-5xl text-gray-500"
        >My unsplash</nuxt-link
      >
      <input
        class="h-10 rounded-lg border border-gray-400 bg-transparent px-4 py-6 focus:outline-gray-500"
        type="text"
        placeholder="🔎 Search by name"
      />
    </div>
    <div class="flex gap-x-4">
      <nuxt-link
        v-if="$route.path !== '/new' && $auth.user"
        :to="{ path: '/new' }"
        class="rounded-lg bg-green-600 px-3 py-3 text-white shadow-md"
      >
        New Pin
      </nuxt-link>
      <nuxt-link
        v-if="!$auth.user && $route.path !== '/login'"
        :to="{ path: '/login' }"
        class="rounded-lg bg-green-600 px-3 py-3 text-white shadow-md"
      >
        Login
      </nuxt-link>
      <button
        v-if="$auth.user"
        class="rounded-lg bg-blue-600 px-3 py-3 text-white shadow-md"
        @click="logoutModal"
      >
        Logout
      </button>
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
export default {
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

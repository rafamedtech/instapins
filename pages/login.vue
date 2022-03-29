<template>
  <main class="mx-auto max-w-[450px] px-4 py-10">
    <!-- Login Form -->
    <form
      class="flex flex-col gap-3 rounded-lg bg-white p-8 shadow-pinterest"
      @submit.prevent="userLogin"
    >
      <h1 class="mb-4 text-3xl text-green-500">Login</h1>
      <figure class="h-48">
        <img
          class="mx-auto h-full"
          :src="require('@/assets/login.svg')"
          alt="login image"
        />
      </figure>
      <section class="mb-2 flex flex-col">
        <label for="username" class="mb-1 text-sm text-gray-500"
          >Username</label
        >
        <input
          id="username"
          v-model="username"
          type="text"
          class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-blue-500"
          required
        />
      </section>

      <section class="mb-2 flex flex-col">
        <label for="password" class="mb-1 text-sm text-gray-500"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-blue-500"
          required
        />
      </section>

      <input
        type="submit"
        value="Login"
        class="mt-6 cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-blue-500 py-2 px-6 text-sm text-white transition-all duration-200 hover:border-blue-500 hover:bg-blue-500 focus:outline-blue-500"
      />

      <nuxt-link class="mt-6 text-center text-sm" to="/register">
        Don't have an account? <span class="text-green-500">Register</span>
      </nuxt-link>
    </form>
  </main>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
  }),

  head: {
    title: 'Login | My Unsplash',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Login to your account',
      },
    ],
  },

  methods: {
    userLogin() {
      return this.$store.dispatch('userLogin', {
        username: this.username,
        password: this.password,
      })
    },
  },
}
</script>

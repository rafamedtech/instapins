<template>
  <main class="mx-auto max-w-[768px] px-4 py-10">
    <!-- Login Form -->
    <h1 class="mb-4 text-3xl text-primary">Login</h1>
    <form
      class="flex flex-col gap-6 rounded-2xl p-12 shadow-pinterest md:flex-row"
      @submit.prevent="userLogin"
    >
      <figure class="w-full">
        <img
          class="mx-auto h-full w-full"
          :src="require('@/assets/login.svg')"
          alt="login image"
        />
      </figure>

      <div class="w-full">
        <section class="mb-2 flex flex-col">
          <label for="username" class="mb-1 text-sm text-gray-500"
            >Username</label
          >
          <input
            id="username"
            v-model="username"
            type="text"
            class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-primary"
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
            class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-primary"
            required
          />
        </section>

        <button
          type="submit"
          class="my-6 mx-auto block cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-primary py-2 px-6 text-sm text-white duration-200 hover:border-primary hover:bg-primary focus:outline-primary"
        >
          Login
        </button>

        <nuxt-link
          class="mx-auto mt-6 block w-full text-center text-sm"
          :to="{ name: 'register' }"
        >
          Don't have an account? <span class="text-green-500">Register</span>
        </nuxt-link>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
  }),

  head() {
    return {
      title: 'Login | Instapins',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to your account',
        },
      ],
    }
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

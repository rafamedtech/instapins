<template>
  <main class="mx-auto min-h-full max-w-[768px] px-4 py-10">
    <!-- Register Form -->
    <h1 class="mb-4 text-3xl text-green-500">Register</h1>
    <form
      class="flex flex-col gap-6 rounded-2xl bg-white p-12 shadow-pinterest md:flex-row"
      @submit.prevent="userRegister"
    >
      <figure class="w-full">
        <img
          class="mx-auto h-full w-full"
          src="@/assets/register.svg"
          alt="Register image"
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
            class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-blue-500"
            required
          />
        </section>
        <section class="mb-2 flex flex-col">
          <label for="email" class="mb-1 text-sm text-gray-500">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
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

        <section class="mb-2 flex flex-col">
          <label for="confirmPassword" class="mb-1 text-sm text-gray-500"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-blue-500"
            required
          />
        </section>

        <input
          type="submit"
          value="Register"
          class="my-6 mx-auto block cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-blue-500 py-2 px-6 text-sm text-white duration-200 hover:border-blue-500 hover:bg-blue-500 focus:outline-blue-500"
        />
        <nuxt-link
          class="mx-auto mt-6 block w-full text-center text-sm"
          to="/login"
        >
          Already have an account? <span class="text-green-500">Login</span>
        </nuxt-link>
      </div>
    </form>

    <!-- Form Error Handling -->
    <article
      v-if="formErrorMsg"
      class="absolute right-4 top-4 mt-2 flex animate-bounce items-center gap-x-2 rounded-md bg-white p-4 text-gray-500 shadow-lg"
    >
      <AlertIcon fill-color="#C30000" :size="36" />
      <p>{{ formErrorMsg }}</p>
    </article>
  </main>
</template>

<script>
import AlertCircle from 'icons/AlertCircle.vue'

export default {
  components: {
    AlertIcon: AlertCircle,
  },

  data: () => ({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    formErrorMsg: '',
  }),

  head: {
    title: 'Register | My Unsplash',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Create an account',
      },
    ],
  },

  methods: {
    userRegister() {
      if (this.password === this.confirmPassword) {
        return this.$store.dispatch('userRegister', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
      }

      this.formErrorMsg = 'Passwords do not match'
      setTimeout(() => {
        this.formErrorMsg = ''
      }, 5000)
    },
  },
}
</script>

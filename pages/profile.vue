<template>
  <main class="container">
    <h1 class="mb-5 text-4xl text-gray-500">My Profile</h1>
    <section
      class="mb-8 flex flex-col items-center rounded-[32px] p-4 shadow-pinterest md:mx-4 md:flex-row"
    >
      <figure class="my-8 h-52 w-52 md:h-auto md:w-1/2">
        <img
          :src="$auth.user.avatar"
          alt=""
          class="mx-auto h-full w-full rounded-full object-cover md:h-52 md:w-52"
        />
      </figure>
      <article
        class="mb-8 flex h-full w-full flex-col justify-center gap-y-4 text-center md:w-1/2 md:gap-y-8 md:text-left"
      >
        <div>
          <i class="text-blue-500">Username</i>
          <p class="text-3xl text-gray-500 md:text-4xl">
            {{ $auth.user.username }}
          </p>
        </div>
        <div>
          <i class="text-blue-500">Email</i>
          <p class="text-gray-500 md:text-xl">{{ $auth.user.email }}</p>
        </div>
      </article>
    </section>
    <h2 class="mb-5 text-3xl text-gray-500">
      My pins (<span class="text-blue-500">{{ myPins.length }}</span
      >)
    </h2>
    <section
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-1 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-8 xl:px-0"
    >
      <PinCard v-for="(pin, index) in myPins" :key="index" :pin="pin" />
    </section>
    <h2 class="mb-5 text-3xl text-gray-500">
      My liked pins (<span class="text-blue-500">{{ myLikedPins.length }}</span
      >)
    </h2>
    <section
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-1 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-8 xl:px-0"
    >
      <PinCard v-for="(pin, index) in myLikedPins" :key="index" :pin="pin" />
    </section>
  </main>
</template>

<script>
export default {
  data: () => ({
    myPins: [],
    myLikedPins: [],
  }),

  mounted() {
    this.myPins = this.$store.getters.getPins.filter(
      (pin) => pin.owner === this.$auth.user.username
    )
    this.myLikedPins = this.$store.getters.getPins.filter((pin) =>
      pin.likes.some((like) => like.username === this.$auth.user.username)
    )
  },
}
</script>

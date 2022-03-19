<template>
  <header
    class="container mb-6 flex flex-col items-center justify-between py-4 shadow-nav md:flex-row"
  >
    <div class="flex items-center gap-x-8">
      <nuxt-link to="/" class="logo text-5xl text-gray-500"
        >My unsplash</nuxt-link
      >
      <input
        class="h-10 rounded-lg border border-gray-400 bg-transparent px-4 py-6 focus:outline-gray-500"
        type="text"
        placeholder="🔎 Search by name"
      />
    </div>
    <div>
      <nuxt-link
        v-if="$route.path !== '/upload'"
        to="/upload"
        class="rounded-lg bg-green-600 px-3 py-3 text-white shadow-md"
      >
        Add a photo
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {}
</script>

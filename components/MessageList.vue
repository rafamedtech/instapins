<template>
  <div class="w-full p-4 md:w-1/3 md:border-r-2 md:border-gray-300">
    <nuxt-link v-for="(item, index) in 4" :key="index" to="/" class="w-1/2">
      <div
        class="group flex items-center gap-2 rounded-[30px] hover:bg-primary/50"
      >
        <img
          src="https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png"
          alt=""
          class="mr-2 h-12 w-12 rounded-full object-cover"
        />
        <span to="/" class="text-md text-primary group-hover:text-white"
          >Rafael Valenzuela</span
        >
      </div>

      <hr class="my-4 divide-neutral-700" />
    </nuxt-link>
  </div>
</template>

<script>
export default {}
</script>

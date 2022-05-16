<template>
  <div
    class="flex w-full flex-col p-4 md:w-1/3 md:border-r-2 md:border-gray-300"
  >
    <button
      v-for="thread in threads"
      :key="thread.id"
      to="/"
      @click="onClick(thread)"
    >
      <div
        class="group flex items-center gap-2 rounded-[30px] hover:bg-primary/50"
      >
        <img
          src="https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png"
          alt=""
          class="mr-2 h-12 w-12 rounded-full object-cover"
        />
        <span to="/" class="text-md text-primary group-hover:text-white">{{
          thread.username
        }}</span>
      </div>

      <hr class="my-4 divide-neutral-700" />
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    threads: [
      {
        id: 1,
        username: 'Rafael Valenzuela',
        avatar:
          'https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png',
      },
      {
        id: 2,
        username: 'John Doe',
        avatar:
          'https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png',
      },
      {
        id: 3,
        username: 'Jane Doe',
        avatar:
          'https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png',
      },
      {
        id: 4,
        username: 'Amed Gonzalez',
        avatar:
          'https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png',
      },
    ],
  }),
  methods: {
    onClick(user) {
      console.log(user)
    },
  },
}
</script>

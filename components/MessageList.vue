<template>
  <div
    class="flex h-full w-full flex-col p-4 md:w-1/3 md:border-r-2 md:border-gray-300"
  >
    <button
      v-for="thread in threads"
      :key="thread.id"
      to="/"
      @click="onClick(thread)"
    >
      <div
        class="group flex items-center gap-2 rounded-[30px] hover:bg-primary/50"
        :class="activechat && 'bg-primary/50'"
      >
        <img
          src="https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/avatars/1649777840117-rafamed-gh.png"
          alt=""
          class="mr-2 h-12 w-12 rounded-full object-cover"
        />
        <span
          to="/"
          class="text-md text-primary group-hover:text-white"
          :class="activechat && 'text-white'"
          >{{ thread.username }}</span
        >
      </div>

      <hr class="my-4 divide-neutral-700" />
    </button>
  </div>
</template>

<script>
export default {
  // data: () => ({
  //   threads: [

  //   ],
  // }),
  props: {
    threads: {
      type: Array,
      // required: true,
      default: () => {},
    },
    activechat: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick(thread) {
      // emit the user to the parent component
      this.$emit('user-selected', thread)
    },
  },
}
</script>

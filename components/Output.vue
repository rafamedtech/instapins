<template>
  <section
    class="flex h-[469px] w-[402px] flex-col items-center justify-around rounded-xl bg-white py-9 shadow-lg"
  >
    <!-- <span class="text-[10px] text-[#828282]">File should be Jpeg, Png,...</span> -->
    <h1 class="text-lg">Uploaded Successfully</h1>

    <article
      class="flex h-[219px] w-[338px] flex-col items-center justify-evenly rounded-xl bg-[#F6F8FB]"
    >
      <img
        class="h-full w-full rounded-xl"
        src="https://images.unsplash.com/photo-1645126027892-6d83d91e26ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
      />
    </article>

    <article class="relative">
      <input
        class="h-[34px] w-[338px] rounded-lg bg-[#F6F8FB] py-[11px] pl-2 text-[8px] text-[#4F4F4F] text-inherit"
        type="text"
        value="This is a test"
      />
      <button
        class="absolute right-0 top-0 h-[34px] cursor-pointer rounded-lg bg-[#2F80ED] px-4 py-2 text-xs text-white"
      >
        Copy Link
      </button>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: null,
    },
  },
}
</script>

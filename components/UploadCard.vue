<template>
  <section
    class="flex h-[469px] w-[402px] flex-col items-center justify-around rounded-xl bg-white py-9 shadow-lg"
  >
    <h1 class="text-lg">Upload your image</h1>
    <span class="text-[10px] text-[#828282]">File should be Jpeg, Png,...</span>

    <article
      class="flex h-[219px] w-[338px] flex-col items-center justify-evenly rounded-xl border-[2px] border-dashed border-[#97BEF4] bg-[#F6F8FB]"
    >
      <img class="h-[89px] w-[114px]" src="@/assets/upload.PNG" alt="" />
      <span class="text-[12px] text-[#BDBDBD]"
        >Drag & Drop your image here</span
      >
    </article>

    <span class="text-[12px] text-[#BDBDBD]">or</span>
    <label
      class="cursor-pointer rounded-lg bg-[#2F80ED] px-4 py-2 text-xs text-white"
      for="dropzone"
      >Choose a file</label
    >
    <input id="dropzone" class="hidden" type="file" @change="onFileChange" />

    <span v-if="file">{{ file.name }}</span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      file: null,
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0]
    },
  },
}
</script>

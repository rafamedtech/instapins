<template>
  <section
    class="flex h-[469px] w-[402px] flex-col items-center justify-around rounded-xl bg-white py-9 shadow-lg"
  >
    <h1 class="text-lg">Upload your image</h1>
    <span class="text-[10px] text-[#828282]">File should be Jpeg, Png,...</span>
    <input
      class="h-[219px] w-[338px] rounded-xl border-[2px] border-dashed border-[#97BEF4] bg-[#F6F8FB]"
      type="file"
      @change="onFileChange"
    />
    <span class="text=[12px] text-[#BDBDBD]">or</span>
    <button
      class="rounded-lg bg-[#2F80ED] px-4 py-2 text-xs text-white"
      @click="onUpload"
    >
      Choose a file
    </button>
  </section>
</template>

<script>
export default {}
</script>

<template>
  <div>
    <form @submit.prevent="upload">
      <label for="file">Choose a file</label>
      <input type="file" @change="onChangeFile" />
      <input type="submit" value="Upload image" />
    </form>
    <img v-if="image" :src="image" alt="" />
  </div>
</template>

<script>
export default {
  data: () => ({
    file: null,
    image: null,
  }),
  methods: {
    onChangeFile(e) {
      this.file = e.target.files[0]
    },
    upload() {
      return this.$store.dispatch('uploadImage', {
        filename: `${Date.now()}-${this.file.name}`,
        file: this.file,
      })
      //   try {
      //     const { data, error } = await this.$supabase.storage
      //       .from('test-bucket')
      //       .upload(this.file.name, this.file)
      //     // eslint-disable-next-line no-console
      //     console.log(data)
      //     // this.image = data.Key

      //     if (error) throw error
      //   } catch (error) {
      //     // eslint-disable-next-line no-console
      //     console.log(error)
      //   }
      //   try {
      //     const { publicURL, error } = await this.$supabase.storage
      //       .from('test-bucket')
      //       .getPublicUrl(this.file.name)
      //     this.image = publicURL

      //     if (error) throw error
      //   } catch (error) {
      //     // eslint-disable-next-line no-console
      //     console.log(error)
      //   }
    },
  },
}
</script>

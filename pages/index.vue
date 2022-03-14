<template>
  <main class="my-12">
    <div
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-1 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-8 xl:px-0"
    >
      <ImageCard v-for="(image, index) in images" :key="index" :image="image" />
    </div>
  </main>
</template>

<script>
export default {
  data: () => ({
    images: [
      {
        id: '1',
        label: 'label1',
        src: 'https://images.unsplash.com/photo-1509194393703-60acbafcbb28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '2',
        label: 'label2',
        src: 'https://images.unsplash.com/photo-1573658643025-f4a4604a1153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=406&q=80',
      },
      {
        id: '3',
        label: 'label3',
        src: 'https://images.unsplash.com/photo-1580244222095-9e9869f2bda9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '4',
        label: 'label4',
        src: 'https://images.unsplash.com/photo-1646993879654-d4110acf05e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      },
      {
        id: '5',
        label: 'label5',
        src: 'https://images.unsplash.com/photo-1623764802421-0038efb62494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
      },
      {
        id: '6',
        label: 'label6',
        src: 'https://images.unsplash.com/photo-1603206449721-9af147914fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '7',
        label: 'label7',
        src: 'https://images.unsplash.com/photo-1625596802932-6c70a9ec68d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '1',
        label: 'label1',
        src: 'https://images.unsplash.com/photo-1509194393703-60acbafcbb28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '2',
        label: 'label2',
        src: 'https://images.unsplash.com/photo-1573658643025-f4a4604a1153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=406&q=80',
      },
      {
        id: '3',
        label: 'label3',
        src: 'https://images.unsplash.com/photo-1580244222095-9e9869f2bda9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '4',
        label: 'label4',
        src: 'https://images.unsplash.com/photo-1646993879654-d4110acf05e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      },
      {
        id: '5',
        label: 'label5',
        src: 'https://images.unsplash.com/photo-1623764802421-0038efb62494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
      },
      {
        id: '6',
        label: 'label6',
        src: 'https://images.unsplash.com/photo-1603206449721-9af147914fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '7',
        label: 'label7',
        src: 'https://images.unsplash.com/photo-1625596802932-6c70a9ec68d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  }),
}
</script>

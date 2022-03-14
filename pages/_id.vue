<template>
  <main class="container">
    <section
      class="container flex h-full flex-col rounded-[32px] p-4 shadow-pinterest md:flex-row"
    >
      <figure
        class="mb-4 overflow-hidden rounded-[16px] shadow-pinterest md:mb-0 md:w-1/2"
      >
        <img
          class="w-full"
          src="https://i.pinimg.com/564x/97/6a/13/976a1372e219a80b68872f5330607c14.jpg"
          alt=""
        />
      </figure>
      <article
        class="flex flex-col items-center justify-around gap-4 p-4 md:w-1/2"
      >
        <h1 class="w-2/3 text-center text-3xl text-[#5481bb]">
          Breakfast Bar Table with Shelves
        </h1>
        <span class="text-sm text-gray-500"
          >Uploaded by
          <span class="text-green-600">Rafael Valenzuela</span></span
        >
        <p class="w-2/3 px-4 text-xs">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          exercitationem laboriosam consectetur repellendus minima veritatis
          atque, ratione similique sint recusandae aperiam neque dolores?
          Tenetur sapiente voluptatum quidem, rerum officia veritatis.
        </p>

        <div>
          <h2 class="ml-4 mb-2 text-2xl font-bold text-[#5481bb]">Comments</h2>
          <div class="flex flex-col">
            <section class="flex w-full items-center gap-x-4 p-4">
              <img
                class="w-14 rounded-full"
                src="https://i.pinimg.com/75x75_RS/cc/7d/cb/cc7dcb6084a47b14d532c0ecc49c9108.jpg"
                alt=""
              />
              <article
                class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500"
              >
                <span class="font-extrabold">Rafael Valenzuela</span>
                <p class="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  euismod, urna eu tincidunt tincidunt, nisi nisl aliquet nunc,
                  eget egestas nisl nisi eu nisl.
                </p>
              </article>
            </section>

            <article class="flex gap-x-4 p-4">
              <img
                class="w-14 rounded-full"
                src="https://i.pinimg.com/75x75_RS/cc/7d/cb/cc7dcb6084a47b14d532c0ecc49c9108.jpg"
                alt=""
              />
              <input
                class="w-full rounded-[16px] border border-gray-400 p-4"
                type="text"
                placeholder="Add a comment"
              />
            </article>
            <input
              class="mr-4 w-32 self-end rounded-lg bg-green-600 px-3 py-3 text-white shadow-md"
              type="submit"
              value="Send"
            />
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
export default {}
</script>

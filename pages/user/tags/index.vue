<template>
  <div>
    <UITitle> Your tags: </UITitle>
    <div v-for="tag in tags" class="w-full">
      <NuxtLink :to="'/user/tag/' + tag.title" class="cursor-pointer">
        <UIItem :title="tag.title"></UIItem>
        <!-- <div
          class="mx-2 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700"
        >
          <h3
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-4 w-full md:w-fit"
          >
            {{ tag.title }}
          </h3>
        </div> -->
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
})
/* const tags = ["movie", "phrasal"] */

const user = useSupabaseUser()

const isLoading = ref(false)
const someError = ref("")

const {
  data: tags,
  pending,
  error,
  refresh,
} = await useFetch<ITags[]>(`/api/tags/${user.value.id}`, {
  onRequest({ request, options }) {
    isLoading.value = true
  },
  onRequestError({ request, options, error }) {
    someError.value = error.message
  },
  onResponse({ request, response, options }) {
    isLoading.value = false
  },
  onResponseError({ request, response, options }) {
    isLoading.value = false
    someError.value = response.statusText
  },
})
</script>

<style scoped></style>

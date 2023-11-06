<template>
  <div class="">
    <div>
      <!-- <UIItemLink
        title="Add new course"
        url="/user/add"
        type="button"
      ></UIItemLink> -->
      <template v-if="isLoading || pending">
        <UILoading />
      </template>
      <template v-else>
        <template v-if="someError.length || error">
          <Errors :errors="someError + error" />
        </template>
        <template v-else>
          <UITitle>{{ $t("modules") }}</UITitle>
          <template v-if="courses && courses.length">
            <div v-for="card in courses" class="w-full relative">
              <NuxtLink
                :to="localePath(`/user/course/${card.id}`)"
                class="cursor-pointer"
              >
                <UIItem
                  :tags="card.tags"
                  :title="card.title"
                  :count="card.count"
                ></UIItem>
                <!-- <div
                class="mx-2 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700"
              >
                <div
                  class="flex flex-wrap items-center content-between justify-between"
                >
                  <div class="flex flex-wrap items-end">
                    <h3
                      class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-4 w-full md:w-fit"
                    >
                      {{ card.title }}
                    </h3>
                    <div
                      class="font-normal text-gray-700 dark:text-gray-400 w-fit md:w-fullw-full md:w-fit"
                    >
                      Items: {{ card.count }}
                    </div>
                  </div>
                  <div
                    class="font-normal text-gray-700 dark:text-gray-400 md:w-fit flex"
                  >
                    <div v-for="tag in card.tags" :key="tag.tag_id">
                      <NuxtLink
                        :to="'/user/tag/' + tag.tags.tag_title"
                        class="cursor-pointer bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-white"
                        >{{ tag.tags.tag_title }}</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div> -->
              </NuxtLink>
            </div>
          </template>
          <template v-else>
            <div class="text-2xl block mb-4">
              <span class="block">{{ $t("nocourses") }} </span>
            </div>
            <div>
              <UIButton
                @onclick="navigateTo(localePath('add'))"
                size="lg"
                :rounded="true"
                >{{ $t("createcourse") }}</UIButton
              >
              >
            </div>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
})
const localePath = useLocalePath()

const user = useSupabaseUser()

const isLoading = ref(false)
const someError = ref("")

const {
  data: courses,
  pending,
  error,
  refresh,
} = await useFetch<ICourseTags[]>(`/api/courses/${user.value.id}`, {
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

watchEffect(async () => {})
</script>

<style scoped></style>

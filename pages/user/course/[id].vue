<template>
  <div>
    <template v-if="isLoading || pending">
      <UILoading />
    </template>
    <template v-else>
      <template v-if="someError.length || error">
        <Errors :errors="someError + error" />
      </template>
      <template v-else>
        <div v-if="course">
          <Course
            :courseid="routeid"
            :course="course"
            @remove="removeCard"
            @update="editItem"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"

definePageMeta({
  middleware: ["auth"],
})

const route = useRoute()
const routeid = route.params.id as string
const user = useSupabaseUser()

const isLoading = ref(false)
const someError = ref("")

const {
  data: course,
  pending,
  error,
  refresh,
} = await useFetch<ICourseWords>(`/api/course/${user.value.id}`, {
  query: {
    courseId: routeid,
  },
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

const removeCard = async () => {
  const {
    data: courseRemoved,
    pending,
    error,
    refresh,
  } = await useFetch(`/api/course/${user.value.id}`, {
    method: "DELETE",
    body: {
      courseId: routeid,
      words: course.value?.words,
    },
    onRequest({ request, options }) {
      isLoading.value = true
      course.value = null
    },
    onRequestError({ request, options, error }) {
      someError.value = "Request error! " + error.message
    },
    onResponse({ request, response, options }) {
      isLoading.value = false
    },
    onResponseError({ request, response, options }) {
      isLoading.value = false
      someError.value = "Response error! " + response.statusText
    },
  })
  navigateTo("/user/courses")
}

const editItem = () => {
  navigateTo(`/user/course/edit/${routeid}`)
}
</script>

<style scoped></style>

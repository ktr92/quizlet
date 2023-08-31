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
          <Course :courseid="routeid" :course="course" />
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
    courseid: routeid,
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
</script>

<style scoped></style>

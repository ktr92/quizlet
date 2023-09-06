<template>
  <div>
    <div>
      <template v-if="isLoading">
        <UILoading />
      </template>
      <template v-else>
        <template v-if="someError.length">
          <Errors :errors="someError" />
        </template>
        <template v-else>
          <div v-if="course">
            <div class="my-12">
              <div
                class="md:text-5xl text-primary-800 dark:text-white font-bold mb-8 flex justify-between items-center"
              >
                <span>{{ resTitle }} [editing]</span>
                <UIButton size="md" :rounded="true" @click="onSubmit"
                  >Save</UIButton
                >
              </div>
            </div>

            <form @submit="onSubmit">
              <UIInput
                v-model="ctitle"
                placeholder="Course title"
                name="ctitle"
              ></UIInput>

              <UITagsInput
                v-model="cdescription"
                :initialTags="resDescription"
                :options="['Hello', 'World']"
                :showCount="true"
              ></UITagsInput>

              <div
                class="my-4"
                v-for="(field, index) in newitems"
                :key="field.count"
              >
                <div class="bg-white dark:bg-gray-700 rounded-lg">
                  <div class="flex justify-between px-4 py-2">
                    <div></div>
                    <div>
                      <div
                        @click="remove(index)"
                        class="cursor-pointer"
                        :class="{ 'opacity-30': count < 2 }"
                      >
                        <Icon name="pajamas:remove" size="20"></Icon>
                      </div>
                    </div>
                  </div>
                  <!-- /.flex -->
                  <div class="flex mb-4 pb-4 flex-wrap md:flex-nowrap">
                    <div class="px-2 w-full md:w-[50%] md:mr-2">
                      <UIInput
                        v-model="newitems[index].dt"
                        placeholder="Term"
                        :name="`newitems[${index}].dt`"
                      ></UIInput>
                    </div>
                    <div class="px-2 w-full md:w-[50%] md:ml-2">
                      <UIInput
                        v-model="newitems[index].dd"
                        placeholder="Value"
                        :name="`newitems[${index}].dd`"
                      ></UIInput>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-8" @click="addnew">
                <UIButton :liquid="true" :rounded="true">Add new word</UIButton>
              </div>
            </form>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate"
import { useRoute } from "vue-router"
import * as yup from "yup"

const route = useRoute()
const routeid = route.params.id as string
const user = useSupabaseUser()
const ctitle = ref("")
const cdescription = ref<string[]>([])
const idx = ref(0)
/* const newitems = ref([{ dt: "", dd: "", count: 0 }]) */

const addnew = () => {
  idx.value++
  newitems.value.push({ dt: "", dd: "", count: idx.value })
}
const remove = (index: number) => {
  if (count.value > 1) {
    newitems.value.splice(index, 1)
  }
}
const count = computed(() => {
  return newitems.value.length
})

const resTitle = computed(() => {
  return course.value ? course.value.title : ""
})
const resDescription = computed(() => {
  return course.value ? course.value.tags.map((item: ITags) => item.title) : []
})
const newitems = computed(() => {
  return course.value ? course.value.words : []
})
const courseId = computed(() => {
  return course.value ? course.value.id : null
})

const schema = yup.object().shape({
  newitems: yup.array().of(
    yup.object().shape({
      dt: yup.string().required("Enter a value").max(200),
      dd: yup.string().required("Enter a value").max(200),
    })
  ),
  ctitle: yup.string().required("Enter a title").min(1).max(100),
  cdescription: yup.string().max(300),
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const failValidation = () => {
  console.log("fail")
}
const onSubmit = handleSubmit(async () => {
  const {
    data: courseUpdated,
    pending,
    error,
    refresh,
  } = await useFetch(`/api/course/${user.value.id}`, {
    method: "PATCH",
    body: {
      course_title: ctitle.value,
      course_tags: cdescription.value,
      couesritem_words: newitems.value,
      course_count: count.value,
      course_id: courseId.value,
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

  navigateTo("/user/courses/")
}, failValidation)

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
    someError.value = ""
  },
  onResponseError({ request, response, options }) {
    isLoading.value = false
    someError.value = response.statusText
  },
})
</script>

<style scoped></style>

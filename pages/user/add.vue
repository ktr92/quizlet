<template>
  <div>
    <div class="my-12">
      <div
        class="md:text-5xl text-primary-800 dark:text-white font-bold mb-8 flex justify-between items-center"
      >
        <span>Adding new course</span>
        <UIButton size="md" :rounded="true" @click="onSubmit"
          >Create course</UIButton
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
        :options="['Hello', 'World']"
        :showCount="true"
      ></UITagsInput>

      <div class="my-4" v-for="(field, index) in newitems" :key="field.id">
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
                :key="field.id"
                v-model="newitems[index].dt"
                placeholder="Term"
                :name="`newitems[${index}].dt`"
              ></UIInput>
            </div>
            <div class="px-2 w-full md:w-[50%] md:ml-2">
              <UIInput
                :key="field.id"
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

<script setup lang="ts">
import { useForm } from "vee-validate"
import * as yup from "yup"

const user = useSupabaseUser()
const ctitle = ref("")
const cdescription = ref<string[]>([])
const idx = ref(0)
const newitems = ref([
  {
    dt: "",
    dd: "",
    count: 0,
    id: String(Date.now() + idx.value + Math.random()),
  },
])

const addnew = () => {
  idx.value++
  newitems.value.push({
    dt: "",
    dd: "",
    count: idx.value,
    id: String(Date.now() + idx.value + Math.random()),
  })
}
const remove = (index: number) => {
  if (count.value > 1) {
    newitems.value.splice(index, 1)
  }
}
const count = computed(() => {
  return newitems.value.length
})

const schema = yup.object().shape({
  /*   newitems: yup
    .array()
    .of(
      yup.object().shape({
        dt: yup.string().required("Enter a value").max(200),
        dd: yup.string().required("Enter a value").max(200),
      })
    )
    .strict(), */
  ctitle: yup.string().required("Enter a title").min(1).max(100),
  /* cdescription: yup.string().max(300), */
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const failValidation = () => {
  console.log("fail")
}
const onSubmit = handleSubmit(async () => {
  await useFetch("/api/prisma/create-item", {
    method: "POST",
    body: {
      user: user.value.id,
      title: ctitle.value,
      description: [...cdescription.value],
      words: [...newitems.value],
    },
  })

  navigateTo("/user/courses/")
}, failValidation)
</script>

<style scoped></style>

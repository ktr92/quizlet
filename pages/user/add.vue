<template>
  <div>
    <div class="">
      <div
        class="md:text-5xl text-primary-800 dark:text-white font-bold flex justify-between items-center"
      >
        <UITitle> {{ $t("creatingmodule") }} </UITitle>
        <div class="flex items-center">
          <div class="ml-1 md:ml-4">
            <label for="fileupload">
              <UIIconbutton
                @some-event="importItem"
                :tooltip="$t('import')"
                classes="mr-4 w-12 h-12 md:!p-0 flex items-center justify-center"
                type="round"
              >
                <Icon name="bx:import" size="30" />
                <input
                  type="file"
                  id="fileupload"
                  @change="onFileChange"
                  class="hidden"
                />
              </UIIconbutton>
            </label>
          </div>
          <UIButton
            class=""
            size="lg"
            :rounded="true"
            @click="onSubmit"
            v-if="!isLoading && !someError.length"
            >{{ $t("create") }}</UIButton
          >
        </div>
        <!-- /.flex -->
      </div>
    </div>

    <template v-if="isLoading">
      <UILoading />
    </template>
    <template v-else>
      <template v-if="someError.length">
        <Errors :errors="someError" />
      </template>
      <template v-else>
        <form @submit="onSubmit">
          <UIInput
            v-model="ctitle"
            :placeholder="$t('coursetitle')"
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
                    :placeholder="$t('term')"
                    :name="`newitems[${index}].dt`"
                  ></UIInput>
                </div>
                <div class="px-2 w-full md:w-[50%] md:ml-2">
                  <UIInput
                    :key="field.id"
                    v-model="newitems[index].dd"
                    :placeholder="$t('value')"
                    :name="`newitems[${index}].dd`"
                  ></UIInput>
                </div>
              </div>
            </div>
          </div>
          <div class="my-8" @click="addnew">
            <UIButton :liquid="true" :rounded="true" type="clear">{{
              $t("addword")
            }}</UIButton>
          </div>
        </form>
      </template>
    </template>
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

const importItem = () => {}

const fileinput = ref("")

const onFileChange = (e: any) => {
  isLoading.value = true
  function createInput(file: any) {
    let promise = new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = (e) => {
        resolve((fileinput.value = reader.result as string))
      }
      reader.readAsText(file)
    })

    promise
      .then(
        (result) => {
          fileToWords()
        },
        (error) => {
          someError.value = "File upload error! " + error
        }
      )
      .finally(() => {
        isLoading.value = false
      })
  }
  if (e.target) {
    var files = e.target.files || e.dataTransfer.files
    if (!files.length) {
      return
    }
    createInput(files[0])
  }
}

const fileToWords = () => {
  newitems.value = []
  const splitted = fileinput.value.split("\r\n")
  const result = splitted.map((e) => {
    let keyVal = e.split(",")
    return { dt: keyVal[0], dd: keyVal[1] }
  })

  const filled: IWord[] = []

  result.forEach((item) => {
    idx.value++
    filled.push({
      dt: item.dt,
      dd: item.dd,
      count: idx.value,
      id: String(Date.now() + idx.value + Math.random()),
    })
  })
  newitems.value = filled
}

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

const isLoading = ref(false)
const someError = ref("")

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
    onRequest({ request, options }) {
      isLoading.value = true
    },
    onRequestError({ request, options, error }) {
      someError.value = "Request error! " + error.message
    },
    onResponse({ request, response, options }) {
      isLoading.value = false
      console.log(response._data.title)
    },
    onResponseError({ request, response, options }) {
      isLoading.value = false
      someError.value = "Response error! " + response.statusText
    },
  })

  navigateTo("/user/courses/")
}, failValidation)
</script>

<style scoped></style>

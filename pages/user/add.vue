<template>
  <div>
    <div class="my-12">
      <div
        class="md:text-5xl text-primary-800 dark:text-white font-bold mb-8 flex justify-between items-center"
      >
        <span>Adding new course</span>
        <UIButton size="md" :rounded="true">Save</UIButton>
      </div>
    </div>

    <form action="#" @submit.prevent="onSubmit">
      <UIInput v-model="ctitle" placeholder="Course title"></UIInput>
      <div class="my-4" v-for="(item, index) in newitems" :key="item.count">
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
              ></UIInput>
            </div>
            <div class="px-2 w-full md:w-[50%] md:ml-2">
              <UIInput
                v-model="newitems[index].dd"
                placeholder="Value"
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
const ctitle = ref("")
const idx = ref(0)
const dt = ref("")
const dd = ref("")
const newitems = ref([{ dt: "", dd: "", count: 0 }])
const onSubmit = () => {}
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
</script>

<style scoped></style>

<template>
  <div>
    <div
      class="tag-input w-full bg-white my-4 relative px-4 border-0 border-b-4 border-slate-400 hover:border-slate-500 focus:border-b-primary-500 outline-none transition-all h-10 dark:bg-gray-700 dark:text-white"
    >
      <div
        v-for="(tag, index) in tags"
        :key="tag"
        class="tag-input__tag bg-primary-500 inline-block px-2 text-white rounded-full leading-none py-1 mr-2"
      >
        {{ tag }}
        <span @click="removeTag(index)" class="ml-1 cursor-pointer leading-none"
          >x</span
        >
      </div>
      <input
        type="text"
        v-model="currentTag"
        placeholder="Enter Tags (optional)"
        class="tag-input border-0 h-full outline-0 w-[50%] dark:bg-gray-700 dark:text-white"
        @keydown.enter="addTag"
        @keydown.188="addTag"
        @keydown.delete="removeLastTag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  initialTags: {
    type: Array<string>,
    required: false,
  },
})

const currentTag = ref("")

const tags = ref<string[]>([])

onMounted(() => {
  if (props.initialTags) {
    tags.value = [...props.initialTags]
  }
  emits("update:modelValue", tags.value)
})

const addTag = (event: Event) => {
  event.preventDefault()
  let val = currentTag.value.trim()
  if (val.length > 0) {
    if (tags.value.length >= 1) {
      for (let i = 0; i < tags.value.length; i++) {
        if (tags.value[i] === val) {
          return false
        }
      }
    }
    tags.value.push(val)
    emits("update:modelValue", tags.value)

    currentTag.value = ""
  }
}
const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}
const removeLastTag = (event: Event) => {
  if (currentTag.value.length === 0) {
    removeTag(tags.value.length - 1)
  }
}
</script>

<style scoped></style>

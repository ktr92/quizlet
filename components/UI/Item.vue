<template>
  <div>
    <div
      class="mx-2 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700"
      :class="borderClass"
    >
      <div class="flex flex-wrap items-center content-between justify-between">
        <div class="flex flex-wrap items-end" :class="textClass">
          <h3
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-4 w-full md:w-fit"
          >
            {{ props.title }}
          </h3>
          <div
            v-if="props.count"
            class="font-normal text-gray-700 dark:text-gray-400 w-fit md:w-fullw-full md:w-fit"
          >
            Items: {{ props.count }}
          </div>
        </div>
        <div
          v-if="props.tags"
          class="font-normal text-gray-700 dark:text-gray-400 w-full md:w-fit"
        >
          <div v-for="tag in props.tags">
            <span
              class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
              >{{ tag }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    requided: false,
  },
})

enum TextSizes {
  "button" = "text-center justify-center text-white dark:text-primary-500",
}
enum BorderStyles {
  "button" = "bg-primary-500 dark:bg-primary-500 border-white",
}

const textClass = computed(() => {
  return TextSizes[props.type as keyof typeof TextSizes]
})
const borderClass = computed(() => {
  return BorderStyles[props.type as keyof typeof BorderStyles]
})
</script>

<style scoped></style>

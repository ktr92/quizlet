<template>
  <div class="m-1 md:m-4">
    <div
      class="rounded shadow-lg font-bold px-2 md:px-8 py-3 inline-flex items-center justify-center bg-white dark:bg-gray-600 cursor-pointer min-w-[67px] text-center"
    >
      <div class="block mr-2 max-w-[30px]" v-if="props.icon">
        {{ props.icon }}
      </div>
      <div class="text-md dark:text-white">
        {{ props.title }}
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
  icon: {
    type: String,
    required: false,
  },
})
</script>

<style scoped></style>

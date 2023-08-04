<template>
  <div class="m-4">
    <div
      class="rounded shadow-lg font-bold px-8 py-3 inline-flex items-center bg-white dark:bg-dim-600 cursor-pointer"
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

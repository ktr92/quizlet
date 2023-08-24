<template>
  <div class="">
    <NuxtLink :to="props.url" class="cursor-pointer">
      <UIItem
        :title="props.title"
        :count="props.count"
        :tags="props.tags"
        :type="props.type"
      ></UIItem>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: false,
  },
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
    required: false,
  },
})
</script>

<style scoped></style>

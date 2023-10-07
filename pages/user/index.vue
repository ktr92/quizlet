<template>
  <div>
    <UIItemLink
      :title="$t('createcourse')"
      url="/user/add"
      type="button"
    ></UIItemLink>
    <UIItemLink
      :title="$t('modules')"
      url="/user/courses"
      :count="count"
    ></UIItemLink>
    <UIItemLink :title="$t('tags')" url="/user/tags"></UIItemLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
})
const courses = [
  {
    title: "GET pharasal verb",
    description: "",
    count: 23,
    tags: ["phrasal"],
    url: "1",
  },
  {
    title: "liar movie words",
    description: "",
    count: 130,
    tags: ["movie"],
    url: "2",
  },
  {
    title: "COME phrasal verb",
    description: "",
    count: 19,
    tags: ["phrasal"],
    url: "3",
  },
]
const count = computed(() => {
  return courses.length
})
</script>

<style scoped></style>

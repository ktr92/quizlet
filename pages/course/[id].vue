<template>
  <div>
    <Course :courseid="routeid" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const routeid = route.params.id as string
</script>

<style scoped></style>

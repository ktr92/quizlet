<template>
  <div>
    <Course :courseid="routeid" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const routeid = route.params.id as string

 definePageMeta({
    middleware: ["auth"]
  })
</script>

<style scoped></style>

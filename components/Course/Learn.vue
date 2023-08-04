<template>
  <div></div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array<ICard>,
    required: true,
  },
})

let restItems = [...props.items]
const items = [...props.items]
let initialItems = [...props.items]
</script>

<style scoped></style>

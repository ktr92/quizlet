<template>
  <div
    class="cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-primary-900 p-4"
    :class="[defaultTransition]"
    :style="styleObject"
    @click="$emit('someEvent')"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { defaultTransition } = useTailwindConfig()
const props = defineProps({
  bg: {
    type: String,
    required: false,
  },
  bghover: {
    type: String,
    required: false,
  },
})

const styleObject = computed(() => {
  return {
    "--background-color": props.bg,
    "--background-color-hover": props.bghover,
  }
})
</script>

<style scoped></style>

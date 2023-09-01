<template>
  <div
    class="cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-primary-900 p-1 md:p-4 relative"
    :class="[defaultTransition]"
    :style="styleObject"
    @click="$emit('someEvent')"
    @mouseover="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <slot></slot>
    <div
      v-if="showTooltip && tooltip.length > 0"
      class="absolute bottom-[110%] opacity-90 mx-auto -left-[999px] -right-[999px] w-fit p-2 bg-white shadow rounded whitespace-nowrap"
    >
      {{ tooltip }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { defaultTransition } = useTailwindConfig()
const props = defineProps({
  bg: {
    type: String,
    default: "#efadad",
  },
  bghover: {
    type: String,
    default: "#efadad",
  },
  tooltip: {
    type: String,
    default: "",
  },
})

let showTooltip = ref(false)

const styleObject = computed(() => {
  return {
    "--background-color": props.bg,
    "--background-color-hover": props.bghover,
  }
})
</script>

<style scoped></style>

<template>
  <div
    class="cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-primary-900 p-1 md:p-4 relative"
    :class="[compClasses]"
    :style="styleObject"
    @click="$emit('someEvent')"
    @mouseover="showTooltip = true"
    @mouseleave="showTooltip = false"
  >
    <slot></slot>
    <div
      v-if="showTooltip && tooltip.length > 0"
      class="absolute bottom-[110%] opacity-90 mx-auto -left-[999px] -right-[999px] w-fit p-2 bg-white shadow rounded whitespace-nowrap text-lg font-normal text-primary-800"
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
  classes: {
    type: String,
    default: "",
  },
  type: {
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

enum ButtonTypes {
  "round" = "md:!p-0 flex items-center justify-center",
}

const typeClass = computed(() => {
  return ButtonTypes[props.type as keyof typeof ButtonTypes]
})

const compClasses = computed(
  () => `${typeClass.value} ${defaultTransition} ${props.classes}`
)
</script>

<style scoped></style>

<template>
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-12">
    <div
      class="bg-[#423ed8] min-w-[50px] text-md font-medium text-blue-100 text-center p-2 leading-none rounded-full"
      :class="barColor"
      :style="'width: ' + value + '%'"
    >
      {{ value }} %
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

const barColor = computed(() => {
  if (props.value <= 25) {
    return "bg-red-400 text-white"
  }
  if (props.value > 25 && props.value < 50) {
    return "bg-orange-400 text-blue-800"
  }
  if (props.value >= 50 && props.value < 80) {
    return "bg-yellow-400 text-blue-800"
  }
  if (props.value >= 80) {
    return "bg-green-500 text-white"
  }
  return "bg-[#423ed8]"
})
</script>

<style scoped></style>

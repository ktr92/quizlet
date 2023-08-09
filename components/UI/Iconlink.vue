<template>
  <div class="">
    <div
      class="rounded shadow text-white font-bold px-2 md:px-8 py-3 inline-flex items-center justify-center bg-gray-400 dark:bg-gray-600 cursor-pointer min-w-[67px] w-full text-center hover:shadow-xl"
      :class="[
        defaultTransition,
        { active: !darkMode && isActive },
        { activedark: darkMode && isActive },
      ]"
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
  isActive: {
    type: Boolean,
    default: false,
  },
})
const { defaultTransition } = useTailwindConfig()
import { useMainStore } from "@/stores/mainstore"
const mainStore = useMainStore()

const darkMode = ref(mainStore.dark)
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.active {
  @apply bg-gray-600;
}
.activedark {
  @apply bg-gray-100;
}
</style>

<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Loading v-if="mainStore.loading" />

      <Header />

      <div class="max-w-[1200px] w-full px-2 mx-auto my-2 md:my-4">
        <NuxtPage />
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "../stores/mainstore"
const mainStore = useMainStore()

const darkMode = ref(mainStore.dark)
</script>

<style>
svg.icon path {
  fill: #9ca3af;
}

.dark svg.icon path {
  fill: #5f99f7;
}


</style>

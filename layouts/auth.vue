<template>
  <div :class='{"dark": darkMode}'>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { useMainStore } from '../stores/mainstore'
  const mainStore = useMainStore()

  const darkMode = ref(mainStore.dark)
</script>

<style scoped>

</style>
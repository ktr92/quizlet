<template>
  <div :class='{"dark": darkMode}'>
    <div class='min-h-screen dark:bg-gray-800'>
      <Loading v-if='mainStore.loading' />

      <Header />
      
      <slot />

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMainStore } from '../stores/mainstore'
  const mainStore = useMainStore()

  const darkMode = ref(true)
  
</script>

<style scoped>

</style>
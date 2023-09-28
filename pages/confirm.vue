<script setup lang="ts">
const user = useSupabaseUser()

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/user")
    }
  },
  { immediate: true }
)
</script>
<template>
  <div>Waiting for login...</div>
</template>

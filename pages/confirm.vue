<script setup lang="ts">
const user = useSupabaseUser()
const localePath = useLocalePath()

/* watch(
  user,
  () => {
    if (user.value) {
      return navigateTo(localePath("/user"))
    }
  },
  { immediate: true }
) */
</script>
<template>
  <div>{{ $t("loginprocess") }}</div>
</template>

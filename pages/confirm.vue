<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
})
const user = useSupabaseUser()
const localePath = useLocalePath()
onMounted(() => {
  console.log()
})
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

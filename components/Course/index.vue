<template>
  <div>
    <CourseCards :items='course'></CourseCards>
  </div>
</template>

<script setup lang="ts">
   const course = [
      {
        dt: 'tighten',
        dd: 'сужать'
      },
      {
        dt: 'dazzle',
        dd: 'ослеплять'
      },
      {
        dt: 'insurance',
        dd: 'страхование'
      }
    ]
</script>

<style scoped>
  
</style>
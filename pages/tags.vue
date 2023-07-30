<template>
  <div>
    <div v-for='tag in tags' class='w-full'> 
      <NuxtLink :to='tag' class='cursor-pointer'>
      <div class=" mx-2 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
    
          
   
        <h3 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-4 w-full md:w-fit">{{ tag }}</h3>
    </div>
</NuxtLink>
  </div>
  </div>
</template>

<script setup lang="ts">
  const tags = ['movie', 'phrasal']
</script>

<style scoped>

</style>
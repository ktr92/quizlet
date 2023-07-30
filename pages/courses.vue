<template>
  <div class=''>
  <div>
    <div v-for='card in courses' class='w-full'> 
      <NuxtLink :to='card.url' class='cursor-pointer'>
      <div class=" mx-2 my-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
    
        <div  class='flex flex-wrap items-center  content-between justify-between '>
          <div  class='flex flex-wrap items-end'>
          <h3 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white mr-4 w-full md:w-fit">{{ card.title }}</h3>
          <div class=" font-normal text-gray-700 dark:text-gray-400 w-fit md:w-fullw-full md:w-fit">
            Items: {{ card.count }}
          </div>
          </div>
          <div class="font-normal text-gray-700 dark:text-gray-400 w-full md:w-fit">
      <div v-for='tag in card.tags'>
        <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{{ tag }}</span>
      </div>
    </div>
  </div>
   
    
    
   
</div>
</NuxtLink>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
  const courses = [
    {
      title: 'GET pharasal verb',
      description: '',
      count: 23,
      tags: ['phrasal'],
      url: '1'
    },
    {
      title: 'liar movie words',
      description: '',
      count: 130,
      tags: ['movie'],
      url: '2'
    },
    {
      title: 'COME phrasal verb',
      description: '',
      count: 19,
      tags: ['phrasal'],
      url: '3'
    },
  ]
</script>

<style scoped>

</style>
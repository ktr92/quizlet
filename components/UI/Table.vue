<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-8 mt-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
       <!--  <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead> -->
        <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700" v-for='item in items' :key='item.count'>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 w-[50%]">
                    {{ item.dt }}
                </th>
                <td class="px-6 py-4 w-[50%]">
                  {{ item.dd }}
                </td>
               
            </tr>
         
            
        </tbody>
    </table>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
  
  items: {
    type: Array<IWord>,
    required: false
  },
 
})
</script>

<style scoped>

</style>
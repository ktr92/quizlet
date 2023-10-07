<template>
  <div>
    <div
      class="p-4 fixed top-2 text-center left-0 right-0 border-2 border-red-300 w-full shadow-xl rounded max-w-[600px] mx-auto bg-white text-gray-800 text-xl"
    >
    {{ $t("error") }}  {{ errors }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errors: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>

<template>
  <div>
    <div
      class="py-32 relative h-96 mx-auto mt-8 mb-8 cursor-pointer text-center font-bold tracking-light text-lg overflow-hidden"
    >
      <div
        v-if="flipped"
        class="absolute text-center py-16 bg-white dark:bg-primary-500 text-white overflow-hidden inset-0 rounded-lg shadow-lg animated flipInX flashcard md:w-[900px] mx-auto flex items-center justify-center"
        @click="flip"
      >
        <div class="text-5xl">Front</div>
      </div>
      <div
        v-else
        class="absolute text-center py-16 bg-gray-200 dark:bg-gray-700 text-white overflow-hidden inset-0 rounded-lg shadow-lg animated flipInX flashcard md:w-[900px] mx-auto flex items-center justify-center"
        @click="flip"
      >
        <div class="text-5xl">Back</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const flipped = ref(true)

const flip = () => {
  flipped.value = !flipped.value
}
</script>

<style scoped>
.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

.flipInX {
  backface-visibility: visible !important;
  animation-name: flipInX;
}
</style>

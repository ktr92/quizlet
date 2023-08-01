<template>
  <div>
    <div v-if="props.items && currentItem">
      <div v-if="isFinish">
        <div class="text-lg text-center">Повторить неизученные термины?</div>
      </div>
      <div
        v-else
        class="py-32 relative h-96 mx-auto mt-8 mb-8 cursor-pointer text-center font-bold tracking-light text-lg overflow-hidden"
      >
        <div
          v-if="!flipped"
          class="absolute text-center py-16 bg-white dark:bg-primary-500 text-white overflow-hidden inset-0 rounded-lg shadow-lg animated flipInX flashcard md:w-[900px] mx-auto flex items-center justify-center"
          @click="flip"
        >
          <div class="text-5xl">{{ currentItem.dt }}</div>
        </div>
        <div
          v-else
          class="absolute text-center py-16 bg-gray-200 dark:bg-gray-700 text-white overflow-hidden inset-0 rounded-lg shadow-lg animated flipInX flashcard md:w-[900px] mx-auto flex items-center justify-center"
          @click="flip"
        >
          <div class="text-5xl">{{ currentItem.dd }}</div>
        </div>
      </div>

      <div class="flex py-8 xs-auto md:w-p[900px] items-center justify-center">
        <button @click.prevent="makeknown" class="block mx-4">
          <Icon name="gg:check-o" color="green" size="60px" />
        </button>
        <button @click.prevent="makeunknown" class="block mx-4">
          <Icon name="gg:close-o" color="red" size="60px" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array<ICard>,
    required: true,
  },
})

const flipped = ref(false)
const flip = () => {
  flipped.value = !flipped.value
}

let current = ref(0)
const isFinish = ref(false)
const known = ref<ICard[]>([])
const unknown = ref<ICard[]>([])

const currentItem = computed(() => {
  return props.items[current.value]
})

const nextcard = () => {
  current.value += 1
  flipped.value = false
}

watch(current, (newValue, oldValue) => {
  if (newValue >= props.items.length) {
    isFinish.value = true
    current.value = 0
  }
})

const makeknown = () => {
  known.value.push(currentItem.value)
  nextcard()
}
const makeunknown = () => {
  unknown.value.push(currentItem.value)
  nextcard()
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

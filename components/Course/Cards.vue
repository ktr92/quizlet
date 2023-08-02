<template>
  <div>
    <div v-if="restItems && currentItem">
      <div v-if="isFinish">
        <div class="flex max-auto my-8">
          <div class='mx-4'>
            <UIButton
              @onclick="restart"
              size="sm"
              :liquid="false"
              :rounded="true"
            >
              Продолжить изучать термины
         </UIBUtton>
          </div>
          <div class='mx-4'>
          <UIButton
              @onclick="learnmore"
              size="sm"
              :liquid="false"
              :rounded="true"
            >
              Начать заново
         </UIBUtton>
        </div>
        </div><!-- /.flex -->
      
      </div>
      <div
        v-else
       
      >
      <div  class="py-32 relative h-96 mx-auto mt-8 mb-8 cursor-pointer text-center font-bold tracking-light text-lg overflow-hidden">

     
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
          <button @click.prevent="nextcard" class="block mx-4">
            <Icon name="gg:close-o" color="red" size="60px" />
          </button>
        </div>
        
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

const restItems = ref(props.items)
const initialItems = toRaw(props.items)

const flipped = ref(false)
const flip = () => {
  flipped.value = !flipped.value
}

let current = ref(0)
const isFinish = ref(false)

const currentItem = computed(() => {
  return restItems.value[current.value]
})

const nextcard = () => {
  current.value += 1
  flipped.value = false
}


const restart = () => {
  current.value = 0
  isFinish.value = false
}

const learnmore = () => {
  restItems.value = initialItems
  restart()

}

watch(current, (newValue, oldValue) => {
  if (newValue >= initialItems.length) {
    isFinish.value = true
    current.value = 0
  }
})

const makeknown = () => {
  restItems.value.splice(current.value, 1)
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

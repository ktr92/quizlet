<template>
  <div>
    <div v-if="isFinish">
      <div class="flex max-auto my-2 md:my-8 justify-center">
        <div class="mx-2 md:mx-4">
          <UIButton
            @onclick="restart"
            size="lg"
            :liquid="false"
            :rounded="true"
            type="danger"
          >
            Начать заново
          </UIButton>
        </div>
        <div class="mx-2 md:mx-4" v-if="restItems.length">
          <UIButton
            @onclick="learnmore"
            size="lg"
            :liquid="false"
            :rounded="true"
            type="primary"
          >
            Повторить ошибочные
          </UIButton>
        </div>
      </div>
      <!-- /.flex -->
    </div>
    <div v-else>
      <div v-if="restItems && currentItem">
        <div
          class="flex max-auto my-2 md:my-8 justify-center dark:text-white text-xl items-center"
        >
          <div class="mx-2 md:mx-4">
            {{ count + 1 }} / {{ initialItems.length }}
          </div>
        </div>

        <div
          class="py-24 md:py-32 relative h-auto min-h-24 md:h-96 mx-auto mt-8 mb-8 cursor-pointer text-center font-bold tracking-light text-sm md:text-lg overflow-hidden"
        >
          <div
            v-if="!flipped"
            class="absolute text-center py-16 bg-primary-500 dark:bg-primary-500 text-white overflow-hidden inset-0 rounded-lg shadow-lg animated flipInX flashcard md:w-[900px] mx-auto flex items-center justify-center"
            @click="flip"
          >
            <div class="text-lg md:text-5xl">
              {{ currentItemDT }}
            </div>
          </div>
          <div
            v-else
            class="absolute text-center py-16 bg-gray-400 dark:bg-gray-700 text-white overflow-hidden inset-0 rounded-lg shadow-lg animated flipInX flashcard md:w-[900px] mx-auto flex items-center justify-center"
            @click="flip"
          >
            <div class="text-lg md:text-5xl">
              {{ currentItemDD }}
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <div
            class="flex max-auto my-2 md:my-8 justify-center text-white text-xl items-center"
          >
            <div class="mr-2 md:mr-4" v-if="initialItems.length > 1">
              <UIIconbutton @some-event="randomize">
                <Icon name="uil:arrow-random" size="30" />
              </UIIconbutton>
            </div>
            <div class="mr-2 md:mr-4" v-if="initialItems.length > 0">
              <UIIconbutton @some-event="changeSide">
                <Icon name="eva:flip-2-fill" size="30" />
              </UIIconbutton>
            </div>
          </div>

          <div
            class="flex py-2 md:py-8 xs-auto md:w-p[900px] items-center justify-center"
          >
            <div class="ml-1 md:ml-4 w-[50%]">
              <UIIconbutton @some-event="nextcard" bg="#efadad" bghover="">
                <Icon name="gg:close" size="30" />
              </UIIconbutton>
            </div>
            <div class="ml-1 md:ml-4 w-[50%]">
              <UIIconbutton @some-event="makeknown" bg="#c4eac4" bghover="">
                <Icon name="heroicons-solid:check" size="30" />
              </UIIconbutton>
            </div>
          </div>
        </div>
        <!-- /.flex -->
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

import { useMainStore } from "@/stores/mainstore"
const mainStore = useMainStore()

let restItems = [...props.items]
const items = [...props.items]
let initialItems = [...props.items]

let frontSide = ref(true)

const flipped = ref(false)
const flip = () => {
  flipped.value = !flipped.value
}

let current = ref(0)
let count = ref(0)
const isFinish = ref(false)

let currentItem = ref<ICard>({ ...restItems[0] })

const changeSide = () => {
  frontSide.value = !frontSide.value
}

const side = computed(() => {
  return frontSide.value ? "Термин" : "Определение"
})

/* const currentItem = computed(() => {
  return restItems[current.value] ? restItems[current.value] : restItems[0]
}) */
const currentItemDT = computed(() => {
  return frontSide.value ? currentItem.value.dt : currentItem.value.dd
})
const currentItemDD = computed(() => {
  return frontSide.value ? currentItem.value.dd : currentItem.value.dt
})

const restart = () => {
  restItems = [...items]
  initialItems = [...items]
  reinit()
  changeCurrent()
}

const learnmore = () => {
  initialItems = [...restItems]
  reinit()
  changeCurrent()
}

const reinit = () => {
  count.value = 0
  current.value = 0
  isFinish.value = false
}

watch(count, (newValue, oldValue) => {
  if (newValue >= initialItems.length) {
    isFinish.value = true
    current.value = 0
    count.value = 0
  }
})

const nextcard = () => {
  current.value += 1
  count.value += 1
  flipped.value = false
  changeCurrent()
}

const changeCurrent = () => {
  currentItem.value = restItems[current.value]
    ? restItems[current.value]
    : restItems[0]
}

const makeknown = () => {
  restItems.splice(current.value, 1)
  changeCurrent()
  count.value += 1
}

const randomize = () => {
  restItems = useShuffle(restItems)
  reinit()
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

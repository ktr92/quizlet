<template>
  <div>
    <div v-if="isFinish">
      <CourseNavigation
        :condition2="wrongAnswers.length"
        @some-event1="restart"
        @some-event2="learnmore"
        text1="Начать заново"
        text2="Повторить"
      />
    </div>
    <div v-else>
      <div v-if="restItems && restItems.length && currentItem">
        <div
          class="shadow-lg rounded-xl p-8 bg-primary-500 dark:bg-primary-800 mt-4 mb-4"
        >
          <div class="text-white font-bold text-lg md:text-3xl text-center">
            {{ frontSide ? currentItemDD : currentItemDT }}
          </div>
        </div>

        <div class="flex flex-wrap">
          <div
            class="w-full md:w-[50%] p-2"
            v-for="option in options"
            :key="option.dt + count"
          >
            <div
              class="p-2 md:-4 shadow rounded bg-white dark:bg-primary-800 dark:text-white cursor-pointer hover:shadow-lg text-xs sm:text-base"
              :class="defaultTransition"
              @click="checkAnswer(option)"
              v-if="!answered || option.dt === currentItemDT"
            >
              {{ frontSide ? option.dt : option.dd }}
              <span
                class="text-red-500 font-bold text-sm md:text-md"
                v-if="answered && !isvalid && option.dt === currentItemDT"
              >
                - {{ frontSide ? option.dd : option.dt }}</span
              >
            </div>
            <div v-else class="text-gray-400 text-sm md:text-md">
              {{ frontSide ? option.dt : option.dd }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div
          class="flex max-auto my-2 md:my-2 justify-center text-white text-xl items-center"
        >
          <div class="mr-2 md:mr-4" v-if="initialItems.length > 1">
            <UIIconbutton @some-event="randomize" :tooltip="$t('randomize')">
              <Icon name="uil:arrow-random" size="30" />
            </UIIconbutton>
          </div>
          <div class="mr-2 md:mr-4" v-if="initialItems.length > 0">
            <UIIconbutton @some-event="changeSide" :tooltip="$t('changeside')">
              <Icon name="eva:flip-2-fill" size="30" />
            </UIIconbutton>
          </div>
        </div>
        <div
          class="flex max-auto my-2 md:my-2 justify-center dark:text-white text-xl items-center"
        >
          <div class="mx-2 md:mx-4">
            {{ count }} / {{ initialItems.length }}
          </div>
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

const { defaultTransition } = useTailwindConfig()

let restItems = ref([...props.items])
const items = [...props.items]
let initialItems = [...props.items]
let wrongAnswers = ref<ICard[]>([])
let options = ref<ICard[]>([])

let frontSide = ref(true)
let answered = ref(false)

let current = ref(0)
let count = ref(0)
const isFinish = ref(false)

const changeSide = () => {
  frontSide.value = !frontSide.value
}

const currentItem = computed(() => {
  return restItems.value[current.value]
    ? restItems.value[current.value]
    : restItems.value[0]
})

const currentItemDT = computed(() => {
  return currentItem.value.dt
})
const currentItemDD = computed(() => {
  return currentItem.value.dd
})

const restart = () => {
  restItems.value = [...items]
  initialItems = [...items]
  reinit()
}

const learnmore = () => {
  restItems.value = [...wrongAnswers.value]
  wrongAnswers.value = []
  initialItems = [...restItems.value]
  reinit()
}

const reinit = () => {
  count.value = 0
  current.value = 0
  isFinish.value = false
  changeStep()
}

watch(count, (newValue, oldValue) => {
  if (newValue > initialItems.length || !restItems.value.length) {
    isFinish.value = true
    current.value = 0
    count.value = 0
  }
})

let isvalid = ref(false)

onMounted(() => {
  changeStep()
})

function changeStep() {
  count.value += 1
  answered.value = false
  isvalid.value = false
  options.value = []

  let crnt = { ...currentItem.value }
  let tmp = [...items].filter((item) => item.dt !== currentItemDT.value)

  tmp = useSampleSize(tmp, 3)
  options.value = tmp
  options.value.push(crnt)
  options.value = useShuffle(options.value)
}

const checkAnswer = (option: ICard) => {
  if (!answered.value) {
    answered.value = true

    if (option.dt === currentItemDT.value) {
      isvalid.value = true
      answered.value = false
      makeknown()
      changeStep()
    } else {
      let isnew = wrongAnswers.value.filter(
        (item) => item.dt !== currentItem.value.dt
      )
      if (isnew) {
        wrongAnswers.value.push(currentItem.value)
      }
    }
  } else {
    current.value += 1

    changeStep()
  }
}

const makeknown = () => {
  restItems.value.splice(current.value, 1)
}

const randomize = () => {
  restItems.value = useShuffle(restItems.value)
  reinit()
}
</script>

<style scoped></style>

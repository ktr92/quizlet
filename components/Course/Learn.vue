<template>
  <div>
    <div v-if="isFinish">
      <CourseNavigation
        :condition2="!!wrongAnswers.length"
        @some-event1="restart"
        @some-event2="learnmore"
        text1="Начать заново"
        text2="Повторить"
      />
    </div>
    <div v-else>
      <div v-if="restItems && restItems.length && currentItem">
        <div
          class="shadow-lg rounded-xl py-8 px-2 md:p-8 bg-primary-500 dark:bg-primary-800 mt-4 mb-4"
        >
          <div
            class="flex items-center justify-center text-lg md:text-3xl font-bold pb-8 text-white"
          >
            {{ currentItemDT }}
          </div>
          <div :class="{ valid: isvalid }">
            <UIInput v-model="answer" @onEnter="nextcard"></UIInput>
          </div>
          <div
            v-if="!isvalid && answered"
            class="text-red-800 mt-4 font-bold text-lg md:text-3xl text-center"
          >
            {{ currentItemDD }}
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
              <UIIconbutton
                @some-event="changeSide"
                :tooltip="$t('changeside')"
              >
                <Icon name="eva:flip-2-fill" size="30" />
              </UIIconbutton>
            </div>
          </div>

          <div
            class="flex max-auto my-2 md:my-2 justify-center dark:text-white text-xl items-center"
          >
            <div class="mx-2 md:mx-4">
              {{ count + 1 }} / {{ initialItems.length }}
            </div>
          </div>

          <div
            class="flex py-2 md:py-2 xs-auto md:w-p[900px] items-center justify-center"
          >
            <div class="ml-1 md:ml-4 w-[50%]">
              <UIIconbutton
                @some-event="skipcard"
                bg="#efadad"
                bghover=""
                :tooltip="$t('skip')"
              >
                <Icon name="fluent:skip-forward-tab-24-regular" size="30" />
              </UIIconbutton>
            </div>
            <div class="ml-1 md:ml-4 w-[50%]">
              <UIIconbutton
                @some-event="nextcard"
                bg="#c4eac4"
                bghover=""
                :tooltip="$t('check')"
              >
                <Icon name="heroicons-solid:check" size="30" />
              </UIIconbutton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import timeout from "@/utils/timeout"

const props = defineProps({
  items: {
    type: Array<ICard>,
    required: true,
  },
})

const answer = ref("")

let restItems = ref([...props.items])
const items = [...props.items]
let initialItems = [...props.items]
let wrongAnswers = ref<ICard[]>([])

let frontSide = ref(false)
let answered = ref(false)

const flipped = ref(false)

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
  return frontSide.value ? currentItem.value.dt : currentItem.value.dd
})
const currentItemDD = computed(() => {
  return frontSide.value ? currentItem.value.dd : currentItem.value.dt
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
}

watch(count, (newValue, oldValue) => {
  if (newValue >= initialItems.length || !restItems.value.length) {
    isFinish.value = true
    current.value = 0
    count.value = 0
  }
})

const isvalid = computed(() => {
  return answer.value.toLowerCase() === currentItemDD.value.toLowerCase()
})

const nextcard = async () => {
  answered.value = true

  if (isvalid.value) {
    await timeout(500)
    answered.value = false
    answer.value = ""

    makeknown()
  } else {
    let isnew = wrongAnswers.value.filter(
      (item) => item.dt !== currentItem.value.dt
    )
    if (isnew) {
      wrongAnswers.value.push(currentItem.value)
    }
  }
}

const skipcard = () => {
  makeknown()
  answered.value = false
}

const makeknown = () => {
  restItems.value.splice(current.value, 1)
  /*   changeCurrent()
   */ count.value += 1
}

const randomize = () => {
  restItems.value = useShuffle(restItems.value)
  reinit()
}
</script>

<style scoped>
.valid ::v-deep input {
  animation: valid 0.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  backface-visibility: hidden;
  transition: all 0.2s ease;
  @apply border-green-700;
}
@keyframes valid {
  10%,
  90% {
    transform: scale(1.02);
  }

  30%,
  50%,
  70% {
    transform: scale(1.03);
  }

  40%,
  60% {
    transform: scale(1.05);
  }
}
</style>

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
        <div class="mx-2 md:mx-4" v-if="wrongAnswers.length">
          <UIButton
            @onclick="learnmore"
            size="lg"
            :liquid="false"
            :rounded="true"
            type="primary"
          >
            Повторить
          </UIButton>
        </div>
      </div>
      <!-- /.flex -->
    </div>
    <div v-else>
      <div v-if="restItems && restItems.length && currentItem">
        <div
          class="shadow-lg rounded-xl p-8 bg-primary-500 dark:bg-primary-500 mt-4 mb-4"
        >
          <div class="text-white font-bold text-lg md:text-3xl text-center">
            {{ currentItemDD }}
          </div>
        </div>

        <div class="flex flex-wrap">
          <div
            class="w-[50%] p-2 md:p-4"
            v-for="option in options"
            :key="option.dt + count"
          >
            <div
              @click="checkAnswer(option.dt)"
              v-if="!answered || option.dt === currentItemDT"
            >
              {{ option.dt }}
              <span
                class="text-red-500 font-bold"
                v-if="answered && !isvalid && option.dt === currentItemDT"
              >
                - {{ option.dd }}</span
              >
            </div>
            <div v-else class="text-gray-400">
              {{ option.dt }}
            </div>
          </div>
        </div>
        <!-- /.w- p-2 md:p-4 -->
      </div>
      <!-- /.flex flex-wrap -->

      <div class="flex justify-between items-center">
        <div
          class="flex max-auto my-2 md:my-2 justify-center text-white text-xl items-center"
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
          class="flex max-auto my-2 md:my-2 justify-center dark:text-white text-xl items-center"
        >
          <div class="mx-2 md:mx-4">
            {{ count }} / {{ initialItems.length }}
          </div>
        </div>

        <!--  <div
          class="flex py-2 md:py-2 xs-auto md:w-p[900px] items-center justify-center"
        >
          <div class="ml-1 md:ml-4 w-[50%]">
            <UIIconbutton @some-event="skipcard" bg="#efadad" bghover="">
              <Icon name="fluent:skip-forward-tab-24-regular" size="30" />
            </UIIconbutton>
          </div>
          <div class="ml-1 md:ml-4 w-[50%]">
            <UIIconbutton @some-event="nextcard" bg="#c4eac4" bghover="">
              <Icon name="heroicons-solid:check" size="30" />
            </UIIconbutton>
          </div>
        </div> -->
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

const answer = ref("")

let restItems = ref([...props.items])
const items = [...props.items]
let initialItems = [...props.items]
let wrongAnswers = ref<ICard[]>([])
let options = ref<ICard[]>([])

let frontSide = ref(false)
let answered = ref(false)

const flipped = ref(false)
const flip = () => {
  flipped.value = !flipped.value
}

let current = ref(0)
let count = ref(0)
const isFinish = ref(false)

/* let currentItem = ref<ICard>({ ...restItems.value[0] })
 */
const changeSide = () => {
  frontSide.value = !frontSide.value
}

const side = computed(() => {
  return frontSide.value ? "Термин" : "Определение"
})

const currentItem = computed(() => {
  return restItems.value[current.value]
    ? restItems.value[current.value]
    : restItems.value[0]
})
/*
const options = computed(() => {
  cropItems.value.splice(current.value, 1)
  let sample = useSampleSize(cropItems.value, 3)
  sample.push(currentItem.value)
  return useShuffle(sample)
}) */

const currentItemDT = computed(() => {
  return frontSide.value ? currentItem.value.dt : currentItem.value.dt
})
const currentItemDD = computed(() => {
  return frontSide.value ? currentItem.value.dd : currentItem.value.dd
})

const restart = () => {
  restItems.value = [...items]
  initialItems = [...items]
  reinit()
  /*   changeCurrent() */
}

const learnmore = () => {
  restItems.value = [...wrongAnswers.value]
  wrongAnswers.value = []
  reinit()
  /*  changeCurrent() */
}

const reinit = () => {
  count.value = 0
  current.value = 0
  isFinish.value = false
  changeStep()
}

watch(count, (newValue, oldValue) => {
  if (newValue >= initialItems.length || !restItems.value.length) {
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
  let tmp = [...initialItems].filter((item) => item.dt !== currentItemDT.value)
  tmp = useSampleSize(tmp, 3)
  options.value = tmp
  options.value.push(crnt)
  options.value = useShuffle(options.value)
}

const checkAnswer = (option: string) => {
  if (!answered.value) {
    answered.value = true

    if (option === currentItemDT.value) {
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
    changeStep()
    current.value += 1
  }
}

/* const nextcard = () => {
  answered.value = true
  count.value += 1
  if (isvalid.value) {
    answered.value = false
    makeknown()
  } else {
    let isnew = wrongAnswers.value.filter(
      (item) => item.dt !== currentItem.value.dt
    )
    if (isnew) {
      wrongAnswers.value.push(currentItem.value)
    }
  }
  answer.value = ""

  changeStep()
} */

const skipcard = () => {
  makeknown()
  answered.value = false

  changeStep()
}

/* const changeCurrent = () => {
  currentItem.value = restItems.value[current.value]
    ? restItems.value[current.value]
    : restItems.value[0] || {}
} */

const makeknown = () => {
  restItems.value.splice(current.value, 1) /*  count.value += 1 */

  /*   changeCurrent()
   */
}

const randomize = () => {
  restItems.value = useShuffle(restItems.value)
  reinit()
}
</script>

<style scoped></style>

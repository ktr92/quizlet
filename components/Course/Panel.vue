<template>
  <div class="flex justify-between items-center">
    <div
      class="flex max-auto my-2 md:my-2 justify-center text-white text-xl items-center"
    >
      <div class="mr-2 md:mr-4" v-if="initialItems.length > 1">
        <UIIconbutton
          @some-event="randomize"
          bg="#efadad"
          bghover=""
          :tooltip="$t('randomize')"
        >
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
        {{ count + 1 }} / {{ initialItems.length }}
      </div>
    </div>

    <div
      class="flex max-auto my-2 md:my-2 justify-center dark:text-white text-xl items-center"
    >
      <div class="mx-2 md:mx-4">
        <span class="text-[#08BB3C] font-bold">{{ trueItems.length }}</span> /
        <span class="font-bold text-[#F1350D]">{{ falseItems.length }}</span>
      </div>
    </div>

    <div
      class="flex py-2 md:py-2 xs-auto md:w-p[900px] items-center justify-center"
    >
      <div class="ml-1 md:ml-4 w-[50%]">
        <UIIconbutton
          @some-event="nextcard"
          bg="#efadad"
          bghover=""
          :tooltip="$t('dontknow')"
        >
          <Icon name="gg:close" size="30" />
        </UIIconbutton>
      </div>
      <div class="ml-1 md:ml-4 w-[50%]">
        <UIIconbutton
          @some-event="makeknown"
          bg="#c4eac4"
          bghover=""
          :tooltip="$t('know')"
        >
          <Icon name="heroicons-solid:check" size="30" />
        </UIIconbutton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array<IWord>,
    required: true,
  },
})
let current = ref(0)
let count = ref(0)
let frontSide = ref(true)
let restItems = ref([...props.items])
let trueItems = ref<ICard[]>([])
let falseItems = ref<ICard[]>([])
const items = [...props.items]
let initialItems = [...props.items]

const currentItem = computed(() => {
  return restItems.value[current.value]
    ? restItems.value[current.value]
    : restItems.value[0]
})

const randomize = () => {
  restItems.value = useShuffle([...restItems.value])
  reinit()
}

const nextcard = () => {
  falseItems.value.push(currentItem.value)
  current.value += 1
  count.value += 1
}

const makeknown = () => {
  trueItems.value.push(currentItem.value)
  restItems.value.splice(current.value, 1)
  /*  changeCurrent() */
  count.value += 1
}
const restart = () => {
  restItems.value = [...items]
  initialItems = [...items]
  reinit()
}

const learnmore = () => {
  initialItems = [...restItems.value]
  reinit()
}

const reinit = () => {
  count.value = 0
  current.value = 0

  trueItems.value = []
  falseItems.value = []
}

const changeSide = () => {
  frontSide.value = !frontSide.value
}

watch(count, (newValue, oldValue) => {
  if (newValue >= initialItems.length) {
    current.value = 0
    count.value = 0
  }
})
</script>

<style scoped></style>

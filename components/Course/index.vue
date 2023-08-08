<template>
  <div>
    <div class="max-w-[800px] m-auto">
      <div class="flex items-center justify-center flex-wrap my-8">
        <UIIconlink
          title="Карточки"
          icon=""
          @click="showCards"
          class="flex-1 mr-1 md:mr-4"
          :is-active="iscomponent === 'cards'"
        ></UIIconlink>
        <UIIconlink
          title="Запоминание"
          icon=""
          @click="showLearn"
          class="flex-1 mx-1 md:mx-4"
          :is-active="iscomponent === 'learn'"
        ></UIIconlink>
        <UIIconlink
          title="Тест"
          icon=""
          @click="showTests"
          class="flex-1 ml-1 md:ml-4"
          :is-active="iscomponent === 'tests'"
        ></UIIconlink>
      </div>

      <div>
        <component
          :is="courseComponent"
          :items="course"
          :key="count"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseCards, CourseLearn, CourseTests } from "#components"

const props = defineProps({
  courseid: {
    type: String,
    required: true,
  },
})

let count = ref(0)

let iscomponent = ref("cards")

const courseComponent = computed(() => {
  if (iscomponent.value === "cards") {
    return CourseCards
  }
  if (iscomponent.value === "learn") {
    return CourseLearn
  }
  if (iscomponent.value === "tests") {
    return CourseTests
  }
  return CourseCards
})

const course = [
  {
    dt: "tighten",
    dd: "сужать",
  },
  {
    dt: "dazzle",
    dd: "ослеплять",
  },
  {
    dt: "insurance",
    dd: "страхование",
  },
  {
    dt: "have got",
    dd: "имеется",
  },
  {
    dt: "come down on",
    dd: "наброситься",
  },
  {
    dt: "come with",
    dd: "ладить",
  },
]

const showCards = () => {
  iscomponent.value = "cards"
  count.value += 1
}
const showLearn = () => {
  iscomponent.value = "learn"
  count.value += 1
}
const showTests = () => {
  iscomponent.value = "tests"
  count.value += 1
}
</script>

<style scoped></style>

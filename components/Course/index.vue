<template>
  <div>
    <div class="flex items-center justify-center flex-wrap">
      <UIIconlink title="Карточки" icon="" @click="showCards"></UIIconlink>
      <UIIconlink title="Запоминание" icon="" @click="showLearn"></UIIconlink>
      <UIIconlink title="Тест" icon="" @click="showTests"></UIIconlink>
    </div>

    <div>
      <component :is="courseComponent" :items="course" :key="count"></component>
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
]

const showCards = () => {
  iscomponent.value = "cars"
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

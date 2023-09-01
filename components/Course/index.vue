<template>
  <div>
    <div class="max-w-[800px] m-auto">
      <!-- <div class="flex justify-end">
        <UIIconbutton @some-event="editMenu">
          <Icon name="simple-line-icons:options-vertical" size="30" />
        </UIIconbutton>
      </div> -->
      <div class="" v-if="iscomponent">
        <UIIconbutton
          @some-event="iscomponent = false"
          bg="#efadad"
          bghover=""
          tooltip="Back"
        >
          <Icon name="eva:arrow-back-outline" size="30" />
        </UIIconbutton>
      </div>

      <div
        v-if="!iscomponent"
        class="py-2 md:py-2 xs-auto md:w-p[900px] items-center justify-end flex"
      >
        <div class="ml-1 md:ml-4">
          <UIIconbutton
            @some-event="exportItem"
            bg="#efadad"
            bghover=""
            tooltip="Export"
          >
            <Icon name="bx:export" size="30" />
          </UIIconbutton>
        </div>
        <div class="ml-1 md:ml-4">
          <UIIconbutton
            @some-event="importItem"
            bg="#efadad"
            bghover=""
            tooltip="Import"
          >
            <Icon name="bx:import" size="30" />
          </UIIconbutton>
        </div>
        <div class="ml-1 md:ml-4">
          <UIIconbutton
            @some-event="editItem"
            bg="#efadad"
            bghover=""
            tooltip="Edit"
          >
            <Icon name="ep:edit" size="30" />
          </UIIconbutton>
        </div>
        <div class="ml-1 md:ml-4">
          <UIIconbutton
            @some-event="removeItem"
            bg="#efadad"
            bghover=""
            tooltip="Remove"
          >
            <Icon name="fluent:delete-48-regular" size="30" />
          </UIIconbutton>
        </div>
      </div>

      <div
        class="flex items-center justify-center flex-wrap my-2 md:my-8"
        v-if="!iscomponent"
      >
        <UIIconlink
          title="Карточки"
          icon=""
          @click="showCards"
          class="md:mr-1 mb-2 md:mr-4 w-full md:w-auto md:flex-1"
          :is-active="iscomponent === ('cards' || 'default')"
        ></UIIconlink>
        <UIIconlink
          title="Запоминание"
          icon=""
          @click="showLearn"
          class="md:mx-1 mb-2 md:mx-4 w-full md:w-auto md:flex-1"
          :is-active="iscomponent === 'learn'"
        ></UIIconlink>
        <UIIconlink
          title="Тест"
          icon=""
          @click="showTests"
          class="md:ml-1 mb-2 md:ml-4 w-full md:w-auto md:flex-1"
          :is-active="iscomponent === 'tests'"
        ></UIIconlink>
      </div>

      <div>
        <component
          :is="courseComponent"
          :items="course.words"
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
  course: {
    type: Object as PropType<ICourseWords>,
    required: true,
  },
})

let cardmenu = ref(false)

let count = ref(0)

let iscomponent = ref<string | boolean>(false)

const courseComponent = computed(() => {
  if (iscomponent.value === false) {
    return CourseCards
  }
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
const exportItem = () => {}
const importItem = () => {}
const editItem = () => {}

const removeItem = () => {}
const editMenu = () => {
  cardmenu.value = !cardmenu.value
}
</script>

<style scoped></style>
